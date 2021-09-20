const startBtn = document.querySelector('#start-btn');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
let timer;
let time = 0;
let score = 0;
let timeEl = document.querySelector('#time');
let board = document.querySelector('.board');
const colors = [
  '#fffb00',
  '#ffa722',
  '#5ae447',
  '#28fff4',
  '#c228ff',
  '#ff3683',
];

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

function startGame() {
  createTarget();
  board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
      score++;
      event.target.remove();
      createTarget();
    }
  });
  setTime(time);
  timer = setInterval(decTime, 1000);
}

function restartGame() {
  board.remove();
  time = 10;
  score = 0;
  screens[2].innerHTML = `<div class="screen"><h3>Осталось <span id="time">00:05</span></h3><div class="board" id="board"></div></div>`;
  timeEl = document.querySelector('#time');
  board = document.querySelector('.board');
  startGame();
}

function decTime() {
  if (time === 0) {
    clearInterval(timer);
    finishGame();
  } else {
    let current = --time;
    setTime(current);
  }
}

function setTime(t) {
  if (t < 10) {
    t = `0${t}`;
  }
  timeEl.innerHTML = `00:${t}`;
  return 0;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.style.display;
  board.innerHTML = `<h1>Счет: <span class = "primary">${score}</span></h1><a href="#" class = "start" id="restart-btn">Рестарт</a>`;
  const restartBtn = document.querySelector('#restart-btn');
  restartBtn.addEventListener('click', restartGame);
}

function createTarget() {
  const circle = document.createElement('div');
  const size = getRundNum(50, 100);
  const { width, height } = board.getBoundingClientRect();
  const x = getRundNum(0, width - size);
  const y = getRundNum(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getRandColor();
  circle.style.boxShadow = '0 0 30px white';

  board.append(circle);
}

function getRundNum(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function getRandColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
