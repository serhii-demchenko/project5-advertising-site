import { categories } from './helpers';
import {
  accountPage,
  allPage,
  badUrlPage,
  categoryPage,
  homePage,
} from './pages.js';

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

export const addCategoriesToRouters = () => {
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
