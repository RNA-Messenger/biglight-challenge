document.addEventListener("DOMContentLoaded", function() {
  let lazyloadImages;   
   //IntersectionObserver: detect when an element enters the viewport   
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    let imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        //isIntersecting: get URL from data-src and move to src attribute to trigger the image load
        if (entry.isIntersecting) {
          let image = entry.target;
          image.src = image.dataset.src;
          console.log(image.dataset.src);
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    let lazyTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyTimeout) {
        clearTimeout(lazyTimeout);
      }    

      lazyTimeout = setTimeout(function() {
        let scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})