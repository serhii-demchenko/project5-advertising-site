const productModalBtnRef = document.querySelector('.js-product-modal__btn--less-on-click');
const productModalOnClickBtnRef = document.querySelector('.js-product-modal__btn--on-click');
productModalBtnRef.addEventListener('click', addClassVisuallyHidden);
productModalOnClickBtnRef.addEventListener('click', removeClassVisuallyHidden);

export function addClassVisuallyHidden(e) {
    if (!e.target.classList.contains('visually-hidden')) {
        e.target.classList.add('visually-hidden')
    }
}

export function removeClassVisuallyHidden(e) {
  if (e.target.classList.contains('visually-hidden')) {
      e.target.classList.remove('visually-hidden')
     }    
}



