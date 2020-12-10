export {
  requestUserRegistration,
  requestUserLogin,
  requestUserLogout,
  requestCategories,
  requestRefreshUserCredentials,
  requestUserInfo,
  requestAds,
  requestFindAds,
} from './API';

export let categories = [];
export let ads = {};

export const recordToAds = obj => {
  ads = obj;
};
export const recordToCategories = arr => {
  categories = arr;
};
