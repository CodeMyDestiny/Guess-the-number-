'use strict';
const bodyElement = document.querySelector('body');
const winAudio = new Audio('audio/winner.wav');
const gameOverAudio = new Audio('audio/gameover.wav');
const checkButtonAudio = new Audio('audio/check.wav');
const resetButtonAudio = new Audio('audio/reset.wav');

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess || guess > 20 || guess < 1) {
    //When there is no input
    document.querySelector('.message').textContent = '🔢 Enter 1-20 ❗';
  }
  //When Player wins
  else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.message').textContent =
      '🎉🎉🎉Hooray! You guessed it correctly ✅';
    bodyElement.style.animation = 'colorful-blast 2s ease-in-out forwards';
    document.querySelector('.number').style.width = '30rem';
    winAudio.play();

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  //When guess is too high
  else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too High❕⚡';
      score -= 1;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Game Over 🎮';
      document.querySelector('.score').textContent = 0;
      gameOverAudio.play();
    }
  }
  //When guess is too low
  else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too Low❗🔻';
      score -= 1;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Game Over 🎮';
      document.querySelector('.score').textContent = 0;
      gameOverAudio.play();
    }
  }
  checkButtonAudio.play();
});

document.querySelector('.again').addEventListener('click', function () {
  const resetScore = document.querySelector('.score');
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  resetScore.textContent = score;

  const resetInput = document.querySelector('.guess');
  resetInput.value = '';

  const resetDisplay = document.querySelector('.number');
  resetDisplay.textContent = '?';

  const resetMessage = document.querySelector('.message');
  resetMessage.textContent = 'Start guessing...';
  resetMessage.style.animation = 'none';
  resetMessage.offsetHeight; // Trigger reflow
  resetMessage.style.animation = null;
  bodyElement.style.animation = 'reset-background 0.3s ease-in-out forwards';

  setTimeout(function () {
    bodyElement.style.backgroundColor = '#222';
    bodyElement.style.animation = null;
  }, 300);
  document.querySelector('.number').style.width = '15rem';
  resetButtonAudio.play();
});
