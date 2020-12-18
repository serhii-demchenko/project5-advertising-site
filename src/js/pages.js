import productModalTpl from '../templates/product-modal.hbs';
import { openModal, closeModal } from './modal-window/index.js';
import { renderBadUrl } from './bad-url';
import {
  ads,
  requestAdsPagination,
  recordToAds,
  categoryRequestHandler,
  isInCategories,
  requestFindAds,
  replaceImgOnError,
} from './helpers';
import { updatePage } from './router';
import { renderMyAccPage } from './account/account';
import { onRemoveFavoritesListener } from './favorites/remove-favorite';
// import { onRemoveProductListener } from './my-calls/remove-my-calls';
import {
  renderCategory,
  addEventListenerLookMoreBtn,
  renderAllCallsOnRequest,
} from './category/category';
import {
  renderPageButton,
  addEventListenerOnPageBtn,
  changeActiveBtn,
} from './pagination/pagination';

import { searchResult } from './search-modal';
import { changeStyle } from './my-calls/my-calls';
import Slider from './slider';
let sliders;
const clearRoot = () => {
  document.querySelector('#root').classList.add('main--hide');
  document.querySelector('#root').innerHTML = '';
  clearSliders();
};
const showRoot = () => {
  createSliders();
  document.querySelector('#root').classList.remove('main--hide');
};

const createSliders = () => {
  sliders = Array.from(document.querySelectorAll('.category')).map(item => {
    return new Slider(item);
  });
  // console.log(sliders);
};
const clearSliders = () => {
  if (sliders) sliders = [];
};

export const homePage = async () => {
  clearRoot();
  recordToAds(await requestAdsPagination({ page: 1 }));
  console.log(ads);
  // removeFromFavorite();
  renderCategory(ads);
  renderPageButton();
  addEventListenerOnPageBtn();
  addEventListenerLookMoreBtn();
  changeActiveBtn('page-1');
  showRoot();
  replaceImgOnError();
};
export const page2 = async () => {
  clearRoot();
  recordToAds(await requestAdsPagination({ page: 2 }));
  renderCategory(ads);
  renderPageButton();
  addEventListenerOnPageBtn();
  addEventListenerLookMoreBtn();
  changeActiveBtn('page-2');
  showRoot();
  replaceImgOnError();
};
export const page3 = async () => {
  clearRoot();
  recordToAds(await requestAdsPagination({ page: 3 }));
  renderCategory(ads);
  renderPageButton();
  addEventListenerOnPageBtn();
  addEventListenerLookMoreBtn();
  changeActiveBtn('page-3');
  showRoot();
  replaceImgOnError();
};
export const accountPage = async () => {
  clearRoot();
  await renderMyAccPage();
  onRemoveFavoritesListener();
  showRoot();
  replaceImgOnError();
};
export const categoryPage = async () => {
  clearRoot();
  const category = decodeURI(location.hash.slice(1));
  if (!isInCategories(category)) {
    badUrlPage();
    return;
  }
  await categoryRequestHandler(category);
  console.log(ads);
  renderAllCallsOnRequest(ads);
  showRoot();
  replaceImgOnError();
};
export const badUrlPage = () => {
  clearRoot();
  if (location.pathname === '/page1') {
    updatePage('/');
    return;
  }
  renderBadUrl();
  setTimeout(() => {
    updatePage('/');
  }, 5000);
  showRoot();
};
export const searchPage = async () => {
  clearRoot();
  const found = await requestFindAds({ query: location.hash.slice(1) });
  recordToAds({ found: found });
  renderAllCallsOnRequest(ads);
  showRoot();
  replaceImgOnError();
};
export const routers = [
  {
    path: '/',
    component: homePage,
    meta: { auth: false },
  },
  {
    path: '/page2',
    component: page2,
    meta: { auth: false },
  },
  {
    path: '/page3',
    component: page3,
    meta: { auth: false },
  },
  {
    path: '/account',
    component: accountPage,
    meta: { auth: true },
  },
];
