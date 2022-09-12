export function makeGalleryPhotoCardMarkup(photos) {
    return photos.hits
      .map(photo => {
        return `<div class="photo-card">
    <a class="gallery-link" href="${photo.largeImageURL}"><img class="gallery-photo" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes:${photo.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${photo.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${photo.comments}</b>  
      </p>
      <p class="info-item">
        <b>Downloads:${photo.downloads}</b>
      </p>
    </div>
  </div>`}
      ).join('');
  }