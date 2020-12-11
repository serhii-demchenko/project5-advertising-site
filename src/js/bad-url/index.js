const createDom = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('bad-url');
  const title = document.createElement('h1');
  title.classList.add('bad-url__title');
  title.textContent = '404 Not found. ';
  const description = document.createElement('h2');
  description.classList.add('bad-url__description');
  description.textContent = 'You will redirect to home page in ';
  const timer = document.createElement('span');
  timer.classList.add('bad-url__timer');
  timer.textContent = '5 sec.';
  description.append(timer);
  wrapper.append(title, description);

  document.querySelector('#root').innerHTML = '';
  document.querySelector('#root').append(wrapper);
};

const addTimer = () => {
  const timer = document.querySelector('.bad-url__timer');
  const interval = setInterval(() => {
    timer.textContent = Number.parseInt(timer.textContent) - 1 + ' sec.';
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
};

export const renderBadUrl = () => {
  createDom();
  addTimer();
};
