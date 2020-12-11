import {
  ads,
  categories,
  requestUserInfo,
  requestAddToFavorites,
} from './helpers';
import { updateHistory, updatedContent } from './router';

export const homePage = async () => {
  document.querySelector('#root').textContent =
    'home page - You need to add your logic to these functions';
  // console.log(ads);
  // console.log(categories);
};
export const page2 = () => {
  document.querySelector('#root').textContent =
    '2 page - You need to add your logic to these functions';
};
export const page3 = () => {
  document.querySelector('#root').textContent =
    'page3 - You need to add your logic to these functions';

  // requestAddToFavorites({
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmNmMjg1NDJkNTVkOTAwMTdhZTMzOGUiLCJzaWQiOiI1ZmQyN2JhNDAwMzE5MzAwMTdlOTE3OWIiLCJpYXQiOjE2MDc2Mjk3MzIsImV4cCI6MTYwNzYzMzMzMn0.gmIIPHVBqJY1EW_FCMLdytDHKabnNVVbwDLW-KbINzw',
  //   _id: '5fd076b7deae5f0017e41a7d',
  // }).then(console.log);
};
export const accountPage = async () => {
  document.querySelector('#root').textContent =
    'account page - You need to add your logic to these functions';
  // const info = item => {
  //   localStorage.setItem('haha', JSON.stringify(item));
  // };
  // info(
  //   await requestUserInfo({
  //     token:
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmNmMjg1NDJkNTVkOTAwMTdhZTMzOGUiLCJzaWQiOiI1ZmQyN2JhNDAwMzE5MzAwMTdlOTE3OWIiLCJpYXQiOjE2MDc2Mjk3MzIsImV4cCI6MTYwNzYzMzMzMn0.gmIIPHVBqJY1EW_FCMLdytDHKabnNVVbwDLW-KbINzw',
  //   }),
  // );
  // requestUserInfo({
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmNmMjg1NDJkNTVkOTAwMTdhZTMzOGUiLCJzaWQiOiI1ZmQyN2JhNDAwMzE5MzAwMTdlOTE3OWIiLCJpYXQiOjE2MDc2Mjk3MzIsImV4cCI6MTYwNzYzMzMzMn0.gmIIPHVBqJY1EW_FCMLdytDHKabnNVVbwDLW-KbINzw',
  // }).then(info);
};
const isInCategories = query => {
  if (
    categories.find(item => item.replaceAll(' ', '-') === query) !== undefined
  )
    return true;
  return false;
};
export const categoryPage = () => {
  const category = location.search.slice(1);
  if (!isInCategories(category)) {
    updateHistory('/');
    updatedContent();
    return;
  }

  document.querySelector('#root').textContent =
    category + ' - You need to add your logic to these functions';
};
export const badUrlPage = () => {
  document.querySelector('#root').textContent =
    '404 - You will you will redirect to home page in 5 sec';
  setTimeout(() => {
    updateHistory('/');
    updatedContent();
  }, 5000);
};
export const searchPage = () => {
  document.querySelector(
    '#root',
  ).textContent = `Search query - ${location.search.slice(1)}`;
};
