// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Small-screen navigation.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});
navigation?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

// The two paper notes in the hero can be dragged with mouse or touch.
document.querySelectorAll('[data-drag]').forEach(element => {
  let startX = 0, startY = 0, initialX = 0, initialY = 0, dragging = false;
  element.addEventListener('pointerdown', event => {
    dragging = true;
    element.setPointerCapture(event.pointerId);
    const rect = element.getBoundingClientRect();
    const parent = element.parentElement.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    initialX = rect.left - parent.left;
    initialY = rect.top - parent.top;
    element.style.right = 'auto';
    element.style.bottom = 'auto';
    element.style.left = `${initialX}px`;
    element.style.top = `${initialY}px`;
  });
  element.addEventListener('pointermove', event => {
    if (!dragging) return;
    const parent = element.parentElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(parent.width - element.offsetWidth, initialX + event.clientX - startX));
    const y = Math.max(0, Math.min(parent.height - element.offsetHeight, initialY + event.clientY - startY));
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.transform = 'rotate(0deg)';
  });
  const stop = () => { dragging = false; };
  element.addEventListener('pointerup', stop);
  element.addEventListener('pointercancel', stop);
});

document.getElementById('year').textContent = new Date().getFullYear();
