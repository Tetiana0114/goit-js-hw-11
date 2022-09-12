import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
import getRefs from './js/getRefs';

const KEY = '29871741-92f0be7d75d630b941b41d19d';
const BASIC_URL = `https://pixabay.com/api/?key=${KEY}&q=`;


const refs = getRefs();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.galleryEl.addEventListener('click', onGalleryImgClick);
refs.loadBtn.addEventListener('click', onLoadBtnClick);


refs.loadBtn.disabled = true;

let page = 1;
let searchQuery = '';


 
