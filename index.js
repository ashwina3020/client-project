// Select all boxes
const boxes = document.querySelectorAll('.box');

// Observer options for IntersectionObserver
const observerOptions = {
  root: null,
  threshold: 1.0, // Fully visible boxes trigger the observer
};

// Flag to track whether the boxes should scroll together
let scrollTogether = false;

// Handler for group scrolling
function groupScrollHandler(event) {
  if (!scrollTogether) return;

  event.preventDefault();

  // Scroll all boxes by the same amount
  const delta = event.deltaY;
  boxes.forEach((box) => {
    box.scrollBy(0, delta);
  });
}

// IntersectionObserver callback
const observerCallback = (entries) => {
  // Check if all boxes are fully visible
  const allFullyVisible = entries.every((entry) => entry.isIntersecting);

  if (allFullyVisible) {
    scrollTogether = true;
    document.addEventListener('wheel', groupScrollHandler);
  } else {
    scrollTogether = false;
    document.removeEventListener('wheel', groupScrollHandler);
  }
};

// Create IntersectionObserver
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe each box
boxes.forEach((box) => {
  observer.observe(box);
});

// Select all timeline sections and the timeline line
const sections = document.querySelectorAll('.timeline-section');
const timelineLine = document.querySelector('.timeline-line');

// Create an Intersection Observer
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add active class to the section in view
        sections.forEach((section) => section.classList.remove('active'));
        entry.target.classList.add('active');

        // Update the timeline gradient
        const activeIndex = Array.from(sections).indexOf(entry.target);
        const totalSections = sections.length;

        // Calculate gradient stop percentage
        const percentage = (activeIndex / (totalSections - 1)) * 100;
        timelineLine.style.background = `linear-gradient(to bottom, #FFC107 ${percentage}%, #808080 ${percentage}%)`;
      }
    });
  },
  {
    root: null, // Viewport is the root
    threshold: 0.6, // Trigger when 60% of the section is in view
  }
);

// Observe all sections
sections.forEach((section) => observer.observe(section));



// Function to change the color of a circle and fade in the timeline section
function changeCircleColor(circleId, timelineId, delay) {
  setTimeout(() => {
    // Change circle color
    const circle = document.getElementById(circleId);
    circle.style.backgroundColor = '#FFC107'; // Yellow
    
    // Fade in the timeline section by updating opacity and visibility
    const timelineSection = document.getElementById(timelineId);
    timelineSection.style.visibility = 'visible'; // Make section visible
    timelineSection.style.opacity = 1; // Fade in the section
  }, delay);
}

// Change the color of each circle and make the corresponding timeline section appear
changeCircleColor('circle1', 'content1', 1000); // After 1 second
changeCircleColor('circle2', 'content2', 2500); // After 2.5 seconds
changeCircleColor('circle3', 'content3', 4000); // After 4 seconds
changeCircleColor('circle4', 'content4', 5500); // After 5.5 seconds



