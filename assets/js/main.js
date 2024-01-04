// main.js

// Function to toggle the navigation dropdown
function toggleNav() {
  var navDropdown = document.querySelector('.nav-dropdown');
  navDropdown.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function () {
  // Selecting elements for menu icon and navigation dropdown
  var menuIcon = document.getElementById('menu-icon');
  var navDropdown = document.querySelector('.nav-dropdown');

  // Check if the menuIcon element exists before adding event listeners
  if (menuIcon) {
    // Event listener for clicking the menu icon to toggle the dropdown
    menuIcon.addEventListener('click', function () {
      navDropdown.classList.toggle('show');
    });
  }

  // Event listeners for dropdown links to close the dropdown
  var navLinks = document.querySelectorAll('.nav-dropdown a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navDropdown.classList.remove('show');
    });
  });
});
