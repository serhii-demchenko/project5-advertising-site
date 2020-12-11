(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const menuBtnRefClose = document.querySelector('[data-menu-close]');
  const mobileMenuRef = document.querySelector('[data-menu]');
  const mobileBackdropRef = document.querySelector('[data-backdrop]');
  const body = document.querySelector('body');

  const toggleMenu = () => {
  const expanded = menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    body.classList.toggle('scroll-hidden');
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackdropRef.classList.add('is-visible');
  };
  menuBtnRef.addEventListener('click', () => {
    toggleMenu();
  });
  menuBtnRefClose.addEventListener('click', () => {
    mobileBackdropRef.classList.remove('is-visible');
});
})();
