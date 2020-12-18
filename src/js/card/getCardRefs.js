export default function getCardRefs() {
  return {
    cardListener: document.querySelector('#root'),
    allFavIcons: document.querySelectorAll('.js-favorite-icon'),
  };
}
