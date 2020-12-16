export default class Slider {
  constructor(selector) {
      this.refs = this.getRefs(selector);
      this.counter = 0;
  }

  getRefs(selector) {
    const refs = {};
    refs.categiry = document.querySelector(selector);
    refs.previousBtn = refs.categiry.querySelector(".previous-card");
    refs.nextBtn = refs.categiry.querySelector('.next-card');
    refs.list = refs.categiry.querySelector('.category__card-list');
    return refs;
  }

    next() {
        const valueToScrollOnDesktop = this.refs.list.style.width / 4
        const valueToScrollOnTablet = this.refs.list.style.width / 2
        const scrollCounterDesktop = this.refs.list.childElementCount - 4
        const scrollCounterTablet = this.refs.list.childElementCount - 2

        
        if (visualViewport.width > 1280) {
            
            if (this.counter <= scrollCounterDesktop) {
                this.refs.list.style.transform += valueToScrollOnDesktop;
                this.counter += 1;
            }
        } else {
            if (this.counter <= scrollCounterTablet) {
                this.refs.list.style.transform += valueToScrollOnTablet
                this.counter += 1;
            }
        }
  }

    previous() {
        const valueToScrollOnDesktop = this.refs.list.style.width / 4
        const valueToScrollOnTablet = this.refs.list.style.width / 2
        const scrollCounterDesktop = this.refs.list.childElementCount - 4
        const scrollCounterTablet = this.refs.list.childElementCount - 2

        
        if (visualViewport.width > 1280) {
            
            if (this.counter <= scrollCounterDesktop) {
                this.refs.list.style.transform += valueToScrollOnDesktop;
                this.counter -= 1;
            }
        } else {
            if (this.counter <= scrollCounterTablet) {
                this.refs.list.style.transform += valueToScrollOnTablet
                this.counter -= 1;
            }
        }
  }

  
}