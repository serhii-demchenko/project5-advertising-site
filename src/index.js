import './scss/main.scss';
import { callSearchModal } from './js/search-modal';

const testButton = document.createElement('button');
testButton.textContent = 'open modal';
document.body.insertAdjacentElement('beforeend', testButton);

testButton.addEventListener('click', callSearchModal);
