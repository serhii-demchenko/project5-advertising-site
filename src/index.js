import './scss/main.scss';

import { updatedContent, addCategoriesToRouters } from './js/router';
import {
  recordToAds,
  requestAds,
  recordToCategories,
  requestCategories,
} from './js/helpers';

const onLoadPage = async () => {
  recordToCategories(await requestCategories());
  recordToAds(await requestAds());
  addCategoriesToRouters();
  updatedContent();
};

window.addEventListener('load', onLoadPage);
window.onpopstate = async event => {
  updatedContent();
};