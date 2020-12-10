import './scss/main.scss';
export const categories = [];
export const ads = [];
import {
  updatedContent,
  updateHistory,
  addCategoriesToRouters,
} from './js/router';

const onLoadPage = async () => {
  await addCategoriesToRouters();
  updatedContent();
};

window.addEventListener('load', onLoadPage);
window.onpopstate = async event => {
  updatedContent();
};
