

document.addEventListener("DOMContentLoaded", function () {
    var swiperOne = new Swiper(".mySwiper", {
        slidesPerView: "auto", // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:true,
        autoplay:{
            delay:2000,
            pauseOnMouseEnter:true,
        },
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        centeredSlides: false, // Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 3 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 5 }  // Desktop: Show 5 slides
        }
        
    });
    var swiperTwo = new Swiper(".mySwiper2", {
        slidesPerView: 5, // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:false,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        centeredSlides: true, // Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 3 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 5 }  // Desktop: Show 5 slides
        }
        
    });
    var swiperThree = new Swiper(".mySwiper3", { 
        slidesPerView: 3, // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:false,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        centeredSlides:false,// Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        watchOverflow: true, // ✅ Hide navigation when all slides fit
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 3 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 5, 
                allowTouchMove:false,
            }  // Desktop: Show 5 slides
        }
        
    });
    var swiperFour = new Swiper(".mySwiper4", {
        slidesPerView: "auto", // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        autoplay:{
            delay:2000,
            pauseOnMouseEnter:true,
        },
        centeredSlides: false, // Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 3 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 5 }  // Desktop: Show 5 slides
        }
        
    });
    var swiperFive = new Swiper(".mySwiper5", {
        slidesPerView: "auto", // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        autoplay:{
            delay:2000,
            pauseOnMouseEnter:true,
        },
        centeredSlides: false, // Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 3 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 5 }  // Desktop: Show 5 slides
        }
        
    });
    var swiperSix = new Swiper(".mySwiper6", {
        slidesPerView: "auto", // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:false,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        centeredSlides: false, // Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 1 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 5 }  // Desktop: Show 5 slides
        }
        
    });
    var swiperSeven = new Swiper(".mySwiper7", {
        slidesPerView: "auto", // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        autoplay:{
            delay:2000,
            pauseOnMouseEnter:true,
        },
        centeredSlides: false, // Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 1 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 5 }  // Desktop: Show 5 slides
        }
        
    });
      var swiperNine = new Swiper(".mySwiper9", {
        slidesPerView: 3, // Show as many slides as fit
        spaceBetween: 10, // Adjust spacing
        loop:true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        autoplay:{
            delay:2000,
            pauseOnMouseEnter:true,
        },
        centeredSlides: false, // Align slides properly
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true, // ✅ Dynamic dots
            clickable:true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        grabCursor: true, // ✅ Shows grab cursor for better UX
        touchRatio: 1, // ✅ Ensures touch swiping is fully enabled
        touchAngle: 45, // ✅ Improves diagonal swiping
        simulateTouch: true, // ✅ Enables touch gestures
        breakpoints: {  // ✅ Make it responsive
            320: { slidesPerView: 1 },  // Mobile: Show 1 slide
            768: { slidesPerView: 1 },  // Tablet: Show 3 slides
            1024: { slidesPerView: 3 }  // Desktop: Show 5 slides
        }
        
    });
});


