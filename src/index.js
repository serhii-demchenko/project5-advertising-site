import './scss/main.scss';
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
  categories,
  refreshTokenRequest,
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
window.onpopstate = async () => {
  updatedContent();
};
addScrollUp();
setInterval(refreshTokenRequest, 10 * 60 * 1000);
googleAuth();
