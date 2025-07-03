const navMenu = document.getElementById("nav-menu");
const menuBtn = document.getElementById("mobile-menu-btn");
const mediaQuery = window.matchMedia('(max-width: 767px)');

/* Listen for click on mobile menu button */
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('visible');
});

/* Listen for mobile resolution */
if (mediaQuery.matches) /* checks once on start */
  navMenu.classList.add('mobile');
else
  navMenu.classList.remove('mobile');

/* Checks change in media query when in or out of mobile resolution */
mediaQuery.addEventListener('change', () => {
  navMenu.classList.toggle('mobile');

  /* Remove visible class if necessary when out of mobile resolution */
  if (navMenu.classList.contains('visible'))
    navMenu.classList.remove('visible');
});

