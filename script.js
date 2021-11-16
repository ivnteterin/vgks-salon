'use strict';

// kick off the polyfill!

const FOOTER_COLLAPSE_WIDTH = 1030;

//SHOP STATUS (CLOSED / OPEN)

const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};
// console.log(isTouchDevice());

const services = document.querySelectorAll('.services__item');

if (isTouchDevice()) {
  services.forEach((service) => {
    service.addEventListener('touchstart', function () {
      service.classList.remove('service-mobile-released');
      service.classList.remove('service-desktop');
      service.classList.add('service-mobile-pressed');
    });
    service.addEventListener('touchend', function () {
      service.classList.remove('service-mobile-pressed');
      service.classList.add('service-mobile-released');
    });
  });
} else {
  services.forEach((service) => {
    service.classList.remove('service-mobile-pressed');
    service.classList.remove('service-mobile-released');
    service.classList.add('service-desktop');
  });
}

// const servicesOnResize = function () {
//   if (isTouchDevice()) {
//     services.forEach((service) => {
//       service.classList.remove('service-desktop');
//       service.classList.add('service-mobile');
//     });
//   } else {
//     services.forEach((service) => {
//       service.classList.remove('service-mobile');
//       service.classList.add('service-desktop');
//     });
//   }
// };

// servicesOnResize();

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
  const closedFooter = document.getElementById('closed-footer');
  const open = document.getElementById('open');
  const openFooter = document.getElementById('open-footer');
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
    openFooter.classList.remove('hidden');
    closedFooter.classList.add('hidden');
  } else {
    if (
      !closed.classList.contains('hidden') &&
      open.classList.contains('hidden')
    ) {
      return;
    }
    closed.classList.remove('hidden');
    open.classList.add('hidden');
    closedFooter.classList.remove('hidden');
    openFooter.classList.add('hidden');
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

  const collapseForClick = function (btn) {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] !== btn) {
        checkboxes[i].checked = true;
      }
    }
  };
  // servicesOnResize();

  const collapseFooterItems = function () {
    checkboxes.forEach((item) => {
      item.checked = true;
      item.disabled = false;
      buttons.forEach((button) => {
        button.style.cursor = 'pointer';
        button.addEventListener('click', function () {
          collapseForClick(button);
        });
      });
    });
  };
  const expandFooterItems = function () {
    checkboxes.forEach((item) => {
      item.checked = false;
      item.disabled = true;
      buttons.forEach((button) => {
        button.style.cursor = 'unset';
        button.removeEventListener('click', collapseForClick);
      });
    });
  };

  if (
    window.innerWidth < prevWidth ||
    (window.innerWidth > prevWidth && window.innerWidth < FOOTER_COLLAPSE_WIDTH)
  ) {
    collapseFooterItems();
    prevWidth = window.innerWidth;
  }
  if (window.innerWidth > FOOTER_COLLAPSE_WIDTH) {
    expandFooterItems();
  }
  if (window.innerWidth < 700 && window.innerWidth > 415) {
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite „VIP“ kortelę už 5€ viename iš mūsų salonų ir sutaupykite 10% kiekvieno vizito metu :)';
  } else if (window.innerWidth < 415 && window.innerWidth >= 321) {
    document.querySelector('.copyright__address').innerHTML = '© VGKS, Lietuva';
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę tik už 5€ viename iš mūsų salonų ir sutaupykite 10%!';
  } else if (window.innerWidth < 321 && window.innerWidth > 280) {
    document.querySelector('.js-popup__reservation-heading-4').innerHTML =
      'Skambinkite';
    document.querySelector('.js-popup__reservation-basic-text').innerHTML = '';
    document.querySelector('.copyright__address').innerHTML = '';
  } else if (window.innerWidth < 281) {
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę<br>tik už 5€ ir sutaupykite 10%!';
    document.querySelector('.copyright__address').innerHTML = '';
  } else {
    document.querySelector('.copyright__address').innerHTML =
      '© Visagino Grožio Kūrėjų Studija, Lietuva';
    document.querySelector('.js-popup__reservation-heading-4').innerHTML =
      'Skambinkite telefonu';
    document.querySelector('.js-popup__reservation-basic-text').innerHTML =
      'Rezervacija internetu netrukus paleisime';
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite „VIP“ kortelę tik už 5€ bet kuriame iš mūsų salonų ir sutaupykite 10% kiekvieno apsilankymo metu! :)';
  }
};
let prevWidth = FOOTER_COLLAPSE_WIDTH;

window.addEventListener('load', () => {
  checkSize();
});
window.addEventListener('resize', () => {
  checkSize();
});

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 450) {
    document.body.style.background = '#202020';
  } else {
    document.body.style.background = '#f4e4f0';
  }
});

const pricelists = document.querySelectorAll('.pricelist__item');
const servicesBlock = document.querySelector('.services');
const footerBlock = document.querySelector('.footer');
const checkboxes = document.querySelectorAll('.footer__item__checkbox');

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

const scrollTo = function (el) {
  window.scrollTo({
    top: getOffset(el).top - parseInt(window.innerHeight * 0.1, 10),
    left: 0,
    behavior: 'smooth',
  });
};

services[0].addEventListener('click', function () {
  if (pricelists[0].classList.contains('pricelist__hidden')) {
    pricelists[0].classList.remove('pricelist__hidden');
    if (window.innerWidth > 464) {
      scrollTo(pricelists[0]);
    }
  } else {
    pricelists[0].classList.add('pricelist__hidden');
  }
});

// services.forEach(service => {

// })

document.querySelectorAll('.js--scroll-to-services').forEach((el) => {
  el.addEventListener('click', function () {
    scrollTo(servicesBlock);
  });
});
document.querySelectorAll('.js--scroll-to-contacts').forEach((el) => {
  el.addEventListener('click', function () {
    scrollTo(footerBlock);
    checkboxes[1].checked = false;
  });
});
