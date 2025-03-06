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


document.addEventListener('DOMContentLoaded', function () {
  const heroSection = document.querySelector('.hero');
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Toggle Banner';
  toggleButton.classList.add('hero-toggle-button');

  // Only add the button and collapse the banner on mobile screens
  function handleResize() {
      if (window.innerWidth <= 768) {
          heroSection.style.maxHeight = '0px';
          heroSection.style.overflow = 'hidden';
          heroSection.style.transition = 'max-height 0.5s ease-in-out';
          
          toggleButton.addEventListener('click', function () {
              if (heroSection.style.maxHeight === '0px') {
                  heroSection.style.maxHeight = '100vh';
              } else {
                  heroSection.style.maxHeight = '0px';
              }
          });
          document.body.insertBefore(toggleButton, heroSection);
      } else {
          heroSection.style.maxHeight = '';
          heroSection.style.overflow = '';
          if (toggleButton.parentNode) {
              toggleButton.parentNode.removeChild(toggleButton);
          }
      }
  }

  handleResize();
  window.addEventListener('resize', handleResize);
});
