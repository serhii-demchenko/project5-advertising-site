import productModalTpl from '../../templates/product-modal.hbs';
import { openModal, closeModal } from '../modal-window/index.js';
import { requestUserInfo } from '../helpers/API';
 openModal(productModalTpl(ads.recreationAndSport[0]))

// function renderProductModal(ads) {
//     const productModalObj = ads.recreationAndSport;
//     const productModalMarkup = productModalObj.map(product => productModalTpl(product)).join('');
//     return productModalMarkup; 
// }

//  function appendProductModal(ads) {
//     document.querySelector('body').insertAdjacentHTML('beforeend', renderProductModal(ads))
// }