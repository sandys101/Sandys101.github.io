/**
 * SANDYS101.IN — Warm Analog Journal Core JavaScript
 * Features:
 * - Theme management (Warm Walnut Dark / Antique Parchment Light)
 * - Interactive Exhibition Photo Lightbox with keyboard navigation
 * - Active scroll spy navigation highlighter
 * - Mobile drawer navigation
 * - Elevation styling on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initMastheadScroll();
  initActiveNavSpy();
  initMobileNav();
  initPhotoLightbox();
});

/* ==========================================================================
   1. Theme Management (Warm Walnut Dark / Tactile Parchment Light)
   ========================================================================== */
function initThemeManager() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const html = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeLabel) {
      themeLabel.textContent = theme === 'light' ? 'Parchment' : 'Walnut';
    }
  }
}

/* ==========================================================================
   2. Masthead Scroll Elevation
   ========================================================================== */
function initMastheadScroll() {
  const masthead = document.getElementById('masthead');
  if (!masthead) return;

  const onScroll = () => {
    if (window.scrollY >= 30) {
      masthead.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.35)';
    } else {
      masthead.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. Active Section Scroll Spy
   ========================================================================== */
function initActiveNavSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  const highlightNav = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/* ==========================================================================
   4. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (!mobileToggle || !mobileDrawer) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ==========================================================================
   5. Interactive Photo Lightbox (Plate Inspector)
   ========================================================================== */
function initPhotoLightbox() {
  const lightboxModal = document.getElementById('photo-lightbox');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxExif = document.getElementById('lightbox-exif');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!lightboxModal) return;

  // Collect all gallery items and camera archival card
  const plateCards = Array.from(document.querySelectorAll('.exhibition-plate-card, .camera-system-archival-card'));
  let currentIndex = 0;

  const platesData = plateCards.map((card, idx) => ({
    index: idx + 1,
    title: card.getAttribute('data-title') || '',
    src: card.getAttribute('data-src') || '',
    exif: card.getAttribute('data-exif') || '',
    desc: card.getAttribute('data-desc') || ''
  }));

  function openLightbox(index) {
    if (index < 0 || index >= platesData.length) return;
    currentIndex = index;
    const item = platesData[currentIndex];

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxExif.textContent = item.exif;
    lightboxDesc.textContent = item.desc;
    lightboxCounter.textContent = `PLATE 0${item.index} / 0${platesData.length}`;

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % platesData.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + platesData.length) % platesData.length;
    openLightbox(currentIndex);
  }

  // Attach click listeners to cards
  plateCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Don't trigger if user clicked an external link
      if (e.target.closest('a[target="_blank"]')) return;
      openLightbox(index);
    });
  });

  // Modal controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}
