// var openPhotoSwipe = function () {
//   var pswpElement = document.querySelectorAll('.pswp')[0];

//   // build items array
//   var items = [
//     {
//       src: '/img/gallery/nail-1.jpg',
//       w: 1877,
//       h: 1250,
//     },
//     {
//       src: '/img/gallery/nail-2.jpg',
//       w: 1000,
//       h: 1250,
//     },
//     {
//       src: '/img/gallery/nail-3.jpg',
//       w: 1000,
//       h: 1250,
//     },
//   ];

//   // define options (if needed)
//   var options = {
//     // history & focus options are disabled on CodePen
//     history: false,
//     focus: false,

//     showAnimationDuration: 0,
//     hideAnimationDuration: 0,
//   };

//   var gallery = new PhotoSwipe(
//     pswpElement,
//     PhotoSwipeUI_Default,
//     items,
//     options
//   );
//   gallery.init();
// };

// openPhotoSwipe();

// document.querySelector('.gallery__item').onclick = openPhotoSwipe;
import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js';

const options = {
  gallerySelector: '#my-gallery',
  childSelector: 'a',
  pswpModule: './photoswipe.esm.js',
};

const lightbox = new PhotoSwipeLightbox(options);
lightbox.init();
