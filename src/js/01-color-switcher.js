const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const DELAY = 1000;

let intervalId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, DELAY);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopClick() {
  clearInterval(intervalId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
