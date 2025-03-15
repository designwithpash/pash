document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".secondary-btn");
  const lightbox = document.getElementById("lightbox");
  const portfolioItems = document.querySelectorAll(".swiper"); // Select Swiper containers
  console.log(portfolioItems);
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove 'active' class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active"); // Add 'active' class to clicked button

      let filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-item") === filterValue
        ) {
          item.style.display = "block"; // Show matched Swiper
        } else {
          item.style.display = "none"; // Hide unmatched Swiper
        }
      });
      window.addEventListener("resize", function () {
        lightbox.style.display === "flex"
          ? (lightbox.style.display = "flex")
          : "";
      });
      // Reinitialize Swipers when switching categories
      updateSwipers();
    });
  });
  function updateSwipers() {
    if (typeof swiperOne !== "undefined") swiperOne.update();
    if (typeof swiperTwo !== "undefined") swiperTwo.update();
    if (typeof swiperThree !== "undefined") swiperThree.update();
    if (typeof swiperFour !== "undefined") swiperFour.update();
  }
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".fade-in").forEach((el, index) => {
      gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "elastic.out(0.5, 0.5)",
          delay: index * 0.2, // Staggered effect
          scrollTrigger: {
              trigger: el,
              start: "top 90%", // Adjust based on scroll position
              toggleActions: "play none none reverse",
          },
      });
  });
  const menuCheckbox = document.getElementById("check");
  const navMenu = document.getElementById("nav");
  const links=document.querySelectorAll(".nav-links a")
  console.log(links)
  links.forEach(element => {
    element.addEventListener("click", ()=>{
        navMenu.classList.remove("active")
        menuCheckbox.checked = false
         document.body.style.overflow=""
    })
  });
  menuCheckbox.addEventListener("change", () => {
      if (menuCheckbox.checked) {
          navMenu.classList.add("active"); // Show menu
          document.body.style.overflow="hidden"
      } else {
          navMenu.classList.remove("active"); // Hide menu
          document.body.style.overflow=""
      }
  });

  

});

// const lightbox = document.querySelectorAll(".swiper-slide")
// lightbox.forEach(item=>{
//     item.addEventListener("click", ()=>{

//     })
// })
