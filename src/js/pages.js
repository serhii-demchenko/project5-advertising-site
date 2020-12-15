import { renderBadUrl } from './bad-url';
import {
  ads,
  requestAdsPagination,
  recordToAds,
  categoryRequestHandler,
  isInCategories,
  requestFindAds,
} from './helpers';
import { updatePage } from './router';
import { renderMyAccPage } from './account/account';
import {
  renderCategory,
  clearPage,
  addEventListenerLookMoreBtn,
  renderAllCallsOnRequest,
} from './category/category';
import {
  renderPageButton,
  addEventListenerOnPageBtn,
  changeActiveBtn,
} from './pagination/pagination';

const clearRoot = () => {
  document.querySelector('#root').classList.add('main--hide');
  document.querySelector('#root').innerHTML = '';
};
const showRoot = () => {
  document.querySelector('#root').classList.remove('main--hide');
};
export const homePage = async () => {
  recordToAds(await requestAdsPagination({ page: 1 }));
  clearPage();
  console.log(ads);
  renderCategory(ads);
  renderPageButton();
  addEventListenerOnPageBtn();
  addEventListenerLookMoreBtn();
  changeActiveBtn('page-1');
  showRoot();
};
export const page2 = async () => {
  recordToAds(await requestAdsPagination({ page: 2 }));
  clearPage();
  renderCategory(ads);
  renderPageButton();
  addEventListenerOnPageBtn();
  addEventListenerLookMoreBtn();
  changeActiveBtn('page-2');
  showRoot();
};
export const page3 = async () => {
  recordToAds(await requestAdsPagination({ page: 3 }));
  clearPage();
  renderCategory(ads);
  renderPageButton();
  addEventListenerOnPageBtn();
  addEventListenerLookMoreBtn();
  changeActiveBtn('page-3');
  showRoot();
};
export const accountPage = async () => {
  clearRoot();
  document.querySelector('#root').textContent = await renderMyAccPage();

  showRoot();
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
};
export const badUrlPage = () => {
  if (location.pathname === '/page1') {
    updatePage('/');
    return;
  }
  renderBadUrl();
  setTimeout(() => {
    updatePage('/');
  }, 5000);
};
export const searchPage = async () => {
  clearRoot();
  const found = await requestFindAds({ query: location.hash.slice(1) });
  recordToAds({ found: found });
  renderAllCallsOnRequest(ads);
  showRoot();
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
