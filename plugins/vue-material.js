//import 'babel-polyfill'
// if ( !String.prototype.contains ) {
//   String.prototype.contains = function() {
//       return String.prototype.indexOf.apply( this, arguments ) !== -1;
//   };
// } 

import Vue from 'vue';
import * as VueMaterial from 'vue-material';

Vue.use(VueMaterial)
