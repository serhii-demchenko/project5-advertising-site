import cardTpl from '../../templates/card.hbs';
export default function getCardRefs() {
    return {
        cardListener: document.querySelector('#root'),
    }

}