// main.js
//import 'node_modules/ol/ol.css';


import GPX from './node_modules/ol/format/GPX.js';
import Map from './node_modules/ol/Map.js';
import VectorSource from './node_modules/ol/source/Vector.js';
import View from './node_modules/ol/View.js';
import XYZ from './node_modules/ol/source/XYZ.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from './node_modules/ol/style.js';
import {Tile as TileLayer, Vector as VectorLayer} from './node_modules/ol/layer.js';

document.addEventListener('DOMContentLoaded', function () {
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

  menuIcon.addEventListener('click', function () {
    console.log('Menu icon clicked');
    navDropdown.classList.toggle('show');
  });

  // Add click event listeners to each navigation link
  var navLinks = document.querySelectorAll('.nav-dropdown a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
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
  window.addEventListener('click', function (event) {
    console.log('Window clicked');
    if (!event.target.matches('#menu-icon') && !event.target.closest('.nav-dropdown')) {
      navDropdown.classList.remove('show');
    }
  });

  // OpenLayers map code
  const key = 'Get your own API key at https://www.maptiler.com/cloud/';
  const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  const raster = new TileLayer({
    source: new XYZ({
      attributions: attributions,
      url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
      maxZoom: 20,
    }),
  });
  
  const style = {
    'Point': new Style({
      image: new CircleStyle({
        fill: new Fill({
          color: 'rgba(255,255,0,0.4)',
        }),
        radius: 5,
        stroke: new Stroke({
          color: '#ff0',
          width: 1,
        }),
      }),
    }),
    'LineString': new Style({
      stroke: new Stroke({
        color: '#f00',
        width: 3,
      }),
    }),
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: '#0f0',
        width: 3,
      }),
    }),
  };
  
  const vector = new VectorLayer({
    source: new VectorSource({
      url: './gpx/96h_Stage_1.gpx',
      format: new GPX(),
    }),
    style: function (feature) {
      return style[feature.getGeometry().getType()];
    },
  });
  
  const map = new Map({
    layers: [raster, vector],
    target: document.getElementById('map'),
    view: new View({
      center: [-7916041.528716288, 5228379.045749711],
      zoom: 12,
    }),
  });
  
  const displayFeatureInfo = function (pixel) {
    const features = [];
    map.forEachFeatureAtPixel(pixel, function (feature) {
      features.push(feature);
    });
    if (features.length > 0) {
      const info = [];
      let i, ii;
      for (i = 0, ii = features.length; i < ii; ++i) {
        info.push(features[i].get('desc'));
      }
      document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
      map.getTarget().style.cursor = 'pointer';
    } else {
      document.getElementById('info').innerHTML = '&nbsp;';
      map.getTarget().style.cursor = '';
    }
  };
  
  map.on('pointermove', function (evt) {
    if (evt.dragging) {
      return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
  });
  
  map.on('click', function (evt) {
    displayFeatureInfo(evt.pixel);
  });
});
