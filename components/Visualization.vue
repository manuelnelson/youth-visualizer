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
            <md-button class="md-accent md-raised configure-trigger" @click="indicator.infoOpened = false">Close</md-button>            
            </div>
          </md-dialog>
        </span>
        <div class="dimensions">
          <div class="dimensions-item" v-if="ages.length > 0">
            <span class="md-subheading">Age</span>
            <md-switch v-model="ageArray" v-for="age in ages" :value="age" :key="age">{{age}}</md-switch>
          </div>          
          <div class="dimensions-item" v-if="sexes.length > 0">
            <span class="md-subheading">Sex</span>
            <md-switch v-model="sexArray" v-for="sex in sexes" :key="sex" :value="sex">{{sex}}</md-switch>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedYear" :md-options="yearList">
              <label>Year</label>
            </md-autocomplete>
          </div>          
        </div>
        <div v-show="graphOptionsOpened" class="configure-graph__content"> 
          <md-autocomplete class="form-area__input" @md-selected="graphSelected" @md-opened="graphOpened" v-model="graphOptions.selectedGraph" :md-options="chartTypes">
            <label>Graph Type</label>
          </md-autocomplete>
          <md-field>
            <label>X-Axis Label</label>
            <md-input v-model="graphOptions.xAxisLabel"></md-input>
          </md-field>
          <md-field>
            <label>Y-Axis Label</label>
            <md-input v-model="graphOptions.yAxisLabel"></md-input>
          </md-field>
          <md-switch v-model="graphOptions.showLinearRegression">Add Linear Regression Line</md-switch>
        </div>
        <md-button class="md-accent md-raised configure-trigger" @click="configureGraph">{{configureButtonText}}</md-button>            
        <div v-show="storyOpened" class="configure-graph__content"> 
          <md-field>
            <label>Story Text</label>
            <md-textarea v-model="story.text"></md-textarea>
          </md-field>
        </div>
        <md-button class="md-accent md-raised configure-trigger" @click="storyOpened = true">Story Text</md-button>            
      </div>
      <div class="data-visualization__right" v-if="!isLoading">      
        <e-chart-component ref="chartComponent" :countries="countries" :graph-data="graphData" :graph-options="graphOptions" :graph-type="graphOptions.selectedGraph" :container-id="index"></e-chart-component>  
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
import geolist from '~/assets/json/geolist.json'
// import goalList from '~/assets/json/goallist.json'
import goalsAndIndicators from '~/assets/json/YouthGoalsAndndicators.json'
import DataMixin from '~/mixins/dataMethods.mixin.js';
const baseAPIUrl = 'https://unstats.un.org/SDGAPI/v1/'
import Vue from 'vue';
const targetList = goalsAndIndicators.reduce((acc, x) => {acc.push(...x.targets); return acc;}, [] )
const fullIndicatorList = targetList.reduce( (acc, y) => {acc.push(...y.indicators);return acc},[]);

export default {
  props: ['indicator', 'index'],
  data: () => ({
    countries: [],
    codes: [],
    indicators: [],
    ageArray: [],
    sexArray: [],
    ages: [],
    sexes: [],
    selectedYear: '',
    yearList: [],
    first: false,
    dimensions: [],
    chartTypes: ['bar', 'scatter', 'line', 'map'],
    graphData: [],
    graphOptions: {
      graphType: 'scatter',
      xAxisLabel: 'Year',
      yAxisLabel: '',
      selectedGraph: 'scatter',
      showLinearRegression: false
    },
    story: {
      text: ''
    },
    graphOptionsOpened: false,
    storyOpened: false,
    isLoading: true,
    graphType: '',
  }),
  mixins: [DataMixin],

  async mounted() {
    this.countries = this.$route.query.countries.map(x => geolist.find(y => y.geoAreaName === x));
    this.codes = this.$route.query.selectedGoals;

    //retrieve data
    this.runSearch(true);
  },
  components: {
    GraphComponent, EChartComponent
  },
  watch: {
    sexArray: function(newValue) {
      if(newValue.length > 0) {
        if(this.dimensions) {
          this.dimensions.push({name:'sex', values:newValue})
          this.runSearch()
        }
      }
      if(newValue.length === 0) {
        this.dimensions = this.dimensions.filter(x=>x.name !== 'sex');
        this.runSearch();
      }
    },
    ageArray: function(newValue) {
      if(newValue.length > 0) {
        if(this.dimensions) {
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
      return `${baseAPIUrl}/sdg/Indicator/PivotData?indicator=${this.indicator.code}&areaCode=${areaCodes}&dimensions=${dimensionsString}&pageSize=500`
    }
  },
  methods: {
    yearSelected (val) {
      this.selectedYear = val
    },
    yearOpened () {
      this.selectedYear += ' '
      this.selectedYear = this.selectedYear.substring(0, this.selectedYear.length - 1)
    },
    graphSelected (val) {
      this.graphOptions.selectedGraph = val;
      this.$refs.chartComponent.drawGraph();
    },
    graphOpened () {
      this.graphOptions.selectedGraph = ' '
      this.graphOptions.selectedGraph = this.graphOptions.selectedGraph.substring(0, this.graphOptions.selectedGraph.length - 1)
    },
    configureGraph() {
      this.graphOptionsOpened = !this.graphOptionsOpened; 
      if(!this.graphOptionsOpened) {
        this.$refs.chartComponent.drawGraph();
      }     
    },
    openIndicator(indicator) {
      indicator.infoOpened = true;
    },
    exportData() {
      return {
        url: this.url,
        graphOptions: this.graphOptions,
        story: this.story,
        countries: this.countries,
        //determines if slide is active in story mode
        active: false
      };
    },
    async runSearch (init) {
      this.isLoading = true;
      let dimensionsString = encodeURIComponent(JSON.stringify(this.dimensions))
      let areaCodes = this.countries.map(x => x.geoAreaCode).join('&areaCode=')
      let data = await this.$axios.$get(this.url)
      this.graphData = this.graphifyData(data.data, this.countries);   ///JSON.parse(data.data[0].years).filter(y => y.value.length > 0);
      this.graphOptions.yAxisLabel = data.data[0].seriesDescription;
      if(init){
        this.ages = this.getDimensionList(data.data, 'age');
        this.sexes = this.getDimensionList(data.data, 'sex');
        this.yearList = this.getDimensionList(this.graphData, 'year').sort();
      }
      this.isLoading = false;
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