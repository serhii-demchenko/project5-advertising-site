import {
  accountPage,
  badUrlPage,
  categoryPage,
  homePage,
  page2,
  page3,
  searchPage,
} from './pages.js';

const routers = [
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
  {
    path: '/search',
    component: searchPage,
    meta: { auth: false },
  },
  {
    path: '/category',
    component: categoryPage,
    meta: { auth: false },
  },
];
const checkAuth = () => {
  if (sessionStorage.getItem('accessToken') !== null) {
    return false;
  }
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
export const updatePage = (query, searchQuery) => {
  updateHistory(query);
  if (searchQuery === undefined) {
    updatedContent();
    return;
  }
  location.search = searchQuery.replaceAll(' ', '&');
};
