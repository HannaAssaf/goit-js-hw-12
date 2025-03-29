import axios from 'axios';

const KEY = '49529656-94d7c85de64fba179c64deed7';
const URL = 'https://pixabay.com/api/';

export function showImg(query) {
  const params = {
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  };

  return axios.get(URL, { params }).then(response => response.data.hits);
}
