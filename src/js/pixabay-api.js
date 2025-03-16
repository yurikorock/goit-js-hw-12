import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '49133693-4042ac5cb8c0a8ba13ba0f36c';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1; // початкова сторінка, перший запит

export async function getImages(query, page) {
  try {
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

    if (response.data.hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query.',
      });
    }

    return response.data.hits; // Отримані дані
  } catch (error) {
    console.error('Помилка:', error);
    return [];
  }
}
