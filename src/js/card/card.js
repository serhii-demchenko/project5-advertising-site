import '../../scss/main.scss';
import { ads } from '../helpers';
import productModalTpl from '../../templates/product-modal.hbs';
import { getUserToken } from '../helpers/index';
import { requestAddToFavorites } from '../helpers';
import getCardRefs from './getCardRefs';
import { openModal } from '../modal-window/index';

const cardRefs = getCardRefs();

export function onAddToFavoritesListener() {
    cardRefs.cardListener.addEventListener('click', onAddToFavorites);
}

export function onOpenCardModalListener() {
    cardRefs.cardListener.addEventListener('click', onOpenModal);
}

//Сборка вызовоз из карточки
export function getAddListenersInCard() {
    onAddToFavoritesListener();
    onOpenCardModalListener();
}

export function onOpenModal(event) {
    if (!event.target.classList.contains('js-modal-icon')) {
        return;
    }
    const productId = getCardId(event);
    const productObj = findProductAds(ads, productId);
    openModal(productModalTpl(productObj));
}

function findProductAds(ads, id) {
    return createArrayOfAllProducts(ads).find(item => item._id === id);
}

function createArrayOfAllProducts(ads) {
    return Object.values(ads).flat();
}


export function onAddToFavorites(event) {
    if (event.target.classList.contains("icon-favorite-orange")) {
        removeAddToFavorites(event);
        return;
    }

    if (!event.target.classList.contains("js-favorite-icon")) {
        return;
    }
    
    const cardId = getCardId(event);
    const userToken = getUserToken();
    if (sendAdsToUserFavorite(userToken, cardId)) {
        clickedToAddToFavorites(event);
        console.log('отправили запрос');
    }
}

function sendAdsToUserFavorite(userToken, _cardId) {
    if(userToken !== null) {
        requestAddToFavorites({ token: userToken, _id: _cardId }).then(console.log).catch(error => console.log(error));
        return true;
    }
    return false;
}

function findCheckedCard(event) {
    const arrayElements = event.path;
    const targetCard = arrayElements.find(el => el.className === "card");
    return targetCard;
}

function getCardId(event) {
    const getTargetCard = findCheckedCard(event);
    return getTargetCard.dataset.id;
}

function clickedToAddToFavorites(event) {
    const click = event.target;
    click.classList.remove('icon-favorite')
    click.classList.add('icon-favorite-orange');
    click.textContent = 'favorite';
}

export function removeAddToFavorites(event) {
    const removeClick = event.target;
    removeClick.classList.remove('icon-favorite-orange');
    removeClick.classList.add('icon-favorite')
    removeClick.textContent = 'favorite_border';
}

