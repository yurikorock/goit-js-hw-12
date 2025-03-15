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
btnLoadMore.addEventListener('click', onLoadMore);

let searchQuery = '';

form.addEventListener('submit', async event => {
  // console.log('Button pressed');
  event.preventDefault();
  btnLoadMore.classList.add('is-hidden');
  searchQuery = input.value.trim();

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

  loader.style.display = 'block';
  clearGallery(); //очищаємо галерею перед новим пошуком
  try {
    const images = await getImages(searchQuery);
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

    btnLoadMore.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }

  form.reset();
});

async function onLoadMore() {
  loader.style.display = 'block';
  try {
    const images = await getImages(searchQuery);
    if (images.length === 0) {
      btnLoadMore.classList.remove('is-hidden');
      return;
    }
    renderGallery(images);
    scrollPageAfterLoad(); // функція яка буде скролити галерею при
    //нажатті кнопки завантажити ще

    if (images.length < 15) {
      btnLoadMore.classList.add('is-hidden');
      return;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
}

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
