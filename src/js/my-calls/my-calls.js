import callTpl from '../../templates/category.hbs';
import { getUserToken } from '../helpers/index';
import { requestUserInfo } from '../helpers/API';

// My calls markup
export async function renderMyCalls() {
  const userToken = getUserToken();
  await getUserOwn(userToken);
}

function appendCallMarkup(item) {
  document
    .querySelector('#root')
    .insertAdjacentHTML('afterbegin', callTpl(item));
}

async function getUserOwn(userToken) {
  const data = await requestUserInfo({ token: userToken });
  console.log(data);
  if (data.hasOwnProperty('calls')) {
    appendCallMarkup(data.calls);
    document.querySelector('h2').textContent = 'МОЇ ТОВАРИ';
  }
}

export function changeStyle() {
  const all = document.getElementsByClassName('js-all');
  all.forEach(element => {
    element.classList.add('visually-hidden');
  });
}
