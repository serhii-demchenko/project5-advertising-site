import './scss/main.scss';
// import './js/header/header';
// import './js/auth-modal/auth-modal';
import renderFooter from './js/footer/footer';
import { addListenersInHeader, markupCategory } from './js/header/header';
import { updatedContent, addCategoriesToRouter } from './js/router';
import { getAddListenersInCard } from './js/card/card';
import { addScrollUp } from './js/scrollUp';

import {
  recordToCategories,
  requestCategories,
  requestUserLogin,
  categories,
  refreshTokenRequest,
  requestPostProduct,
} from './js/helpers';

const onLoadPage = async () => {
  recordToCategories(await requestCategories());
  addCategoriesToRouter();
  updatedContent();

  console.log('load page');
  // login imitation
  // requestUserLogin({
  //   email: 'user@example.com',
  //   password: 'qwerty123',
  // }).then(obj => {
  //   console.log(obj);
  //   sessionStorage.setItem('accessToken', obj.accessToken);
  //   sessionStorage.setItem('refreshToken', obj.refreshToken);
  //   sessionStorage.setItem('sid', obj.sid);
  // });
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

// document.body.insertAdjacentHTML(
//   'beforeend',
//   '<input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple><button class="button_test">Тык!</button>',
// );
// let obj = {};

// const input = document.querySelector('#image_uploads');
// input.addEventListener('change', e => {
//   obj = {
//     title: 'Xiaomi RedmiBook 14 II i7 10th 16/512Gb/MX350 Silver',
//     description: 'Xiaomi RedmiBook 14 II i7 10th 16/512Gb/MX350 Silver',
//     category: 'electronics',
//     price: '25138',
//     phone: '+380670000000',
//     file: e.target.files,
//   };
// });

// document.querySelector('.button_test').addEventListener('click', e => {
//   console.log(obj);
//   requestPostProduct({
//     token: sessionStorage.getItem('accessToken'),
//     product: obj,
//   }).then(console.log);
// });
