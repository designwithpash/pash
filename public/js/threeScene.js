// Remove the import statement since we're using CDN
// import * as THREE from 'three';

// Global function to initialize Three.js scene
function initThreeScene(containerId) {
    try {
        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            console.log('Mobile device detected, particles disabled');
            return;
        }

        console.log('Initializing Three.js scene...');
        
        // Create scene
        const scene = new THREE.Scene();
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        // Create renderer with transparency and better quality
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            precision: 'highp'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio); // For sharper rendering
        
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id ${containerId} not found`);
        }
        container.appendChild(renderer.domElement);
        
        // Set canvas to be behind all other elements
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '-10';
        renderer.domElement.style.pointerEvents = 'none';

        // Define colors for particles
        const colors = [
            { r: 34, g: 34, b: 34 },     // #222222 - Darker
            { r: 92, g: 92, b: 92 }      // #5C5C5C - Lighter
        ];

        // Create different shape textures with higher resolution
        function createShapeTexture(drawShape, color, blur = false) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 128; // Increased from 64 to 128 for better quality
            canvas.height = 128;
            
            if (blur) {
                ctx.filter = 'blur(2px)'; // Reduced blur for crisper appearance
            }
            
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
            drawShape(ctx);
            return new THREE.CanvasTexture(canvas);
        }

        // Create shapes with different sizes and blur
        const shapes = [];
        colors.forEach(color => {
            // Small sharp circle
            shapes.push(createShapeTexture(ctx => {
                ctx.beginPath();
                ctx.arc(64, 64, 6, 0, Math.PI * 2); // Adjusted for new canvas size
                ctx.fill();
            }, color, false));

            // Larger slightly blurred circle
            shapes.push(createShapeTexture(ctx => {
                ctx.beginPath();
                ctx.arc(64, 64, 12, 0, Math.PI * 2); // Adjusted for new canvas size
                ctx.fill();
            }, color, true));
        });

        // Calculate content area bounds (centered 1200px)
        const contentWidth = 1200;
        const contentLeft = -(contentWidth / 2);
        const contentRight = contentWidth / 2;
        const viewportWidth = window.innerWidth;
        const outsideWidth = (viewportWidth - contentWidth) / 2;

        // Create particle groups for different shapes
        const particleSystems = shapes.map((texture, index) => {
            const geometry = new THREE.BufferGeometry();
            const isLargeParticle = index % 2 === 1;
            const particleCount = isLargeParticle ? 400 : 800; // Drastically increased small particles
            const positions = new Float32Array(particleCount * 3);
            const originalPositions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3); // Add velocity array for smoother movement
            
            for(let i = 0; i < positions.length; i += 3) {
                // Position particles with better distribution
                const side = Math.random() > 0.5 ? 1 : -1;
                const x = side * (contentWidth/2 + Math.random() * outsideWidth);
                
                positions[i] = x / 10;  // Scale down for better visibility
                positions[i + 1] = (Math.random() - 0.5) * 150; // Increased y range
                positions[i + 2] = (Math.random() - 0.5) * 30;  // z-depth
                
                originalPositions[i] = positions[i];
                originalPositions[i + 1] = positions[i + 1];
                originalPositions[i + 2] = positions[i + 2];

                // Initialize velocities
                velocities[i] = 0;
                velocities[i + 1] = 0;
                velocities[i + 2] = 0;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.PointsMaterial({
                size: isLargeParticle ? 1.5:1.5, // Increased sizes by ~15%
                transparent: true,
                opacity: isLargeParticle ? 1 : 0.8,
                map: texture,
                blending: THREE.NormalBlending,
                depthWrite: false
            });
            
            const system = new THREE.Points(geometry, material);
            scene.add(system);
            
            return {
                system,
                geometry,
                originalPositions,
                velocities,
                isLargeParticle
            };
        });

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const mouse3D = new THREE.Vector3();
        let prevMouse3D = new THREE.Vector3();
        let mouseVelocity = new THREE.Vector3();

        function updateMousePosition(event) {
            const rect = container.getBoundingClientRect();
            
            prevMouse3D.copy(mouse3D);
            
            // Get mouse position in normalized device coordinates (-1 to +1)
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Convert to world coordinates
            mouse3D.x = (mouse.x * rect.width) / 20; // Increased mouse influence
            mouse3D.y = (mouse.y * rect.height) /20;
            mouse3D.z = 0;

            // Calculate mouse velocity
            mouseVelocity.subVectors(mouse3D, prevMouse3D);
        }

        window.addEventListener('mousemove', updateMousePosition);

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                scene.clear();
                renderer.dispose();
                container.removeChild(renderer.domElement);
                return;
            }

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            particleSystems.forEach(({ system, geometry, originalPositions, velocities, isLargeParticle }) => {
                const positions = geometry.attributes.position.array;
                
                for(let i = 0; i < positions.length; i += 3) {
                    const dx = positions[i] - mouse3D.x;
                    const dy = positions[i + 1] - mouse3D.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Adjust repulsion based on particle size
                    const repulsionRadius = isLargeParticle ? 15 : 12; // Reduced radius for more contained effect
                    const repulsionForce = isLargeParticle ? 0.8 : 1.0; // Reduced force
                    
                    if (distance < repulsionRadius) {
                        const force = (1 - distance / repulsionRadius) * repulsionForce;
                        const angle = Math.atan2(dy, dx);
                        
                        // Scatter from cursor center with reduced force
                        const scatterForce = force * 2; // Significantly reduced scatter force
                        
                        // Update velocities to scatter from cursor center
                        velocities[i] += Math.cos(angle) * scatterForce;
                        velocities[i + 1] += Math.sin(angle) * scatterForce;
                    }
                    
                    // Apply velocities with reduced impact
                    positions[i] += velocities[i] * 0.8; // Dampen position updates
                    positions[i + 1] += velocities[i + 1] * 0.8;
                    positions[i + 2] += velocities[i + 2] * 0.8;
                    
                    // Stronger damping for quicker settling
                    velocities[i] *= 0.88;
                    velocities[i + 1] *= 0.88;
                    velocities[i + 2] *= 0.88;
                    
                    // Return to original position
                    const returnSpeed = isLargeParticle ? 0.015 : 0.03;
                    const dx2 = originalPositions[i] - positions[i];
                    const dy2 = originalPositions[i + 1] - positions[i + 1];
                    const dz2 = originalPositions[i + 2] - positions[i + 2];
                    
                    velocities[i] += dx2 * returnSpeed;
                    velocities[i + 1] += dy2 * returnSpeed;
                    velocities[i + 2] += dz2 * returnSpeed;
                    
                    // Enhanced floating motion
                    const floatIntensity = isLargeParticle ? 0.025 : 0.015;
                    positions[i] += Math.sin(Date.now() * 0.001 + positions[i + 1] * 0.1) * floatIntensity;
                    positions[i + 1] += Math.cos(Date.now() * 0.002 + positions[i] * 0.1) * floatIntensity;
                }
                
                geometry.attributes.position.needsUpdate = true;
            });
            
            renderer.render(scene, camera);
        }
        animate();
        
        console.log('Three.js scene initialized successfully');
    } catch (error) {
        console.error('Error initializing Three.js scene:', error);
    }
} 