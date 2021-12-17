'use strict';

const FOOTER_COLLAPSE_WIDTH = 1030;
const footerBlock = document.querySelector('footer');

//SHOP STATUS (CLOSED / OPEN)

const loadShopOpeningTimeStatus = function () {
  let week;
  let hours;

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

  const closed = document.getElementById('closed');
  const open = document.getElementById('open');

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
  } else {
    if (
      !closed.classList.contains('hidden') &&
      open.classList.contains('hidden')
    ) {
      return;
    }
    closed.classList.remove('hidden');
    open.classList.add('hidden');
  }
};

//first time on load
loadShopOpeningTimeStatus();

//then every 60sec
setInterval(loadShopOpeningTimeStatus, 60000);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// VIEWPORT FIX FOR MOBILE

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FOOTER ANIMATIONS (COLLAPSE FOR SMALL SCREEN)
function checkSize() {
  if (window.innerWidth < 700 && window.innerWidth > 415) {
    document.querySelector('.copyright__address-text').innerHTML =
      ' © Visagino Grožio Kūrėjų Studija';
  } else if (window.innerWidth < 415 && window.innerWidth >= 321) {
    document.querySelector('.copyright__address-text').innerHTML =
      ' © VGKS, Lietuva';
  } else if (window.innerWidth < 321 && window.innerWidth > 280) {
    document.querySelector('.copyright__address-text').innerHTML = '';
  } else if (window.innerWidth < 281) {
    document.querySelector('.copyright__address-text').innerHTML = '';
  } else {
    document.querySelector('.copyright__address-text').innerHTML =
      ' © Visagino Grožio Kūrėjų Studija, Lietuva';
  }
}

let prevWidth = FOOTER_COLLAPSE_WIDTH;

window.addEventListener('visibilitychange', () => {});

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 450) {
    document.body.style.background = '#202020';
  } else {
    document.body.style.background = '#f4e4f0';
  }
});

window.addEventListener('load', () => {
  checkSize();
});

window.addEventListener('resize', () => {
  checkSize();
});
