import { requestUserById } from "../helpers";

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
   requestProductModalUserId();
}
  const productModalBtnOnClickPhoneRef = document.querySelector('.product-modal__btn--on-click-phone');
  function renderProductModalInfo(item) {
   productModalBtnOnClickPhoneRef.insertAdjacentHTML('beforeend', productModalInfoTpl(item));  
  }
  const productModalRef = document.querySelector('.product-modal')
  const productModaUserlId = productModalRef.dataset.userId;
  function requestProductModalUserId(userId) {
    userId = productModaUserlId;
    requestUserById({ userId }).then(renderProductModalInfo);
  }
 
  const productModalImgBig = document.querySelector('.js-product-modal__img-big');
  function addImgList() {
  const productModalId = productModalRef.dataset.id;
  productModalImgBig.insertAdjacentHTML('beforeend', productModalImgListTpl(productModalObj));
    
  }

  addImgList();
}

