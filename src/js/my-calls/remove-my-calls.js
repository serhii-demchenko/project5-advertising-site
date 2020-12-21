import { requestRemoveProduct } from '../helpers';
import { requestUserInfo } from '../helpers/API';

// Delete my-calls item
export async function removeProduct(userToken, _cardId) {
  if (requestUserInfo({ token: userToken })) {
    await requestRemoveProduct({ token: userToken, _id: _cardId });
  }
}
