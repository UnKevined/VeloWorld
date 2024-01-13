document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded');

  var menuIcon = document.getElementById('menu-icon');
  var navDropdown = document.querySelector('.nav-dropdown');

  if (!menuIcon) {
    console.error('Menu icon not found');
    return;
  }

  if (!navDropdown) {
    console.error('Nav dropdown not found');
    return;
  }

  menuIcon.addEventListener('click', function() {
    console.log('Menu icon clicked');
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
    console.log('Window clicked');
    if (!event.target.matches('#menu-icon') && !event.target.closest('.nav-dropdown')) {
      navDropdown.classList.remove('show');
    }
  });

  // Funktion zum Setzen von Cookies
  function setCookie(cookieName, value) {
    document.cookie = `${cookieName}=${value}; expires=${new Date(2022, 0, 1).toUTCString()}; path=/`;
    hideCookieBanner();
  }

  // Funktion zum Überprüfen, ob ein Cookie gesetzt ist
  function isCookieSet(cookieName) {
    return document.cookie.includes(`${cookieName}=true`);
  }

  // Funktion zum Ausblenden des Cookie-Banners
  function hideCookieBanner() {
    var cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
      cookieBanner.style.display = 'none';
    }
  }

  // Funktion zum Überprüfen und Anzeigen des Cookie-Banners
  function checkAndShowCookieBanner() {
    var cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner && !isCookieSet('technicallyNecessary') && !isCookieSet('analytical')) {
      cookieBanner.style.display = 'block';
    }
  }

  // Eventlistener für DOMContentLoaded und window.onload
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    checkAndShowCookieBanner();
  });

  window.onload = function() {
    console.log('Window loaded');
    checkAndShowCookieBanner();
  };

});
