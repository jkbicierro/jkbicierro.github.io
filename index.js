// Dark and light mode
function toggleMode() {
  const body = document.body;
  body.dataset.mode = body.dataset.mode === 'light' ? 'dark' : 'light';
}

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
} 

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
