import addCallModalTpl from '../../templates/add-modal.hbs';
import { requestCategories } from '../helpers';
import { closeModal, openModal } from '../modal-window';

/*const refs = {
  categorySelect: document.querySelector("#category-select"),
};
categoryList: document.querySelector(".category-select-options > ul"),
  optionName: document.querySelector(".category-selected-option-name"),
};*/

export function openAddCallModal() {
  openModal(addCallModalTpl());
  document
    .querySelector('.modal-window__item')
    .classList.add('modal-window__add-modal');
  requestCategories().then(renderCategoryOptions);
  document
    .querySelector('#category-select')
    .addEventListener('click', onCategorySelectClick);
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

/*function preview_image(event) {
  event.target.previousElementSibling.style.display = "none";
  var reader = new FileReader();
  reader.onload = function () {
    event.target.nextElementSibling.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}*/
