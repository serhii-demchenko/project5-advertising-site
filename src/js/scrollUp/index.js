class ScrollUp {
  constructor({ selector }) {
    this._scrollButtonRef = document.querySelector(selector);
    this._scrollSelector = selector;
    this._topOffset = 0;
    this._offsetForHideScrollUp = 200;
  }
  init() {
    this._scrollButtonRef.addEventListener(
      'click',
      this._clickHandler.bind(this),
    );
    window.addEventListener('scroll', this._autoHideButton.bind(this));
    this._hide();
  }
  _clickHandler() {
    scrollTo({ top: 0 + this._topOffset, behavior: 'smooth' });
    this._scrollButtonRef.blur();
  }
  _show() {
    this._scrollButtonRef.classList.remove(
      `${this._scrollSelector.slice(1)}--hidden`,
    );
  }
  _hide() {
    this._scrollButtonRef.classList.add(
      `${this._scrollSelector.slice(1)}--hidden`,
    );
  }
  _autoHideButton() {
    clearTimeout(this._timeoutId);
    this._timeoutId = setTimeout(() => {
      if (pageYOffset < this._offsetForHideScrollUp) {
        this._hide();
      } else {
        this._show();
      }
    }, 100);
  }
}
export const addScrollUp = () => {
  const scroll = new ScrollUp({ selector: '.scroll-up' });
  scroll.init();
};
