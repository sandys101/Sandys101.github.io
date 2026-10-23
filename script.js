/**
 * Sundeep's Developer Portfolio
 * Core JavaScript: Theme switching, typing animation, navigation, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavigation();
  initContactForm();
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
   2. Subtitle Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Exploring horizons across light and earth.',
    'Framing faces with genuine human emotion.',
    'Freezing time, one shutter click at a time.',
    'Sculpting light with 15 years of RAW art.'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const eraseSpeed = 45;
  const delayBetweenWords = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenWords);
        return;
      }
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 350);
        return;
      }
    }

    const currentSpeed = isDeleting ? eraseSpeed : typeSpeed;
    setTimeout(type, currentSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navigation (Mobile toggle & Active Link on Scroll)
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      navToggle.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');
      });
    });
  }

  // Active section spy on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollActive);
}

/* ==========================================================================
   4. Header Blur/Shadow on Scroll
   ========================================================================== */
function initScrollHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/* ==========================================================================
   5. Interactive Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      status.className = 'form-status';
      status.style.display = 'block';
      status.style.background = 'rgba(239, 68, 68, 0.15)';
      status.style.color = '#ef4444';
      status.textContent = 'Please fill in all required fields.';
      return;
    }

    // Success feedback
    status.className = 'form-status success';
    status.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    form.reset();

    setTimeout(() => {
      status.style.display = 'none';
    }, 6000);
  });
}
