import PhotoSwipeLightbox from './photoswipe-lightbox.esm.min.js';

const options = {
  gallerySelector: '#my-gallery',
  childSelector: 'a',
  pswpModule:
    'https://raw.githack.com/dimsemenov/PhotoSwipe/v5-beta/dist/photoswipe.esm.js',
};

const lightbox = new PhotoSwipeLightbox(options);
lightbox.init();
