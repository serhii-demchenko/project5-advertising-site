import favTpl from '../../templates/category.hbs';
import { getUserToken } from '../helpers/index';
import { requestUserFavorites } from '../helpers';
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
    document.querySelector('h2').textContent = 'ОБРАНЕ';
  }
}
