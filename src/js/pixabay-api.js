import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '49133693-4042ac5cb8c0a8ba13ba0f36c';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImages(query) {
  try {
    const response = await axios.get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

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
