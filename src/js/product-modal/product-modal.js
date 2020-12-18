
export function productModalAddEventListeners() {
  document.querySelector('.product-modal').addEventListener('click', e => {
    e.preventDefault();
  });
  const productModalBtnRef = document.querySelector(
    '.js-product-modal__btn--less-on-click',
  );
  const productModalOnClickBtnRef = document.querySelector(
    '.js-product-modal__btn--on-click',
  );
  productModalBtnRef.addEventListener('click', addClassVisuallyHidden);
  productModalOnClickBtnRef.addEventListener(
    'click',
    removeClassVisuallyHidden,
  );
function addClassVisuallyHidden(e) {
  if (!e.target.classList.contains('visually-hidden')) {
    e.target.classList.add('visually-hidden');
  }
  productModalOnClickBtnRef.classList.remove('visually-hidden');
}

function removeClassVisuallyHidden(e) {
  if (!e.target.classList.contains('visually-hidden')) {
    e.target.classList.add('visually-hidden');
  }
   productModalBtnRef.classList.remove('visually-hidden');
}
  const productModalBoxImgSmallRef = document.querySelector('.product-modal__box-img-small');
  const productModalBoxImgBigRef = document.querySelector('.product-modal__box-img-big');
  productModalBoxImgSmallRef.addEventListener('click', onClickChangeClassProductModalImg )
  function onClickChangeClassProductModalImg(e) {
      e.target.classList.add('product-modal__box-img-big');
      e.target.classList.remove('product-modal__box-img-small');
       productModalBoxImgBigRef.classList.remove('product-modal__box-img-big');
       productModalBoxImgBigRef.classList.add('product-modal__box-img-small'); 
  }
  // function renderMoreImg(array) {
  //   if (array.length > 1) {
  //     
  //     productModalBoxImgBigRef.insertAdjacentHTML('beforeend', productModalListTpl);
  //   }
  // }
}

