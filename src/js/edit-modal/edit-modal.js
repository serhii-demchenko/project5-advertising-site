import editModalTpl from '../../templates/edit-modal.hbs';
import {
  requestCategories,
  requestEditProduct,
  getUserToken,
} from '../helpers';
import { updatePage } from '../router';
import { closeModal, openModal } from '../modal-window';
import { removeProduct } from '../my-calls/remove-my-calls';
import {
  checkPermissionToUploadImage,
  renderCategoryOptions,
  onCategorySelectClick,
} from '../add-modal/add-modal';
import { ads } from '../helpers';
let uploadedImages = [];
let callsCardId = null;

// async function imgHandler(item, index) {
//   const imgBox = document.querySelector('#added_image');
//   imgBox.children[index].querySelector('.output_image').src = item;
//   imgBox.children[index].querySelector('.plus-icon').classList.add('hidden');
//   console.log(item);
//   fetch(item, { method: 'GET', mode: 'no-cors' }).then(r => {
//     r.blob().then(console.log);
//   });
//   if (imgBox.children[index].nextElementSibling) {
//     imgBox.children[index].nextElementSibling
//       .querySelector('.plus-icon')
//       .classList.remove('hidden');
//   }
// }
//функция для открытия модалки редактирования карточки товара
export function onOpenEditModal(e) {
  openModal(editModalTpl());
  const deleteCardBtnRef = document.querySelector('#delete-card__btn');
  deleteCardBtnRef.addEventListener('click', onDeleteBtnClick);

  let cardId = e.target.closest('article').dataset.id;
  callsCardId = cardId;

  let card = ads.calls.find(card => card._id === cardId);
  // card.imageUrls.map(imgHandler);
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
    .addEventListener('submit', onSubmitEditCall);

  const modalCancelBtn = document.querySelector('.cancel-button');
  modalCancelBtn.addEventListener('click', closeModal);
  uploadedImages = [];
}
//функционал для кнопки удаления карточки
function onDeleteBtnClick() {
  removeProduct(getUserToken(), callsCardId);
  closeModal();
  console.log('Клик по кнопке удаления карточки товара');
  updatePage('/account');
}
//функция для загрузки изображений
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
//функция запроса на редактирование карточки товара
function onSubmitEditCall(event) {
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
  }).then(data => {
    console.log(data);
    updatePage('/account');
  });
  closeModal();
}
