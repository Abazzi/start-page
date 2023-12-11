async function fetchLinks(url) {
  const response = await fetch(url);
  return await response.json();
}

const weatherInfo = fetchLinks(
  'https://api.open-meteo.com/v1/forecast?latitude=42.293&longitude=-82.9&current=temperature_2m&hourly=temperature_2m&timezone=auto&forecast_days=1'
);

weatherInfo.then((data) => {
  try {
    const d = new Date();
    const weatherSpan = document.querySelector('[data-weather]');
    weatherSpan.innerText = `${data.hourly.temperature_2m[d.getHours()]}°C`;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
});

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

function createTitleLI(title, mode) {
  const li = document.createElement('li');
  li.setAttribute('data-list-title', mode);
  li.classList.add('title');
  li.textContent = title;
  return li;
}

function createLinkGroups(data) {
  const pic = document.getElementById('picture');
  const linkContainer = document.querySelector('.links-container');
  const groupOne = document.createElement('ul');
  const groupTwo = document.createElement('ul');
  const groupThree = document.createElement('ul');

  clearChildNodes(linkContainer);
  data.then((dataObjects) => {
    if (pic.dataset.picture == 'bonfire') {
      groupOne.appendChild(createTitleLI('daily', 'bonfire'));
      groupOne.setAttribute('data-list', 'bonfire');
      groupTwo.appendChild(createTitleLI('social', 'bonfire'));
      groupTwo.setAttribute('data-list', 'bonfire');
      groupThree.appendChild(createTitleLI('streaming', 'bonfire'));
      groupThree.setAttribute('data-list', 'bonfire');
      for (const dataObject of dataObjects.bonfire) {
        let linkObject = createLI(dataObject);
        switch (dataObject.group) {
          case '0':
            groupOne.appendChild(linkObject);
            break;
          case '1':
            groupTwo.appendChild(linkObject);
            break;
          case '2':
            groupThree.appendChild(linkObject);
            break;
        }
      }
    } else {
      groupOne.appendChild(createTitleLI('daily', 'work'));
      groupOne.setAttribute('data-list', 'work');
      groupTwo.appendChild(createTitleLI('tools', 'work'));
      groupTwo.setAttribute('data-list', 'work');
      groupThree.appendChild(createTitleLI('docs', 'work'));
      groupThree.setAttribute('data-list', 'work');
      for (const dataObject of dataObjects.work) {
        let linkObject = createLI(dataObject);
        switch (dataObject.group) {
          case '0':
            groupOne.appendChild(linkObject);
            break;
          case '1':
            groupTwo.appendChild(linkObject);
            break;
          case '2':
            groupThree.appendChild(linkObject);
            break;
        }
      }
    }
  });

  linkContainer.appendChild(groupOne);
  linkContainer.appendChild(groupTwo);
  linkContainer.appendChild(groupThree);
}

function createLI(dataObj) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  if (dataObj.mode == 'work') {
    li.setAttribute('data-list-item', 'work');
    a.setAttribute('data-list-item', 'work');
  } else {
    li.setAttribute('data-list-item', 'bonfire');
    a.setAttribute('data-list-item', 'bonfire');
  }

  a.setAttribute('href', dataObj.url);
  a.setAttribute('target', '_blank');
  a.innerText = dataObj.name;
  li.appendChild(a);
  return li;
}

function switchModes() {
  const title = document.querySelector('[data-list-title]');
  const infoBar = document.querySelector('[data-info-bar]');
  const body = document.querySelector('[data-body]');
  const directory = document.querySelector('[data-directory]');

  if (title.dataset.listTitle == 'bonfire') {
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

createLinkGroups(links);

window.addEventListener('keydown', (e) => {
  if (e.key == 'w') {
    switchPicture();
    switchModes();
    createLinkGroups(links);
  }
});
