const controlButton = document.getElementById('control');
const ball = document.getElementById('ball');


controlButton.addEventListener('click', () => {
  if (ball.style.animationPlayState === 'paused') {
    ball.style.animationPlayState = 'running';
    controlButton.textContent = "Pause Animation"
  } else {
    ball.style.animationPlayState = 'paused';
    controlButton.textContent = "Play Animation"
  }
})