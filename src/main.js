import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showImg } from './js/pixabay-api.js';
import { clearGallery, createElement } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    clearGallery();
    iziToast.show({
      message: 'Please enter a search query.',
      messageColor: '#FFFFFF',
      position: 'topRight',
      color: '#ef4040',
      timeout: 3000,
      iconUrl: './img/bi_x-octagon.svg',
    });
    return;
  }

  clearGallery();
  loader.classList.remove('hidden');

  showImg(query)
    .then(hits => {
      if (hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FFFFFF',
          position: 'topRight',
          color: '#ef4040',
          timeout: 3000,
          iconUrl: './img/bi_x-octagon.svg',
        });
      } else {
        createElement(hits);
      }
    })
    .catch(error => {
      iziToast.show({
        title: 'Error',
        message: error.message || 'An unexpected error occurred',
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        timeout: 3000,
        iconUrl: './img/bi_x-octagon.svg',
      });
    })
    .finally(() => {
      loader.classList.add('hidden');
      form.reset();
    });
});
