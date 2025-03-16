import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.input-form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.btn-load-more');

//додаємо слухач на кнопку для завантаження зображень (додати більше)
// btnLoadMore.addEventListener('click', onLoadMore);

let searchQuery = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  // console.log('Button pressed');
  event.preventDefault();
  searchQuery = input.value.trim();
  page = 1;

  if (searchQuery === '') {
    iziToast.show({
      message: 'Поле не може бути порожнім. Введіть текст для пошуку...',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      position: 'topRight',
      class: 'custom-toast',
    });

    return;
  }

  btnLoadMore.classList.add('is-hidden');
  loader.style.display = 'block';
  clearGallery(); //очищаємо галерею перед новим пошуком

  try {
    const images = await getImages(searchQuery, page);
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
    if (images.length === perPage) {
      btnLoadMore.classList.remove('is-hidden'); // якщо ще є зображення
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }

  form.reset();
});

btnLoadMore.addEventListener('click', async () => {
  loader.style.display = 'block';
  page++;

  try {
    const images = await getImages(searchQuery, page);
    if (images.length === 0) {
      btnLoadMore.classList.add('is-hidden');
      return;
    }

    renderGallery(images);
    scrollPageAfterLoad(); // Плавна прокрутка після завантаження

    if (images.length < perPage) {
      btnLoadMore.classList.add('is-hidden'); // ховаємо кнопку, якщо вже немає зображень
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
  }
});

function scrollPageAfterLoad() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    //беремо останній елемент
    const lastItem = galleryItems[galleryItems.length - 1];
    //висота однієї карточки галереї
    const itemHeight = lastItem.getBoundingClientRect().height;
    // плавна прокрутка
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
