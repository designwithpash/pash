class TestimonialsCarousel {
    constructor(container) {
        this.container = container;
        this.cards = Array.from(container.querySelectorAll('.testimonial-card'));
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        this.updateCarousel();
        this.startAutoplay();
        this.setupEventListeners();
    }

    updateCarousel() {
        this.cards.forEach((card, index) => {
            // Remove all classes first
            card.classList.remove('active', 'prev', 'next');
            
            // Calculate the relative position
            if (index === this.currentIndex) {
                card.classList.add('active');
            } else if (index === this.getPrevIndex()) {
                card.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                card.classList.add('next');
            }
        });
    }

    getPrevIndex() {
        return (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    }

    getNextIndex() {
        return (this.currentIndex + 1) % this.totalCards;
    }

    next() {
        this.currentIndex = this.getNextIndex();
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.updateCarousel();
    }

    startAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    setupEventListeners() {
        // Touch and mouse events for swipe
        let startX = 0;
        let isDragging = false;

        const handleStart = (e) => {
            startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
            isDragging = true;
            this.stopAutoplay();
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
            const diff = currentX - startX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.prev();
                } else {
                    this.next();
                }
                isDragging = false;
                this.startAutoplay();
            }
        };

        const handleEnd = () => {
            isDragging = false;
            this.startAutoplay();
        };

        // Add touch and mouse event listeners
        this.container.addEventListener('mousedown', handleStart);
        this.container.addEventListener('touchstart', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);

        // Handle mouse enter/leave for autoplay
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());

        // Add click handlers for navigation buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prev();
                this.stopAutoplay();
                setTimeout(() => this.startAutoplay(), 2000);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.next();
                this.stopAutoplay();
                setTimeout(() => this.startAutoplay(), 2000);
            });
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carousel-container');
    if (container) {
        window.carousel = new TestimonialsCarousel(container);
    }
}); 