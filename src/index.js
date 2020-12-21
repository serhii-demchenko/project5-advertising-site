import './scss/main.scss';
// import './js/header/header';
// import './js/auth-modal/auth-modal';
import renderFooter from './js/footer/footer';
import { addListenersInHeader, markupCategory } from './js/header/header';
import { updatedContent, addCategoriesToRouter } from './js/router';
import { getAddListenersInCard } from './js/card/card';
import { addScrollUp } from './js/scrollUp';
import { googleAuth } from './js/auth-modal/auth-modal';

import './js/edit-modal/edit-modal';

import {
  recordToCategories,
  requestCategories,
  requestUserLogin,
  categories,
  refreshTokenRequest,
  requestPostProduct,
  requestUserById,
  requestUserLoginGoogle,
} from './js/helpers';

const onLoadPage = async () => {
  recordToCategories(await requestCategories());
  addCategoriesToRouter();
  updatedContent();
  markupCategory(categories);
  addListenersInHeader();
  getAddListenersInCard();
};
renderFooter();
window.addEventListener('load', onLoadPage);
window.onpopstate = async event => {
  updatedContent();
};
addScrollUp();
setInterval(refreshTokenRequest, 10 * 60 * 1000);
requestUserById({ userId: '5fd7c4ecc298a200179c89f5' }).then(show);

function show(item) {
  console.log(item);
}
googleAuth();
