document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    console.log('Initializing custom cursor...');

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorShape = document.createElement('div');
    cursorShape.className = 'cursor-shape';
    cursor.appendChild(cursorShape);

    console.log('Cursor elements created:', cursor, cursorShape);

    // Mouse tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const smoothFactor = 0.2;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Add click animation
    document.addEventListener('mousedown', () => {
        cursorShape.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursorShape.classList.remove('click');
    });

    // Add hover effect for interactive elements
    const buttonElements = document.querySelectorAll('button, .primary-btn, .secondary-btn, [role="button"]');
    const otherInteractiveElements = document.querySelectorAll('a:not(.primary-btn):not(.secondary-btn), input');

    // Handle button hovers
    buttonElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorShape.classList.remove('hover');
            cursorShape.classList.add('button-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorShape.classList.remove('button-hover');
        });
    });

    // Handle other interactive elements
    otherInteractiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorShape.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorShape.classList.remove('hover');
        });
    });

    // Animation loop
    function animateCursor() {
        // Smooth cursor following with easing
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * smoothFactor;
        cursorY += dy * smoothFactor;
        
        // Apply position with sub-pixel precision
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }

    // Start animation
    animateCursor();
}); 