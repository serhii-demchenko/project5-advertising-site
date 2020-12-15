import searchModalTemplate from '../../templates/search-modal.hbs';
import { ads, requestFindAds, recordToAds } from '../helpers';
import { closeModal, openModal } from '../modal-window';
import { searchPage } from '../pages';
import { addRoute, updatePage } from '../router';

export let searchResult = [];
const selectors = {
  modalForm: 'search-modal',
  modalFormInput: 'search-modal-input',
  searchButton: 'search-modal__search-button',
  error: 'search-modal__error',
};
const setSearchModalFocus = () => {
  document
    .querySelector(`.${selectors.modalForm}`)
    [selectors.modalFormInput].focus();
};
const setSearchModalValue = value => {
  document.querySelector(`.${selectors.modalForm}`)[
    selectors.modalFormInput
  ].value = value;
};
const removeDefaultBehavior = () => {
  document
    .querySelector(`.${selectors.modalForm}`)
    .addEventListener('submit', e => {
      e.preventDefault();
    });
};
const showErrorMessage = text => {
  document.querySelector(`.${selectors.error}`).innerHTML = text;
};
const inputHandler = async () => {
  const value = document.querySelector(`.${selectors.modalForm}`)[
    selectors.modalFormInput
  ].value;
  if (value === '') {
    showErrorMessage('Пусте поле пошуку. Введіть щось');
    return;
  }
  searchResult = await requestFindAds({ query: value });
  if (searchResult.length === 0) {
    showErrorMessage('Не знайдено. Введіть щось інше');
    return;
  }
  addRoute({
    path: `/search#${value}`,
    component: searchPage,
    meta: { auth: false },
  });
  updatePage('/search', value);
  closeModal();
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
export const callSearchModal = query => {
  openModal(searchModalTemplate(), '#fff');
  removeDefaultBehavior();
  setSearchModalFocus(); // should I add it?
  addSearchModalClickListener();
  if (typeof query === 'string') setSearchModalValue(query);
};
