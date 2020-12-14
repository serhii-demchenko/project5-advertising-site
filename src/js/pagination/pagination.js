import createPaginationButton from '../../templates/pagination.hbs'
import { updatePage } from '../router'
const main = document.querySelector('.container')



export function renderPageButton(page) {
    main.insertAdjacentHTML('beforeend', createPaginationButton(page))
}

export function addEventListenerOnPageBtn() {
    const pageBtn1 = document.querySelector('[data-action="page-1"]');
    pageBtn1.addEventListener('click', changePage)
    const pageBtn2 = document.querySelector('[data-action="page-2"]');
    pageBtn2.addEventListener('click', changePage)
    const pageBtn3 = document.querySelector('[data-action="page-3"]');
    pageBtn3.addEventListener('click', changePage)
 }

export function changePage(e) {
    if (e.currentTarget.dataset.action === 'page-1') {
        main.innerHTML = '';
        updatePage('/')
        // e.currentTarget.classList.toggle('.pagination-btn--active')
        return
    }
    if (e.currentTarget.dataset.action === 'page-2') {
         main.innerHTML = '';
        updatePage('/page2')
        // e.currentTarget.classList.toggle('.pagination-btn--active')
         return
    }
    if (e.currentTarget.dataset.action === 'page-3') {
         main.innerHTML = '';
        updatePage('/page3')
        // e.currentTarget.classList.toggle('.pagination-btn--active')
         return
    }
}

export function changeActiveBtn(page) {
    
    document.querySelector(`[data-action="${page}"]`).classList.add('pagination-btn--active')
}