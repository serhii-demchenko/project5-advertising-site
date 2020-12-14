import favTpl from '../../templates/favorite-card.hbs';
import { requestUserFavorites } from '../helpers';
import { requestUserInfo } from '../helpers/API';

export function openMyFav() {
  const userToken = getUserToken();
  getUserFavorites(userToken);
}

function appendFavMarkup(item) {
  document.querySelector('#root').insertAdjacentHTML('beforeend', favTpl(item));
}

function getUserToken() {
  const getToken = sessionStorage.getItem('accessToken');
  return getToken;
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
