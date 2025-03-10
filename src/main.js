import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.input-form');
// const btnSearch = document.querySelector('.btn-submit');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', event => {
  // console.log('Button pressed');
  event.preventDefault();

  const inputValue = input.value.trim();
  // console.log(inputValue);

  if (inputValue === '') {
    iziToast.show({
      message: 'Поле не може бути порожнім. Введіть текст для пошуку...',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      position: 'topRight',
      class: 'custom-toast',
    });

    return;
  }
  loader.style.display = 'block';
  getImages(inputValue)
    .then(images => {
      if (images.length === 0) {
        gallery.innerHTML = ''; // Очищаємо галерею якщо масив пустий
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          backgroundColor: '#ef4040',
          position: 'topRight',
          class: 'custom-toast',
        });

        return;
      }
      renderGallery(images);
    })
    .catch(error => console.log(error))
    .finally(() => {
      loader.style.display = 'none';
    });

  form.reset();
});
