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
  const logoContainer = document.querySelector('.logo-container');
  const toggleButton = document.createElement('button');
  toggleButton.innerHTML = '&#9776;'; // ☰ icon for menu
  toggleButton.classList.add('nav-toggle-button');

  // Ensure logo remains visible by creating a wrapper for nav excluding logo
  const navMenu = document.createElement('div');
  navMenu.classList.add('nav-menu');
  while (navContainer.firstChild) {
      navMenu.appendChild(navContainer.firstChild);
  }
  navContainer.appendChild(navMenu);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('nav-wrapper');
  navWrapper.appendChild(logoContainer);
  navWrapper.appendChild(toggleButton);
  navContainer.parentNode.insertBefore(navWrapper, navContainer);

  function handleResize() {
      if (window.innerWidth <= 768) {
          navMenu.style.maxHeight = '0px';
          navMenu.style.overflow = 'hidden';
          navMenu.style.transition = 'max-height 0.5s ease-in-out';
          
          toggleButton.addEventListener('click', function () {
              if (navMenu.style.maxHeight === '0px') {
                  navMenu.style.maxHeight = '500px'; // Adjust height as needed
              } else {
                  navMenu.style.maxHeight = '0px';
              }
          });
      } else {
          navMenu.style.maxHeight = '';
          navMenu.style.overflow = '';
      }
  }

  handleResize();
  window.addEventListener('resize', handleResize);
});
