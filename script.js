'use strict';

const playerEls = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

const scoreEls = [
  document.getElementById('score--0'),
  document.getElementById('score--1'),
];

const currentEls = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let totalScores, currentScore, activePlayer, isGameEnded;

const initGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameEnded = false;

  scoreEls.forEach(score => (score.textContent = 0));
  playerEls.forEach(player => player.classList.remove('player--winner'));
  playerEls[activePlayer].classList.add('player--active');
};

initGame();

const setCurrentScore = function (score) {
  currentScore = score;
  currentEls[activePlayer].textContent = score;
};

const switchPlayer = function () {
  setCurrentScore(0);
  playerEls.forEach(player => {
    player.classList.toggle('player--active');
  });
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRoll.addEventListener('click', function () {
  if (isGameEnded) return;

  let diceNum = Math.trunc(Math.random() * 6 + 1);
  dice.src = `img/dice-${diceNum}.png`;
  dice.classList.remove('hidden');

  if (diceNum !== 1) setCurrentScore(currentScore + diceNum);
  else switchPlayer();
});

btnHold.addEventListener('click', function () {
  if (isGameEnded) return;

  totalScores[activePlayer] += currentScore;
  scoreEls[activePlayer].textContent = totalScores[activePlayer];

  if (totalScores[activePlayer] >= 10) {
    dice.classList.add('hidden');
    playerEls[activePlayer].classList.add('player--winner');
    playerEls[activePlayer].classList.remove('player--active');
    setCurrentScore(0);
    isGameEnded = true;
  } else switchPlayer();
});

btnNew.addEventListener('click', initGame);
