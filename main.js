// main.js

// Når vinduet lastes inn
window.addEventListener('DOMContentLoaded', () => {
  // Initialiser Lucide-ikoner
  lucide.createIcons();

  // SMOOTH SCROLLING FOR INTERNE LENKER
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // FAQ Toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  // KONTAKTSKJEMA
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Takk for din melding! Vi vil kontakte deg snart.');
      contactForm.reset();
    });
  }
});
