import { ads } from '../helpers'
import createCategoryMarkup from '../../templates/category.hbs'



const main = document.querySelector('.container')



export default function renderCategory(page) {
    for (const key in ads) {
        if (ads[key].length !== 0) {
            main.insertAdjacentHTML('afterbegin', createCategoryMarkup(ads[key]))
        }
    }
        
    
}