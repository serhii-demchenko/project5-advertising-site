import { requestRemoveFromFavorites } from '../helpers';
import { requestUserInfo } from '../helpers/API';
import { getUserToken } from '../helpers/index';
import { carousel } from './favorites';
import { ads } from '../helpers';
// import Carousel from 'bootstrap.native/dist/components/carousel-native.esm.js';

// Delete favorite item

const mainContainer = document.querySelector('#root');

export async function onRemoveFavoritesListener() {
  await mainContainer.addEventListener('click', delFavItem);
}

async function delFavItem(e) {
  if (!e.target.parentNode.classList.contains('card__favorite-btn--orange')) {
    return;
  }
  const cardId = getId(e);
  const userToken = getUserToken();

  await removeFromFavorites(userToken, cardId);
  // console.log(`удаление ${cardId}`);
  updateFav(e);
}

async function removeFromFavorites(userToken, _cardId) {
  if (requestUserInfo({ token: userToken })) {
    await requestRemoveFromFavorites({ token: userToken, _id: _cardId });
  }
}

function getId(e) {
  const card = e.path.find(el => el.className === 'card');
  return card.dataset.id;
}

async function updateFav(e) {
  const carouselID = carousel.elementById;
  const cardContainer = carouselID.querySelector('.carousel-inner');
  // Если один - пустая разметка
  if (cardContainer.childElementCount === 1) {
    cardContainer.innerHTML = '';
    return;
  }
  const removeItemId = getId(e);
  // console.log('id элемента, который удаляем', removeItemId);
  const removeItem = cardContainer.querySelector(
    `[data-item="${removeItemId}"]`,
  );
  // console.log(removeItem);
  // const clickedCard = e.path.find(el => el.className.includes('card-item'));
  // const updateMarkup = carousel.renderMarkup();

  const indexActive = carouselID.Carousel.getActiveIndex();

  // Убиваем в локальной копии элемент из коллекции
  const data = ads.favourites;
  data.forEach((e, index) => {
    if (e._id === removeItemId) {
      data.splice(index, 1);
      // console.log('Это текущая длина адс', data.length);
    }
  });
  // console.log(data);
  // ---------------------------------------------------
  // Активным элементом карусели делаем следующий и удаляем текущий.
  // console.log('ТОШОУДАЛЯЕМ', removeItem, 'indexActive', indexActive);

  removeItem.classList.forEach((e, i) => {
    if (e === 'active') {
      if (removeItem.nextElementSibling) {
        // console.log('eto next element ', removeItem.nextElementSibling);
        removeItem.nextElementSibling.classList.add('active');
      } else {
        console.log('budet pervym', cardContainer.children[0]);
        cardContainer.children[0].classList.add('active');
        const link = carouselID.Carousel.getActiveIndex();
        // console.log('link ', link);
        carouselID.Carousel.slideTo(link + 1);
      }
    }
  });
  // console.log('Удаленный элемент', removeItem);
  removeItem.remove();
  // ---------------------------------------------------

  // Удаляем все div.col-md-3 содержащие данную карточку
  const cardsRemoveRef = carouselID.querySelectorAll(
    `[data-id="${removeItemId}"]`,
  );
  cardsRemoveRef.forEach(e => e.closest('.col-md-3').remove());
  //----------------------------------------------------

  // Проход по оставшимся элементам с целью удаления  всех лишних div.col-md-3
  carousel.showItems();
  const liRemoveRef = carouselID.querySelectorAll('.carousel-item');
  // console.log('Изначально ', liRemoveRef, 'Длина массива ', data.length);
  liRemoveRef.forEach((e, index) => {
    const divsChildren = e.querySelectorAll('.col-md-3');
    divsChildren.forEach((el, idx) => {
      if (idx > data.length - 1) {
        // console.log('el ', el, 'length ', data.length);
        el.remove();
      }
    });
  });
  // АЛЕНЫ !!!
  // setTimeout(() => {
  // clickedCard.classList.add('remove');
  // }, 300);
  //   // clickedCard.classList.add('hidden');
}
