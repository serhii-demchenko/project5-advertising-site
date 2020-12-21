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
import { onEditProductListener } from './my-calls/my-calls';
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

import { checkUserFavIcons } from './card/addAllUserFav';

const clearRoot = () => {
  document.querySelector('#root').classList.add('main--hide');
  document.querySelector('#root').innerHTML = '';
};
const showRoot = () => {
  document.querySelector('#root').classList.remove('main--hide');
};

export const homePage = async () => {
  clearRoot();
  recordToAds(await requestAdsPagination({ page: 1 }));
  renderCategory(ads);
  renderPageButton();
  addEventListenerOnPageBtn();
  addEventListenerLookMoreBtn();
  changeActiveBtn('page-1');
  showRoot();
  replaceImgOnError();
  await checkUserFavIcons();
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
  await checkUserFavIcons();
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
  await checkUserFavIcons();
};
export const accountPage = async () => {
  clearRoot();
  await renderMyAccPage();
  onEditProductListener();
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
  renderAllCallsOnRequest(ads);
  showRoot();
  replaceImgOnError();
  await checkUserFavIcons();
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
