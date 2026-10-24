/**
 * SANDYS101.IN — Modern Condensed JavaScript Engine
 * Controls:
 * - Theme switcher (Dark / Light) with localStorage persistence
 * - In-page scroll spy active state navigation
 * - Mobile menu drawer
 * - Full-screen interactive photo lightbox with keyboard navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavSpy();
  initMobileDrawer();
  initLightbox();
  initAnalyticsTracking();
  initViralSharing();
});

/* ==========================================================================
   1. Theme Management
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

  html.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      // Google Analytics Event Tracking
      if (typeof gtag === 'function') {
        gtag('event', 'select_content', {
          content_type: 'theme',
          item_id: next
        });
      }
    });
  }
}

/* ==========================================================================
   2. Active Nav Scroll Spy
   ========================================================================== */
function initNavSpy() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');
  if (!navItems.length || !sections.length) return;

  const onScroll = () => {
    let activeId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = sec.getAttribute('id');
      }
    });

    if (activeId) {
      navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === `#${activeId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. Mobile Drawer
   ========================================================================== */
function initMobileDrawer() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggle || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  };

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  drawer.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Tap outside header/drawer to close on mobile
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !e.target.closest('#header')) {
      closeDrawer();
    }
  });

  // Escape key to close drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   4. Interactive Photo Lightbox
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('photo-lightbox');
  const overlay = document.getElementById('lightbox-backdrop');
  const btnClose = document.getElementById('lightbox-close');
  const imgElem = document.getElementById('lightbox-img');
  const titleElem = document.getElementById('lightbox-title');
  const exifElem = document.getElementById('lightbox-exif');
  const descElem = document.getElementById('lightbox-desc');
  const counterElem = document.getElementById('lightbox-counter');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');

  if (!modal) return;

  // Query all cards equipped with data-src (Hero visual card, Gallery photo cards, Gear card)
  const interactiveCards = Array.from(document.querySelectorAll('.photo-card, .hero-visual-card, .gear-condensed-card'));
  let currentIndex = 0;

  const dataset = interactiveCards.map((card, idx) => ({
    index: idx + 1,
    title: card.getAttribute('data-title') || '',
    src: card.getAttribute('data-src') || '',
    exif: card.getAttribute('data-exif') || '',
    desc: card.getAttribute('data-desc') || ''
  }));

  function open(index) {
    if (index < 0 || index >= dataset.length) return;
    currentIndex = index;
    const item = dataset[currentIndex];

    imgElem.src = item.src;
    imgElem.alt = item.title;
    titleElem.textContent = item.title;
    exifElem.textContent = item.exif;
    descElem.textContent = item.desc;
    counterElem.textContent = `PLATE 0${item.index} / 0${dataset.length}`;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Google Analytics Event Tracking for Lightbox Inspections
    if (typeof gtag === 'function') {
      gtag('event', 'view_item', {
        content_type: 'photograph',
        item_id: item.title,
        item_name: item.title,
        item_category: item.exif
      });
    }
  }

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function next() {
    currentIndex = (currentIndex + 1) % dataset.length;
    open(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + dataset.length) % dataset.length;
    open(currentIndex);
  }

  // Bind click on cards
  interactiveCards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      open(i);
    });
  });

  // Modal controls
  if (btnClose) btnClose.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);
  if (btnNext) btnNext.addEventListener('click', next);
  if (btnPrev) btnPrev.addEventListener('click', prev);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  // Mobile Touch Swipe Gesture Support
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  modal.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleLightboxSwipe();
    }
  }, { passive: true });

  function handleLightboxSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    // Dominant horizontal swipe of at least 45px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        next(); // Swiped left -> Next photo
      } else {
        prev(); // Swiped right -> Previous photo
      }
    }
  }
}

/* ==========================================================================
   5. Google Analytics Outbound & Engagement Tracking
   ========================================================================== */
function initAnalyticsTracking() {
  // Track clicks on external links (e.g. GitHub repo)
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'click', {
          event_category: 'outbound_link',
          event_label: link.href,
          transport_type: 'beacon'
        });
      }
    });
  });

  // Track clicks into investigative reports
  document.querySelectorAll('a[href*="tata-service-center-hazard"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'select_content', {
          content_type: 'article',
          item_id: 'tata-service-center-hazard'
        });
      }
    });
  });
}

/* ==========================================================================
   6. Viral Sharing Mechanics & Toast Notification
   ========================================================================== */
function initViralSharing() {
  const toast = document.getElementById('toast');
  let toastTimer = null;

  const showToast = () => {
    if (!toast) return;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 3800);
  };

  const copyUrl = (btn, textElem) => {
    const url = 'https://sandys101.in/tata-service-center-hazard.html';
    
    const triggerSuccess = () => {
      showToast();
      if (btn) btn.classList.add('copied');
      if (textElem) textElem.textContent = 'Copied!';
      setTimeout(() => {
        if (btn) btn.classList.remove('copied');
        if (textElem) textElem.textContent = 'Copy Link';
      }, 2500);

      if (typeof gtag === 'function') {
        gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'article',
          item_id: 'tata-service-center-hazard'
        });
      }
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(triggerSuccess).catch(() => {
        fallbackCopy(url, triggerSuccess);
      });
    } else {
      fallbackCopy(url, triggerSuccess);
    }
  };

  const fallbackCopy = (text, callback) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  // Top Copy Button
  const btnTop = document.getElementById('btn-copy-link');
  const txtTop = document.getElementById('copy-btn-text');
  if (btnTop) {
    btnTop.addEventListener('click', () => copyUrl(btnTop, txtTop));
  }

  // Bottom Copy Button
  const btnBottom = document.getElementById('btn-copy-link-bottom');
  const txtBottom = document.getElementById('copy-btn-text-bottom');
  if (btnBottom) {
    btnBottom.addEventListener('click', () => copyUrl(btnBottom, txtBottom));
  }

  // Track Social Shares
  const platforms = [
    { selector: '.share-btn.whatsapp', method: 'whatsapp' },
    { selector: '.share-btn.x-twitter', method: 'twitter' },
    { selector: '.share-btn.reddit', method: 'reddit' },
    { selector: '.share-btn.linkedin', method: 'linkedin' },
    { selector: '.btn-tweet-soundbite', method: 'twitter_soundbite' }
  ];

  platforms.forEach(({ selector, method }) => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof gtag === 'function') {
          gtag('event', 'share', {
            method: method,
            content_type: 'article',
            item_id: 'tata-service-center-hazard'
          });
        }
      });
    });
  });
}
