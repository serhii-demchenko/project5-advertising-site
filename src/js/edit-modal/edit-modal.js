import editModalTpl from '../../templates/edit-modal.hbs';
import {
  requestCategories,
  requestEditProduct,
  getUserToken,
} from '../helpers';
import { closeModal, openModal } from '../modal-window';
import { ads } from '../helpers';
console.log(ads);
let uploadedImages = [];
let callsCardId = null;
//имитация кнопки Редактировать
setTimeout(() => {
  const editBtnRefs = document.querySelectorAll('.js-edit-card-btn');
  editBtnRefs.forEach(btnRef =>
    btnRef.addEventListener('click', onOpenEditModal),
  );
}, 1000);

export function onOpenEditModal(e) {
  openModal(editModalTpl());

  const deleteCardBtnRef = document.querySelector('#delete-card__btn');
  deleteCardBtnRef.addEventListener('click', onDeleteBtnClick);

  let cardId = e.target.closest('article').dataset.id;
  callsCardId = cardId;

  let card = ads.calls.find(card => card._id === cardId);
  console.log(card);
  const addModalNameRef = document.querySelector('#addModal__name');
  addModalNameRef.value = card.title;
  const addModalDescriptionRef = document.querySelector(
    '#addModal__description',
  );
  addModalDescriptionRef.value = card.description;
  const addModalCategoryRef = document.querySelector(
    '.category-selected-option-name',
  );
  addModalCategoryRef.textContent = card.category;
  const addModalPriceRef = document.querySelector('#addModal__price');
  addModalPriceRef.value = card.price;
  const addModalPhoneRef = document.querySelector('#addModal__phone');
  addModalPhoneRef.value = card.phone;

  document
    .querySelector('.modal-window__item')
    .classList.add('modal-window__add-modal');
  document
    .querySelector('.modal-window__item')
    .classList.add('modal-window__edit');
  requestCategories().then(renderCategoryOptions);
  document
    .querySelector('#category-select')
    .addEventListener('click', onCategorySelectClick);
  document
    .querySelectorAll('input[type="file"]')
    .forEach(input =>
      input.addEventListener('click', checkPermissionToUploadImage),
    );
  document
    .querySelectorAll('input[type="file"]')
    .forEach(input => input.addEventListener('change', uploadImage));
  document
    .querySelector('.modal-window__add-modal-body')
    .addEventListener('submit', onSubmitNewCall);

  const modalCancelBtn = document.querySelector('.cancel-button');
  modalCancelBtn.addEventListener('click', closeModal);
  uploadedImages = [];
}
//функционал для кнопки удаления карточки
function onDeleteBtnClick() {
  console.log('Delete Btn Was Clicked');
}

function checkPermissionToUploadImage(event) {
  if (event.target.previousElementSibling.classList.contains('hidden')) {
    event.preventDefault();
    return false;
  }
}

function uploadImage(event) {
  event.target.previousElementSibling.classList.add('hidden');
  var reader = new FileReader();
  reader.onload = function () {
    event.target.nextElementSibling.src = reader.result;
    var nextImageUploadElement = event.target.closest('.image-upload')
      .nextElementSibling;
    if (nextImageUploadElement) {
      nextImageUploadElement
        .querySelector('.plus-icon')
        .classList.remove('hidden');
    }
  };
  reader.readAsDataURL(event.target.files[0]);
  uploadedImages.push(event.target.files[0]);
}

function renderCategoryOptions(response) {
  response.forEach(category => {
    const newLi = document.createElement('li');
    const newContent = document.createTextNode(category);
    newLi.appendChild(newContent);
    newLi.addEventListener('click', onCategoryOptionClick);
    document.querySelector('.category-select-options > ul').appendChild(newLi);
  });
}

function onCategorySelectClick(event) {
  document.querySelector('.category-select-options').classList.toggle('hidden');
}

function onCategoryOptionClick(event) {
  document.querySelector('.category-selected-option-name').textContent =
    event.target.textContent;
}

function onSubmitNewCall(event) {
  event.preventDefault();

  const postItem = {
    title: document.querySelector(
      ".modal-window__add-modal-body input[name='title']",
    ).value,
    description: document.querySelector(
      ".modal-window__add-modal-body textarea[name='description']",
    ).value,
    category: document.querySelector('.category-selected-option-name')
      .textContent,
    price: document.querySelector(
      ".modal-window__add-modal-body input[name='price']",
    ).value,
    phone: document.querySelector(
      ".modal-window__add-modal-body input[name='phone']",
    ).value,
    file: uploadedImages,
  };

  requestEditProduct({
    token: getUserToken(),
    _id: callsCardId,
    product: postItem,
  }).then(console.log);
  closeModal();
}
