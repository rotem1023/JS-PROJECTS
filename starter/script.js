'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;

const decreaseScoreNumber = function () {
  let scoreNumbr = Number(document.querySelector('.score').textContent);
  if (scoreNumbr > 1) {
    scoreNumbr--;
    document.querySelector('.score').textContent = scoreNumbr;
  } else {
    document.querySelector('.message').textContent = '😭 you lost the game';
    if (scoreNumbr === 1) {
      scoreNumbr--;
      document.querySelector('.score').textContent = scoreNumbr;
    }
  }
};

const playAgain = function () {
  const guess = Number(document.querySelector('.number').textContent);
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    document.querySelector('.message').textContent = '❌ No number!';
  } else if (guess === secretNumber) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = guess;
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.message').textContent = '✔ Correct Number';
    const score = Number(document.querySelector('.score').textContent);
    const highScore = Number(document.querySelector('.highscore').textContent);
    if (score > highScore) {
      document.querySelector('.highscore').textContent = score;
    }
  } else if (guess < secretNumber) {
    document.querySelector('.message').textContent = '👆 too low';
    decreaseScoreNumber();
  } else if (guess > secretNumber) {
    document.querySelector('.message').textContent = '👇 too high';
    decreaseScoreNumber();
  }
});

document.querySelector('.again').addEventListener('click', playAgain);
