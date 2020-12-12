import createCategoryMarkup from '../../templates/category.hbs'
import createPaginationButton from '../../templates/pagination.hbs'


const main = document.querySelector('.container')


export default function renderCategory(data) {
    main.insertAdjacentHTML('afterbegin', createCategoryMarkup(data))
    main.insertAdjacentHTML('beforeend', createPaginationButton())
}