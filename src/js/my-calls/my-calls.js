import callTpl from '../../templates/category.hbs';
import { ads } from '../helpers';
import { getUserToken } from '../helpers/index';
import { requestUserInfo } from '../helpers/API';

//  вызов модалки редактирования товаров
const mainContainer = document.querySelector('#root');

export async function onEditProductListener() {
  await mainContainer.addEventListener('click', onClickEditBtn);
}

async function onClickEditBtn(e) {
  if (!e.target.classList.contains('js-edit-icon')) {
    return;
  }
  await console.log('тут вызов модалки редактирования товаров');
}
// end

// My calls markup
export async function renderMyCalls() {
  const userToken = getUserToken();
  await getUserOwn(userToken);
}

async function appendCallMarkup(item) {
  await document
    .querySelector('#root')
    .insertAdjacentHTML('afterbegin', callTpl(item));
}

async function getUserOwn(userToken) {
  const data = await requestUserInfo({ token: userToken });
  if (data.hasOwnProperty('calls')) {
    appendCallMarkup(data.calls);
    ads.calls = data.calls;
    addEditBtn();
    changeStyle();
    document.querySelector('h2').textContent = 'МОЇ ТОВАРИ';
  }
}

export async function changeStyle() {
  const all = document.getElementsByClassName('js-all');
  await all.forEach(element => {
    element.classList.add('visually-hidden');
  });
}

async function addEditBtn() {
  const ul = document.querySelector('.category-list');
  ul.id = 'my-calls';
  const sub = ul.querySelectorAll('.js-favorite-card-btn');
  await sub.forEach(el => {
    el.insertAdjacentHTML(
      'afterend',
      `<button class="card__edit-btn js-edit-card-btn">
                <span class="material-icons card__edit-icon js-edit-icon">
                    border_color
                </span>
            </button>`,
    );
  });
}
