'use strict';

const FOOTER_COLLAPSE_WIDTH = 1030;

const pricelists = document.querySelectorAll('.pricelist__item');
const servicesBlock = document.querySelector('.services');
const shopBlock = document.querySelector('.shop');
const footerBlock = document.querySelector('footer');
const checkboxes = document.querySelectorAll('.footer__item__checkbox');
const services = document.querySelectorAll('.services__item');
const goTopBtn = document.getElementById('back-to-top');

//SHOP STATUS (CLOSED / OPEN)

window.onload = function () {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('body-container').classList.remove('transparent');
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      document.body.style.background = '#202020';
    } else {
      document.body.style.background = '#f4e4f0';
    }
  });

  // loadShop(
  //   'https://app.ecwid.com/script.js?69662574&data_platform=code',
  //   'text/javascript',
  //   false
  // );
  loadScript(
    undefined,
    'text/javascript',
    "xProductBrowser('id=my-store-69662574', 'defaultCategoryId=125065125');",
    'body',
    false
  );
  if (servicesBlock) {
    waitForElement('.ec-footer', 30000)
      .then(() => {
        const productImages = document.querySelectorAll('.grid-product__image');
        const productTitles = document.querySelectorAll('.grid-product__title');
        // productImages.href = '/shop.html' + productImages.href;
        let str = productImages.href;

        for (i = 0; i < featuredProductContainers.length; i++) {
          let str = productImages[i].href;
          str = str
            .substring(str.indexOf('/#!/') + 1)
            .split('category=')[0]
            .concat('category=0');
          productImages[i].href = '/shop.html' + str;

          featuredProductImgs[i].src = document.querySelectorAll(
            '.grid-product__picture'
          )[i].src;
          featuredProductImgs[i].classList.remove('img-loading');
          featuredProductContainers[i].href = productImages[i].href;
          featuredProductTitles[i].innerHTML = document.querySelectorAll(
            '.grid-product__title-inner'
          )[i].innerHTML;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  insertTrustpilot();
};

const loadScript = function (src, type, innerHtml, AttachTo, async) {
  const tag = document.createElement('script');
  if (src) tag.src = src;
  tag.type = type;
  tag.innerHTML = innerHtml;
  document.getElementsByTagName(AttachTo)[0].appendChild(tag);
  console.log(tag);
  if (async) tag.async = true;
};

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertTrustpilot() {
  loadScript(
    '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js',
    'text/javascript',
    '',
    'head',
    true
  );
  const el = document.createElement('span');
  el.innerHTML = `<div class="trustpilot-widget" data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="61bf4c3af08c2f3625d8cfeb" data-style-height="24px" data-style-width="100%" data-theme="light" data-stars="1,2,3,4,5" data-no-reviews="hide" data-scroll-to-list="true" data-allow-robots="true" data-min-review-count="10">
<a href="https://www.trustpilot.com/review/vgks.lt" target="_blank" rel="noopener">Trustpilot</a>
</div>`;
  const div = document.querySelector('.social-wall__header');
  insertAfter(div, el);
}

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

  const closed = document.querySelector('.closed');
  const open = document.querySelector('.open');

  const closedFooter = document.querySelector('.closed-footer');
  const openFooter = document.querySelector('.open-footer');

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
};

//first time on load
loadShopOpeningTimeStatus();
setInterval(loadShopOpeningTimeStatus, 60000);

//then every 60sec

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// VIEWPORT FIX FOR MOBILE

function isTouchDevice() {
  return window.ontouchstart !== undefined;
}

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

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let prevVh = window.innerHeight * 0.01;
let prevVw = window.innerWidth * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${prevVh}px`);

window.addEventListener('resize', () => {
  const currVw = window.innerWidth * 0.01;
  prevVh = window.innerHeight * 0.01;

  if (isTouchDevice()) {
    return;
  }

  if (currVw < prevVw) {
    document.documentElement.style.setProperty('--vh', `${prevVh}px`);
    prevVw = currVw;
    return;
  }

  // if (window.innerWidth < 650 && window.innerHeight < 1300) return;

  prevVh = window.innerHeight * 0.01;
  prevVw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${prevVh}px`);
});

//Social links animation

const socialIconsInst = [
  document.querySelector('.social-ig-1'), //1 is for footer
  document.querySelector('.social-ig-2'), //2 is for social media section
];

//make Facebook's social link stay expanded while hovered on Instagram's link
const socialsIconsFbWidthFix = function (elems) {
  elems.forEach((el) => {
    if (el) {
      el.addEventListener('mouseover', mouseOver);
      el.addEventListener('mouseout', mouseOut);
    }
  });
};

function mouseOver() {
  const id = this.classList[1].slice(-1);
  const FBblock = document.querySelector(`.social-fb-${id}`);
  const FBInnerBlock = document.querySelector(`.social-fb-c-${id}`);
  FBblock.style.width = getComputedStyle(FBblock).width;
  FBInnerBlock.style.width = getComputedStyle(FBInnerBlock).width;
}

function mouseOut() {
  const id = this.classList[1].slice(-1);
  const FBblock = document.querySelector(`.social-fb-${id}`);
  const FBInnerBlock = document.querySelector(`.social-fb-c-${id}`);
  FBblock.style.width = null;
  FBInnerBlock.style.width = null;
}

socialsIconsFbWidthFix(socialIconsInst);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  }
  if (window.innerWidth > FOOTER_COLLAPSE_WIDTH) {
    expandFooterItems();
    prevWidth = window.innerWidth;
  }

  if (window.innerWidth < 380) {
    document.getElementById('back-to-top').style.display = 'none';
  } else {
    document.getElementById('back-to-top').style.display = 'block';
  }

  if (window.innerWidth < 700 && window.innerWidth > 415) {
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite „VIP“ kortelę už 5€ viename iš mūsų salonų ir sutaupykite 5% kiekvieno vizito metu :)';
    document.querySelector('.copyright__address-text').innerHTML =
      ' © Visagino Grožio Kūrėjų Studija';
  } else if (window.innerWidth < 415 && window.innerWidth >= 321) {
    document.querySelector('.copyright__address-text').innerHTML =
      ' © VGKS, Lietuva';
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę už 5€ viename iš mūsų salonų ir gaukite 5% nuolaidą visoms paslaugoms!';
  } else if (window.innerWidth < 321 && window.innerWidth > 280) {
    document.querySelector('.js-popup__reservation-heading-4').innerHTML =
      'Skambinkite';
    document.querySelector('.js-popup__reservation-basic-text').innerHTML = '';
    document.querySelector('.copyright__address-text').innerHTML = '';
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę už 5€ viename iš mūsų salonų ir gaukite 5% visoms paslaugoms!';
  } else if (window.innerWidth < 281) {
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite kortelę tik už 5€ ir gaukite 5% visoms paslaugoms!';
    document.querySelector('.copyright__address-text').innerHTML = '';
  } else {
    document.querySelector('.copyright__address-text').innerHTML =
      ' © Visagino Grožio Kūrėjų Studija, Lietuva';
    document.querySelector('.js-popup__reservation-heading-4').innerHTML =
      'Skambinkite telefonu';
    document.querySelector('.js-popup__reservation-basic-text').innerHTML =
      'Netrukus paleisime';
    document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
      'Įsigykite „VIP“ kortelę tik už 5€ bet kuriame iš mūsų salonų ir sutaupykite 5% kiekvieno apsilankymo metu! :)';
  }
};
let prevWidth = FOOTER_COLLAPSE_WIDTH;

const adjustItemSizeOnResize = function () {
  setTimeout(() => {
    document.querySelectorAll('.js--fix-height').forEach((el) => {
      aspectRatioFixforIOS(el);
    });
    featuredProductImgContainers.forEach((productCont) => {
      aspectRatioFixforIOS(productCont);
    });

    pricelists.forEach((pricelist) => {
      getDymanicHeight(pricelist);
    });
  }, 500);

  document.querySelectorAll('.footer__item__content').forEach((el) => {
    getDymanicHeight(el);
  });
};
const header = document.querySelector('.header');
const headerAdjust = function () {
  if (!header) return;
  header.style.minHeight = `${
    getHeightOfChildren(header) -
    document.querySelector('.poster-container').clientHeight +
    document.querySelector('.poster').clientHeight +
    document.querySelector('.poster-2').clientHeight
  }px`;
};

window.addEventListener('load', () => {
  headerAdjust();
  checkSize();
  adjustItemSizeOnResize();
});

window.addEventListener('resize', () => {
  headerAdjust();
  checkSize();
  adjustItemSizeOnResize();
});

window.addEventListener('visibilitychange', () => {});

function backToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
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

document.querySelectorAll('.js--scroll-to-shop').forEach((el) => {
  el.addEventListener('click', function () {
    scrollToElem(shopBlock);
  });
});

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

const images = document.querySelectorAll('.img-loading');

const loadGallery = function (imgNode) {
  if (images.length == 0) return; //if not main page
  loadImage('/img/gallery/nails/1.jpg', 0);
  loadImage('/img/gallery/nails/2.jpg', 1);
  loadImage('/img/gallery/nails/3.jpg', 2);
  loadImage('/img/gallery/massage/1.jpg', 3);
  loadImage('/img/gallery/massage/2.jpg', 4);
  loadImage('/img/gallery/massage/3.jpg', 5);
  loadImage('/img/gallery/massage/4.jpg', 6);
  loadImage('/img/gallery/massage/5.jpg', 7);
  loadImage('/img/gallery/massage/6.jpg', 8);
  loadImage('/img/gallery/hair/1.jpg', 9);
  loadImage('/img/gallery/hair/2.jpg', 10);
  loadImage('/img/gallery/hair/3.jpg', 11);
  loadImage('/img/gallery/hair/4.jpg', 12);
  loadImage('/img/gallery/hair/5.jpg', 13);
  loadImage('/img/gallery/hair/6.jpg', 14);
  loadImage('/img/gallery/photo/1.jpg', 15);
  loadImage('/img/gallery/photo/2.jpg', 16);
  loadImage('/img/gallery/photo/3.jpg', 17);
  loadImage('/img/gallery/photo/4.jpg', 18);
  loadImage('/img/gallery/photo/5.jpg', 19);
  loadImage('/img/gallery/photo/6.jpg', 20);
  loadImage('/img/gallery/courses/1.jpg', 21);
  loadImage('/img/gallery/courses/2.jpg', 22);
  loadImage('/img/gallery/courses/3.jpg', 23);
  loadImage('/img/gallery/courses/4.jpg', 24);
  loadImage('/img/gallery/courses/5.jpg', 25);
  loadImage('/img/gallery/courses/6.jpg', 26);
  loadImage('/img/gallery/other/1.jpg', 27);
  loadImage('/img/gallery/other/2.jpg', 28);
  loadImage('/img/gallery/other/3.jpg', 29);
  loadImage('/img/gallery/other/4.jpg', 30);
  loadImage('/img/gallery/other/5.jpg', 31);
  loadImage('/img/gallery/other/6.jpg', 32);
};

const loadImage = function (imgLink, id) {
  const downloadingImg = new Image();
  downloadingImg.onload = function () {
    images[id].src = this.src;
    images[id].classList.remove('img-loading');
  };
  downloadingImg.src = imgLink;
};
checkSize();
loadGallery();

const form = document.getElementById('newsletter-form');

form.addEventListener('input', () => {
  if (document.getElementById('newsletter-form').value.length !== 0) {
    document.querySelector('.ml-form-recaptcha').classList.remove('hidden');
    getDymanicHeight(document.querySelectorAll('.footer__item__content')[3]);
    document.querySelector('.row-success').style.display = 'none';
  } else {
    document.querySelector('.ml-form-recaptcha').classList.add('hidden');
    getDymanicHeight(document.querySelectorAll('.footer__item__content')[3]);
    document.querySelector('.row-success').style.display = 'none';
    grecaptcha.reset();
  }
});

//target reassign
// let BtnClicked = false;
goTopBtn.addEventListener('click', () => {
  // BtnClicked = true;
  history.pushState('', '', window.location.pathname);
});

// window.addEventListener('scroll', function (ev) {
//   if (BtnClicked) {
//     return;
//   }
//   if (
//     window.innerHeight + window.pageYOffset >=
//     document.body.offsetHeight - footerBlock.clientHeight / 2
//   ) {
//     window.location.hash = '#contacts';
//   } else if (window.pageYOffset + 250 >= servicesBlock.scrollHeight) {
//     window.location.hash = '#services';
//   } else {
//     history.pushState('', '', window.location.pathname);
//   }
// });

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout
 */
function waitForElement(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;
    if (document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(() => {
      if (document.querySelectorAll(querySelector).length) {
        observer.disconnect();
        if (timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout)
      timer = setTimeout(() => {
        observer.disconnect();
        reject();
      }, timeout);
  });
}
const featuredProductImgs = document.querySelectorAll('.store-product-img');
const featuredProductTitles = document.querySelectorAll('.store-product-title');
const featuredProductImgContainers = document.querySelectorAll(
  '.store-product-img-container'
);
const featuredProductContainers =
  document.querySelectorAll('.featured-product');

// featuredProductImgs.forEach((img),()=> {

//   waitForElement(img, 30000)
//   .then(()

// });

document.querySelectorAll('.sidebar__link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.sidebar__checkbox').checked = false;
  });
});
