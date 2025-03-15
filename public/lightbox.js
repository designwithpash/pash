document.addEventListener("DOMContentLoaded", function () {
    const closeBtn = document.getElementById("close-btn");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const body=document.body

    // ✅ Get all images inside Swiper (or any gallery)
    document.querySelectorAll(".swiper-slide img").forEach(img => {
        img.addEventListener("click", function () {

            let parentCategory = this.closest("[data-item]")?.getAttribute("data-item");

            // ✅ Prevent lightbox from opening if the item is inside "prototype"
            if (parentCategory === "prototype") return;
            let imgSrc = this.getAttribute("src"); // Get clicked image source
            lightboxImg.setAttribute("src", imgSrc); // Set lightbox image
            lightbox.style.display = "flex"; // Show lightbox
            body.style.overflow="hidden"
           
            if (this.getAttribute("data-filter")==="prototype"){
                lightbox.style.display="none"
            }
        });
    });

    // ✅ Close the lightbox when clicking the close button
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
        body.style.overflow=""
    });
    document.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("lightbox")) {
          evt.target.style.display = "none";
          body.style.overflow=""
        }
      });
});
