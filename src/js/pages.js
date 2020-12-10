import { ads } from './helpers';
import { updateHistory, updatedContent } from './router';

export const homePage = async () => {
  document.querySelector('#root').textContent =
    'home page - You need to add your logic to these functions';
  console.log(ads);
};
export const allPage = () => {
  document.querySelector('#root').textContent =
    'all page - You need to add your logic to these functions';
};
export const accountPage = () => {
  document.querySelector('#root').textContent =
    'account page - You need to add your logic to these functions';
};
export const categoryPage = categoty => {
  document.querySelector('#root').textContent =
    categoty + ' - You need to add your logic to these functions';
};
export const badUrlPage = () => {
  document.querySelector('#root').textContent =
    '404 - You will you will redirect to home page in 5 sec';
  setTimeout(() => {
    updateHistory('/');
    updatedContent();
  }, 5000);
};
