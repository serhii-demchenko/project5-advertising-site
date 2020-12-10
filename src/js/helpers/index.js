export {
  requestUserRegistration,
  requestUserLogin,
  requestUserLogout,
  requestCategories,
} from './API';

export const setUrlHash = hash => {
  location.hash = `#${hash}`;
};
