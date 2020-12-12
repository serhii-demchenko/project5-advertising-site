import modalTemplate from '../../templates/modal-window.hbs';

const DELAY = 250;
const selectors = {
  modal: 'modal-window',
  modalItem: 'modal-window__item',
  modalHidden: 'modal-window--hidden',
  modalCloseButton: 'modal-window__close-button',
};

const createModal = () => {
  document.body.insertAdjacentHTML('beforeend', modalTemplate());
};
const modalHide = () => {
  document
    .querySelector(`.${selectors.modal}`)
    .classList.add(selectors.modalHidden);
};
const modalShow = () => {
  document
    .querySelector(`.${selectors.modal}`)
    .classList.remove(selectors.modalHidden);
};
const addAnimation = (cbBeforeAnimation, cbAfterAnimation) => {
  cbBeforeAnimation();
  setTimeout(cbAfterAnimation, DELAY);
};
const pastleTemplate = template => {
  document
    .querySelector(`.${selectors.modalItem}`)
    .insertAdjacentHTML('beforeend', template);
};
const pastleElement = el => {
  console.log(el);
  document
    .querySelector(`.${selectors.modalItem}`)
    .insertAdjacentElement('beforeend', el);
};
const closeButtonHandler = el => {
  if (el.parentElement === null) return false;
  if (el.classList.contains(selectors.modalCloseButton)) {
    return true;
  }
  return closeButtonHandler(el.parentElement);
};
const modalEventHandler = e => {
  if (
    e.target.classList.contains(selectors.modal) ||
    closeButtonHandler(e.target) ||
    e.key === 'Escape'
  ) {
    // close when click outside modal,close button or keyup Escape button
    closeModal();
    return;
  }
};
const addEventListeners = () => {
  document.addEventListener('keyup', modalEventHandler);
  document
    .querySelector(`.${selectors.modal}`)
    .addEventListener('click', modalEventHandler);
};
const removeEventListeners = () => {
  document.removeEventListener('keyup', modalEventHandler);
  document
    .querySelector(`.${selectors.modal}`)
    .removeEventListener('click', modalEventHandler);
};
const deleteModalFromDOM = () => {
  document.querySelector(`.${selectors.modal}`).remove();
};
export const openModal = item => {
  if (document.querySelector(`.${selectors.modal}`)) {
    closeModal();
  }
  createModal();
  if (typeof item === 'object') pastleElement(item);
  else if (typeof item === 'string') pastleTemplate(item);
  addAnimation(() => {}, modalShow);
  addEventListeners();
};
export const closeModal = () => {
  removeEventListeners();
  addAnimation(modalHide, deleteModalFromDOM);
};
