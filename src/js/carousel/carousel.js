// import myCalls from '../../templates/my-calls.hbs';
import BSN from 'bootstrap.native/dist/bootstrap-native.esm.min.js';
import carouselTpl from '../../templates/сarousel.hbs';

export default class Carousel {
  constructor(id, selector) {
    this._id = id;
    this._selector = selector;
    this._items = undefined;
    this._markup = '';
  }

  renderMarkup(data) {
    if (!data.length) return;

    this.markup = carouselTpl({ id: this.id, array: data });

    // this.appenMarkup();

    // const carouselInit = new BSN.Carousel(`#${this.id}`, {
    //   interval: false,
    //   pause: false,
    //   keyboard: true,
    // });

    // const carouselContainer = document.querySelector(`#${this.id}`);
    // const carouselItems = carouselContainer.querySelectorAll(
    //   '.carousel .carousel-item',
    // );

    // this.showItems();
  }
  get id() {
    return this._id;
  }
  get selector() {
    return this._selector;
  }
  get markup() {
    return this._markup;
  }
  set markup(str) {
    this._markup = str.trim();
  }
  get items() {
    console.log(`#${this.id}`);
    const carouselId = document.querySelector(`#${this.id}`);
    return carouselId.querySelectorAll('.carousel .carousel-item');
  }
  appenMarkup() {
    document
      .querySelector(this.selector)
      .insertAdjacentHTML('beforeend', this.markup);
  }
  init() {
    this.appenMarkup();
    const carouselInit = new BSN.Carousel(`#${this.id}`, {
      interval: false,
      pause: false,
      keyboard: true,
    });
    this.showItems();
  }
  showItems() {
    this.items.forEach((elem, index, array) => {
      const minPerSlide = 4;
      let next;
      let afterNext;
      // console.log('i = ', index);
      if (index < array.length - 1) {
        next = array[index + 1].firstElementChild;
        elem.append(next.cloneNode(true));
      }
      if (index + 1 < array.length - 1) {
        afterNext = array[index + 2].firstElementChild;
        elem.append(afterNext.cloneNode(true));
      }
      if (index === array.length - 1 && array.length !== 1) {
        next = array[0].firstElementChild;
        elem.append(next.cloneNode(true));
      }
      if (index === array.length - 2 && array.length !== 2) {
        afterNext = array[0].firstElementChild;
        elem.append(afterNext.cloneNode(true));
      }
      if (index > array.length - 2 && array.length !== 2) {
        afterNext = array[1].firstElementChild;
        elem.append(afterNext.cloneNode(true));
      }
      // console.log('next', next);
      // console.log('afternext', afterNext);

      if (array.length < minPerSlide) return;
      for (let i = 0; i < minPerSlide; i++) {
        let count = index + i + 3;
        // console.log(count);
        if (count > array.length - 1) {
          count -= array.length;
          if (count >= array.length) {
            count -= array.length;
          }
        }
        next = array[count].firstElementChild;
        elem.append(next.cloneNode(true));
      }
    });
  }
}
