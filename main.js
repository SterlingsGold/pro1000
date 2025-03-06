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

  let navWrapper = document.createElement('div');
  navWrapper.classList.add('nav-wrapper');

  function handleResize() {
      if (window.innerWidth <= 768) {
          if (!document.body.contains(navWrapper)) {
              navWrapper.appendChild(logoContainer);
              navWrapper.appendChild(toggleButton);
              navContainer.parentNode.insertBefore(navWrapper, navContainer);
          }
          
          navContainer.style.maxHeight = '0px';
          navContainer.style.overflow = 'hidden';
          navContainer.style.transition = 'max-height 0.5s ease-in-out';
          toggleButton.style.display = 'block';

          toggleButton.onclick = function () {
              if (navContainer.style.maxHeight === '0px') {
                  navContainer.style.maxHeight = '500px';
              } else {
                  navContainer.style.maxHeight = '0px';
              }
          };
      } else {
          navContainer.style.maxHeight = '';
          navContainer.style.overflow = '';
          toggleButton.style.display = 'none';
          
          if (document.body.contains(navWrapper)) {
              navWrapper.remove(); // Remove navWrapper on desktop
          }
      }
  }

  handleResize();
  window.addEventListener('resize', handleResize);
});
