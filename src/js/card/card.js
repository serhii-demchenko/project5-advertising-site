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

// export const cardListener = document.querySelector('#root');
// export default cardListener.addEventListener('click', () => { })

export function onAddToFavorites(event) {
    event.preventDefault();
    console.log(event);
    if (!event.target.classList.contains("js-favorite-icon")) {
        return;
    }
    // console.log('добавляю в избранное');

    const cardId = getCardId(event);
    console.log(cardId);
    const userToken = getUserToken();
    console.log(userToken);
    sendAdsToUserFavorite(userToken, cardId);
}

function getUserToken() {
    const getToken = sessionStorage.getItem('accessToken');
    return getToken;
}

function sendAdsToUserFavorite(userToken, _cardId) {
    if(requestUserInfo({ token: userToken })) {
        requestAddToFavorites({ token: userToken, _id: _cardId }).then(console.log);
    }
}

function findCheckedCard(event) {
    const arrayElements = event.path;
    // console.log(arrayElements);
    const targetCard = arrayElements.find(el => el.className === "card");
    return targetCard;
}

function getCardId(event) {
    const getTargetCard = findCheckedCard(event);
    const getTargetCardId = getTargetCard.dataset.id;
    return getTargetCardId;
}

// function changeIconFavorite() {
    
//     // if()
// }

{/* <span class="material-icons">
favorite
</span> */}