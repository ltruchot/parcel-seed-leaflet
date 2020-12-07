import { Icon } from 'leaflet';

// @see and thanks to https://github.com/danwild/leaflet-fa-markers
export const FontAwesomeMarker = Icon.extend({
  options: {
    popupAnchor: [0, -50],
  },
  createIcon() {
    const { options } = this;

    // error check on required params
    if (!options.markerColor) {
      return console.error('markerColor is mandatory when creating new FontAwesomeMarker');
    }
    if (!options.iconClasses) {
      return console.error('iconClasses is mandatory when creating new FontAwesomeMarker');
    }

    // default value for optional params
    const defaults = {
      markerFillOpacity: 1,
      markerStrokeColor: options.markerColor,
      markerStrokeWidth: 1,
      markerPath: 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,24.0760606 16,51 16,51 C16,51 31,24.0760606 31,15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z',
      iconColor: 'aquamarine',
      iconSize: '22px',
    };

    // marker icon DomUtil doesn't seem to like svg, just append out html directly
    const marker = `
      <div class="leaflet-fa-markers">
        <div class="marker-icon-svg">
          <svg 
            width="32px"
            height="52px"
            viewBox="0 0 32 52"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="${options.markerPath ?? defaults.markerPath}"
            fill-opacity="${options.markerFillOpacity ?? defaults.markerFillOpacity}"
            fill="${options.markerColor}"
            stroke="${options.markerStrokeColor ?? defaults.markerColor}"
            stroke-width="${options.markerStrokeWidth ?? defaults.markerStrokeWidth}"
            ></path>
          </svg>
        </div>
        <i 
          class="feature-icon ${options.iconClasses}" 
          style="color:${options.iconColor ?? defaults.iconColor};font-size:${options.iconSize ?? defaults.iconSize};"></i>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = marker;

    return div;
  },
});
