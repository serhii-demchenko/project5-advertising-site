import { categories } from './helpers';
import { categoryPage, routers, badUrlPage } from './pages';
import { callSearchModal } from './search-modal';

export const addRoute = ({ path, component, meta }) => {
  routers.push({
    path,
    component,
    meta,
  });
};
export const addCategoriesToRouter = () => {
  categories.forEach(item => {
    addRoute({
      path: `/category#${item}`,
      component: categoryPage,
      meta: { auth: false },
    });
  });
};
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
  let search = routers.find(
    item => item.path === location.pathname + location.hash,
  );
  if (location.pathname === '/search' && !search) {
    callSearchModal(location.hash.slice(1));
    return;
  }
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
  updateHistory(query + (searchQuery === undefined ? '' : '#' + searchQuery));
  updatedContent();
};
