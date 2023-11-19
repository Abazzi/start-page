const dateSpan = document.querySelector('[data-date]');
const date = new Date();
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

dateSpan.textContent = date.toLocaleDateString(undefined, dateOptions);

function switchPicture() {
  const pic = document.getElementById('picture');
  if (pic.dataset.picture == 'bonfire') {
    pic.dataset.picture == 'work';
  } else {
    pic.dataset.picture == 'bonfire';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key == 'w') {
    switchPicture();
  }
});
