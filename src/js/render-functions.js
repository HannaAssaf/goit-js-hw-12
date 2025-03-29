import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createTextBlockHTML(label, value) {
  return `
    <li class="text-li">
      <h3 class="title">${label}</h3>
      <p class="text">${value}</p>
    </li>
  `;
}

export function createElement(hits) {
  const gallery = document.querySelector('.gallery');
  const markup = hits
    .map(hit => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${hit.largeImageURL}">
            <img class="gallery-image" src="${hit.webformatURL}" alt="${
        hit.tags
      }" />
          </a>
          <ul class="text-ul">
            ${createTextBlockHTML('Likes', hit.likes)}
            ${createTextBlockHTML('Views', hit.views)}
            ${createTextBlockHTML('Comments', hit.comments)}
            ${createTextBlockHTML('Downloads', hit.downloads)}
          </ul>
        </li>
      `;
    })
    .join('');
  gallery.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
