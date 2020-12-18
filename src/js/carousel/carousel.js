import BSN from 'bootstrap.native/dist/bootstrap-native.esm.min.js';
import carouselTpl from '../../templates/сarousel.hbs';

export default class Carousel {
  constructor(id, selector) {
    this._id = id;
    this._selector = selector;
    this._markup = '';
    this.refs = {
      id: undefined,
      items: undefined,
    };
  }

  renderMarkup(data) {
    if (!data.length) return;
    this.markup = carouselTpl({
      id: this.id,
      array: data,
      category: data[0].category,
    });
    return this.markup;

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
  updateMarkup(markup) {
    this.showItems();
  }
  get elementById() {
    return document.getElementById(this.id);
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
  get idRef() {
    return (this.refs.id = document.querySelector(`#${this.id}`));
  }
  get itemsRef() {
    return this.idRef.querySelectorAll('.carousel .carousel-item');
  }
  appenMarkup(position) {
    document
      .querySelector(this.selector)
      .insertAdjacentHTML(position, this.markup);
  }
  init(position) {
    this.appenMarkup(position);
    const carouselInit = new BSN.Carousel(`#${this.id}`, {
      interval: false,
      pause: false,
      keyboard: true,
    });
    this.showItems();
  }
  showItems() {
    this.itemsRef.forEach((elem, index, array) => {
      const minPerSlide = 4;
      let next;
      let afterNext;
      if (array.length === 1) {
        this.idRef.querySelectorAll('a').forEach(elem => {
          elem.classList.add('disable');
        });
        return;
      }
      // console.log('i = ', index, 'length =', array.length);
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
