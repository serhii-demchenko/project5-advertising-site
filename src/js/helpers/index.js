export {
  requestUserRegistration,
  requestUserLogin,
  requestUserLogout,
  requestUserLoginGoogle,
  requestCategories,
  requestRefreshUserCredentials,
  requestUserInfo,
  requestAdsPagination,
  requestFindAds,
  requestAddToFavorites,
  requestRemoveFromFavorites,
  requestAdsByCategory,
  requestPostProduct,
  requestEditProduct,
  requestRemoveProduct,
  requestUserFavorites,
  requestUserOwn,
} from './API';
import { requestAdsByCategory } from './API';
export let categories = [];
export let ads = {};

export const recordToAds = obj => {
  ads = obj;
};
export const recordToCategories = arr => {
  categories = arr;
};
const normalizeCategoryForApi = category => {
  return category
    .split(' ')
    .map((word, index) =>
      index === 0 ? word : word.slice(0, 1).toUpperCase() + word.slice(1),
    )
    .join('');
};
export const categoryRequestHandler = async category => {
  const normalizedCategory = normalizeCategoryForApi(category);
  const response = await requestAdsByCategory({ category: normalizedCategory });
  const obj = {};
  obj[normalizedCategory] = response;
  recordToAds(obj);
};
export const isInCategories = query => {
  if (categories.find(item => item === query) !== undefined) return true;
  return false;
};
