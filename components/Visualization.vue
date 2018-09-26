<template>
    <v-layout class="data-visualization__content" :class="{'reverse': index%2}">
      <div class="data-visualization__left" v-if="!isLoading">
        <span class="title md-title">{{indicator.code}}: {{indicator.description}}
          <span class="open-indicator" @click="openIndicator(indicator)"><v-icon>info</v-icon></span>
          <v-dialog
            v-model="indicator.infoOpened">
            <div class="indicator-description-info"> 
              <h4>Indicator Information</h4>              
            <ul>
              <li><b>Goal {{indicator.goal}}:</b>  {{indicator.goalDescription}}</li>
              <li><b>Target {{indicator.target}}:</b> {{indicator.targetDescription}}</li>
              <li><b>Indicator {{indicator.code}}:</b>{{indicator.description}}</li>
            </ul>
            <v-btn class="md-accent md-raised configure-trigger" @click="indicator.infoOpened = false">Close</v-btn>            
            </div>
          </v-dialog>
        </span>
        <div class="data-visualization__buttons">
          <v-btn color="accent" class="btn btn-accent configure-trigger" v-if="showDimensionsButton" @click="toggleDimensions">Dimensions</v-btn>            
          <v-btn class="btn btn-accent configure-trigger" @click="configureGraph">Configure Graph</v-btn>            
          <v-btn class="btn btn-accent configure-trigger" @click="toggleStory">Story Text</v-btn>            
        </div>
        <div class="dimensions" v-show="showDimensions">
          <div class="dimensions-item" v-if="ages.length > 1">
            <span class="subheading">Age</span>
            <v-switch v-model="ageArray" v-for="age in ages" :value="age" :label="age" :key="age"></v-switch>
          </div>          
          <div class="dimensions-item" v-if="sexes.length > 1">
            <span class="subheading">Sex</span>
            <v-switch v-model="sexArray" v-for="sex in sexes" :key="sex" :label="sex" :value="sex"></v-switch>
          </div>          
        </div>
        <v-flex v-show="graphOptionsOpened" class="configure-graph__content"> 
          <v-autocomplete v-if="graphOptionsOpened" :allow-overflow="true"  v-model="graphOptions.graphType" :items="chartTypes" label="Graph Type">
          </v-autocomplete>
          <div v-if="!showMap">
            <v-text-field label="X-Axis Label" v-model="graphOptions.xAxisLabel"></v-text-field>
          </div>
          <div v-if="!showMap">
            <v-text-field label="Y-Axis Label" v-model="graphOptions.yAxisLabel"></v-text-field>
          </div>
          <v-autocomplete v-if="!showMap && graphOptionsOpened" class="form-area__input" :menu-props="menuProps" append-icon="" v-model="graphOptions.selectedGoal" label="Compare Indicator" :items="goalList">
          </v-autocomplete>
          <v-switch v-if="!showMap" v-model="graphOptions.showLinearRegression" label="Add Linear Regression Line"></v-switch>
          <v-btn class="btn-accent btn configure-trigger" @click="configureGraph">Update</v-btn>            
        </v-flex>
        <div v-show="storyOpened" class="configure-graph__content"> 
            <v-text-field label="Story Title" v-model="storyOptions.title"></v-text-field>
            <v-textarea v-model="storyOptions.text" label="Story Text"></v-textarea>
        </div>
      </div>
      <div class="data-visualization__right" v-if="!isLoading">      
        <e-chart-component ref="chartComponent" v-if="showEChart" :isComparison="graphOptions.selectedGoal.length > 0" :countries="countries" :graph-data="graphData" :graph-options="graphOptions" :graph-type="graphOptions.graphType" :container-id="index"></e-chart-component>  
        <e-timeline-chart ref="timelineComponent" v-if="showTimelineChart" :countries="countries" :graph-data="graphData" :graph-options="graphOptions" :container-id="index"></e-timeline-chart>
        <e-map-component ref="mapComponent" v-if="showMap" :countries="countries" :graph-data="graphData" :graph-options="graphOptions" :container-id="index"></e-map-component>
      </div>
      <div v-if="isLoading"  class="data-visualization__loading">
          <span class="data-visualization__loading-text">Fetching data...</span>
          <div class="lds-dual-ring">
          </div>          
      </div>
    </v-layout>
</template>

<script>
import GraphComponent from '~/components/Graph.vue'
import EChartComponent from '~/components/EChart.vue'
import ETimelineChart from '~/components/ETimelineChart.vue'
import EMapComponent from '~/components/Map.vue'
import geolist from '~/assets/json/geolist.json'
// import goalList from '~/assets/json/goallist.json'
import goalsAndIndicators from '~/assets/json/YouthGoalsAndndicators.json'
import DataMixin from '~/mixins/dataMethods.mixin.js';
const baseAPIUrl = 'https://unstats.un.org/SDGAPI/v1/'
import Vue from 'vue';
let flatGoalIndicatorList = [];
goalsAndIndicators.forEach(goal => {
  flatGoalIndicatorList.push(goal);
  goal.targets.forEach(target => {
    flatGoalIndicatorList.push(target);
    target.indicators.forEach(indicator => {
      flatGoalIndicatorList.push(indicator);
    });
  });
});

import {mapMutations,mapGetters,mapActions} from 'vuex';

export default {
  props: ['indicator', 'index'],
  data: () => ({
    menuProps: {
      bottom: true,
      minWidth: "100%",
      maxWidth: "100%",
      offsetY: true,
      nudgeTop:0,
      absolute:true,
      overflowY: true,
      allowOverflow:false,
    },
    true: true,
    countries: [],
    codes: [],
    indicators: [],
    ageArray: [],
    sexArray: [],
    goalList: flatGoalIndicatorList.map(x => x.code + ': ' + x.description),
    ages: [],
    sexes: [],
    selectedYear: '',
    yearList: [],
    first: false,
    dimensions: [],
    showDimensions: false,
    chartTypes: ['bar', 'scatter', 'line', 'map'],
    graphData: [],
    oldGraphData: [], //used if new comparison indicator is added
    comparisonGraphData: [],
    graphOptions: {
      graphType: 'scatter',
      xAxisLabel: 'Year',
      yAxisLabel: '',
      xMin:100000000,
      xMax: -1000,
      yMin: 10000000,
      yMax: -10000,
      selectedGoal: '',
      selectedGoalUrl: '',
      showLinearRegression: false
    },
    storyOptions: {
      title: '',
      text: ''
    },
    graphOptionsOpened: false,
    storyOpened: false,
    isLoading: true,
    graphType: '',
    useAverages: false
  }),
  mixins: [DataMixin],

  async mounted() {
    this.countries = this.$route.query.countries.map(x => geolist.find(y => y.geoAreaName === x));
    this.codes = this.$route.query.selectedGoals;

    //retrieve data
    this.runSearch(true);
  },
  components: {
    GraphComponent, EChartComponent, ETimelineChart, EMapComponent
  },
  watch: {
    sexArray: function(newValue, oldValue) {
      if(newValue.length > 0) {
        if(this.dimensions) {
          this.dimensions = this.dimensions.filter(x => x.name !== 'sex');
          console.log(this.dimensions);
          console.log(newValue);
          this.dimensions.push({name:'sex', values:newValue})
          this.runSearch()
        }
      }
      if(newValue.length === 0) {
        this.dimensions = this.dimensions.filter(x=>x.name !== 'sex');
        this.runSearch();
      }
    },
    ageArray: function(newValue, oldValue) {
      if(newValue.length > 0) {
        if(this.dimensions) {
          this.dimensions.filter(x => x.name !== 'age');
          this.dimensions.push({name:'age', values:newValue})
          this.runSearch()
        }
      }
      if(newValue.length === 0) {
        this.dimensions = this.dimensions.filter(x=>x.name !== 'age');
        this.runSearch();
      }
    }

  },
  computed: {
    countryList() {
      return this.countries.map(x => x.geoAreaName).join(', ')
    },
    configureButtonText(){
      return this.graphOptionsOpened ? 'Update' : 'Configure Graph'
    },
    url() {
      let dimensionsString = encodeURIComponent(JSON.stringify(this.dimensions))
      let areaCodes = this.countries.map(x => x.geoAreaCode).join('&areaCode=')
      let dataType = this.getIndicatorType(this.indicator.code);
      return `${baseAPIUrl}/sdg/${dataType}/PivotData?${dataType}=${this.indicator.code}&areaCode=${areaCodes}&dimensions=${dimensionsString}&pageSize=500`
    },
    showDimensionsButton() {
      return this.ages.length > 1 || this.sexes.length > 1
    },
    showTimelineChart() {
      return this.graphOptions.graphType === 'timeline'
    },
    showMap() {
      return this.graphOptions.graphType === 'map'
    },
    showEChart() {
      return this.graphOptions.graphType === 'line' || this.graphOptions.graphType === 'scatter' || this.graphOptions.graphType === 'bar'
    }

  },
  methods: {
    getIndicatorType(indicatorCode) {
      switch(indicatorCode.split('.').length){
        case 1:
          return 'Goal';
        case 2: 
          return 'Target';
        case 3:
          return 'Indicator';
      }
    },
    yearSelected (val) {
      this.selectedYear = val
    },
    yearOpened () {
      this.selectedYear += ' '
      this.selectedYear = this.selectedYear.substring(0, this.selectedYear.length - 1)
    },
    graphSelected (val) {
      this.graphOptions.graphType = val;
      if(val === 'map') {
        this.oldGraphData = this.graphData;
        this.graphData = this.averageYearData(this.graphData);
      } else {
        if(this.oldGraphData && this.oldGraphData.length > 0)
          this.graphData = this.oldGraphData;
      }
    },
    graphOpened () {
      this.graphOptions.graphType = ' '
      this.graphOptions.graphType = this.graphOptions.graphType.substring(0, this.graphOptions.graphType.length - 1)
    },
    configureGraph() {
      this.graphOptionsOpened = !this.graphOptionsOpened; 
      if(!this.graphOptionsOpened) {
        this.$refs.chartComponent.drawGraph();
      } else {
        this.showDimensions = false;
        this.storyOpened = false;
      } 
    },
    toggleDimensions() {
      this.showDimensions = !this.showDimensions;
      console.log(this.showDimensions)
      if(this.showDimensions){
        this.graphOptionsOpened = false;
        this.storyOpened = false;
      }
    },
    toggleStory() {
      this.storyOpened = !this.storyOpened;
      if(this.storyOpened){
        this.graphOptionsOpened = false;
        this.showDimensions = false;
      }
    },
    async goalSelected (val) {
      this.graphOptions.selectedGoal = val;
      if(val.length > 0)
      {        
        // 1. let's store the old data - this can later be used if we do the timeline option
        this.oldGraphData = this.graphData;
        // 2. let's make the old data 1 dimension either by
        //  a) taking the latest year that has a value?
        //  b) averaging the data over the years and using that value
        let compareData = this.graphData;
        if(this.useAverages)
          compareData = this.averageYearData(this.graphData);
        // 3. make a call to get the new indicators data - repeat step two with that data
        //this.getIndicatorData(this.graphOptions.selectedGoal.split(':')[0])
        let secondCompareData = await this.getIndicatorData(val.split(':')[0])
        if(this.useAverages)
          secondCompareData = this.averageYearData(compareIndicatorData);
        // 4. Combine data by grouping over country.  X-value will be new indicator data
        // 5. Apply to graph!
        this.graphData = this.combineIndicators(compareData, secondCompareData); 
        //update chart types
        this.chartTypes.push('timeline');
      } else {
        // if(this.oldGraphData && this.oldGraphData.length > 0)
        //   this.graphData = this.oldGraphData;
        this.chartTypes.pop();
        this.runSearch();
      }
    },
    goalOpened () {
      this.graphOptions.selectedGoal += ' '
      this.graphOptions.selectedGoal = this.graphOptions.selectedGoal.substring(0, this.graphOptions.selectedGoal.length - 1);
    },

    openIndicator(indicator) {
      indicator.infoOpened = true;
    },
    exportData() {
      return {
        url: this.url,
        graphOptions: this.graphOptions,
        storyOptions: this.storyOptions,
        countries: this.countries,
        //determines if slide is active in story mode
        active: false
      };
    },
    async runSearch (init) {
      this.isLoading = true;
      let data = await this.$axios.$get(this.url)
      if(this.graphOptions.selectedGoal.length > 0) {
              console.log('selected goal', this.graphOptions.selectedGoal)
        let secondCompareData = await this.getIndicatorData(this.graphOptions.selectedGoal.split(':')[0])
        this.graphData = this.graphifyData(data.data, this.countries);   ///JSON.parse(data.data[0].years).filter(y => y.value.length > 0);
        this.graphData = this.combineIndicators(this.graphData, secondCompareData); 
      } else {
        this.graphData = this.graphifyData(data.data, this.countries);   ///JSON.parse(data.data[0].years).filter(y => y.value.length > 0);
      }
      if(data.data[0])
        this.graphOptions.yAxisLabel = data.data[0].seriesDescription;

      if(init){
        this.ages = this.getDimensionList(data.data, 'age');
        this.sexes = this.getDimensionList(data.data, 'sex');
        this.yearList = this.getDimensionList(this.graphData, 'year').sort();
      }
      this.isLoading = false;
    },
    async getIndicatorData(indicatorCode) {
      const dimensionsString = encodeURIComponent(JSON.stringify(this.dimensions))
      const areaCodes = this.countries.map(x => x.geoAreaCode).join('&areaCode=')
      let dataType = this.getIndicatorType(indicatorCode);

      const url = `${baseAPIUrl}sdg/${dataType}/PivotData?${dataType}=${indicatorCode}&areaCode=${areaCodes}&dimensions=${dimensionsString}&pageSize=500`
      this.graphOptions.selectedGoalUrl = url;
      let data = await this.$axios.$get(url);
      if(data.data[0])
        this.graphOptions.xAxisLabel = data.data[0].seriesDescription;
      return this.graphifyData(data.data, this.countries);  
    }
  }
}
</script>

<style lang="scss" >
@import '~assets/breakpoints';

.data-visualization {
  min-height: calc(100vh - 40px);
  background-color: #efefef;
  padding: 160px 40px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  h3.md-display-1 {
    color: #f6931e;
    margin-bottom: 20px;
    text-align: center;
    display: block;
    width: 100%;
    font-weight: bold;
  }
  .v-input__slot {
    flex-wrap: wrap;
  }
  .v-input--selection-controls{
    margin-top: 0 !important;
    text-align: center;
  }
  .subheading {
    margin-bottom: 20px;
  }
  .btn-accent{
    background-color: #f6931e;
    color: white;
  }
  .theme--light .v-input--switch__track.accent--text {
    color:#f6931e;
  }
  &__loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    margin-bottom: 60px;
    min-height: 400px;
    &-text{
      margin-bottom: 20px;
      display: block;
      font-size: 18px;
      font-weight: bold;
      width: 100%;
      text-align: center;
      //color: #f6931e;
    }
  }
  .open-indicator {
    cursor: pointer;
  }
  &__buttons {
    margin-bottom: 20px;
  }
  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    justify-content: space-between;
    &.reverse {
      flex-direction: row-reverse;
      .data-visualization__left {
        width: 56%;
      }
      .data-visualization__right {
        width: 40%;
      }
    }
  }
  &__btn {
    position: relative;
    top: -40px;
    left: -20px;
    .v-btn-content, i {
      color: #0099d6 !important;     
    }
  }

  &__left {
    width: 40%;
    text-align: left;
    h3.md-display-1 {
      color: #f6931e;
      margin-bottom: 20px;
    }
  }
  &__right {
    width: 56%;
  }
  .md-title {
    text-align: center;
    display: block;
    margin-bottom: 20px;
    color: #0099d6;
  }
  .dimensions {
    display: flex;
    .v-input__slot {
      justify-content: center;
    }

    &-item {
      justify-content: center;
      align-content: center;
      flex-grow: 1;
      max-width: 33.333%;
      span {
        display: block;
        text-align: center;
      }
      .md-switch {
        display: flex;
        justify-content: center;
        align-content: center;
      }
    }
  }
}
.md-menu-content-bottom-start {
  min-width: 600px;
}
@include bp-max($bp-between) {
  .data-visualization {
    &__content {
      flex-wrap: wrap;
      &.reverse {
        flex-direction: row;
        .data-visualization__left {
          width: 100%;
        }
        .data-visualization__right {
          width: 100%;
        }
      }
    }
    &__left {
      width: 100%;
    }
    &__right {
      width: 100%;
    }

  }
}

.configure-trigger{
  margin-top: 40px;
  .v-btn-content{
    color: white;
  }
}
//loading animation
$height: 100px;
$width: 100px;
.lds-dual-ring {
  display: inline-block;
  width: $width;
  height: $height;
  margin: 0 auto;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: ($width - 18px);
  height: ($height - 18px);
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #0099d6;
  border-color: #0099d6 transparent #0099d6 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.indicator-description-info {
  padding: 40px;
  min-width: 40vw;
  h4 {
    margin-bottom: 12px;
    font-size: 22px;
  }
  li {
    margin-bottom: 8px;
  }
}
</style>
