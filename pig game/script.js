'use strict';

// selecting elments
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let statring = true;

// functions

const wining = function () {
  if (
    Number(document.getElementById(`score--${activePlayer}`).textContent) >
      99 ||
    Number(document.getElementById(`current--${activePlayer}`).textContent) > 99
  ) {
    playing = false;
    if (
      Number(document.getElementById(`score--${activePlayer}`).textContent) <
      Number(document.getElementById(`current--${activePlayer}`).textContent)
    ) {
      Number(
        (document.getElementById(`score--${activePlayer}`).textContent = Number(
          document.getElementById(`current--${activePlayer}`).textContent
        ))
      );
    }
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    diceEl.classList.add('hidden');
  }
};

const switching = function () {
  activePlayer = 1 - activePlayer;
  currentScore = 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`);
};

const rollingDice = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore = dice + currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      wining();
    } else {
      // switch next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      if (
        currentScore >
        Number(document.getElementById(`score--${activePlayer}`).textContent)
      ) {
        document.getElementById(`score--${activePlayer}`).textContent =
          currentScore;
      }
      switching();
    }
  }
};

const addScore = function () {
  if (currentScore == 0) {
    return;
  }
  if (playing) {
    //1. add current to active player's
    document.getElementById(`score--${activePlayer}`).textContent =
      Number(document.getElementById(`score--${activePlayer}`).textContent) +
      currentScore;
    //2. check if player's score>=100 -> finish the game
    wining();
    //3.  switch to the second player
    switching();
  }
};

const newGame = function () {
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  playing = true;
  diceEl.classList.add('hidden');
  if (statring) {
    statring = false;
    activePlayer = 1;
    player0EL.classList.remove(`player--active`);
    player1EL.classList.add(`player--active`);
  } else {
    statring = true;
    activePlayer = 0;
    player0EL.classList.add(`player--active`);
    player1EL.classList.remove(`player--active`);
  }
};

// BUttons functionality
btnRoll.addEventListener('click', rollingDice);
btnHold.addEventListener('click', addScore);
btnNew.addEventListener('click', newGame);
