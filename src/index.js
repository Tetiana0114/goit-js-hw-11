import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { makeGalleryPhotoCardMarkup } from './js/createPhotoCardMarkup';
import { smoothPageScrolling } from './js/smoothPageScrolling';
import getRefs from './js/getRefs';

const KEY = '29871741-92f0be7d75d630b941b41d19d';
const BASIC_URL = `https://pixabay.com/api/?key=${KEY}&q=`;
const searchFields = `&image_type=photo&orientation=horizontal&safesearch=true`;
let page = 1;
let perPage = 40;

async function fetchGallery(request) {
  const response = await axios.get(`${BASIC_URL}${request}${searchFields}&page=${page}&per_page=${perPage}`);
  const searchInfo = await response.data;
  if (request.trim() === '') {
    return;
  }
  return searchInfo;
}

const refs = getRefs();

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
let searchQuery = '';

updateLoadBtnClassList('is-hidden', 'is-visible');

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadBtn.addEventListener('click', onLoadBtnClick);

function resetGallery() {
    refs.galleryEl.innerHTML = '';
}

function buildGalleryOnPage(e) {
  const galleryPhoto = makeGalleryPhotoCardMarkup(e);
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryPhoto)
}

function onFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.searchQuery.value;
  if (!searchQuery) {
      resetGallery();
      updateLoadBtnClassList('is-hidden', 'is-visible');
  }
  getNotificationOnPage(searchQuery);
}

function onLoadBtnClick() {
  fetchGallery(searchQuery)
  .then(element => {
    buildGalleryOnPage(element);
    smoothPageScrolling();
    lightboxGallery.refresh();
    page += 1;
    if (page > (element.totalHits / perPage)) {
      Notify.failure(`We're sorry, but you've reached the end of search results.`);
      updateLoadBtnClassList('is-hidden', 'is-visible');
    } 
  })
  .catch(error => console.log(error));
}

async function getNotificationOnPage(searchQuery) {
  try {
    const element = await fetchGallery(searchQuery);
    const markup = await buildGalleryOnPage(element);
    if (element.totalHits > 0) {
      Notify.success(`Hooray! We found ${element.totalHits} images!`);
      updateLoadBtnClassList('is-visible', 'is-hidden');
    } else {
      Notify.failure('Sorry, there are no images matching your search query. Please, try again.');
    }
    lightboxGallery.refresh();
    page += 1;
    } catch (error) {console.log(error);}
  }

function updateLoadBtnClassList(addClass, removeClass) {
    refs.loadBtn.classList.add(addClass)
    refs.loadBtn.classList.remove(removeClass)
  }