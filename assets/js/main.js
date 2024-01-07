import GPX from 'node_modules/ol/format/GPX.js';
import Map from 'node_modules/ol/Map.js';
import VectorSource from 'node_modules/ol/source/Vector.js';
import View from 'node_modules/ol/View.js';
import XYZ from 'node_modules/ol/source/XYZ.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'node_modules/ol/style.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'node_modules/ol/layer.js';

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
});
