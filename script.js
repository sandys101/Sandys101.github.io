/**
 * SANDYS101.IN — Core JavaScript
 * Theme switching & smooth header styling
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollHeader();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }

  // Toggle button event
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }
}

/* ==========================================================================
   2. Header Blur/Shadow on Scroll
   ========================================================================== */
function initScrollHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 40) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}
