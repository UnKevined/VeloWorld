// main.js
document.addEventListener('DOMContentLoaded', function() {
  var menuIcon = document.getElementById('menu-icon');
  var navDropdown = document.querySelector('.nav-dropdown');

  menuIcon.addEventListener('click', function() {
    navDropdown.classList.toggle('show');
  });

  // Add click event listeners to each navigation link
  var navLinks = document.querySelectorAll('.nav-dropdown a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var targetSectionId = link.getAttribute('href').substring(1);
      var targetSection = document.getElementById(targetSectionId);

      // Close the dropdown after selecting a section
      navDropdown.classList.remove('show');

      // Scroll to the selected section with smooth behavior
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Close the dropdown when clicking outside of it
  window.addEventListener('click', function(event) {
    if (!event.target.matches('#menu-icon') && !event.target.closest('.nav-dropdown')) {
      navDropdown.classList.remove('show');
    }
  });
});
