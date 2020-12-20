import { requestRemoveProduct } from '../helpers';
import { requestUserInfo } from '../helpers/API';
import { getUserToken } from '../helpers/index';

// Delete my-calls item

export async function delCallItem(e) {
  if (
    !e.target.classList
      .contains
      // 'селектор класса/айдишника кнопки для удаления',
      ()
  ) {
    return;
  }
  const cardId = getId(e);
  const userToken = getUserToken();

  await removeProduct(userToken, cardId);
  console.log(`удаление моего товара ${cardId}`);
}

async function removeProduct(userToken, _cardId) {
  if (requestUserInfo({ token: userToken })) {
    await requestRemoveProduct({ token: userToken, _id: _cardId });
  }
}

function getId(e) {
  console.log(e);
  const card = e.path.find(el => el.className === 'card');
  return card.dataset.id;
}
