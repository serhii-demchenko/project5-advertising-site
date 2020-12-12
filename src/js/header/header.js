(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const menuBtnRefClose = document.querySelector('[data-menu-close]');
  const mobileMenuRef = document.querySelector('[data-menu]');
  const mobileBackdropRef = document.querySelector('[data-backdrop]');
  const body = document.querySelector('body');

  const toggleMenu = () => {
  const expanded = menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    body.classList.toggle('scroll-hidden');
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackdropRef.classList.add('is-visible');
  };
  menuBtnRef.addEventListener('click', () => {
    toggleMenu();
  });
  menuBtnRefClose.addEventListener('click', () => {
    mobileBackdropRef.classList.remove('is-visible');
});
})();

const refs = {
  // myAccountBtn: document.querySelectorAll('[data-account-button]'),
  // registerBtn: document.querySelectorAll('[data-auth-button]'),
  // logOutBtn: document.querySelectorAll('[data-logout-button]'),
  addProductBtn: document.querySelector('[data-add-button]'),
  searchBtn: document.querySelector('[data-search-button]'),
  clearFilterBtn: document.querySelector('[data-clear-button]'),
  
}

const myAccountBtn = document.querySelectorAll('[data-account-button]');
const registerBtn = document.querySelectorAll('[data-auth-button]');
const logOutBtn = document.querySelectorAll('[data-logout-button]');

//Функции для смены кнопок авторизации и Мой кабинет

//Отображает кнопку Мой кабинет

export function getMyAccountBtn() {
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
 
//Отображает кнлпку регистрации
export function getRegisterBtn() {
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

