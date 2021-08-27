'use strict';

let life = 5;
let score = 0;
let highScore = 0;
let maxNum = Math.trunc(Math.random() * 5000 + 30);
let minNum = Math.trunc(Math.random() * maxNum - 20);

const isPrime = num => {
  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return true;
};
// Change element's text Func
function displayText(msg, clsName = 'message') {
  document.querySelector(`.${clsName}`).textContent = `${msg}`;
}

displayText(`(Between ${minNum} and ${maxNum})`, 'between');

document.querySelector('.check').addEventListener('click', function () {
  let guessNum = Number(document.querySelector('.guess').value);
  if (life !== 0) {
    // more or less than our range
    if (guessNum > maxNum || guessNum < minNum) {
      displayText(
        guessNum > maxNum
          ? 'More than The Max Number!'
          : 'Less than The Min Number!'
      );
      document.querySelector('.guess').style.color = 'black';
      displayText('try again!', 'check-msg');
    } // correct answer case
    else if (isPrime(guessNum)) {
      displayText('Right Answer!');
      document.querySelector('.message').style.color = 'green';
      document.querySelector('.guess').value = '';
      displayText(guessNum, 'number');
      document.querySelector('.number').style.width = '30rem';
      displayText('', 'check-msg');
      document.querySelector('.number').style.color = 'green';
      score++;
      displayText(score, 'score');
      if (score % 5 === 0) {
        life++;
        displayText(life, 'life');
      }
      if (score > highScore) {
        highScore = score;
        displayText(highScore, 'highscore');
      }
      maxNum = Math.trunc(Math.random() * 5000);
      minNum = Math.trunc(Math.random() * maxNum - 20);
      displayText(`(Between ${minNum} and ${maxNum})`, 'between');
    } // Wrong answer case
    else {
      life--;
      displayText(life, 'life');
      if (life > 0) {
        displayText('Wrong Answer!');
        document.querySelector('.message').style.color = 'red';
        document.querySelector('.guess').value = '';
        displayText('try again!', 'check-msg');
      } else {
        displayText('you Lost!😜');
        document.querySelector('body').style.backgroundColor = 'red';
      }
    }
  }
});

const restPage = () => {
  document.querySelector('.guess').style.color = 'white';
  displayText('Start guessing...');
  document.querySelector('.message').style.color = 'white';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').style.color = '#333';
  displayText('?', 'number');
};

document.querySelector('.guess').addEventListener('click', function () {
  if (life !== 0) {
    restPage();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  restPage();
  document.querySelector('body').backgroundColor = '#222';
  displayText('', 'check-msg');
  document.querySelector('.guess').value = '';
  document.querySelector('.message').style.color = 'white';
  life = 5;
  score = 0;
  displayText(life, 'life');
  displayText(score, 'score');
  maxNum = Math.trunc(Math.random() * 5000);
  minNum = Math.trunc(Math.random() * maxNum - 20);
  displayText(`(Between ${minNum} and ${maxNum})`, 'between');
});
