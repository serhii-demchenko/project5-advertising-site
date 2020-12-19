import '../../scss/main.scss';
import { ads } from '../helpers';
import productModalTpl from '../../templates/product-modal.hbs';
import { getUserToken } from '../helpers/index';
import { openModalAuth } from '../auth-modal/auth-modal';
import { requestAddToFavorites, requestUserFavorites } from '../helpers';
import getCardRefs from './getCardRefs';
import { openModal } from '../modal-window/index';
import { productModalAddEventListeners } from '../product-modal/product-modal';
import { changeDisplay } from '../favorites/favorites';
import { onRemoveFavoritesListener } from '../favorites/remove-favorite';

const cardRefs = getCardRefs();

//Слушатель на  клик по иконке сердце
export function onAddToFavoritesListener() {
  cardRefs.cardListener.addEventListener('click', onAddToFavorites);
}

// Слушатель на клик по иконке модалки
export function onOpenCardModalListener() {
  cardRefs.cardListener.addEventListener('click', onOpenModal);
}

export function onRemoveFromFavoritesListener() {}

//Сборка слушатиелей из карточки товара
export function getAddListenersInCard() {
  onAddToFavoritesListener();
  onOpenCardModalListener();
}

// Вызов модального окна на карточке товаров
export function onOpenModal(event) {
  if (!event.target.classList.contains('js-modal-icon')) {
    return;
  }
  const productId = getCardId(event);
  const productObj = findProductAds(ads, productId);
  openModal(productModalTpl(productObj));
  productModalAddEventListeners();
}
// Поиск вызванной карточки товаров
function findProductAds(ads, id) {
  return createArrayOfAllProducts(ads).find(item => item._id === id);
}

// Раскрытие вложенностей объекта ads
function createArrayOfAllProducts(ads) {
  return Object.values(ads).flat();
}

// Добавление/удаление товара в/из Избранного
export function onAddToFavorites(event) {
  if (event.target.classList.contains('icon-favorite-orange')) {
    removeAddToFavorites(event);
    return;
  }

  if (!event.target.classList.contains('js-favorite-icon')) {
    return;
  }

  const cardId = getCardId(event);
  const userToken = getUserToken();
  if (sendAdsToUserFavorite(userToken, cardId)) {
    clickedToAddToFavorites(event);
    console.log('отправили запрос');
  } else {
    openModalAuth();
  }
}

// Отправка товара авторизованого пользователя
function sendAdsToUserFavorite(userToken, _cardId) {
  if (userToken !== null) {
    requestAddToFavorites({ token: userToken, _id: _cardId })
      .then(console.log)
      .catch(error => console.log(error));
    return true;
  }
  return false;
}

// Поиск выбранной карточки в объекте настроек
function findCheckedCard(event) {
  const arrayElements = event.path;
  const targetCard = arrayElements.find(el => el.className === 'card');
  return targetCard;
}

// Получение ID карточки на которой произошло целевое событие click
function getCardId(event) {
  const getTargetCard = findCheckedCard(event);
  return getTargetCard.dataset.id;
}

// Замена стилей иконки сердечко при добавлении в избранное
function clickedToAddToFavorites(event) {
  const click = event.target;
  click.classList.remove('icon-favorite');
  click.classList.add('icon-favorite-orange');
  click.textContent = 'favorite';
}

// Замена стилей иконки сердечко при удалении из Избранного
export function removeAddToFavorites(event) {
  const removeClick = event.target;
  removeClick.classList.remove('icon-favorite-orange');
  removeClick.classList.add('icon-favorite');
  removeClick.textContent = 'favorite_border';
  onRemoveFavoritesListener();
}

// Проверяем регистрацию юзера при загрузке страницы и вытягиваем id избранных карточек
export async function getAuthUserFavId() {
  const userToken = await getUserToken();
  if (userToken !== null) {
    return requestUserFavorites({ token: userToken })
      .then(data => data.favourites)
      .then(array => array.map(el => el._id))
      .catch(error => console.log(error));
    // return true;
  }

  return false;
}

// export async function checkUserFavIcons() {
//   const selectors = Array.from(document.querySelectorAll('[data-id]'));
//   console.log(selectors);

//   const userFav = await getAuthUserFavId();
//   console.log(userFav.length);

//   for (let item of userFav) {
//     console.log(selectors.filter(card => card.dataset.id === item));
//     // selectors.filter(card => card.dataset.id === item);

//     // addNewCardStyle();
//   }
// }

// async function addNewCardStyle() {
//   let targetCard = card.querySelector('.card__favorite-btn--orange');
//   let hiddenCard = card.querySelector('.card__favorite-btn');
//   targetCard.style.display = 'block';
//   hiddenCard.style.display = 'none';
// }
//

// return selectors.filter(item => {
//   return userFav.forEach(el => {
//     if (item.dataset.id === el) {
//       let targetCard = item.querySelector('.card__favorite-btn--orange');
//       let hiddenCard = item.querySelector('.card__favorite-btn');
//       targetCard.style.display = block;
//       hiddenCard.style.display = none;
//     }
//   });
// });
// }

// changeDisplay('.card__favorite-btn--orange', 'block');
// changeDisplay('.card__favorite-btn', 'none');

// export async function getAuthUserFavoritesIcons(ads) {
//   // console.log(ads);
//   const userFavoritesId = await getAuthUserFavId();
//   const allProdacts = await createArrayOfAllProducts(ads);
//   console.log(allProdacts);
//   const favToCheck = [];
//   for (let id of userFavoritesId) {
//     for (let product of allProdacts) {
//       for (let item in product) {
//         if (product[item] === id) {
//           favToCheck.push(product);
//         }
//       }
//     }
//   }
//   console.log(favToCheck);
//   // return favToCheck;
// }
