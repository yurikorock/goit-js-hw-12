import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '49133693-4042ac5cb8c0a8ba13ba0f36c';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1; // початкова сторінка, перший запит
let prevQuery = ''; // попередній запит

export async function getImages(query) {
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
// code before refactoring

// export function getImages(query) {
//   return axios
//     .get('/', {
//       params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//       },
//     })
//     .then(response => {
//       return response.data.hits; // Отримані дані
//     })
//     .catch(error => {
//       console.error('Помилка:', error);
//       return [];
//     });
// }
