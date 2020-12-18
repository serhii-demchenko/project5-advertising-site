import addCallModalTpl from "../../templates/add-modal.hbs";
import {
  requestCategories,
  requestPostProduct,
  getUserToken,
} from "../helpers";
import { closeModal, openModal } from "../modal-window";

let uploadedImages = [];

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
  document
    .querySelector(".modal-window__add-modal-body")
    .addEventListener("submit", onSubmitNewCall);
  uploadedImages = [];
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
  uploadedImages.push(event.target.files[0]);
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

function onSubmitNewCall(event) {
  event.preventDefault();

  const postItem = {
    title: document.querySelector(
      ".modal-window__add-modal-body input[name='title']"
    ).value,
    description: document.querySelector(
      ".modal-window__add-modal-body textarea[name='description']"
    ).value,
    category: document.querySelector(".category-selected-option-name")
      .textContent,
    price: document.querySelector(
      ".modal-window__add-modal-body input[name='price']"
    ).value,
    phone: document.querySelector(
      ".modal-window__add-modal-body input[name='phone']"
    ).value,
    file: uploadedImages,
  };

  requestPostProduct({ token: getUserToken(), product: postItem }).then(
    console.log
  );
  closeModal();
}
