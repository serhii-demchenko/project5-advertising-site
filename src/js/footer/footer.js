import footerTpl from '../../templates/footer.hbs';
export default function renderFooter() {
  const markup = footerTpl();
  const footerRef = document.querySelector('footer');
  footerRef.insertAdjacentHTML('beforeend', markup);
}
