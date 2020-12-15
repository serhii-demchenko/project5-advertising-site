import { ads } from '../helpers'
import createCategoryMarkup from '../../templates/category.hbs'
import createCardsListMarkup from '../../templates/cards-list.hbs'
import { updatePage } from '../router'
import { badUrlPage } from '../pages'


const main = document.querySelector('.container')

export function renderCategory(page) {
    for (const key in ads) {
        if (ads[key].length !== 0) {
            main.insertAdjacentHTML('afterbegin', createCategoryMarkup(ads[key]))
        }
    }    
}

export function renderAllCallsOnRequest(cardList) { 
    for (const key in ads) {
        if (ads[key].length === 0) {
            badUrlPage();
        }
        main.insertAdjacentHTML('afterbegin', createCardsListMarkup(ads[key]))
        
    }
}

export function clearPage() { 
    main.innerHTML = '';
}


export function addEventListenerLookMoreBtn() { 
   Array.from(document.querySelectorAll('.look-more')).map(item => {
    item.onclick = e => {
      e.preventDefault();
      const categoryName = e.currentTarget.previousElementSibling.textContent;
      updatePage('/category', categoryName);
    };
  });
}


