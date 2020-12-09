export {
  requestUserRegistration,
  requestUserLogin,
  requestUserLogout,
} from './API';

export const setUrlHash = hash => {
  location.hash = `#${hash}`;
};
