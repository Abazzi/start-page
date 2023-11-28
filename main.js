async function fetchLinks(url) {
  const response = await fetch(url);
  return await response.json();
}
const dateSpan = document.querySelector('[data-date]');
const date = new Date();
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
dateSpan.textContent = date.toLocaleDateString(undefined, dateOptions);

const links = fetchLinks('links.json');
links.then((data) => {
  console.log(data);
});

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

function appendToUL(linkGroups, group, data) {
  if (group.dataset.list == 'bonfire') {
    linkGroups.foreach((el) => {
      clearChildNodes(el);
      switch (data.links) {
        case '0':
          linkGroups[0].appendChild(createLI(data));
          break;
        case '1':
          linkGroups[1].appendChild(createLI(data));
          break;
        case '2':
          linkGroups[2].appendChild(createLI(data));
          break;
      }
    });
  } else {
    linkGroups.foreach((el) => {
      clearChildNodes(el);
      switch (data.group) {
        case '0':
          linkGroups[0].appendChild(createLI(data));
          break;
        case '1':
          linkGroups[1].appendChild(createLI(data));
          break;
        case '2':
          linkGroups[2].appendChild(createLI(data));
          break;
      }
    });
  }
}

function createLI(obj) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  if (obj.mode == 'work') {
    li.setAttribute('data-list-item', 'work');
    a.setAttribute('data-list-item', 'work');
  } else {
    li.setAttribute('data-list-item', 'bonfire');
    a.setAttribute('data-list-item', 'bonfire');
  }

  a.setAttribute('href', obj.url);
  a.setAttribute('target', '_blank');
  a.textContnet = obj.name;
  li.appendChild(a);
  return li;
}

function switchLists() {
  const lists = document.querySelectorAll('[data-list]');
  links.then((data) => {
    lists.forEach((list) => {
      const listItems = [...list];
      clearChildNodes(list);
    });
  });
}

function switchModes() {
  const title = document.querySelector('[data-list-title]');
  const infoBar = document.querySelector('[data-info-bar]');
  const body = document.querySelector('[data-body]');
  const directory = document.querySelector('[data-directory]');

  if (title.dataset.title == 'bonfire') {
    title.removeAttribute('data-list-title');
    title.setAttribute('data-list-title', 'work');
    infoBar.removeAttribute('data-info-bar');
    infoBar.setAttribute('data-info-bar', 'work');
    body.removeAttribute('data-body');
    body.setAttribute('data-body', 'work');
    directory.removeAttribute('data-directory');
    directory.setAttribute('data-directory', 'work');
    directory.innerHTML = '&gt; cd ~/work/<span class="blinking">_</span>';
  } else {
    title.removeAttribute('data-list-title');
    title.setAttribute('data-list-title', 'bonfire');
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
  }
});
