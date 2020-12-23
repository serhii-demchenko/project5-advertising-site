import '../../scss/main.scss';
import { getUserToken } from '../helpers/index';
import { requestAddToFavorites } from '../helpers';
import getCardRefs from './getCardRefs';
import { onOpenModal } from './onOpenModal';
import { openModalAuth } from '../auth-modal/auth-modal';
import { removeAddToFavorites } from './removeFromFav';

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

// Добавление/удаление товара в/из Избранного
export async function onAddToFavorites(event) {
  if (event.target.classList.contains('icon-favorite-orange')) {
    await removeAddToFavorites(event);
    return;
  }

  if (!event.target.classList.contains('js-favorite-icon')) {
    return;
  }

  const cardId = getCardId(event);
  const userToken = getUserToken();
  if (sendAdsToUserFavorite(userToken, cardId)) {
    clickedToAddToFavorites(event);
  } else {
    openModalAuth();
  }
}

// Отправка товара авторизованого пользователя
function sendAdsToUserFavorite(userToken, _cardId) {
  if (userToken !== null) {
    requestAddToFavorites({ token: userToken, _id: _cardId }).catch(error =>
      console.log(error),
    );
    return true;
  }
  return false;
}

// Поиск выбранной карточки в объекте настроек
export function findCheckedCard(event, cls) {
  const arrayElements = event.path;
  const targetCard = arrayElements.find(el => el.className === cls);
  return targetCard;
}

// Получение ID карточки на которой произошло целевое событие click
export function getCardId(event) {
  const getTargetCard = findCheckedCard(event, 'card');
  return getTargetCard.dataset.id;
}

// Замена иконки сердечко при добавлении в избранное
export function clickedToAddToFavorites(event) {
  const cardId = getCardId(event);
  findAllIdCards(cardId);
}

//Перебор массива карт и поиск id заданого динамически
export function findAllIdCards(_id) {
  const selectors = Array.from(document.querySelectorAll('[data-id]'));
  selectors.map(card => {
    if (card.dataset.id === _id) {
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

// подмена видимости dom-элемента
export function changeFavoriteStyle(
  DOMselector,
  newSelector,
  oldSelector,
  newDisplay,
  oldDisplay,
) {
  const targetIcon = DOMselector.querySelector(newSelector);
  const hiddenIcon = DOMselector.querySelector(oldSelector);
  targetIcon.style.display = newDisplay;
  hiddenIcon.style.display = oldDisplay;
}
