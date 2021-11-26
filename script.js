'use strict';

// kick off the polyfill!

const FOOTER_COLLAPSE_WIDTH = 1030;
const pricelists = document.querySelectorAll('.pricelist__item');
const servicesBlock = document.querySelector('.services');
const footerBlock = document.querySelector('footer');
const checkboxes = document.querySelectorAll('.footer__item__checkbox');

//SHOP STATUS (CLOSED / OPEN)

function isTouchDevice() {
  return window.ontouchstart !== undefined;
}

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

// document.getElementById('social-ig').addEventListener('mouseover', mouseOver);
// document.getElementById('social-ig').addEventListener('mouseout', mouseOut);

const socialIconsInst = [
  document.getElementById('social-ig-1'), //1 is for footer
  document.getElementById('social-ig-2'), //2 is for social media section
  // document.getElementById('social-ig-3'), //2 is for social media section
];

const socialsIconsFbWidthFix = function (elems) {
  elems.forEach((el) => {
    el.addEventListener('mouseover', mouseOver);
    el.addEventListener('mouseout', mouseOut);
  });
};

function mouseOver() {
  const id = this.id.slice(-1);
  const FBblock = document.getElementById(`social-fb-${id}`);
  const FBInnerBlock = document.getElementById(`social-fb-c-${id}`);
  FBblock.style.width = getComputedStyle(FBblock).width;
  FBInnerBlock.style.width = getComputedStyle(FBInnerBlock).width;
}

function mouseOut() {
  const id = this.id.slice(-1);
  const FBblock = document.getElementById(`social-fb-${id}`);
  const FBInnerBlock = document.getElementById(`social-fb-c-${id}`);
  FBblock.style.width = null;
  FBInnerBlock.style.width = null;
}

socialsIconsFbWidthFix(socialIconsInst);
//FOOTER ANIMATIONS (COLLAPSE FOR SMALL SCREEN)

const checkSize = function () {
  const buttons = document.querySelectorAll('.footer__item__header__button');

  const collapseOtherFooterItemsWhenClick = function (btn) {
    const currCheckbox = document.getElementById(`${btn.htmlFor}`);
    const collapseOtherFooterItems = function () {
      if (currCheckbox.disabled) return;
      checkboxes.forEach((checkbox) => {
        if (checkbox !== currCheckbox) {
          checkbox.checked = true;
        }
      });
    };
    btn.addEventListener('click', collapseOtherFooterItems);
  };

  const collapseFooterItems = function () {
    checkboxes.forEach((item) => {
      item.checked = true;
      item.disabled = false;
      buttons.forEach((button) => {
        button.style.cursor = 'pointer';
        collapseOtherFooterItemsWhenClick(button);
      });
    });
  };
  const expandFooterItems = function () {
    checkboxes.forEach((item) => {
      item.checked = false;
      item.disabled = true;
      buttons.forEach((button) => {
        button.style.cursor = 'unset';
      });
    });
  };

  if (
    window.innerWidth < prevWidth ||
    (window.innerWidth > prevWidth && window.innerWidth < FOOTER_COLLAPSE_WIDTH)
  ) {
    collapseFooterItems();
    prevWidth = window.innerWidth;
    console.log('prevWidth to collapse: ', prevWidth);
  }
  if (window.innerWidth > FOOTER_COLLAPSE_WIDTH) {
    expandFooterItems();
    prevWidth = window.innerWidth;
    console.log('prevWidth to expand: ', prevWidth);
  }

  if (window.innerWidth < 380) {
    document.getElementById('back-to-top').style.display = 'none';
  } else {
    document.getElementById('back-to-top').style.display = 'block';
  }

  if (window.innerWidth < 700 && window.innerWidth > 415) {
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite „VIP“ kortelę už 5€ viename iš mūsų salonų ir sutaupykite 10% kiekvieno vizito metu :)';
    document.querySelector('.copyright__address-text').innerHTML =
      ' © Visagino Grožio Kūrėjų Studija';
  } else if (window.innerWidth < 415 && window.innerWidth >= 321) {
    document.querySelector('.copyright__address-text').innerHTML =
      ' © VGKS, Lietuva';
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę už 5€ viename iš mūsų salonų ir gaukite 10% nuolaidą visoms paslaugoms!';
  } else if (window.innerWidth < 321 && window.innerWidth > 280) {
    document.querySelector('.js-popup__reservation-heading-4').innerHTML =
      'Skambinkite';
    document.querySelector('.js-popup__reservation-basic-text').innerHTML = '';
    document.querySelector('.copyright__address-text').innerHTML = '';
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę už 5€ viename iš mūsų salonų ir gaukite 10% visoms paslaugoms!';
  } else if (window.innerWidth < 281) {
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę tik už 5€ ir gaukite 10% visoms paslaugoms!';
    document.querySelector('.copyright__address-text').innerHTML = '';
  } else {
    document.querySelector('.copyright__address-text').innerHTML =
      ' © Visagino Grožio Kūrėjų Studija, Lietuva';
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
  document.querySelectorAll('.js--fix-height').forEach((el) => {
    aspectRatioFixforIOS(el);
  });
  document.querySelectorAll('.gallery__img').forEach((el) => {
    aspectRatioFixforIOS(el);
  });

  pricelists.forEach((pricelist) => {
    getDymanicHeight(pricelist);
  });

  document.querySelectorAll('.footer__item__content').forEach((el) => {
    getDymanicHeight(el);
  });
});

window.addEventListener('resize', () => {
  checkSize();
  setTimeout(() => {
    document.querySelectorAll('.js--fix-height').forEach((el) => {
      aspectRatioFixforIOS(el);
    });
    document.querySelectorAll('.gallery__img').forEach((el) => {
      aspectRatioFixforIOS(el);
    });
    pricelists.forEach((pricelist) => {
      getDymanicHeight(pricelist);
    });
  }, 500);

  document.querySelectorAll('.footer__item__content').forEach((el) => {
    getDymanicHeight(el);
  });
  console.log('CHANGE!');
});

window.addEventListener('visibilitychange', () => {});

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 450) {
    document.body.style.background = '#202020';
  } else {
    document.body.style.background = '#f4e4f0';
  }
});

function backToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
const goTopBtn = document.getElementById('back-to-top');
goTopBtn.addEventListener('click', backToTop);

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

const scrollToElem = function (el) {
  window.scrollTo({
    top: getOffset(el).top,
    left: 0,
    behavior: 'smooth',
  });
};

const scrollToPrice = function (el) {
  window.scrollTo({
    top: getOffset(el).top + el.getBoundingClientRect().height,
    left: 0,
    behavior: 'smooth',
  });
};

for (let i = 0; i < services.length; i++) {
  services[i].addEventListener('click', function () {
    if (pricelists[i].classList.contains('pricelist__hidden')) {
      if (window.innerWidth > 464) {
        pricelists.forEach((pricelist) => {
          pricelist.classList.add('pricelist__hidden');
        });
      }
      pricelists[i].classList.remove('pricelist__hidden');

      setTimeout(() => {
        if (window.innerWidth > 464) {
          window.scrollTo({
            top:
              getOffset(document.getElementById('other')).top +
              document.getElementById('other').getBoundingClientRect().height -
              40,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          // scrollToPrice(services[i]);
        }
      }, 250);
    } else {
      pricelists[i].classList.add('pricelist__hidden');
    }
  });
}

document.querySelectorAll('.js--scroll-to-services').forEach((el) => {
  el.addEventListener('click', function () {
    scrollToElem(servicesBlock);
  });
});
document.querySelectorAll('.js--scroll-to-contacts').forEach((el) => {
  el.addEventListener('click', function () {
    scrollToElem(footerBlock);
    checkboxes[1].checked = false;
  });
});

// $('.js--scroll-to-contacts').on('click', function (event) {
//   event.preventDefault();
//   $('html, body')
//     .stop()
//     .animate({ scrollTop: $(document).height() }, 'slow');
// });

// $('.to-top').on('click', function (event) {
//   event.preventDefault();
//   $('html, body')
//     .stop()
//     .animate({ scrollTop: $('body') }, 'slow');
// });

const getDymanicHeight = function (el) {
  el.style.height = `${getHeightOfChildren(el)}px`;
};

const getHeightOfChildren = function (el) {
  const children = Array.from(el.children);
  let heightOfParent = 0;

  children.forEach((el) => {
    const style = window.getComputedStyle(el);
    heightOfParent =
      heightOfParent +
      el.getBoundingClientRect().height +
      parseFloat(style.marginBottom) +
      parseFloat(style.marginTop);
  });

  return heightOfParent;
};

const aspectRatioFixforIOS = function (el) {
  el.style.height = `${el.getBoundingClientRect().width}px`;
};
