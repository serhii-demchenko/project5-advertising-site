export { requestUserRegistration } from './API';

export const setUrlHash = hash => {
  location.hash = `#${hash}`;
};
