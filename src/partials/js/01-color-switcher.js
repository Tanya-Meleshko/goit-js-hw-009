const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let intervalId = null;

refs.buttonStart.addEventListener('click', onClickButtonStart);
refs.buttonStop.addEventListener('click', onClickButtonStop);

function onClickButtonStart() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
}

function onClickButtonStop() {
  clearInterval(intervalId);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
