import { requestRemoveProduct } from '../helpers';
import { requestUserInfo } from '../helpers/API';
import { getUserToken } from '../helpers/index';

// Delete my-calls item

// const mainContainer = document.querySelector('#root');

// export async function onRemoveFavoritesListener() {
//   await mainContainer.addEventListener('click', delCallItem);
// }

// export async function onRemoveProductListener() {
//   const editBtn = document.querySelector('.js-edit-card-btn');
//   await editBtn.addEventListener('click', delCallItem);
//   console.log(editBtn);
// }

// async function delCallItem(e) {
//   if (!e.target.classList.contains('js-edit-card-btn')) {
//     return;
//   }
//   const cardId = getId(e);
//   const userToken = getUserToken();

//   await removeProduct(userToken, cardId);
//   console.log(`удаление моего товара ${cardId}`);
// }

// async function removeProduct(userToken, _cardId) {
//   if (requestUserInfo({ token: userToken })) {
//     await requestRemoveProduct({ token: userToken, _id: _cardId });
//   }
// }

// function getId(e) {
//   console.log(e);
//   const card = e.path.find(el => el.className === 'card');
//   return card.dataset.id;
// }
