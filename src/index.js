import './scss/main.scss';
export const categories = [];
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
