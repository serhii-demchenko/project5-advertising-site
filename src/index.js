export const categories = [];

import {
  updatedContent,
  updateHistory,
  addCategoriesToRouters,
} from './js/router';
import './scss/main.scss';

const onLoadPage = async () => {
  await addCategoriesToRouters();
  updatedContent();
};

window.addEventListener('load', onLoadPage);
window.onpopstate = async event => {
  updatedContent();
};
