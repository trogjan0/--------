let slider = document.querySelector('.slider');
let slider__items = slider.querySelectorAll('.slider__item');
let buttons = slider.querySelectorAll('.btn__slider');
let button__prev = buttons[0];
let button__next = buttons[1];
let maxItems = slider__items.length;

let num = 0;

function transformNum(znak) {
  let backElem, frontElem;
  if (znak === 'minus') {
    backElem = slider__items[num + 1];
    frontElem = slider__items[num];
    backElem.style.transform = `translateZ(0px) translate(${-1 * num * 100}%, 0) scale(0)`;
    frontElem.style.transform = `translateZ(0px) translate(${-1 * num * 100}%, 0) scale(1)`;
  } else if (znak === 'plus') {
    backElem = slider__items[num - 1];
    frontElem = slider__items[num];
    backElem.style.transform = `translateZ(0px) translate(${-1 * num * 100}%, 0) scale(0)`;
    frontElem.style.transform = `translateZ(0px) translate(${-1 * num * 100}%, 0) scale(1)`;
  }
}

function addActive(znak) {
  let elem;
  if (znak === 'minus') {
    if (num - 1 === -1) {
      return;
    }
    num--;
    transformNum(znak);
    elem = slider__items[num + 1];
    elem.classList.remove('active');
  } else if (znak === 'plus') {
    if (num + 1 === maxItems) {
      return;
    }
    num++;
    transformNum(znak);
    elem = slider__items[num - 1];
    elem.classList.remove('active');
  }
  elem = slider__items[num];
  elem.classList.add('active');
}

button__prev.addEventListener('click', () => {
  addActive('minus');
});

button__next.addEventListener('click', () => {
  addActive('plus');
});