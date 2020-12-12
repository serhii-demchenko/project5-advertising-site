import cardTpl from '../../templates/card.hbs';
import { requestAddToFavorites } from '../helpers';
import { requestUserInfo } from '../helpers/API';

function renderCards(ads) {
    const cardObj = ads.free
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
    console.log('добавляю в избранное');

    const cardCheked = document.querySelector('[data-id]');
    console.log(cardCheked);
    const cardId = cardCheked.dataset.id;
    console.log(cardId);
    checkUserToken();
}

function checkUserToken() {
    const getToken = sessionStorage.getItem('accessToken');
    console.log(getToken);
    requestUserInfo(getToken).then(console.log)

}

// function changeIconFavorite() {
    
//     // if()
// }

{/* <span class="material-icons">
favorite
</span> */}