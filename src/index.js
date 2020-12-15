import "./scss/main.scss";
import "./js/header/header";
import "./js/auth-modal/auth-modal";
import renderFooter from "./js/footer/footer";
import { addListenersInHeader, markupCategory } from "./js/header/header";
import { updatedContent, addCategoriesToRouter } from './js/router';
import { getAddListenersInCard } from './js/card/card';

import {
  recordToCategories,
  requestCategories,
  requestUserLogin,
  categories,
  refreshTokenRequest,
} from './js/helpers';


const onLoadPage = async () => {
  recordToCategories(await requestCategories());
  addCategoriesToRouter();
  updatedContent();

  console.log("load page");
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
window.addEventListener("load", onLoadPage);
window.onpopstate = async (event) => {
  updatedContent();
};
setInterval(refreshTokenRequest, 10 * 60 * 1000);
// const obj = {
//   title: 'Redmi note 7',
//   description: 'Used Redmi note 7',
//   category: 'electronics',
//   price: '2000',
//   phone: '+380670000000',
//   file: [],
// };
// document.body.insertAdjacentHTML(
//   'beforeend',
//   '<input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple><button class="button_test">Тык!</button>',
// );

// setTimeout(() => {
//   const cat = 'free';
//   updateHistory(`/category:${cat}`);
//   updatedContent();
// }, 5000);

// const input = document.querySelector('#image_uploads');
// input.addEventListener('change', e => {
//   // const file = e.target.files[0];

//   // let reader = new FileReader();
//   // reader.readAsBinaryString(file);
//   // reader.onload = function () {
//   //   obj.file = reader.result;
//   // };
//   e.target.files.forEach(file => {
//     let reader = new FileReader();
//     reader.readAsBinaryString(file);
//     reader.onload = function () {
//       obj.file.push(reader.result);
//     };
//     reader.onerror = function () {
//       console.log(reader.error);
//     };
//   });
// });
// console.log(obj);

// document.querySelector('.button_test').addEventListener('click', e => {
//   requestPostProduct({
//     token: sessionStorage.getItem('accessToken'),
//     product: obj,
//   }).then(console.log);
// });
