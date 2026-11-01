/**
 * Gifty.in Shopify Theme - Global JS
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Gifty.in theme initialized');

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenuDrawer = document.querySelector('[data-mobile-menu-drawer]');
  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuDrawer.classList.toggle('translate-x-full');
    });
  }

  // Cart drawer toggle
  const cartToggle = document.querySelector('[data-cart-toggle]');
  const cartDrawer = document.querySelector('[data-cart-drawer]');
  const cartClose = document.querySelector('[data-cart-close]');
  if (cartToggle && cartDrawer) {
    cartToggle.addEventListener('click', (e) => {
      e.preventDefault();
      cartDrawer.classList.remove('translate-x-full');
    });
  }
  if (cartClose && cartDrawer) {
    cartClose.addEventListener('click', () => {
      cartDrawer.classList.add('translate-x-full');
    });
  }

  // Accordions
  const accordions = document.querySelectorAll('.gifty-accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const content = acc.nextElementSibling;
      content.classList.toggle('hidden');
      const icon = acc.querySelector('.accordion-icon');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
});
