const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  sidebar.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  sidebar.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (sidebar.classList.contains('active')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

overlay.addEventListener('click', closeSidebar);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('active')) {
    closeSidebar();
  }
});
