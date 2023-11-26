async function fetchLinks() {
  const response = await fetch('links.json');
  return await response.json();
}
const dateSpan = document.querySelector('[data-date]');
const date = new Date();
const linkGroups = document.querySelectorAll('[data-list]');
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const links = fetchLinks();
links.then((data) => {
  console.log(data.bonfire);
});

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

console.log(linkGroups);

function switchLinks(el) {
  if (el.dataset.list == 'bonfire') {
    clearChildNodes(el);
  }
}

function createWorkLinkEl(obj) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  li.setAttribute('data-list', 'work');
  a.setAttribute('data-list', 'work');
  a.setAttribute('href', obj.url);
  a.setAttribute('target', '_blank');
  a.textContnet = obj.name;
  li.appendChild(a);
  return li;
}

function createBonfireLinkEl(obj) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  li.setAttribute('data-list', 'bonfire');
  a.setAttribute('data-list', 'bonfire');
  a.setAttribute('href', obj.url);
  a.setAttribute('target', '_blank');
  a.textContnet = obj.name;
  li.appendChild(a);
  return li;
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
    directory.innerHTML = '&gt; cd ~/work/<span class="blinking">_</span>';
  } else {
    title.removeAttribute('data-title');
    title.setAttribute('data-title', 'bonfire');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'bonfire');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'bonfire');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'bonfire');
    directory.innerHTML = '&gt; cd ~/bonfire/<span class="blinking">_</span>';
  }
}

function clearChildNodes(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key == 'w') {
    switchPicture();
    switchModes();
    switchLists();
  }
});
