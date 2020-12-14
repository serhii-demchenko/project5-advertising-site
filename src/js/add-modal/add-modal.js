function preview_image(event) {
  event.target.previousElementSibling.style.display = "none";
  var reader = new FileReader();
  reader.onload = function () {
    event.target.nextElementSibling.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

const refs = {
  categorySelect: document.querySelector("#category-select"),
  categoryList: document.querySelector(".category-select-options"),
  optionName: document.querySelector(".category-selected-option-name"),
};

refs.categorySelect.addEventListener("click", onCategorySelectClick);

function onCategorySelectClick(event) {
  refs.categoryList.classList.toggle("hidden");
}

function onSelect(event) {
  refs.optionName.textContent = event.textContent;
}
