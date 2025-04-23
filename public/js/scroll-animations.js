// GSAP is loaded globally from CDN
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing animations');
    initScrollAnimations();
});

function initScrollAnimations() {
    console.log('Starting to initialize scroll animations');
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate all sections with data-anim-section attribute
    const sections = gsap.utils.toArray('[data-anim-section]');
    console.log('Found sections:', sections);

    sections.forEach(section => {
        console.log('Animating section:', section);
        
        // Initial section fade in
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                onEnter: () => console.log('Section entered:', section)
            },
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power3.out'
        });

        // Animate headings
        const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length) {
            gsap.from(headings, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }

        // Animate paragraphs
        const paragraphs = section.querySelectorAll('p');
        if (paragraphs.length) {
            gsap.from(paragraphs, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }

        // Animate images and icons
        const images = section.querySelectorAll('img, .icon-size');
        if (images.length) {
            gsap.from(images, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }

        // Animate buttons and links
        const buttons = section.querySelectorAll('a, button, .primary-btn, .secondary-btn');
        if (buttons.length) {
            gsap.from(buttons, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });

    // Fade in elements
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Slide in elements from left
    gsap.utils.toArray('.slide-in-left').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Slide in elements from right
    gsap.utils.toArray('.slide-in-right').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Scale up elements
    gsap.utils.toArray('.scale-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Stagger animations for lists
    gsap.utils.toArray('.stagger-list').forEach(list => {
        const items = list.querySelectorAll('li, .stagger-item');
        gsap.from(items, {
            scrollTrigger: {
                trigger: list,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });
} 