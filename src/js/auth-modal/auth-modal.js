import { openModal, closeModal } from '../modal-window/index.js';
import { requestUserRegistration, requestUserLogin } from '../helpers/index.js';
import { showMyAccountBtn } from '../header/header.js';
import authModalTpl from '../../templates/auth-modal.hbs';
import { checkUserFavIcons } from '../card/addAllUserFav';
import { updatePage } from '../router.js';

export function openModalAuth() {
  const markup = authModalTpl();

  openModal(markup);

  const refs = {
    modalTitle: document.querySelector('.modal-window__item_auth__title'),
  };
  refs.wrapper = refs.modalTitle.parentNode;
  refs.inpEmail = refs.wrapper.querySelector(
    '.modal-window__item_auth__input[name="email"]',
  );
  refs.inpPassword = refs.wrapper.querySelector(
    '.modal-window__item_auth__input[name="password"]',
  );
  refs.spanEmail = refs.wrapper.querySelector('.modal-window__error-email');
  refs.spanPassword = refs.wrapper.querySelector(
    '.modal-window__error-password',
  );

  refs.wrapper.classList.add('modal-window__item_auth');

  refs.wrapper.addEventListener('click', e => {
    if (e.target.classList.contains('modal-window__item_auth__button_login')) {
      // email login
      if (validateInputs()) {
        const email = refs.inpEmail.value,
          password = refs.inpPassword.value;
        // sent to server
        requestUserLogin({ email, password })
          .then(response => {
            console.log(response);
            if (response.message === 'Password is wrong') {
              notValid(
                refs.inpPassword,
                refs.spanPassword,
                'Введіть правильний пароль.',
              );
              refs.inpPassword.focus();
            } else if (!response.accessToken) {
              notValid(refs.inpPassword, refs.spanPassword, response.message);
            } else {
              // Redirect to account
              sessionStorage.setItem('accessToken', response.accessToken);
              sessionStorage.setItem('refreshToken', response.refreshToken);
              sessionStorage.setItem('sid', response.sid);
              showMyAccountBtn();
              closeModal();
              checkUserFavIcons();
            }
          })
          .catch(error => {
            console.log(error);
            alert('Вибачте, сервер не працює, але ми вже лагодимо його.');
            closeModal();
          });
      }
    } else if (e.target.classList.contains('modal-window__item_auth__button')) {
      // email registration
      if (validateInputs()) {
        const email = refs.inpEmail.value,
          password = refs.inpPassword.value;
        // sent to server
        requestUserRegistration({ email, password })
          .then(response => {
            console.log(response);
            // Redirect to account
            closeModal();
          })
          .catch(error => {
            console.log(error);
            alert('Вибачте, сервер не працює, але ми вже лагодимо його.');
            closeModal();
          });
      }
    }
  });

  function validateInputs() {
    let result = true;
    if (
      validate(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        refs.inpEmail.value,
      )
    ) {
      valid(refs.inpEmail, refs.spanEmail, '');
    } else {
      notValid(refs.inpEmail, refs.spanEmail, 'Не валідний email');
      result = false;
      refs.inpEmail.focus();
    }
    if (
      validate(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g,
        refs.inpPassword.value,
      )
    ) {
      valid(refs.inpPassword, refs.spanPassword, '');
    } else {
      notValid(
        refs.inpPassword,
        refs.spanPassword,
        'Пароль має містити від 6 символів з великими, маленькими латинськими буквами і цифрами.',
      );
      if (result) refs.inpPassword.focus();
      result = false;
    }
    return result;
  }

  function validate(regex, inp) {
    return regex.test(inp);
  }

  function notValid(inp, el, mess) {
    inp.classList.add('is-invalid');
    el.innerHTML = mess;
  }

  function valid(inp, el, mess) {
    inp.classList.remove('is-invalid');
    inp.classList.add('is-valid');
    el.innerHTML = mess;
  }
}

export function googleAuth() {
  const url = location.search;
  if (url.slice(1, 12) === 'accessToken') {
    sessionStorage.setItem(
      'accessToken',
      url.slice(
        url.indexOf('?accessToken=') + 13,
        url.indexOf('&refreshToken='),
      ),
    );
    sessionStorage.setItem(
      'refreshToken',
      url.slice(url.indexOf('&refreshToken=') + 14, url.indexOf('&sid=')),
    );
    sessionStorage.setItem('sid', url.slice(url.indexOf('&sid=') + 5, -1));
    location.search = '';
    updatePage('/');
  }
}
