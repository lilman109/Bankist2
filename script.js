'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const navLinksParent = document.querySelector('.nav__links');
const navLink = document.querySelector('.nav__link');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slideBtnRight = document.querySelector('.slider__btn--right');
const slideBtnLeft = document.querySelector('.slider__btn--left');

// Modal
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnsOpenModal =>
  btnsOpenModal.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button click scrolling
btnScrollTo.addEventListener('click', event => {
  // const sec1Coordinates = section1.getBoundingClientRect();

  // scoll without animation
  // window.scrollTo(
  //   sec1Coordinates.left,
  //   sec1Coordinates.top + window.pageYOffset
  // );

  // scroll with animation
  // window.scrollTo({
  //   left: sec1Coordinates.left,
  //   top: sec1Coordinates.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(element => {
//   element.addEventListener('click', event => {
//     event.preventDefault();
//     const scrollToId = event.currentTarget.getAttribute('href');
//     document.querySelector(scrollToId).scrollIntoView({ behavior: 'smooth' });
//   });
// });

navLinksParent.addEventListener('click', event => {
  event.preventDefault();

  if (!event.target.classList.contains('nav__link')) return;

  const scrollToId = event.target.getAttribute('href');
  document.querySelector(scrollToId).scrollIntoView({ behavior: 'smooth' });
});

// Tab button click event
tabsContainer.addEventListener('click', event => {
  event.preventDefault();
  const clicked = event.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Nav link hover event
const handleNavHover = (event, opacity) => {
  const link = event.target;
  if (!link.classList.contains('nav__link')) return;

  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(sibling => {
    if (sibling === link) return;
    sibling.style.opacity = opacity;
  });

  logo.style.opacity = opacity;
};

nav.addEventListener('mouseover', event => handleNavHover(event, 0.5));
nav.addEventListener('mouseout', event => handleNavHover(event, 1));

// Scrolling nav sticky
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `-${nav.clientHeight}px`,
  threshold: 0,
});

headerObserver.observe(header);

// const obsCallback = entries => {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observer = new IntersectionObserver(obsCallback, {
//   root: null,
//   threshold: 0.1,
// });

// observer.observe(section1);

// const intitialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', event => {
//   console.log(window.scrollY);
//   if (window.scrollY > intitialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Reveal sections
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images
const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', event => {
    event.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slides
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = slide => {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};

goToSlide(0);

const goToNextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const goToPrevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

slideBtnRight.addEventListener('click', event => {
  goToNextSlide();
});

slideBtnLeft.addEventListener('click', event => {
  goToPrevSlide();
});

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') goToPrevSlide();
  if (event.key === 'ArrowRight') goToNextSlide();
});
