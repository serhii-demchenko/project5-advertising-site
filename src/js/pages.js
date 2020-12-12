import { renderBadUrl } from './bad-url';
import {
  ads,
  categories,
  requestUserInfo,
  requestAddToFavorites,
  requestAdsPagination,
  recordToAds,
  requestAdsByCategory,
  categoryRequestHandler,
  isInCategories,
} from './helpers';
import { updatePage } from './router';
import cardTpl from '../templates/card.hbs';

export const homePage = async () => {
  recordToAds(await requestAdsPagination(1));
  console.log(ads);
  document.querySelector('#root').textContent =
    'home page - You need to add your logic to these functions';
  // console.log(ads);
  // console.log(categories);
};
export const page2 = async () => {
  recordToAds(await requestAdsPagination(2));
  console.log(ads);
  document.querySelector('#root').textContent =
    '2 page - You need to add your logic to these functions';
};
export const page3 = async () => {
  recordToAds(await requestAdsPagination(3));
  console.log(ads);
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
export const categoryPage = async () => {
  const category = decodeURI(location.search.slice(1));
  if (!isInCategories(category)) {
    badUrlPage();
    return;
  }
  await categoryRequestHandler(category);
  console.log(ads);

  document.querySelector('#root').textContent =
    category + ' - You need to add your logic to these functions';
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
export const searchPage = () => {
  document.querySelector('#root').textContent = `Search query - ${decodeURI(
    location.search.slice(1),
  )}`;
};
