const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartChangeStyle);
stopBtn.addEventListener('click', onStopChangeStyle);

let changeStyleId = null;

function onStartChangeStyle() {
  changeStyleId = setInterval(() => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);


}
function onStopChangeStyle() {
  clearInterval(changeStyleId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}