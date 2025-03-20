// let navBar = document.querySelector("nav")
// let menuIcon = document.querySelector(".d-icon")
// menuIcon.addEventListener("click", () => {
//     navBar.classList.toggle("toggle")
// })

let navBar = document.querySelector("nav");
let closeIcon = document.querySelector(".close-icon");
let menuIcon = document.querySelector(".d-icon");
menuIcon.addEventListener("click", () => {
  navBar.classList.add("toggle");
  menuIcon.style.display = "none";
  closeIcon.classList.remove("close-icon");
});

closeIcon.addEventListener("click", () => {
  navBar.classList.remove("toggle");
  menuIcon.style.display = "block";
  closeIcon.classList.add("close-icon");
});

// nav bar anime
let navTimeLine = gsap.timeline();
navTimeLine.from("#links", {
  opacity: 0,
  y: -100,
  duration: 0.5,
  stagger: 0.3,
  ease: "power2",
});
gsap.from("header h2", {
  scale: 0,
  duration: 0.5,
  ease: "power2",
});

// hero section animation
document.addEventListener("DOMContentLoaded", () => {
  let tl = gsap.timeline();
  tl.from(".home-text h2, .home-text p,  .home-text button", {
    opacity: 0,
    y: 100,
    duration: 0.9,
    stagger: 0.2,
    ease: "power2",
    onComplete: () => {
      // Ensure that the elements stay visible after the animation
      gsap.set(".home-text p", { opacity: 1, y: 0 });
    },
  });

  gsap.from(".home-img img", {
    opacity: 0,
    y: -200,
    duration: 0.5,
    ease: "power2",
  });



  // hero cards anime
  let heroCard = gsap.timeline();
  heroCard.from(".hero-card", {
    opacity: 0,
    y: 100,
    duration: 0.5,
    stagger: 0.3,
    ease: "power2",
  });
});

//hero carousell 
let cIndex = 0;  // Declare currentIndex outside the function so it can be updated properly

let sliders = document.querySelectorAll(".slider");
sliders[0].classList.add("active");
function slider() {
  // console.log(sliders);  // Logging to check if you're selecting the correct elements

  // Hide all slides first
  sliders.forEach(item => item.classList.remove("active"));

  // Show the current slide based on the current index
  sliders[cIndex].classList.add("active");;

  // Increment the currentIndex or loop back to 0 if at the last slide
  cIndex = (cIndex + 1) % sliders.length;
}

// Call the slider function every 1 second (1000ms)
setInterval(slider, 2500);




  


// about us

let aboutTL = gsap.timeline({
  scrollTrigger: {
      trigger: ".about-anime",
      scroller: "body",
      // markers: true,
      start: "top 55%",
      end: "top 30%",
      scrub: 1
  }
})

aboutTL.from(".about-img",{
  x: -200,
  opacity: 0,
  duration: .5,
}, "anime")

aboutTL.from(".about-head, .about-p",{
  x: 200,
  opacity: 0,
  duration: .5,
  stagger: .3
}, "anime")


// testmonials 
let currentIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial-item');
  const totalTestimonials = testimonials.length;

  // Show the current testimonial
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      if (i === index) {
        testimonial.classList.remove('hidden');
      } else {
        testimonial.classList.add('hidden');
      }
    });
  }

  // Show next testimonial
  document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  });

  // Show previous testimonial
  document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentIndex);
  });

  // Initialize the first testimonial
  showTestimonial(currentIndex);

const active = () =>{
  
}

  // FAQ's 

// JavaScript to handle the close button functionality
const closeButton = document.querySelector('#close-btn');
const alertBox = document.querySelector('#alert-box');

// Add event listener to the close button
closeButton.addEventListener('click', () => {
    alertBox.classList.add('hidden'); // Adds the 'hidden' class to hide the alert
    console.log("cliked");
    
});
