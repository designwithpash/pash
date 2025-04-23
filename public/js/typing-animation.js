class TypeWriter {
    constructor(element, words, waitTime = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.waitTime = parseInt(waitTime, 10);
        this.isDeleting = false;
        this.type();
        console.log('TypeWriter initialized with element:', element);
    }

    type() {
        // Current word index
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element with a blinking cursor
        this.element.innerHTML = `${this.txt}<span class="typing-cursor">|</span>`;
        console.log('Current text:', this.txt);

        // Initial typing speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        // Check if word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.waitTime;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing typing animation...');
    
    // Find the typing element
    const element = document.querySelector('.typing-text');
    console.log('Found typing element:', element);
    
    if (element) {
        const words = [
            'UX/UI designer',
            'Graphic designer',
            'Motion designer'
        ];
        
        // Start typing animation
        new TypeWriter(element, words, 2000);
    } else {
        console.error('Typing element not found! Make sure you have an element with class "typing-text"');
    }
}); 