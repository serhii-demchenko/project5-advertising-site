import '../../scss/main.scss';
import cardTpl from '../../templates/card.hbs';
import { requestAddToFavorites } from '../helpers';
import { requestUserInfo } from '../helpers/API';

function renderCards(ads) {
    const cardObj = ads.recreationAndSport
    const cardsMurkup = cardObj.map(card => cardTpl(card)).join('');
    return cardsMurkup; 
}

export function appendCards(ads) {
    const cardsContainer = document.querySelector('#root');
    cardsContainer.insertAdjacentHTML('beforeend', renderCards(ads))
}

export function onAddToFavorites(event) {
    event.preventDefault();
    console.log(event);
    if (!event.target.classList.contains("js-favorite-icon")) {
        return;
    }
    clickedToAddToFavorites(event);
    const cardId = getCardId(event);
    const userToken = getUserToken();
    sendAdsToUserFavorite(userToken, cardId);
    
}

function getUserToken() {
    const getToken = sessionStorage.getItem('accessToken'); 
    return getToken;
}

function sendAdsToUserFavorite(userToken, _cardId) {
    if(requestUserInfo({ token: userToken })) {
        requestAddToFavorites({ token: userToken, _id: _cardId }).then(console.log).catch(error => alert(error.message));
    }
}

function findCheckedCard(event) {
    const arrayElements = event.path;
    const targetCard = arrayElements.find(el => el.className === "card");
    return targetCard;
}

function getCardId(event) {
    const getTargetCard = findCheckedCard(event);
    const getTargetCardId = getTargetCard.dataset.id;
    return getTargetCardId;
}

export function mouseOver(event) {
    if (!event.target.classList.contains("js-favorite-icon")) {
        return;
    }
    const onOverMouse = event.target;
    onOverMouse.textContent = 'favorite';
}

export function mouseOut(event) {
    if (event.target.classList.contains("js-favorite-icon")) {
        const onOutMouse = event.target;
        onOutMouse.textContent = 'favorite_border';
    }
}

// function clickedToAddToFavorites(event) {
//     const click = event.target;
//     click.classList.toggle('icon-favorite-orange');
//     click.textContent = 'favorite';
// }

// export function removeAddToFavorite(event) {
//     if (event.target.classList.contains("icon-favorite-orange")) {
//         const removeClick = event.target;
//     console.log(removeClick);
//     removeClick.classList.remove('icon-favorite-orange');
//     removeClick.textContent = 'favorite_border';
//     }
// }


{/* <span class="material-icons">
favorite
</span> */}