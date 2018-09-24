<template>  
  <div :id='containerString' class="container">
    <no-ssr>
     <l-map ref="map" :zoom=2 :center="[47.413220, -1.219482]">   
       <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer> 
       <l-marker v-for="(marker,ndx) in markers" :key="ndx" :icon="marker.icon" :lat-lng="marker.latLng">
         <l-popup>
           <b>Country</b>: {{marker.geoAreaName}} <br>
           <b>{{slide.yAxisLabel}}</b>: {{marker.value}} (on average)
         </l-popup>
       </l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>
<script>
import DataMixin from '~/mixins/dataMethods.mixin.js';
import countryLatLngs from '~/assets/json/country-latlng.json';
let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" width="30px" height="30px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<path d="M256,0C167.641,0,96,71.625,96,160c0,24.75,5.625,48.219,15.672,69.125C112.234,230.313,256,512,256,512l142.594-279.375   C409.719,210.844,416,186.156,416,160C416,71.625,344.375,0,256,0z M256,256c-53.016,0-96-43-96-96s42.984-96,96-96   c53,0,96,43,96,96S309,256,256,256z" fill="{{fillColor}}"/>
</g>
</svg>
`
export default {
  props: ['containerId', 'title', 'countries', 'slide', 'isComparison'],
  data() {
    return {
      autoResize:true,
      showChart: false,
      graphData: [],
      color: [
        "#1790cf","#f6931e","#777","#88b0bb",
        "#1c7099","#038cc4","#75abd0","#afd6dd"
      ],
      yMin:100000,
      yMax: 0,
      markers: [],
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mixins: [DataMixin],
  computed: {
    containerString() {
      return `container${this.containerId}`
    },
  },
  mounted () {    
    this.drawGraph();
  },
  methods: {
    async drawGraph() {
      //map countries to lat long
      let rawData = await this.$axios.$get(this.slide.url)
      this.graphData = this.graphifyData(rawData.data, this.countries);  
      this.graphData = this.averageYearData(this.graphData);

      this.getMinsAndMaxs();

      this.markers = this.graphData.map(x => {
        const countryDataPoint = countryLatLngs.find(y => y.numeric_code === x.geoAreaCode)
        
        if(countryDataPoint) {
          Object.assign(x, {
            latLng: L.latLng(countryDataPoint.latitude_average, countryDataPoint.longitude_average),
            icon: this.getIcon(x)
          })
        } else {
          Object.assign(x, {
            latLng: L.latLng(0, 0),
            icon: this.getIcon(x)
          })
        }
        return x;
      })
    },
    getMinsAndMaxs() {
        var that = this;
        this.graphData.forEach(y => {
          that.yMin = y.value*1 < that.yMin ? y.value*1 : that.yMin;
          that.yMax = y.value*1 > that.yMax ? y.value*1 : that.yMax;
        })
    },
    getIcon(dataPoint){
      return L.divIcon({
        className: 'map-icon',
        html: iconSvg.replace('{{fillColor}}', this.getColor(dataPoint))
      })
    }, 
    getColor(dataPoint) {
      //get range out of 100
      let val = ((dataPoint.value - this.yMin)/ (this.yMax - this.yMin)) * 100;
      var h= Math.floor((100 - val) * 120 / 100);
      var s = 50;//Math.abs(val - 50)/50;
      var v = 50;
      return `hsl(${h},${s}%,${v}%)`
    }


  }
}
</script>
<style lang="scss">
  div.container {
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
    .leaflet-container {
      min-height: 450px;
    }
    .form-area__input {
      width: 50%;
      text-align: right;
    }
    .map-icon{
      position: relative;
      top: -20px;
      left: -5px;
    }
  }
  
</style>
