'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinksParent = document.querySelector('.nav__links');
const navLink = document.querySelector('.nav__link');

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
