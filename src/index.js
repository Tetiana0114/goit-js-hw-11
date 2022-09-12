// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
import getRefs from './js/getRefs';
// import { fetchGallery } from './js/fetchGallery';
// import { makeGalleryPhotoCardMarkup } from './js/createPhotoCardMarkup';

const refs = getRefs();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.galleryEl.addEventListener('click', onGalleryImgClick);
refs.loadBtn.addEventListener('click', onLoadBtnClick);

let perPage = 40;
let page = 1;

function scrollingOfPageAfterRequest() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

function resetGalleryAll() {
    refs.galleryEl.innerHTML = '';
}  

// function onGalleryImgClick(event) {
//     event.preventDefault();
//     if (event.target.nodeName !== 'IMG') {
//       return;
//     }
//     // console.log(event.target.nodeName);
//   }