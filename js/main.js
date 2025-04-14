const prompter = document.getElementById("prompter");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
let scrollInterval = null;
let scrollSpeed = localStorage.getItem("scrollSpeed") ? parseFloat(localStorage.getItem("scrollSpeed")) : 3;
            
startBtn.addEventListener("click", startPrompter);
pauseBtn.addEventListener("click", pausePrompter);
resetBtn.addEventListener("click", resetPrompter);
          
speedSlider.addEventListener("input", function() {
  scrollSpeed = parseFloat(this.value);
  speedValue.textContent = this.value;

  // Save the speed to localStorage
  localStorage.setItem("scrollSpeed", scrollSpeed);
  
  // If already scrolling, update the speed
  if (scrollInterval) {
    clearInterval(scrollInterval);
    startScrolling();
  }
});
        
function startPrompter() {
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  startScrolling();
}
        
function startScrolling() {
  scrollInterval = setInterval(() => {
    // Move the text upward
    prompter.scrollTop += scrollSpeed;
    
    // Check if we"ve reached the bottom with a small buffer
    const bottomReached = prompter.scrollTop + prompter.clientHeight >= prompter.scrollHeight - 5;
    
    if (bottomReached) {
      pausePrompter();
    }
  }, 30);
}
        
function pausePrompter() {
  // Stop scrolling
  clearInterval(scrollInterval);

  scrollInterval = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}
        
function resetPrompter() {
  // Stop scrolling if active
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
  
  prompter.scrollTop = 0;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

document.addEventListener("DOMContentLoaded", function() {
  speedSlider.value = scrollSpeed;
  speedValue.textContent = speedSlider.value;
});
