import { callSearchModal } from '../search-modal';
import { openModalAuth } from '../auth-modal/auth-modal';
import { updatePage } from '../router';
import categoryTemplate from '../../templates/menu-category.hbs';
import { onMainLogoutBtnClick } from '../account/account';
import { openAddCallModal } from '../add-modal/add-modal';

//Ссылки на кнопки модального окна

const modalRefs = {
  menuOpen: document.querySelector('[data-menu-button]'),
  menuClose: document.querySelector('[data-menu-close]'),
  containerMenu: document.querySelector('[data-menu]'),
  backdrop: document.querySelector('[data-backdrop]'),
};

// Функция вызова модального окна и вертикального меню

export const openMenuModal = () => {
  modalRefs.menuOpen.addEventListener('click', openMenu);
  modalRefs.menuClose.addEventListener('click', closeMenu);

  function openMenu() {
    const expanded =
      modalRefs.menuOpen.getAttribute('aria-expanded') === 'true' || false;
    document.body.classList.add('scroll-hidden');
    modalRefs.menuOpen.setAttribute('aria-expanded', !expanded);
    modalRefs.backdrop.classList.add('is-visible');
    modalRefs.containerMenu.classList.add('is-open');
  }

  function closeMenu() {
    document.body.classList.remove('scroll-hidden');
    modalRefs.backdrop.classList.remove('is-visible');
    modalRefs.containerMenu.classList.remove('is-open');
  }
};

// Ссылки на кнопки хедера
const refs = {
  addProductBtn: document.querySelector('[data-add-button]'),
  searchBtn: document.querySelector('[data-search-button]'),
  clearFilterBtn: document.querySelector('[data-clear-button]'),
};

// Май кабинет, Регистрация, Выход (по 2 кнопки)
const myAccountBtn = document.querySelectorAll('[data-account-button]');
const registerBtn = document.querySelectorAll('[data-auth-button]');
const logOutBtn = document.querySelectorAll('[data-logout-button]');
const menuCategoryContainer = document.querySelector('#js-nav');

//Функции для смены кнопок авторизации и Мой кабинет

//Отображает кнопку Мой кабинет
export function showMyAccountBtn() {
  registerBtn.forEach(element => {
    element.classList.add('is-logout');
  });

  myAccountBtn.forEach(element => {
    element.classList.add('is-auth');
  });

  logOutBtn.forEach(element => {
    element.classList.add('is-auth');
  });
}

//Отображает кнoпку регистрации

export function showRegisterBtn() {
  registerBtn.forEach(element => {
    element.classList.remove('is-logout');
  });
  myAccountBtn.forEach(element => {
    element.classList.remove('is-auth');
  });
  logOutBtn.forEach(element => {
    element.classList.remove('is-auth');
  });
}

//Рендер списка категорий

export function markupCategory(categories) {
  const menuMarkup = categoryTemplate(categories);
  menuCategoryContainer.innerHTML = menuMarkup;
}

//Переход по страницам категорий

export function onMenuCategoryClick() {
  Array.from(document.querySelectorAll('.nav-list__link')).map(item => {
    item.onclick = e => {
      e.preventDefault();
      const categoryName = e.target.textContent;
      updatePage('/category', categoryName);
    };
  });
}

//При клике на логотип переход на главную страницу
export function onLogoClick() {
  document.querySelector('.js-logo').addEventListener('click', () => {
    updatePage('/');
  });
}

//При клике на кнопку фильтра сброс категорий и переход на главную страницу
export function onClearFilterClick() {
  refs.clearFilterBtn.addEventListener('click', () => {
    updatePage('/');
  });
}

//Проверка наличия токена и отображение Регистрации или мой кабинет
export function checkAuth() {
  const token = sessionStorage.getItem('accessToken');
  if (token === null) {
    showRegisterBtn();
    return;
  }
  showMyAccountBtn();
}

//Региcтрация
export function onRegisterBtnClick() {
  registerBtn.forEach(function (registerBtn) {
    registerBtn.addEventListener('click', openModalAuth);
  });
}

//Мой кабинет
export function onAccountBtnClick() {
  myAccountBtn.forEach(function (myAccountBtn) {
    myAccountBtn.addEventListener('click', () => {
      updatePage('/account');
    });
  });
}

//Выход из аккаунта
export function onLogoutBtnClick() {
  logOutBtn.forEach(function (logOutBtn) {
    logOutBtn.addEventListener('click', onMainLogoutBtnClick);
  });
}

//Кнопка добавление объявлений

export function onAddButtonClick() {
  const token = sessionStorage.getItem('accessToken');
  if (token === null) {
    openModalAuth();

    return;
  }
  openAddCallModal();
}

//Сборка функций вызовов из хедера
export function addListenersInHeader() {
  openMenuModal();
  onMenuCategoryClick();
  onLogoClick();
  onClearFilterClick();
  onRegisterBtnClick();
  onAccountBtnClick();
  onLogoutBtnClick();

  //Слушатели для кнопок
  refs.searchBtn.addEventListener('click', callSearchModal);

  refs.addProductBtn.addEventListener('click', onAddButtonClick);
  checkAuth();
}
