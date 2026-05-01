/* ============================================
   MAIN.JS – Coach Website
   ============================================ */

// ── Hamburger menu ──────────────────────────
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
});

// Close nav when any nav link is clicked
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-label', 'Menu openen');
  });
});

// ── Sticky header shadow on scroll ──────────
const siteHeader = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  siteHeader.style.boxShadow = window.scrollY > 40
    ? '0 4px 24px rgba(0,0,0,0.35)'
    : '0 2px 16px rgba(0,0,0,0.25)';
}, { passive: true });

// ── Scroll reveal ────────────────────────────
const revealTargets = document.querySelectorAll(
  '.problem-item, .card, .step, .testimonial, .over-image-wrap, .over-text, .contact-form-wrap, .contact-text'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (i % 4));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ── Contact form ─────────────────────────────
const contactForm   = document.getElementById('contact-form');
const formSuccess   = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Versturen…';
  submitBtn.disabled = true;

  // Simulate async send
  setTimeout(() => {
    formSuccess.classList.add('visible');
    contactForm.reset();
    submitBtn.textContent = 'Plan mijn gratis gesprek →';
    submitBtn.disabled = false;

    setTimeout(() => {
      formSuccess.classList.remove('visible');
    }, 6000);
  }, 900);
});

// ── Active nav highlight on scroll ───────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--clr-accent-light)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
