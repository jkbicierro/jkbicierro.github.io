// Dark and light mode
function toggleMode() {
  const body = document.body;
  body.dataset.mode = body.dataset.mode === 'light' ? 'dark' : 'light';
}

/*
// Can't right click
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Can't press console (Need to update - deprecated codes)
document.onkeydown = function(e) { 
  if(event.keyCode == 123) return false; 
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false; 
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false; 
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))return false; 
}*/

// Cursor Pointer
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

document.addEventListener('mouseout', function(e) {
  if (!e.relatedTarget) {
    circles.forEach(function(circle) {
    circle.style.display = 'none';
  });
  }
});
document.addEventListener('mouseover', function() {
  circles.forEach(function(circle) {
    circle.style.display = 'block';
    circle.style.opacity = '1';
  });
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}
animateCircles();

// Textdraw Slide
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.textdraw-container');
  let isDragging = false;
  let startX, scrollLeft;

  container.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      container.scrollLeft = scrollLeft - walk;
  });

  container.addEventListener('mouseup', function() {
      isDragging = false;
  });

  container.addEventListener('mouseleave', function() {
      isDragging = false;
  });

  // Touch events for mobile devices
  container.addEventListener('touchstart', function(e) {
      isDragging = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
  });

  container.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      container.scrollLeft = scrollLeft - walk;
  });

  container.addEventListener('touchend', function() {
      isDragging = false;
  });

  container.addEventListener('touchcancel', function() {
      isDragging = false;
  });

  // Append content when scrolling reaches the end
  container.addEventListener('scroll', function() {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          const clone = container.firstElementChild.cloneNode(true);
          container.appendChild(clone);
      } else if (container.scrollLeft <= 0) {
          const clone = container.lastElementChild.cloneNode(true);
          container.insertBefore(clone, container.firstElementChild);
          container.scrollLeft = container.firstElementChild.clientWidth;
      }
  });
});