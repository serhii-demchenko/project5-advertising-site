import '../../scss/main.scss';
import { ads } from '../helpers';
import productModalTpl from '../../templates/product-modal.hbs';
import { getUserToken } from '../helpers/index';
import { requestAddToFavorites } from '../helpers';
import { requestUserFavorites } from '../helpers';
import getCardRefs from './getCardRefs';
import { openModal } from '../modal-window/index';

const cardRefs = getCardRefs();

//Слушатель на  клик по иконке сердце
export function onAddToFavoritesListener() {
  cardRefs.cardListener.addEventListener('click', onAddToFavorites);
}

// Слушатель на клик по иконке модалки
export function onOpenCardModalListener() {
  cardRefs.cardListener.addEventListener('click', onOpenModal);
}

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
}

// Проверяем регистрацию юзера при загрузке страницы
export function checkUserAuthorization() {
  const userToken = getUserToken();
  if (userToken !== null) {
    return true;
  }
  return false;
}

// Вытягивает id карточек в избранном зареганого пользователя
export function checkUserFavoritesId() {
  const userAuthorization = checkUserAuthorization();
  const userToken = getUserToken();
  console.log(userAuthorization);
  if (userAuthorization) {
    requestUserFavorites({ token: userToken })
      .then(data => Object.values(data))
      .then(array => array.flat())
      .then(item => item.map(el => el._id))
      .then(console.log)
      .catch(error => console.log(error));
  }
}

export function checkAuthUserFavoritesIcons(ads) {
  console.log(ads);
}

// const userChekedFavorites = document.querySelectorAll('.js-favorite-icon');
// console.log(userChekedFavorites);

// click.classList.remove('icon-favorite')
// click.classList.add('icon-favorite-orange');
// click.textContent = 'favorite';
