import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showImg } from './js/pixabay-api.js';
import {
  clearGallery,
  createElement,
  appendElements,
} from './js/render-functions.js';
import iconError from './img/bi_x-octagon.svg';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
const perPage = 15;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = input.value.trim();

  if (!query) {
    clearGallery();
    iziToast.show({
      message: 'Please enter a search query.',
      messageColor: '#FFFFFF',
      position: 'topRight',
      color: '#ef4040',
      timeout: 3000,
      iconUrl: iconError,
    });
    return;
  }

  page = 1;
  clearGallery();
  loader.classList.remove('hidden');
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await showImg(query, page, perPage);
    const { hits, totalHits } = data;

    if (hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        timeout: 3000,
        iconUrl: iconError,
      });
    } else {
      createElement(hits);
      if (page * perPage < totalHits) {
        loadMoreBtn.classList.remove('hidden');
      } else {
        loadMoreBtn.classList.add('hidden');
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results",
          messageColor: '#FFFFFF',
          position: 'topRight',
          color: '#ef4040',
          timeout: 3000,
          iconUrl: iconError,
        });
      }
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: error.message || 'An unexpected error occurred',
      messageColor: '#FFFFFF',
      position: 'topRight',
      color: '#ef4040',
      timeout: 3000,
      iconUrl: iconError,
    });
  } finally {
    loader.classList.add('hidden');
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  try {
    page += 1;
    const data = await showImg(query, page, perPage);
    const { hits, totalHits } = data;
    appendElements(hits);

    const cardHeight = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * perPage < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results",
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        timeout: 3000,
        iconUrl: iconError,
      });
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: error.message || 'An unexpected error occurred',
      messageColor: '#FFFFFF',
      position: 'topRight',
      color: '#ef4040',
      timeout: 3000,
      iconUrl: iconError,
    });
  } finally {
    loader.classList.add('hidden');
  }
});
