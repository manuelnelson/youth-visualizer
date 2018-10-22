<template>
    <div class="data-visualization__content" :class="{'reverse': index%2}">
      <div class="data-visualization__left" v-if="!isLoading">
        <span class="md-title">{{indicator.code}}: {{indicator.description}}
          <span @click="openIndicator(indicator)"><md-icon>info</md-icon></span>
          <md-dialog
            :md-active.sync="indicator.infoOpened">
            <div class="indicator-description-info"> 
              <h4>Indicator Information</h4>              
            <ul>
              <li><b>Goal {{indicator.goal}}:</b>  {{indicator.goalDescription}}</li>
              <li><b>Target {{indicator.target}}:</b> {{indicator.targetDescription}}</li>
              <li><b>Indicator {{indicator.code}}:</b>{{indicator.description}}</li>
            </ul>
            <md-button :md-ripple="false" class="md-accent md-raised configure-trigger" @click="indicator.infoOpened = false">Close</md-button>            
            </div>
          </md-dialog>
        </span>
        <div class="data-visualization__buttons">
          <md-button :md-ripple="false" class="md-accent md-raised configure-trigger" v-if="showDimensionsButton" @click="toggleDimensions">Dimensions</md-button>            
          <md-button :md-ripple="false" class="md-accent md-raised configure-trigger" @click="configureGraph">Data</md-button>            
          <md-button :md-ripple="false" class="md-accent md-raised configure-trigger" @click="configureLabels">Labels</md-button>            
          <md-button :md-ripple="false" class="md-accent md-raised configure-trigger" @click="toggleStory">Story Text</md-button>            
        </div>
        <div class="dimensions" v-show="showDimensions">
          <div class="dimensions-item" v-if="ages.length > 1">
            <span class="md-subheading">Age</span>
            <md-switch v-model="ageArray" v-for="age in ages" :value="age" :key="age">{{age}}</md-switch>
          </div>          
          <div class="dimensions-item" v-if="sexes.length > 1">
            <span class="md-subheading">Gender</span>
            <md-switch v-model="sexArray" v-for="sex in sexes" :key="sex" :value="sex">{{sex}}</md-switch>
          </div>          
        </div>
        <div v-show="graphDataOpened" class="configure-graph__content"> 
          <multiselect v-model="graphOptions.selectedGoal" :options="goalList" @select="goalSelected" :multiple="false" :close-on-select="true" :clear-on-select="true"  placeholder="Add Indicator" :preselect-first="false">          
          </multiselect>
          <!-- <md-autocomplete v-if="!showMap" class="form-area__input" @md-changed="goalChanged" @md-selected="goalSelected" @md-opened="goalOpened" v-model="graphOptions.selectedGoal" :md-options="goalList">
            <label>Add Indicator</label>
          </md-autocomplete> -->
          <multiselect v-model="selectedGeography" :options="geoList.map(x=> {return {name:x.geoAreaName}})" @select="countrySelected" :multiple="true" :close-on-select="true" :clear-on-select="true"  placeholder="Select Countries or Regions" label="name" track-by="name" :preselect-first="false">          
          </multiselect>

          <!-- <md-autocomplete class="form-area__input" @md-selected="countrySelected" @md-opened="opened" v-model="selectedGeography" :md-options="geoList.map(x=> {return {name:x.geoAreaName}})">
            <label>
              Modify Countries or Regions
            </label>
          </md-autocomplete> -->
          <div class="selected-tags">
            <span class="selected-tags__item" @click="removeCountry(country)" v-for="(country,ndx) in countries" :key="ndx">{{country.geoAreaName}} <md-icon>close</md-icon></span>
          </div>
          <md-switch v-if="!showMap" v-model="graphOptions.showLinearRegression">Add Linear Regression Line</md-switch>
        </div>
        <div v-show="graphOptionsOpened" class="configure-graph__content"> 
          <md-autocomplete class="form-area__input" @md-selected="graphSelected" @md-opened="graphOpened" v-model="graphOptions.graphType" :md-options="chartTypes">
            <label>Graph Type</label>
          </md-autocomplete>
          <md-field v-if="!showMap">
            <label>X-Axis Label</label>
            <md-input v-model="graphOptions.xAxisLabel"></md-input>
          </md-field>
          <md-field v-if="!showMap">
            <label>Y-Axis Label</label>
            <md-input v-model="graphOptions.yAxisLabel"></md-input>
          </md-field>
          <div>
            <md-button :md-ripple="false" class="md-accent md-raised configure-trigger" @click="runSearch">Update</md-button>            
          </div>
        </div>
        <div v-show="storyOpened" class="configure-graph__content"> 
          <md-field>
            <label>Story Title</label>
            <md-input v-model="storyOptions.title"></md-input>
          </md-field>
          <md-field>
            <label>Story Text</label>
            <md-textarea v-model="storyOptions.text"></md-textarea>
          </md-field>
        </div>
        <div class="data-visualization__dimensions" v-if="dimensions.length > 0">
          <span class="data-visualization__dimensions-label">Current Dimensions:</span>
          <div class="data-visualization__dimensions-item" v-for="(dimension,ndx) in dimensions" :key="ndx">
            {{dimension.name}} {{dimension.values[0]}}
          </div>
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
    </div>
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
  props: ['indicator', 'index', 'slide'],
  data: () => ({
    countries: [],
    selectedGeography: '',
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
    geoList:geolist,
    graphOptions: {
      graphType: 'line',
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
    graphDataOpened: false,
    storyOpened: false,
    isLoading: true,
    graphType: '',
    useAverages: false
  }),
  mixins: [DataMixin],

  async mounted() {
    if(this.slide) {
      this.importSlideData()
    } else {
      this.countries = this.$route.query.countries.map(x => this.geoList.find(y => y.geoAreaName === x));
      this.codes = this.$route.query.selectedGoals;
    }

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
          if(newValue.length > 1) {
            this.sexArray.splice(0,1)
          }
          this.dimensions.push({name:'sex', values:this.sexArray})
          console.log('run sex')
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
          this.dimensions = this.dimensions.filter(x => x.name !== 'age');
          if(newValue.length > 1) {
            this.ageArray.splice(0,1)
          }
          this.dimensions.push({name:'age', values:this.ageArray})
          console.log('run age')
          this.runSearch()
        }
      }
      if(newValue.length === 0) {
        this.dimensions = this.dimensions.filter(x=>x.name !== 'age');
        this.runSearch();
      }
    },
    "graphOptions.showLinearRegression": function(newValue) {
      this.runSearch();
    },
    countries: function(newValue) {
      this.runSearch();
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
    importSlideData() {
      this.countries = this.slide.countries;
      this.code = this.indicator
      this.storyOptions.title = this.slide.title;
      this.storyOptions.text = this.slide.text;
      this.graphOptions.graphType = this.slide.graphType;
      this.graphOptions.xAxisLabel = this.slide.xAxisLabel;
      this.graphOptions.yAxisLabel = this.slide.yAxisLabel;
      this.graphOptions.showLinearRegression = this.slide.showLinearRegression;
      if(this.slide.selectedGoalUrl && this.slide.selectedGoalUrl.length > 0) {
        this.graphOptions.selectedGoal = this.getIndicatorFromUrl(this.slide.selectedGoalUrl).code;
      }
      let dimensions = this.getDimensionsFromUrl(this.slide.url);
      if(dimensions && dimensions.length > 0) {
        dimensions.map(x => {
          let name = `${x.name}Array`;
          this[name] = x.values;
        })
      }
      setTimeout(()=>{},1000)
    },
    getIndicatorFromUrl(url) {
      let dataType = url.split('sdg/').splice(1)[0].split('/Pivot')[0];
      let code = url.split(`?${dataType}=`).splice(1)[0].split('&')[0];
      return flatGoalIndicatorList.find(x => code === x.code)
    },
    getDimensionsFromUrl(url) {
      return JSON.parse(decodeURIComponent(url.split('dimensions=').splice(1)[0]).split('&')[0])
    },
    countrySelected (val) {
      let country = this.geoList.find(y => y.geoAreaName === val.name)
      this.countries.push(country);
      // this.countries.push(val.name);
      let that = this;
      setTimeout(() => {  
        that.selectedGeography = []
      }, 40)
    },
    removeCountry (country) {
      this.selectedCountries = this.selectedCountries.filter(x => x != country);
    },

    // countrySelected (val) {
    //   let country = this.geoList.find(y => y.geoAreaName === val)
    //   this.countries.push(country);
    //   let that = this;
    //   setTimeout(() => {
    //     that.selectedGeography = ''
    //   }, 20)
    // },

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
    // graphOpened () {
    //   this.graphOptions.graphType = ' '
    //   this.graphOptions.graphType = this.graphOptions.graphType.substring(0, this.graphOptions.graphType.length - 1)
    // },
    async configureGraph() {
      this.graphDataOpened = !this.graphDataOpened; 
      if(!this.graphDataOpened) {
        return;
      } else {
        this.showDimensions = false;
        this.storyOpened = false;
        this.graphOptionsOpened = false;
      } 
    },
    async configureLabels() {
      this.graphOptionsOpened = !this.graphOptionsOpened; 
      if(!this.graphOptionsOpened) {
        await this.runSearch();
        this.$refs.chartComponent.drawGraph();
      } else {
        this.showDimensions = false;
        this.storyOpened = false;
        this.graphDataOpened = false;
      } 
    },
    toggleDimensions() {
      this.showDimensions = !this.showDimensions;
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
    removeCountry (country) {
      this.countries = this.countries.filter(x => x != country);
    },
    goalSelected (val) {
      this.selectedGoals.push(val.name);
      let that = this;
      setTimeout(() => {
        this.selectedGoal = []
      }, 40)
    },
    removeGoal (goal) {
      this.selectedGoals = this.selectedGoals.filter(x => x != goal);
    },
    // async goalChanged (term) {
    //   if(term.length === 0) {
    //     this.chartTypes.pop();
    //     this.runSearch();
    //   }
    // },
    async goalSelected (val) {
      this.graphOptions.selectedGoal = val;
      console.log(val)
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
      } 
    },
    // goalOpened () {
    //   this.graphOptions.selectedGoal += ' '
    //   this.graphOptions.selectedGoal = this.graphOptions.selectedGoal.substring(0, this.graphOptions.selectedGoal.length - 1);
    // },

    openIndicator(indicator) {
      indicator.infoOpened = true;
    },
    exportData() {
      let data = {    
        url: this.url,
        graphOptions: this.graphOptions,
        storyOptions: this.storyOptions,
        countries: this.countries,
        //determines if slide is active in story mode
        active: false
      };
      if(this.slide)
        data._id = this.slide._id;
      return data;
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
        if(this.ages.length > 1 && !this.slide) {
          this.ageArray.push(this.ages[1])
        }
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
  &__dimensions {
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: baseline;
    // align-items: baseline;
    &-label {
      font-weight: bold;
      display: block;
      //display: none;
      margin-bottom: 2px;
    }
    &-item {
      display: inline-block;
      padding: 5px;
      border-radius: 2px;
      background-color: #0099d6;
      color: white;
      text-transform: capitalize;
      margin-right: 8px;
    }
  }
  &__buttons {
    margin-bottom: 20px;
    button:first-child{
      margin-left: 0; 
    }
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
    .md-ripple {
      //border: solid 1px #0099d6;     
    }
    .md-button-content, i {
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
  .multiselect {
    margin-bottom: 20px;
    .multiselect__content-wrapper {
      z-index: 1000;
    }
    &__option--highlight {
      background-color: #f6931e;
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
.selected-tags {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  &__item {
    background-color: #f6931e;
    padding: 8px;
    color: white;
    margin-right: 20px;
    margin-bottom: 10px;
    max-width: calc(50% - 20px);
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: darken(#f6931e, 10%);
    }
  }
  @include bp-max($bp-between) {
    .selected-tags__item{
      max-width: 100%;
      //margin-right: 0;
    }
    width: 90vw;
  }
  i {
    color: white !important;
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
  &:first-child {
    margin-left: 0;
  }
  .md-button-content{
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
