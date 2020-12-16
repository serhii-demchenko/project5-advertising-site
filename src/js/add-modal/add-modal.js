import addCallModalTpl from "../../templates/add-modal.hbs";
import { requestCategories } from "../helpers";
import { closeModal, openModal } from "../modal-window";

export function openAddCallModal() {
  openModal(addCallModalTpl());
  document
    .querySelector(".modal-window__item")
    .classList.add("modal-window__add-modal");
  requestCategories().then(renderCategoryOptions);
  document
    .querySelector("#category-select")
    .addEventListener("click", onCategorySelectClick);
  document
    .querySelectorAll('input[type="file"]')
    .forEach((input) =>
      input.addEventListener("click", checkPermissionToUploadImage)
    );
  document
    .querySelectorAll('input[type="file"]')
    .forEach((input) => input.addEventListener("change", uploadImage));
}

function checkPermissionToUploadImage(event) {
  if (event.target.previousElementSibling.classList.contains("hidden")) {
    event.preventDefault();
    return false;
  }
}

function uploadImage(event) {
  event.target.previousElementSibling.classList.add("hidden");
  var reader = new FileReader();
  reader.onload = function () {
    event.target.nextElementSibling.src = reader.result;
    var nextImageUploadElement = event.target.closest(".image-upload")
      .nextElementSibling;
    if (nextImageUploadElement) {
      nextImageUploadElement
        .querySelector(".plus-icon")
        .classList.remove("hidden");
    }
  };
  reader.readAsDataURL(event.target.files[0]);
}

function renderCategoryOptions(response) {
  response.forEach((category) => {
    const newLi = document.createElement("li");
    const newContent = document.createTextNode(category);
    newLi.appendChild(newContent);
    newLi.addEventListener("click", onCategoryOptionClick);
    document.querySelector(".category-select-options > ul").appendChild(newLi);
  });
}

function onCategorySelectClick(event) {
  document.querySelector(".category-select-options").classList.toggle("hidden");
}

function onCategoryOptionClick(event) {
  document.querySelector(".category-selected-option-name").textContent =
    event.target.textContent;
}
