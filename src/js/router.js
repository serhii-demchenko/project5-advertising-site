import { requestCategories } from './helpers';
import { categories } from '../index';

const homePage = () => {
  document.querySelector('#root').textContent =
    'home page - You need to add your logic to these functions';
};
const allPage = () => {
  document.querySelector('#root').textContent =
    'all page - You need to add your logic to these functions';
};
const accountPage = () => {
  document.querySelector('#root').textContent =
    'account page - You need to add your logic to these functions';
};
const categoryPage = cat => {
  document.querySelector('#root').textContent =
    cat + ' - You need to add your logic to these functions';
};
const badUrlPage = () => {
  document.querySelector('#root').textContent =
    '404 - You will you will redirect to home page in 5 sec';
  setTimeout(() => {
    updateHistory('/');
    updatedContent();
  }, 5000);
};
const routers = [
  {
    path: '/',
    component: homePage,
    meta: { auth: false },
  },
  {
    path: '/all',
    component: allPage,
    meta: { auth: false },
  },
  {
    path: '/account',
    component: accountPage,
    meta: { auth: true },
  },
];
const writeCategories = arr => {
  categories.push(...arr);
};
export const addCategoriesToRouters = async () => {
  writeCategories(await requestCategories());
  const receivedCatogories = categories.map(item => {
    return {
      path: `/category:${item.replaceAll(' ', '')}`,
      component: categoryPage.bind(window, item.replaceAll(' ', '')),
      meta: { auth: false },
    };
  });
  routers.push(...receivedCatogories);
};
const checkAuth = () => {
  console.log(localStorage.getItem('accessToken'));
  return true;
};
let startState = true;

export const updateHistory = query => {
  let router = routers.find(item => item.path === query);
  if (!router) return;
  if (!router.meta.auth || !checkAuth()) history.pushState(query, null, query);
};
export const updatedContent = () => {
  let router = routers.find(
    item => item.path === history.state || item.path === location.pathname,
  );
  if (!router) {
    badUrlPage();
    return;
  }
  if (!router.meta.auth || !checkAuth()) {
    router.component(); // call component
  } else if (router.meta.auth && checkAuth() && startState) {
    routers[0].component(); // call if no avtorized
    history.pushState(routers[0].path, null, routers[0].path);
  }
  startState = false;
};
