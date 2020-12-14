import favTpl from '../../templates/favorites.hbs';
import { getUserToken } from '../helpers/index';
import { requestUserFavorites } from '../helpers';
import { requestUserInfo } from '../helpers/API';

// Favourites markup
export function renderMyFav() {
  const userToken = getUserToken();
  getUserFavorites(userToken);
}

function appendFavMarkup(item) {
  document.querySelector('#root').insertAdjacentHTML('beforeend', favTpl(item));
}

function getUserFavorites(userToken) {
  if (requestUserInfo({ token: userToken })) {
    requestUserFavorites({ token: userToken })
      .then(({ favourites: data }) => {
        appendFavMarkup(data);
      })
      .catch(error => alert(error.message));
  }
}
