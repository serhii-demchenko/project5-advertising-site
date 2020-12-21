import { requestUserById } from '../helpers';

function addClassVisuallyHidden() {
  document
    .querySelector('.js-product-modal__btn--less-on-click')
    .classList.add('visually-hidden');
  document
    .querySelector('.js-product-modal__btn--on-click')
    .classList.remove('visually-hidden');
  requestProductModalUserId();
}
function removeClassVisuallyHidden() {
  document
    .querySelector('.js-product-modal__btn--on-click')
    .classList.add('visually-hidden');
  document
    .querySelector('.js-product-modal__btn--less-on-click')
    .classList.remove('visually-hidden');
}
function renderProductModalInfo(item) {
  document.querySelector('.product-modal__btn--on-click-mail').textContent =
    item.email;
  document.querySelector('.product-modal__btn--on-click-date').textContent =
    ' - На OLX с ' + new Date(item.registrationDate).toLocaleDateString();
}
function requestProductModalUserId() {
  const userId = document.querySelector('.product-modal').dataset.userid;
  requestUserById({ userId }).then(item => renderProductModalInfo(item));
}
function addEventListenerBigImgBtn() {
  document
    .querySelector('.product-modal__box-img')
    .addEventListener('click', e => {
      const maxImg = document.querySelectorAll(
        '.product-modal__box-img-small-btn',
      ).length;
      const current =
        Number.parseInt(
          document.querySelector('.product-modal__box-img-small-btn--accent')
            .dataset.index,
        ) + 1;
      document
        .querySelectorAll('.product-modal__box-img-small-btn')
        .forEach(item =>
          item.classList.remove('product-modal__box-img-small-btn--accent'),
        );
      if (current + 1 > maxImg) {
        document.querySelector(
          '.js-product-modal__img-big',
        ).src = document.querySelector('[data-index="0"]').children[0].src;
        document
          .querySelector('[data-index="0"]')
          .classList.add('product-modal__box-img-small-btn--accent');
      } else {
        document.querySelector(
          '.js-product-modal__img-big',
        ).src = document.querySelector(
          `[data-index="${current}"]`,
        ).children[0].src;
        document
          .querySelector(`[data-index="${current}"]`)
          .classList.add('product-modal__box-img-small-btn--accent');
      }
    });
}
function addEventListenersImgBtn() {
  document
    .querySelectorAll('.product-modal__box-img-small-btn')
    .forEach(btn => {
      btn.addEventListener('click', e => {
        document
          .querySelectorAll('.product-modal__box-img-small-btn')
          .forEach(item =>
            item.classList.remove('product-modal__box-img-small-btn--accent'),
          );

        document.querySelector('.js-product-modal__img-big').src = e.target.src;
        btn.classList.add('product-modal__box-img-small-btn--accent');
      });
    });
}
function addEventListenerInfoBtn() {
  document
    .querySelector('.modal-window__item')
    .classList.add('modal-window__product-modal');
  document.querySelector('.product-modal').addEventListener('click', e => {
    e.preventDefault();
  });
  const productModalOnClickBtnRef = document.querySelector(
    '.js-product-modal__btn--on-click',
  );
  const productModalBtnRef = document.querySelector(
    '.js-product-modal__btn--less-on-click',
  );
  productModalBtnRef.addEventListener('click', addClassVisuallyHidden);
  productModalOnClickBtnRef.addEventListener(
    'click',
    removeClassVisuallyHidden,
  );
}
export function productModalAddEventListeners() {
  addEventListenerInfoBtn();
  addEventListenersImgBtn();
  addEventListenerBigImgBtn();
}
