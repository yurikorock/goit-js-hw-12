import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captions: false,
});

export function clearGallery() {
  gallery.innerHTML = ''; // Очищаємо галерею перед новим рендерингом
}

export function renderGallery(images) {
  clearGallery();

  const markup = images
    .map(image => {
      // отримали значення і робимо деструктурізацію по ключовим значенням
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<li class="gallery-item">
      <a href="${largeImageURL}" class="gallery-link">
            <img src="${webformatURL}" alt="${tags}" class="gallery-image" width="640" height="360" />
            </a>
            <div class="gallery-info">
	          <p class="gallery-info-name">likes<span class="galery-info-value">${image.likes}</span></p>
	          <p class="gallery-info-name">views<span class="galery-info-value">${image.views}</span></p>
	          <p class="gallery-info-name">comments<span class="galery-info-value">${image.comments}</span></p>
            <p class="gallery-info-name">downloads<span class="galery-info-value">${image.downloads}</span></p>
            </div>
        </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
