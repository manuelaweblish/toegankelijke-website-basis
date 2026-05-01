/* =============================================
   MAIN.JS — Laura de Vries Coaching
   ============================================= */

// --- Scroll-animaties via IntersectionObserver ---
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));


// --- Header schaduw bij scrollen ---
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });


// --- Mobiel navigatie menu ---
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Sluit menu bij klik op een link
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});


// --- Soepele scroll voor ankerlínks (fallback voor oudere browsers) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// --- Animeer hamburger naar kruis ---
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('actief');
});

// Kleine CSS-injectie voor de hamburger → kruis animatie
const stijl = document.createElement('style');
stijl.textContent = `
  .nav-toggle.actief span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .nav-toggle.actief span:nth-child(2) {
    opacity: 0;
  }
  .nav-toggle.actief span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
`;
document.head.appendChild(stijl);
