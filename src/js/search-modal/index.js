import searchModalTemplate from '../../templates/search-modal.hbs';

const refs = {
  modal: 'search-modal',
  modalForm: 'search-modal__form',
  modalFormInput: 'search-modal-input',
  searchButton: 'search-modal__search-button',
  closeButton: 'search-modal__close-button',
};
const DELAY = 250;

const animationWrapper = (cb, cbAfterDelay) => {
  cb();
  setTimeout(cbAfterDelay, DELAY);
};
const renderSearchModal = () => {
  document.body.insertAdjacentHTML('beforeend', searchModalTemplate());
};
const removeClass = () => {
  document
    .querySelector(`.${refs.modal}`)
    .classList.remove('search-modal--hidden');
};
const addClass = () => {
  document
    .querySelector(`.${refs.modal}`)
    .classList.add('search-modal--hidden');
};
const openSearchModal = () => {
  animationWrapper(renderSearchModal, removeClass);
};
const setSearchModalFocus = () => {
  document.querySelector(`.${refs.modalForm}`)[refs.modalFormInput].focus();
};
const closeSearchModal = () => {
  animationWrapper(addClass, removeSearchModal);
};
const removeDefaultBehavior = () => {
  document.querySelector(`.${refs.modalForm}`).addEventListener('submit', e => {
    e.preventDefault();
  });
};
const buttonClickHandler = (el, buttonClass) => {
  if (el === null) return false;
  if (el.classList.contains(buttonClass)) {
    return true;
  }
  return buttonClickHandler(el.parentElement, buttonClass);
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
  }
  location.hash = `#${value}`;
};
const searchModalClickHandler = e => {
  if (
    e.target.classList.contains(refs.modal) ||
    buttonClickHandler(e.target, refs.closeButton) ||
    e.key === 'Escape'
  ) {
    // close when click outside modal,close button or keyup Escape button
    closeSearchModal();
    return;
  }
  if (buttonClickHandler(e.target, refs.searchButton)) {
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
    .querySelector(`.${refs.modal}`)
    .addEventListener('click', searchModalClickHandler);
  document.addEventListener('keyup', searchModalClickHandler);
};
const removeSearchModal = () => {
  document.querySelector(`.${refs.modal}`).remove();
  document.removeEventListener('keyup', searchModalClickHandler);
};

export const callSearchModal = () => {
  openSearchModal();
  removeDefaultBehavior();
  // setSearchModalFocus(); // should I add it?
  addSearchModalClickListener();
};
