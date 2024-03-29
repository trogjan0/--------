document.querySelector('.button__side-bar').addEventListener('click', () => {
    document.querySelector('.side-bar').classList.add('active');
    document.querySelector('.close__side-bar').classList.add('active');
  })

document.querySelector('.close__side-bar').addEventListener('click', () => {
  document.querySelector('.side-bar').classList.remove('active');
  document.querySelector('.close__side-bar').classList.remove('.close__side-bar.active');
})

document.querySelector('.overlay').addEventListener('click', () => {
  document.querySelector('.side-bar').classList.remove('active');
  document.querySelector('.overlay').classList.remove('.overlay.active');
})

document.querySelector('.close__ad').addEventListener('click', () => {
  document.querySelector('.ad').classList.add('disactive');
})
// side bar, advertisment

function scrollTo(to, duration = 700) {
  const
      element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      easeInOutQuad = function (t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
          const currentDate = +new Date();
          const currentTime = currentDate - startDate;
          element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
          if (currentTime < duration) {
              requestAnimationFrame(animateScroll);
          }
          else {
              element.scrollTop = to;
          }
      };
  animateScroll();
}

document.addEventListener('DOMContentLoaded', function () {
  let btn = document.querySelector('#toTop');
  window.addEventListener('scroll', function () {
      // Если прокрутили дальше 599px, показываем кнопку
      if (pageYOffset > 100) {
          btn.classList.add('show');
          // Иначе прячем
      } else {
          btn.classList.remove('show');
      }
  });

  // При клике прокручиываем на самый верх
  btn.onclick = function (click) {
      click.preventDefault();
      scrollTo(0, 400);
  }
});
// to top


document.querySelector("#show-form").addEventListener("click",function(){
  document.querySelector(".popup").classList.add("active");
});

document.querySelector("#show-form").addEventListener("click",function(){
  document.querySelector(".overlay_pop").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click",function(){
  document.querySelector(".popup").classList.remove("active");
});

document.querySelector(".popup .close-btn").addEventListener("click",function(){
  document.querySelector(".overlay_pop").classList.remove("active");
});

