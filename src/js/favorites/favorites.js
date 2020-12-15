import favTpl from '../../templates/category.hbs';
import { getUserToken } from '../helpers/index';
import { requestUserInfo } from '../helpers/API';

// Favourites markup
export async function renderMyFav() {
  const userToken = getUserToken();
  await getUserFavorites(userToken);
}

function appendFavMarkup(item) {
  document.querySelector('#root').insertAdjacentHTML('beforeend', favTpl(item));
}

async function getUserFavorites(userToken) {
  const data = await requestUserInfo({ token: userToken });
  if (data.hasOwnProperty('favourites')) {
    appendFavMarkup(data.favourites);
    addStyles();
  }
}

function addStyles() {
  document.querySelector('h2').textContent = 'ОБРАНЕ';

  changeDisplay('.card__favorite-btn--orange', 'block');
  changeDisplay('.card__favorite-btn', 'none');
}

function changeDisplay(refs, display) {
  const array = document.querySelectorAll(refs);
  array.forEach(el => {
    el.style.display = display;
  });
}
