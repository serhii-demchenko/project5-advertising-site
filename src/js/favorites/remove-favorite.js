import { requestRemoveFromFavorites } from '../helpers';
import { requestUserInfo } from '../helpers/API';
import { getUserToken } from '../helpers/index';
import { carousel } from './favorites';
import { ads } from '../helpers';

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
  const removeItemId = getId(e);
  const data = ads.favourites;
  // const cardsRemoveRef = carouselID.querySelectorAll(`[data-id="${getId(e)}"]`);
  const clickedCard = e.path.find(el => el.className.includes('card-item'));
  // const indexActive = carouselID.Carousel.getActiveIndex();
  // const updateMarkup = carousel.renderMarkup();

  const removeItem = data.forEach(e => if (e._id === removeItemId));
  console.log(removeItem);

  // cardsRemoveRef.forEach(e => e.closest('.col-md-3').remove());

  // Активным элементом карусели делаем следующий. Если элемент был один, то пустая разметка
  // if (carouselID.querySelector('.carousel-inner').childElementCount === 1) {
  //   updateMarkup = '';
  //   return;
  // } else if (
  //   indexActive <
  //   carouselID.querySelector('.carousel-inner').childElementCount - 1
  // ) {
  //   carouselID
  //     .querySelector('.carousel-inner')
  //     .children[indexActive + 1].classList.add('active');
  //   carouselID.querySelector('.carousel-inner').children[indexActive].remove();
  //   // updateMarkup = carouselID.querySelector('.carousel-inner').innerHTML;
  // } else {
  //   carouselID
  //     .querySelector('.carousel-inner')
  //     .children[0].classList.add('active');
  //   carouselID.querySelector('.carousel-inner').children[indexActive].remove();
  //   // updateMarkup = carouselID.querySelector('.carousel-inner').innerHTML;
  // }
  // ------------------------------------------------

  // for (
  //   let i = 0;
  //   i < carouselID.querySelector('.carousel-inner').childElementCount;
  //   i++
  // ) {
  //   const a = carouselID.querySelector('.carousel-inner').children[i]
  //     .children[0];
  //   console.log(a);
  //   carouselID.querySelector('.carousel-inner').children[i].innerHTML = '';
  //   carouselID
  //     .querySelector('.carousel-inner')
  //     .children[i].insertAdjacentElement('afterbegin', a);

  //   // a.innerHTML;
  //   // carouselID.querySelector('.carousel-inner').children[i].append(a);
  //   console.log(
  //     'почему 2 ',
  //     carouselID.querySelector('.carousel-inner').children[i],
  //   );
  //   // console.log(a);
  //   // for (let j = 1; j < a.childElementCount; j++) {
  //   //   const b = a.children[0];
  //   //   a.innerHTML = '';
  // }
  console.log(ads.favourites);
  // }
  // const delDiv = carouselID.querySelector('.carousel-inner');
  // console.log('clickedCard', clickedCard);
  // console.log('cardsRemoveRef.length', cardsRemoveRef.length);
  // // console.log('getActiveIndex', indexActive);
  // console.log(
  //   'card-item.length',
  //   carouselID.querySelector('.carousel-inner').childElementCount,
  //   );

  // console.log(updateMarkup);
  // carousel.updateMarkup(updateMarkup);
  // console.log('cardsRemoveRef', cardsRemoveRef);
  // .closest('.col-md-3');

  // console.log(cardsRemoveRef[0].closest('.col-md-3'));
  // const str = divRemoveRef.innerHTML.trim();
  // const searchRegExt = new RegExp(str, 'g');
  // console.log(searchRegExt);
  // const result = carousel.replaceAll('article', 'wtf');
  // console.log(result);

  // const div = getId(e);
  // console.log(clickedCard.closest('col-md-3'));
  // console.log(carousel);
  // const carousel = document.getElementById('myFavorites').Carousel;
  // carousel.getActiveIndex();
  // console.log(carousel.getActiveIndex());
  // carousel.dispose();

  // АЛЕНЫ !!!
  // setTimeout(() => {
  // clickedCard.classList.add('remove');
  // }, 300);
  // clickedCard.classList.add('hidden');
}
