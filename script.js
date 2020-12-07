import './styles.scss';
import L from 'leaflet';
// next line is necessary: https://github.com/Leaflet/Leaflet/issues/4968
import 'leaflet-defaulticon-compatibility';
import { FontAwesomeMarker } from './src/leaflet-helpers/leaflet-fa-icons';

/**
 * ************ USEFUL EXEMPLES ************
 * ******* you can remove everything *******
 */

// ****************************************
//  CREATE THE MAP
// ****************************************
// to know a lattitude from google map, search, right-click the marker, choose the numbers
const bruxelles = {
  latitude: '50.850340',
  longitude: '4.351710',
};

// pick container by html id, init map
const myMap = L.map('osm-map');

// set the position of the visible part of the map
myMap.setView([bruxelles.latitude, bruxelles.longitude], 12);

// apply a tile layer (objects and images on the map) https://wiki.openstreetmap.org/wiki/Tiles
// my choice: https://wiki.openstreetmap.org/wiki/FR:Standard_tile_layer
const myLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
});
myMap.addLayer(myLayer);
// from now, the map is visible

// ****************************************
//  ADD A SIMPLE MARKER
// ****************************************
const if3 = {
  latitude: 50.864992887641655,
  longitude: 4.361092065086829,
};
const myMarker1 = L.marker([if3.latitude, if3.longitude]);
myMarker1.addTo(myMap);
myMarker1.bindPopup('IF3');

// ****************************************
//  ADD A CUSTOM MARKER WITH ICON
// ****************************************
const ulb = {
  latitude: 50.815716846279344,
  longitude: 4.383176985030779,
};

const myMarker2 = L.marker([ulb.latitude, ulb.longitude], {
  icon: new FontAwesomeMarker({
    iconClasses: 'fas fa-info-circle',
    markerColor: '#00a9ce',
    markerFillOpacity: 1,
    markerStrokeWidth: 1,
    markerStrokeColor: '#00a9ce',
    iconColor: '#FFF',
  }),
});
myMarker2.addTo(myMap);
myMarker2.bindPopup('ULB');

// ****************************************
//  ADD SEVERAL CUSTOM MARKERS WITH ICON
// ****************************************
const schools = [
  { lat: 50.8454433460653, lon: 4.357242383182535, name: 'le wagon' },
  { lat: 50.83041553366622, lon: 4.340585140853315, name: 'FIJ' },
  { lat: 50.8554916644901, lon: 4.341278642702897, name: 'molengeek' },
];

const schoolsMarkerGroup = [];
for (const school of schools) {
  const marker = L.marker([school.lat, school.lon], {
    icon: new FontAwesomeMarker({
      iconClasses: 'fas fa-graduation-cap',
      markerColor: '#00a9ce',
      markerFillOpacity: 1,
      markerStrokeWidth: 1,
      markerStrokeColor: '#00a9ce',
      iconColor: '#FFF',
      iconSize: '16px',
    }),
  });
  marker.bindPopup(school.name);
  schoolsMarkerGroup.push(marker);
  // marker.addTo(myMap); <-- approach without layer group
}
const schoolsLayerGroup = L.layerGroup(schoolsMarkerGroup);
myMap.addLayer(schoolsLayerGroup);

// ****************************************
//  FILTER MARKERS BY CLASS
// ****************************************
const btnToggleClass = document.getElementById('btn-toggle-class');
let schoolsVisible = false;
btnToggleClass.addEventListener('click', () => {
  const schoolMarker = document.querySelectorAll('.feature-icon.fas.fa-graduation-cap');
  for (const marker of schoolMarker) {
    marker.closest('.leaflet-fa-markers').style.display = schoolsVisible ? 'block' : 'none';
  }
  schoolsVisible = !schoolsVisible;
});

// ex2: hide by layer
const btnToggleLayer = document.getElementById('btn-toggle-layer');
btnToggleLayer.addEventListener('click', () => {
  if (myMap.hasLayer(schoolsLayerGroup)) {
    myMap.removeLayer(schoolsLayerGroup);
  } else {
    myMap.addLayer(schoolsLayerGroup);
  }
});
