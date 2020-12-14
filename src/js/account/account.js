import { openModal, closeModal } from '../modal-window/index';
import { requestUserLogout } from '../helpers/API/index';

const logoutMainBtnRef = document.querySelector('[data-logout-button]');
logoutMainBtnRef.addEventListener('click', onMainLogoutBtnClick);

function onMainLogoutBtnClick() {
  openModal(
    '<div class="modal-wrapper"><h3 class="modal-title">Ви дійсно хочете вийти з акаунта?</h3><div class="buttons-wrapper"><button type="button" class="modal-logout" >ВИЙТИ</button><button type="button" class="modal-cancel" >ВІДМІНА</button></div></div>',
  );
  const modalWrapperRef = document.querySelector('.modal-wrapper');
  modalWrapperRef.parentElement.classList.add('logout-window');
  const logoutModalBtnRef = document.querySelector('.modal-logout');
  logoutModalBtnRef.addEventListener('click', onModalLogoutBtnClick);

  const closeModalBtnRef = document.querySelector('.modal-cancel');
  closeModalBtnRef.addEventListener('click', closeModal, { once: true });
}

function onModalLogoutBtnClick() {
  requestUserLogout();
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('sid');
}
