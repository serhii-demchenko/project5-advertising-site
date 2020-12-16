import { ads } from '../helpers';
import createCategoryMarkup from '../../templates/category.hbs';
import createCardsListMarkup from '../../templates/cards-list.hbs';
import { updatePage } from '../router';
import { badUrlPage } from '../pages';
import Carousel from '../carousel/carousel';

const main = document.querySelector('#root');

export function renderCategory(page) {
  for (const key in ads) {
    if (ads[key].length !== 0) {
      // Тут добавил
      const carousel = new Carousel(key, '#root');
      const markup = carousel.renderMarkup(ads[key]);
      carousel.init('afterbegin');

      // Это родное. Нужно удалить
      // main.insertAdjacentHTML('afterbegin', createCategoryMarkup(ads[key]));
    }
  }
}

export function renderAllCallsOnRequest(cardList) {
  for (const key in ads) {
    if (ads[key].length === 0) {
      badUrlPage();
    }
    main.insertAdjacentHTML('afterbegin', createCardsListMarkup(ads[key]));
  }
}

// export function clearPage() {
//   main.innerHTML = '';
// }

export function addEventListenerLookMoreBtn() {
  Array.from(document.querySelectorAll('.look-more')).map(item => {
    item.onclick = e => {
      e.preventDefault();
      const categoryName = e.currentTarget.previousElementSibling.textContent;
      updatePage('/category', categoryName);
    };
  });
}
