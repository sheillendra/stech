const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const backdrop = document.querySelector('.menu-backdrop');
const header = document.querySelector('.site-header');

const setMenuState = (isOpen) => {
  menu.classList.toggle('open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
};

menuButton.addEventListener('click', () => setMenuState(!menu.classList.contains('open')));
backdrop.addEventListener('click', () => setMenuState(false));

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  setMenuState(false);
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    setMenuState(false);
    menuButton.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) setMenuState(false);
});

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
document.querySelector('#year').textContent = new Date().getFullYear();
