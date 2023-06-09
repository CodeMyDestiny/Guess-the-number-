'use strict';
const winAudio = new Audio('audio/winner.wav');
const gameOverAudio = new Audio('audio/gameover.wav');
const checkButtonAudio = new Audio('audio/check.wav');
const resetButtonAudio = new Audio('audio/reset.wav');
const bodyElement = document.querySelector('body');
let secretNumber = generateRandomNumber();
let score = 20;
let highscore = 0;
let gameOver = false;

function generateRandomNumber() {
  //Math.random generates a random decimal number between 0 (inclusive) and 1 (exclusive).
  //Math.trunc removes the decimal part without rounding
  return Math.trunc(Math.random() * 20) + 1;
}

const displayMessage = function (selector, message) {
  selector === '.guess'
    ? (document.querySelector(selector).value = message)
    : (document.querySelector(selector).textContent = message);
};

function updateHighscore() {
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
}

function handleCorrectGuess() {
  displayMessage('.message', '🎉🎉🎉Hooray! You guessed it correctly ✅');

  bodyElement.style.animation = 'colorful-blast 2s ease-in-out forwards';
  document.querySelector('.number').style.width = '30rem';

  updateHighscore();
  winAudio.play();
  gameOver = true;
  document.querySelector('.guess').disabled = true;
}

function handleWrongGuess(guess) {
  const wrongGuess = guess > secretNumber ? 'Too High❕⚡' : 'Too Low❗🔻';
  displayMessage('.message', wrongGuess);

  score -= 1;
  document.querySelector('.score').textContent = score;

  if (score === 0) {
    displayMessage('.message', 'Game Over 🎮');
    document.querySelector('.score').textContent = 0;
    gameOver = true;
    document.querySelector('.guess').disabled = true;
    gameOverAudio.play();
  }
}

function resetGame() {
  secretNumber = generateRandomNumber();
  score = 20;

  displayMessage('.score', score);
  displayMessage('.guess', '');

  displayMessage('.number', '?');
  displayMessage('.message', 'Start guessing...');

  document.querySelector('.message').style.animation = 'none';
  document.querySelector('.message').offsetHeight; // Trigger reflow
  document.querySelector('.message').style.animation = null;
  bodyElement.style.animation = 'reset-background 0.3s ease-in-out forwards';

  setTimeout(function () {
    bodyElement.style.backgroundColor = '#222';
    bodyElement.style.animation = null;
  }, 300);
  document.querySelector('.number').style.width = '15rem';
  gameOver = false;
  document.querySelector('.guess').disabled = false;
  resetButtonAudio.play();
}

document.querySelector('.check').addEventListener('click', function () {
  if (!gameOver) {
    const guess = Number(document.querySelector('.guess').value);

    if (!guess || guess > 20 || guess < 1) {
      displayMessage('.message', '🔢 Enter 1-20 ❗');
    } else if (guess === secretNumber) {
      document.querySelector('.number').textContent = secretNumber;
      handleCorrectGuess();
    } else {
      handleWrongGuess(guess);
    }
  }
  checkButtonAudio.play();
});

document.querySelector('.again').addEventListener('click', resetGame);
