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

function runOnStart() {
	document.querySelector('.loader').style.display = 'none';
	document.getElementById('body-container').classList.remove('transparent');
	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 300) {
			document.body.style.background = '#202020';
		} else {
			document.body.style.background = '#f4e4f0';
		}
	});

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

					featuredProductImgs[i].src = document.querySelectorAll('.grid-product__picture')[i].src;
					featuredProductImgs[i].classList.remove('img-loading');
					featuredProductContainers[i].href = productImages[i].href;
					featuredProductTitles[i].innerHTML = document.querySelectorAll('.grid-product__title-inner')[i].innerHTML;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
if (document.readyState !== 'loading') {
	runOnStart();
} else {
	document.addEventListener('DOMContentLoaded', () => {
		runOnStart();
	});
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

	if ((week !== 0 && week < 7 && hours < 18 && hours >= 9) || (week === 0 && hours < 16 && hours >= 10)) {
		if (!open.classList.contains('hidden') && closed.classList.contains('hidden')) {
			return;
		}
		open.classList.remove('hidden');
		closed.classList.add('hidden');
		openFooter.classList.remove('hidden');
		closedFooter.classList.add('hidden');
	} else {
		if (!closed.classList.contains('hidden') && open.classList.contains('hidden')) {
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
//then every 60sec
setInterval(loadShopOpeningTimeStatus, 60000);

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

services.forEach((service) => {
	service.addEventListener('click', function () {
		loadGallery(this.id);
	});
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

	if (window.innerWidth < prevWidth || (window.innerWidth > prevWidth && window.innerWidth < FOOTER_COLLAPSE_WIDTH)) {
		collapseFooterItems();
		prevWidth = window.innerWidth;
	}
	if (window.innerWidth > FOOTER_COLLAPSE_WIDTH) {
		expandFooterItems();
		prevWidth = window.innerWidth;
	}

	// if (window.innerWidth < 380) {
	//   document.getElementById('back-to-top').style.display = 'none';
	// } else {
	//   document.getElementById('back-to-top').style.display = 'block';
	// }

	if (window.innerWidth < 700 && window.innerWidth > 415) {
		document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
			'Įsigykite „VIP“ kortelę už 5€ viename iš mūsų salonų ir sutaupykite 5% kiekvieno vizito metu :)';
		document.querySelector('.copyright__address-text').innerHTML = ' © Visagino Grožio Kūrėjų Studija';
	} else if (window.innerWidth < 415 && window.innerWidth >= 321) {
		document.querySelector('.copyright__address-text').innerHTML = ' © VGKS, Lietuva';
		document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
			'Įsigykite kortelę už 5€ viename iš mūsų salonų ir gaukite 5% nuolaidą visoms paslaugoms!';
	} else if (window.innerWidth < 321 && window.innerWidth > 280) {
		document.querySelector('.js-popup__reservation-heading-4').innerHTML = 'Skambinkite';
		document.querySelector('.js-popup__reservation-basic-text').innerHTML = '';
		document.querySelector('.copyright__address-text').innerHTML = '';
		document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
			'Įsigykite kortelę už 5€ viename iš mūsų salonų ir gaukite 5% visoms paslaugoms!';
	} else if (window.innerWidth < 281) {
		document.querySelector('.js-popup__vipcard-heading-4').innerHTML =
			'Įsigykite kortelę tik už 5€ ir gaukite 5% visoms paslaugoms!';
		document.querySelector('.copyright__address-text').innerHTML = '';
	} else {
		document.querySelector('.copyright__address-text').innerHTML = ' © Visagino Grožio Kūrėjų Studija, Lietuva';
		document.querySelector('.js-popup__reservation-heading-4').innerHTML = 'Skambinkite telefonu';
		document.querySelector('.js-popup__reservation-basic-text').innerHTML = 'Netrukus paleisime';
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
		let preloadedHeight = document.body.clientHeight;
		scrollToElem(footerBlock);
		setTimeout(() => {
			const loadedHeight = document.body.clientHeight;
			if (preloadedHeight + 50 < loadedHeight) {
				scrollToElem(footerBlock);
				preloadedHeight = loadedHeight;
				clearTimeout();
				return;
			}
		}, 1000);
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
			heightOfParent + el.getBoundingClientRect().height + parseFloat(style.marginBottom) + parseFloat(style.marginTop);
	});

	return heightOfParent;
};

const aspectRatioFixforIOS = function (el) {
	el.style.height = `${el.getBoundingClientRect().width}px`;
};

const imagesLoading = document.querySelectorAll('.img-loading');
const imagesGallery = document.querySelectorAll('.img-gallery');

const loadGallery = async function (service) {
	if (imagesGallery.length == 0) return; //if not main page
	try {
		if (service === 'nails') {
			await loadImage('/img/gallery/nails/1.jpg').then((image) => {
				drawImage(image, 0);
			});
			await loadImage('/img/gallery/nails/2.jpg').then((image) => {
				drawImage(image, 1);
			});
			await loadImage('/img/gallery/nails/3.jpg').then((image) => {
				drawImage(image, 2);
			});
		}
		if (service === 'massage') {
			await loadImage('/img/gallery/massage/1.jpg').then((image) => drawImage(image, 3));
			await loadImage('/img/gallery/massage/2.jpg').then((image) => drawImage(image, 4));
			await loadImage('/img/gallery/massage/3.jpg').then((image) => drawImage(image, 5));
			await loadImage('/img/gallery/massage/4.jpg').then((image) => drawImage(image, 6));
			await loadImage('/img/gallery/massage/5.jpg').then((image) => drawImage(image, 7));
			await loadImage('/img/gallery/massage/6.jpg').then((image) => drawImage(image, 8));
		}
		if (service === 'hair') {
			await loadImage('/img/gallery/hair/1.jpg').then((image) => drawImage(image, 9));
			await loadImage('/img/gallery/hair/2.jpg').then((image) => drawImage(image, 10));
			await loadImage('/img/gallery/hair/3.jpg').then((image) => drawImage(image, 11));
			await loadImage('/img/gallery/hair/4.jpg').then((image) => drawImage(image, 12));
			await loadImage('/img/gallery/hair/5.jpg').then((image) => drawImage(image, 13));
			await loadImage('/img/gallery/hair/6.jpg').then((image) => drawImage(image, 14));
		}
		if (service === 'photo') {
			await loadImage('/img/gallery/photo/1.jpg').then((image) => drawImage(image, 15));
			await loadImage('/img/gallery/photo/2.jpg').then((image) => drawImage(image, 16));
			await loadImage('/img/gallery/photo/3.jpg').then((image) => drawImage(image, 17));
			await loadImage('/img/gallery/photo/4.jpg').then((image) => drawImage(image, 18));
			await loadImage('/img/gallery/photo/5.jpg').then((image) => drawImage(image, 19));
			await loadImage('/img/gallery/photo/6.jpg').then((image) => drawImage(image, 20));
		}
		if (service === 'courses') {
			await loadImage('/img/gallery/courses/1.jpg').then((image) => drawImage(image, 21));
			await loadImage('/img/gallery/courses/2.jpg').then((image) => drawImage(image, 22));
			await loadImage('/img/gallery/courses/3.jpg').then((image) => drawImage(image, 23));
			await loadImage('/img/gallery/courses/4.jpg').then((image) => drawImage(image, 24));
			await loadImage('/img/gallery/courses/5.jpg').then((image) => drawImage(image, 25));
			await loadImage('/img/gallery/courses/6.jpg').then((image) => drawImage(image, 26));
		}
		if (service === 'other') {
			await loadImage('/img/gallery/other/1.jpg').then((image) => drawImage(image, 27));
			await loadImage('/img/gallery/other/2.jpg').then((image) => drawImage(image, 28));
			await loadImage('/img/gallery/other/3.jpg').then((image) => drawImage(image, 29));
			await loadImage('/img/gallery/other/4.jpg').then((image) => drawImage(image, 30));
			await loadImage('/img/gallery/other/5.jpg').then((image) => drawImage(image, 31));
			loadImage('/img/gallery/other/6.jpg').then((image) => drawImage(image, 32));
		}
	} catch (err) {
		console.log(err);
	}
};

const loadImage = (imgLink) =>
	new Promise((resolve, reject) => {
		const downloadingImg = new Image();
		downloadingImg.addEventListener('load', () => {
			resolve(downloadingImg);
		});
		downloadingImg.src = imgLink;
		downloadingImg.addEventListener('error', (err) => reject(err));
	});

const drawImage = (image, id) => {
	imagesGallery[id].src = image.src;
	imagesLoading[id].style.display = 'none';
	imagesLoading[id].style.opacity = '0';
	imagesGallery[id].style.display = 'block';
};

const form = document.querySelector('.js--newsletter-form');

form.addEventListener('input', () => {
	if (form.value.length !== 0) {
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
const featuredProductImgContainers = document.querySelectorAll('.store-product-img-container');
const featuredProductContainers = document.querySelectorAll('.featured-product');

document.querySelectorAll('.sidebar__link').forEach((link) => {
	link.addEventListener('click', () => {
		document.querySelector('.sidebar__checkbox').checked = false;
	});
});

function changeLanguage() {
	var selectedLanguage = document.getElementById('languageSelector').value;

	// Select all elements with the specified class
	var elements = document.querySelectorAll('.lt-content, .ru-content, .en-content');

	// Loop through the selected elements and update their content or style
	elements.forEach(function (element) {
		if (selectedLanguage === 'lt') {
			element.style.display = element.classList.contains('lt-content')
				? element.removeAttribute('style')
				: (element.style.display = 'none');
		} else if (selectedLanguage === 'ru') {
			element.style.display = element.classList.contains('ru-content')
				? element.removeAttribute('style')
				: (element.style.display = 'none');
		} else if (selectedLanguage === 'en') {
			element.style.display = element.classList.contains('en-content')
				? element.removeAttribute('style')
				: (element.style.display = 'none');
		}
	});
}

changeLanguage();
