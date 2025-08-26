// Minimal, modern interactions for Clause-style landing
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  /* ---- Theme (persisted) ---- */
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') html.classList.add('light');
  if (themeToggle) {
    themeToggle.textContent = html.classList.contains('light') ? '🌙' : '☀️';
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('light');
      localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
      themeToggle.textContent = html.classList.contains('light') ? '🌙' : '☀️';
    });
  }

  /* ---- Mobile drawer ---- */
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('show');
    drawer.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    drawer.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ---- Reveal on scroll ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ---- Smooth anchor focus management ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.setAttribute('tabindex','-1'), 0);
    });
  });

  /* ---- Footer year ---- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
