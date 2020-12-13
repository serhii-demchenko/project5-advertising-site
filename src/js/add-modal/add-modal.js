function preview_image(event) {
  event.target.previousElementSibling.style.display = "none";
  var reader = new FileReader();
  reader.onload = function () {
    event.target.nextElementSibling.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
