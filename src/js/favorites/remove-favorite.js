import { requestRemoveFromFavorites } from '../helpers';
import { requestUserInfo } from '../helpers/API';
import { getUserToken } from '../helpers/index';

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
  const card = e.path.find(el => el.className === 'icon-favorite-orange');
  return card.dataset.id;
}

async function updateFav(e) {
  const clickedCard = e.path.find(el => el.className === 'card-item');
  setTimeout(() => {
    clickedCard.classList.add('remove');
  }, 300);
  clickedCard.classList.add('hidden');
}
