import searchModalTemplate from '../../templates/search-modal.hbs';
import { closeModal, openModal } from '../modal-window';
import { updatedContent, updateHistory } from '../router';

const selectors = {
  modalForm: 'search-modal',
  modalFormInput: 'search-modal-input',
  searchButton: 'search-modal__search-button',
};
const setSearchModalFocus = () => {
  document
    .querySelector(`.${selectors.modalForm}`)
    [selectors.modalFormInput].focus();
};
const removeDefaultBehavior = () => {
  document
    .querySelector(`.${selectors.modalForm}`)
    .addEventListener('submit', e => {
      e.preventDefault();
    });
};
const showErrorMessage = text => {
  console.log(text);
};
const inputHandler = () => {
  const value = document.querySelector(`.${selectors.modalForm}`)[
    selectors.modalFormInput
  ].value;
  if (value === '') {
    showErrorMessage('Пусте поле пошуку. Введіть категорію');
    return;
  }
  updateHistory('/search');
  location.search = value.replaceAll(' ', '&');
  updatedContent();
};
const searchButtonHandler = el => {
  if (el === null) return false;
  if (el.classList.contains(selectors.searchButton)) return true;
  return searchButtonHandler(el.parentElement);
};
const searchModalClickHandler = e => {
  e.preventDefault();
  if (searchButtonHandler(e.target)) {
    inputHandler();
  }
};
const addSearchModalClickListener = () => {
  document
    .querySelector(`.${selectors.modalForm}`)
    .addEventListener('click', searchModalClickHandler);
};
export const callSearchModal = () => {
  openModal(searchModalTemplate());
  removeDefaultBehavior();
  setSearchModalFocus(); // should I add it?
  addSearchModalClickListener();
};
