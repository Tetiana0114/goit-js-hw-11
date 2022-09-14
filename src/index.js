import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import getRefs from './js/getRefs';
import { fetchGallery } from './js/fetchGallery';
import { makeGalleryPhotoCardMarkup } from './js/createPhotoCardMarkup';
import { smoothPageScrolling } from './js/smoothPageScrolling';

const refs = getRefs();

updateLoadBtnClassList('is-hidden', 'visibility');

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
let page = 1;
let perPage = 40;
let search = '';

refs.formEl.addEventListener('submit', onFormSubmit);
refs.galleryEl.addEventListener('click', onGalleryImgClick);
refs.loadBtn.addEventListener('click', onLoadBtnClick);

function resetGallery() {
    refs.galleryEl.innerHTML = '';
}

function onFormSubmit(event) {
  event.preventDefault();
  search = event.currentTarget.searchQuery.value;
  if (search === '') {
      resetGallery();
  }
  getPagination(search);
}

function buildGalleryOnPage(event) {
  const galleryImg = makeGalleryPhotoCardMarkup(event);
  refs.galleryEl.innerHTML = galleryImg;
}

async function getPagination(searchQuery) {
  try {
    const element = await fetchGallery(searchQuery);
    const markup = await buildGalleryOnPage(element);
    if (element.totalHits > 0) {
      Notify.success(`Hooray! We found ${element.totalHits} images.`);
      updateLoadBtnClassList('visibility', 'is-hidden');
    } else {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }  
    page += 1;
    lightboxGallery.refresh();
    } catch (error) {console.log(error);
    }
  }

function onLoadBtnClick() {
  fetchGallery(search)
  .then(img => {
    buildGalleryOnPage(img);
    smoothPageScrolling();
    if (page > (img.totalHits / perPage)) {
      Notify.failure(`We're sorry, but you've reached the end of search results.`);
      updateLoadBtnClassList('is-hidden', 'visibility');
    } page += 1;
      lightboxGallery.refresh();
  })
  .catch(error => console.log(error));
  }

function onGalleryImgClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
      return;
    }
}

function updateLoadBtnClassList(addClass, removeClass) {
    refs.loadBtn.classList.add(addClass)
    refs.loadBtn.classList.remove(removeClass)
}