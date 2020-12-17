import { openModal, closeModal } from '../modal-window/index';
import { requestUserLogout } from '../helpers/API/index';
import { showRegisterBtn } from '../header/header';
import logoutModalTpl from '../../templates/logoutModalTpl.hbs';
import { getUserToken } from '../helpers/index';
import { updatePage } from '../router';

//Функция вызова модалки для выхода

export function onMainLogoutBtnClick() {
  openModal(logoutModalTpl());
  const modalWrapperRef = document.querySelector('.modal-wrapper');
  modalWrapperRef.parentElement.classList.add('logout-window');
  const logoutModalBtnRef = document.querySelector('.modal-logout');
  logoutModalBtnRef.addEventListener('click', onModalLogoutBtnClick);

  const closeModalBtnRef = document.querySelector('.modal-cancel');
  closeModalBtnRef.addEventListener('click', closeModal, { once: true });
}

export function onModalLogoutBtnClick() {
  requestUserLogout({ token: getUserToken() });
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('sid');
  showRegisterBtn();
  closeModal();
  updatePage('/');
}

// Отрисовка страницы Мой кабинет
import { renderMyFav } from '../favorites/favorites';
import { renderMyCalls } from '../my-calls/my-calls';

export async function renderMyAccPage() {
  await renderMyFav();
  renderMyCalls();
}
