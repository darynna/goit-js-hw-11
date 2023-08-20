import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPhoto } from './api-photos.js';
import { doMarkup } from "./markup.js";
import Notiflix from 'notiflix';


const form = document.querySelector('.search-form');
const gallery = document.querySelector(".gallery");
const loadmoreBtn = document.querySelector(".load-more");
const errorEndofPhotos = document.querySelector(".error-end")

let page = 1;
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  gallery.innerHTML = '';
  page = 1
  e.preventDefault();
  createLogic()

}


async function searchElements() {
  try {
    const q = form.elements.searchQuery.value;
    const data = await fetchPhoto(q, page);
    return data
  } catch (er) {
    throw er;
  }
};


async function createLogic() {
errorEndofPhotos.textContent = '';

  const data = await searchElements();
  const photos = data.hits;
  const totalAmount = data.totalHits;
  
  try {
    if (photos.length === 0 && page === 1) {
      Notiflix.Notify.failure('Sorry, there are no images matching your searcg query. Pleas try again');
      gallery.innerHTML = '<p>No photos found.</p>';
      loadmoreBtn.style.display = 'none';
    }
    else {
      Notiflix.Notify.success(`Hooray! We found ${totalAmount} images.`);
      doMarkup(photos, gallery, lightbox);
      loadmoreBtn.style.display = 'block';
    }

    }catch(er) {
      console.error("An error occurred:", er);
      errorEndofPhotos.textContent = "An error occurred while fetching data.";
      loadmoreBtn.style.display = 'none';
  }
  }


loadmoreBtn.addEventListener('click', loadMore)

function loadMore() {
  page += 1;
  searchElements().then(data => {
  const photos = data.hits;
  const totalAmount = data.totalHits;
  
  if (photos.length === 0) {
    errorEndofPhotos.textContent = "We're sorry, but you've reached the end of search results.";
    loadmoreBtn.style.display = 'none';
  } else {
    doMarkup(photos, gallery, lightbox);
    loadmoreBtn.style.display = 'block';

  }
  }).catch(er => {
    console.error("An error occurred:", er);
      errorEndofPhotos.textContent = "We're sorry, but you've reached the end of search results.";
      loadmoreBtn.style.display = 'none';
  })


  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}



