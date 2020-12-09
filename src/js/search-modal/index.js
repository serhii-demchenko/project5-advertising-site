import searchModalTemplate from '../../templates/search-modal.hbs';
import { closeModal, openModal } from '../modal-window';

const refs = {
  modalForm: 'search-modal',
  modalFormInput: 'search-modal-input',
  searchButton: 'search-modal__search-button',
};

const setSearchModalFocus = () => {
  document.querySelector(`.${refs.modalForm}`)[refs.modalFormInput].focus();
};
const removeDefaultBehavior = () => {
  document.querySelector(`.${refs.modalForm}`).addEventListener('submit', e => {
    e.preventDefault();
  });
};
const showErrorMessage = text => {
  console.log(text);
};
const inputHandler = () => {
  const value = document.querySelector(`.${refs.modalForm}`)[
    refs.modalFormInput
  ].value;
  if (value === '') {
    showErrorMessage('Пусте поле пошуку. Введіть категорію');
    return;
  }
  location.hash = `#${value}`;
  closeModal();
};
const searchButtonHandler = el => {
  if (el === null) return false;
  if (el.classList.contains(refs.searchButton)) return true;
  return searchButtonHandler(el.parentElement);
};
const searchModalClickHandler = e => {
  if (searchButtonHandler(e.target)) {
    // A request to the back-end with input value.
    // If the answer is empty or input value is null then display the message
    // Then call render category and change url query
    //
    // input value - document.querySelector(`.${refs.modalForm}`)[refs.modalFormInput].value
    inputHandler();
  }
};
const addSearchModalClickListener = () => {
  document
    .querySelector(`.${refs.modalForm}`)
    .addEventListener('click', searchModalClickHandler);
};
export const callSearchModal = () => {
  openModal(searchModalTemplate());
  removeDefaultBehavior();
  setSearchModalFocus(); // should I add it?
  addSearchModalClickListener();
};
