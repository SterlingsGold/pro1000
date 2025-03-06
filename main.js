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
  const navContainer = document.querySelector('.nav-container');
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Menu';
  toggleButton.classList.add('nav-toggle-button');

  // Only add the button and collapse the nav on mobile screens
  function handleResize() {
      if (window.innerWidth <= 768) {
          navContainer.style.maxHeight = '0px';
          navContainer.style.overflow = 'hidden';
          navContainer.style.transition = 'max-height 0.5s ease-in-out';
          
          toggleButton.addEventListener('click', function () {
              if (navContainer.style.maxHeight === '0px') {
                  navContainer.style.maxHeight = '500px'; // Adjust height as needed
              } else {
                  navContainer.style.maxHeight = '0px';
              }
          });
          document.body.insertBefore(toggleButton, navContainer);
      } else {
          navContainer.style.maxHeight = '';
          navContainer.style.overflow = '';
          if (toggleButton.parentNode) {
              toggleButton.parentNode.removeChild(toggleButton);
          }
      }
  }

  handleResize();
  window.addEventListener('resize', handleResize);
});
