export default class Slider {
  constructor(ref) {
    this.ref = ref;
    this.nextBtn = this.ref.querySelector('.next-card');
    this.prevBtn = this.ref.querySelector('.previous-card');
    this.cards = this.ref.querySelector('.category__card-list');
    this.currentSlide = 0;
    this.init();
    console.log(this);
    console.log(this.ref.clientWidth);
  }
  init() {
    this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
    this.prevBtn.addEventListener('click', this.prevSlide.bind(this));
    // this.cards.addEventListener('mousedown', this.dragEvent.bind(this));
  }
  dragEvent(e) {
    console.log(e);
  }
  nextSlide() {
    this.calculateOffset();
    this.currentSlide =
      this.currentSlide + 2 > this.maxSlide ? 0 : this.currentSlide + 1;
    this.slideUp();
    console.log(this);
  }
  prevSlide() {
    this.calculateOffset();
    this.currentSlide =
      this.currentSlide - 1 < 0 ? this.maxSlide - 1 : this.currentSlide - 1;
    this.slideUp();
    console.log(this);
  }
  slideUp() {
    this.cards.style.transform = `translate(${
      this.points[this.currentSlide]
    }px)`;
  }
  calculateOffset() {
    this.slidePerView =
      document.body.clientWidth > 1279
        ? 4
        : document.body.clientWidth > 767
        ? 2
        : 1;
    this.offset = this.ref.clientWidth / this.slidePerView;
    this.maxWidth = this.offset * this.cards.childElementCount;
    this.maxSlide = this.cards.childElementCount - this.slidePerView + 1;
    this.points = [];
    for (let i = 0; i < this.maxSlide; i++) {
      this.points.push(-i * (this.offset + 10));
    }
  }
}
