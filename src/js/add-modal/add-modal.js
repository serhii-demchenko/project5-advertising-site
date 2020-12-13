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
  categoryList: document.querySelector(".category-list"),
  optionSelected: document.querySelector(".category-option"),
  optionName: document.querySelectorAll(".option-name"),
};

refs.categorySelect.addEventListener("click", onClick);

function onClick(event) {
  if (refs.categoryList.style.display == "none") {
    refs.categoryList.style.display = "block";
  } else {
    refs.categoryList.style.display = "none";
  }
}

refs.optionSelected.addEventListener("click", onSelect);

function onSelect(event) {
  refs.optionName.textContent = refs.optionSelected.textContent;
}
