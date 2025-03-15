import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '49133693-4042ac5cb8c0a8ba13ba0f36c';
const BASE_URL = 'https://pixabay.com/api/';

const btnLoadMore = document.querySelector('.btn-load-more');

let page = 1; // початкова сторінка, перший запит
let prevQuery = ''; // попередній запит
let limit = 15; //кількість елементів у групі
// Загальна кількість сторінок у колекції
const totalPages = Math.ceil(500 / limit);

export async function getImages(query) {
  //Перевірка перед новим запитом
  if (page > totalPages) {
    btnLoadMore.classList.add('is-hidden');
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  try {
    //перевіряємо чи новий запит збігається з попереднім
    if (query !== prevQuery) {
      page = 1;
      prevQuery = query;
    }

    const response = await axios.get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page, //поточна сторінка
        per_page: 15, //кількість зображень на сторінку
      },
    });

    page++; //збільшуємо на наступну сторінку при успішному наступного запиті

    return response.data.hits; // Отримані дані
  } catch (error) {
    console.error('Помилка:', error);
    return [];
  }
}
