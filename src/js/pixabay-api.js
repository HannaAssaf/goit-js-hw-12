import axios from 'axios';

const KEY = '49529656-94d7c85de64fba179c64deed7';
const URL = 'https://pixabay.com/api/';

export async function showImg(query, page = 1, per_page = 15) {
  const params = {
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
  };

  const response = await axios.get(URL, { params });
  return response.data;
}
