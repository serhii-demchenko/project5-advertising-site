import { getUserToken } from '../helpers/index';
import { requestUserFavorites } from '../helpers';

// Проверка авторизованости пользователя, получение значения токена
async function getToken() {
  const userToken = await getUserToken();
  if (userToken !== null) {
    return userToken;
  }
  return false;
}

// Проверка авторизованости пользователя, получение true/false
async function checkUserAuth() {
  const userToken = await getUserToken();
  if (userToken !== null) {
    return true;
  }
  return false;
}

// Проверяем регистрацию юзера при загрузке страницы и вытягиваем id избранных карточек
async function getAuthUserFavId() {
  const userToken = await getToken();
  if (userToken) {
    return requestUserFavorites({ token: userToken })
      .then(data => data.favourites)
      .then(array => array.map(el => el._id))
      .catch(error => console.log(error));
  }
  return false;
}

// находим сердечки из избранного и меняем цвет
export async function checkUserFavIcons() {
  const userToken = checkUserAuth();
  const userFav = await getAuthUserFavId();
  if (userToken !== true && userFav !== false) {
    const selectors = Array.from(document.querySelectorAll('[data-id]'));
    for (let item of userFav) {
      selectors.map(card => {
        if (card.dataset.id === item) {
          changeFavoriteStyle(
            card,
            '.card__favorite-btn--orange',
            '.card__favorite-btn',
            'block',
            'none',
          );
        }
      });
    }
  }
  return;
}
