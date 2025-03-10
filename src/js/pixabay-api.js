import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '49133693-4042ac5cb8c0a8ba13ba0f36c';
const BASE_URL = 'https://pixabay.com/api/';

export function getImages(query) {
  return axios
    .get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      return response.data.hits; // Отримані дані
    })
    .catch(error => {
      console.error('Помилка:', error);
      return [];
    });

  // return fetch(`${BASE_URL}?client_id=${API_KEY}`)
  //   .then(resp => {
  //     console.log(resp);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
}
