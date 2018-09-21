import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet'

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const VueLeaflet = {

  install(Vue, options) {
    Vue.component('l-map', Vue2Leaflet.LMap)
    Vue.component('l-marker', Vue2Leaflet.LMarker)
    Vue.component('l-popup', Vue2Leaflet.LPopup)
    Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
  }

};

Vue.use(VueLeaflet);

export default VueLeaflet;