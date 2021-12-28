import PhotoSwipeLightbox from './photoswipe-lightbox.esm.min.js';

const options = {
  gallerySelector: '#my-gallery',
  childSelector: 'a',
  pswpModule: 'https://vgks.lt/vendors/photoswipe.esm.js',
};

const lightbox = new PhotoSwipeLightbox(options);
lightbox.init();
