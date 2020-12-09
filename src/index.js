import { callSearchModal } from './js/search-modal';
import './scss/main.scss';

const testButton = document.createElement('button');
testButton.textContent = 'open modal';
document.body.insertAdjacentElement('beforeend', testButton);

testButton.addEventListener('click', callSearchModal);
