const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let intervalId = null;

refs.btnStart.addEventListener('click', onClickBtnStart);
function onClickBtnStart() {
  refs.btnStart.disabled = true;

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // isActive = true;
}

refs.btnStop.addEventListener('click', onClickBtnStop);
function onClickBtnStop() {
  clearInterval(intervalId);
  refs.btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
