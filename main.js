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
    pic.removeAttribute('data-picture');
    pic.setAttribute('data-picture', 'work');
  } else {
    pic.removeAttribute('data-picture');
    pic.setAttribute('data-picture', 'bonfire');
  }
}

function switchLists() {
  const listItems = document.querySelectorAll('[data-list]');
  listItems.forEach((li) => {
    if (li.dataset.list == 'bonfire') {
      li.removeAttribute('data-list');
      li.setAttribute('data-list', 'work');
    } else {
      li.removeAttribute('data-list');
      li.setAttribute('data-list', 'bonfire');
    }
  });
}

function switchModes() {
  const title = document.querySelector('[data-title]');
  const infoBar = document.querySelector('[data-info-bar]');
  const body = document.querySelector('[data-body]');
  const directory = document.querySelector('[data-directory]');

  if (title.dataset.title == 'bonfire') {
    title.removeAttribute('data-title');
    title.setAttribute('data-title', 'work');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'work');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'work');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'work');
  } else {
    title.removeAttribute('data-title');
    title.setAttribute('data-title', 'bonfire');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'bonfire');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'bonfire');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'bonfire');
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key == 'w') {
    switchPicture();
    switchModes();
    switchLists();
  }
});
