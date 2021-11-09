'use strict';

//SHOP STATUS (CLOSED / OPEN)

function reqListener() {
  let week;
  let hours;
  let minutes;

  const options = {
    timeZone: 'Europe/Vilnius',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date();
  const formatter = new Intl.DateTimeFormat('lt', options);
  const time = formatter.format(date);

  week = date.getDay();
  hours = time.substring(0, 2);
  minutes = time.substring(3, 5);

  const closed = document.getElementById('closed');
  const open = document.getElementById('open');
  // const closed1 = document.getElementById('closed-1');
  // const open1 = document.getElementById('open-1');
  if (
    (week !== 0 && week < 7 && hours < 18 && hours >= 9) ||
    (week === 0 && hours < 16 && hours >= 10)
  ) {
    if (
      !open.classList.contains('hidden') &&
      closed.classList.contains('hidden')
    ) {
      return;
    }
    open.classList.remove('hidden');
    closed.classList.add('hidden');
    // open1.classList.remove('hidden');
    // closed1.classList.add('hidden');
  } else {
    if (
      !closed.classList.contains('hidden') &&
      open.classList.contains('hidden')
    ) {
      return;
    }
    closed.classList.remove('hidden');
    open.classList.add('hidden');
    // closed1.classList.remove('hidden');
    // open1.classList.add('hidden');
  }
}

function loadShopStatus() {
  reqListener();
}

loadShopStatus();
setInterval(loadShopStatus, 60000);

// VIEWPORT FIX FOR MOBILE

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
// let vh = window.innerHeight * 0.01;
let prevVh = window.innerHeight * 0.01;
let prevVw = window.innerWidth * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${prevVh}px`);

window.addEventListener('resize', () => {
  const currVw = window.innerWidth * 0.01;
  prevVh = window.innerHeight * 0.01;
  // console.log('curr = ', currVw);
  // console.log('prev = ', prevVw);
  if (currVw < prevVw) {
    document.documentElement.style.setProperty('--vh', `${prevVh}px`);
    prevVw = currVw;
    return;
  }
  if (window.innerWidth < 550 && window.innerHeight < 768) return;

  prevVh = window.innerHeight * 0.01;
  prevVw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${prevVh}px`);
});

//Social links animation

document.getElementById('social-ig').addEventListener('mouseover', mouseOver);
document.getElementById('social-ig').addEventListener('mouseout', mouseOut);

function mouseOver() {
  const FBblock = document.getElementById('social-fb');
  const FBInnerBlock = document.getElementById('social-fb-c');
  FBblock.style.width = getComputedStyle(FBblock).width;
  FBInnerBlock.style.width = getComputedStyle(FBInnerBlock).width;
}

function mouseOut() {
  const FBblock = document.getElementById('social-fb');
  const FBInnerBlock = document.getElementById('social-fb-c');
  FBblock.style.width = null;
  FBInnerBlock.style.width = null;
}

//FOOTER ANIMATIONS (COLLAPSE FOR SMALL SCREEN)

const checkSize = function () {
  const buttons = document.querySelectorAll('.footer__item__header__button');
  const checkbox = document.querySelectorAll('.footer__item__checkbox');
  if (window.innerWidth < 1030) {
    checkbox.forEach((item) => {
      item.checked = true;
      item.disabled = false;
      buttons.forEach((button) => {
        button.style.cursor = 'pointer';
      });
    });
  } else {
    checkbox.forEach((item) => {
      item.checked = false;
      item.disabled = true;
      buttons.forEach((button) => {
        button.style.cursor = 'unset';
      });
    });
    const x = document.querySelector('.footer__item__header__button');
    console.log(x);
  }
  if (window.innerWidth < 321) {
    document.querySelector('.copyright__address').innerHTML = '';
  } else if (window.innerWidth < 415) {
    document.querySelector('.copyright__address').innerHTML = '© VGKS, Lietuva';
  } else {
    document.querySelector('.copyright__address').innerHTML =
      '© Visagino Grožio Kūrėjų Studija, Lietuva';
  }
};

window.addEventListener('resize', () => {
  checkSize();
});

window.addEventListener('load', () => {
  checkSize();
});
