import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY = '29871741-92f0be7d75d630b941b41d19d';
const BASIC_URL = `https://pixabay.com/api/?key=${KEY}&q=`;
let page = 1;

async function fetchGallery(e) {
    const response = await axios.get(`${BASIC_URL}${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    const gallery = await response.data;
    if (e === '') {
      return  Notify.info('Enter text!');
    }
    return gallery;
  }
  
export { fetchGallery };