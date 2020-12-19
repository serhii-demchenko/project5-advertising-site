import favTpl from '../../templates/category.hbs';
import { ads } from '../helpers';
import { getUserToken } from '../helpers/index';
import { requestUserInfo } from '../helpers/API';

// Favourites markup
export async function renderMyFav() {
  const userToken = getUserToken();
  await getUserFavorites(userToken);
}

async function appendFavMarkup(item) {
  await document
    .querySelector('#root')
    .insertAdjacentHTML('afterbegin', favTpl(item));
}

async function getUserFavorites(userToken) {
  const data = await requestUserInfo({ token: userToken });
  if (data.hasOwnProperty('favourites')) {
    appendFavMarkup(data.favourites);
    ads.favourites = data.favourites;
    document.querySelector('h2').textContent = 'ОБРАНЕ';
    addStyles();
  }
}

async function addStyles() {
  const ul = document.querySelector('.category-list');
  await ul.classList.add('favorite-list');
  changeDisplay('.card__favorite-btn--orange', 'block');
  changeDisplay('.card__favorite-btn', 'none');
}

export async function changeDisplay(refs, display) {
  const array = document.querySelectorAll(refs);
  await array.forEach(el => {
    el.style.display = display;
  });
}
