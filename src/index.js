import './scss/main.scss';

import './js/header/header';

import './js/auth-modal/auth-modal';
import renderFooter from './js/footer/footer';
import { updatedContent, updatePage } from './js/router';

import {
    openMenuModal,
    markupCategory,
    onMenuCategoryClick,
    onLogoClick,
    onClearFilterClick,
    checkAuth,
} from './js/header/header';
import {
  recordToAds,
  requestAdsPagination,
  recordToCategories,
  requestCategories,
  requestUserLogin,
  categories,
  requestPostProduct,
} from './js/helpers';

const onLoadPage = async () => {
  recordToCategories(await requestCategories());
  updatedContent();
    
  // login imitation
  requestUserLogin({
    email: 'user@example.com',
    password: 'qwerty123',
  }).then(obj => {
    console.log(obj);
    sessionStorage.setItem('accessToken', obj.accessToken);
    sessionStorage.setItem('refreshToken', obj.refreshToken);
    sessionStorage.setItem('sid', obj.sid);
  });
    openMenuModal();
    markupCategory(categories);
    onMenuCategoryClick();
    onLogoClick();
    onClearFilterClick();
    checkAuth();
};
renderFooter();
window.addEventListener('load', onLoadPage);
window.onpopstate = async event => {
  updatedContent();
};

// setTimeout(() => {
//   const cat = 'free';
//   updateHistory(`/category:${cat}`);
//   updatedContent();
// }, 5000);
