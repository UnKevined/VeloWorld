// main.js
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('menu-icon').addEventListener('click', function() {
    var navDropdown = document.querySelector('.nav-dropdown');
    navDropdown.classList.toggle('show');
  });
});
