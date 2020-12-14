import addCallModalTpl from "../../templates/add-modal.hbs";
import { requestCategories } from "../helpers";
import { closeModal, openModal } from "../modal-window";

const refs = {
  categorySelect: document.querySelector("#category-select"),
  categoryList: document.querySelector(".category-select-options > ul"),
  optionName: document.querySelector(".category-selected-option-name"),
};
export function openAddCallModal() {
  openModal(addCallModalTpl());
  document
    .querySelector(".modal-window__item")
    .classList.add("modal-window__add-modal");
  requestCategories(response).then(renderCategoryOptions).catch(error);
  refs.categorySelect.addEventListener("click", onCategorySelectClick);
}

function renderCategoryOptions(response) {
  if (response.ok) {
    refs.categoryList.innerHTML += "`<li>${}</li>`";
  }
}
function onCategorySelectClick(event) {
  refs.categoryList.classList.toggle("hidden");
}

function onCategoryOptionClick(event) {
  refs.optionName.textContent = event.textContent;
}

function preview_image(event) {
  event.target.previousElementSibling.style.display = "none";
  var reader = new FileReader();
  reader.onload = function () {
    event.target.nextElementSibling.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
