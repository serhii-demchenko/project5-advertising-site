import { ads } from '../helpers';
import { getCardId } from './card';
import { productModalAddEventListeners } from '../product-modal/product-modal';
import { openModal } from '../modal-window/index';
import productModalTpl from '../../templates/product-modal.hbs';
// import productModalInfoTpl from '../../templates/product-modal-info.hbs';
// import productModalImgListTpl from '../../templates/product-modal-img-list.hbs';

export function onOpenModal(event) {
  if (!event.target.classList.contains('js-modal-icon')) {
    return;
  }
  const productId = getCardId(event);
  const productObj = findProductAds(ads, productId);
  openModal(productModalTpl(productObj));
  productModalAddEventListeners();
}
// Поиск вызванной карточки товаров
function findProductAds(ads, id) {
  return createArrayOfAllProducts(ads).find(item => item._id === id);
}

// Раскрытие вложенностей объекта ads
function createArrayOfAllProducts(ads) {
  return Object.values(ads).flat();
}
