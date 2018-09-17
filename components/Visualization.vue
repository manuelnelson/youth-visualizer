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
        <div class="data-visualization__buttons">
          <md-button class="md-accent md-raised configure-trigger" v-if="showDimensionsButton" @click="toggleDimensions">Dimensions</md-button>            
          <md-button class="md-accent md-raised configure-trigger" @click="configureGraph">Configure Graph</md-button>            
          <md-button class="md-accent md-raised configure-trigger" @click="toggleStory">Story Text</md-button>            
        </div>
        <div class="dimensions" v-show="showDimensions">
          <div class="dimensions-item" v-if="ages.length > 1">
            <span class="md-subheading">Age</span>
            <md-switch v-model="ageArray" v-for="age in ages" :value="age" :key="age">{{age}}</md-switch>
          </div>          
          <div class="dimensions-item" v-if="sexes.length > 1">
            <span class="md-subheading">Sex</span>
            <md-switch v-model="sexArray" v-for="sex in sexes" :key="sex" :value="sex">{{sex}}</md-switch>
          </div>          
          <!-- <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedYear" :md-options="yearList">
              <label>Year</label>
            </md-autocomplete>
          </div>           -->
        </div>
        <div v-show="graphOptionsOpened" class="configure-graph__content"> 
          <md-autocomplete class="form-area__input" @md-selected="graphSelected" @md-opened="graphOpened" v-model="graphOptions.graphType" :md-options="chartTypes">
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
          <md-autocomplete class="form-area__input" @md-selected="goalSelected" @md-opened="goalOpened" v-model="graphOptions.selectedGoal" :md-options="goalList">
            <label>Compare Indicator</label>
          </md-autocomplete>
          <md-switch v-model="graphOptions.showLinearRegression">Add Linear Regression Line</md-switch>
          <md-button class="md-accent md-raised configure-trigger" @click="configureGraph">Update</md-button>            
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
      </div>
      <div class="data-visualization__right" v-if="!isLoading">      
        <e-chart-component ref="chartComponent" :countries="countries" :graph-data="graphData" :graph-options="graphOptions" :graph-type="graphOptions.graphType" :container-id="index"></e-chart-component>  
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
import {mapMutations,mapGetters,mapActions} from 'vuex';

export default {
  props: ['indicator', 'index'],
  data: () => ({
    countries: [],
    codes: [],
    indicators: [],
    ageArray: [],
    sexArray: [],
    goalList: fullIndicatorList.map(x => x.code + ': ' + x.description),
    ages: [],
    sexes: [],
    selectedYear: '',
    yearList: [],
    first: false,
    dimensions: [],
    showDimensions: false,
    chartTypes: ['bar', 'scatter', 'line', 'map'],
    graphData: [],
    graphOptions: {
      graphType: 'scatter',
      xAxisLabel: 'Year',
      yAxisLabel: '',
      selectedGoal: '',
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
    },
    showDimensionsButton() {
      return this.ages.length > 1 || this.sexes.length > 1
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
      this.graphOptions.graphType = val;
      this.$refs.chartComponent.drawGraph();
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
    goalSelected (val) {
      // this.selectedGoals.push(val);
      // let that = this;
      // setTimeout(() => {
      //   this.selectedGoal = ''
      // }, 20)
    },
    goalOpened () {
      this.graphOptions.selectedGoal += ' '
      this.graphOptions.selectedGoal = this.graphOptions.selectedGoal.substring(0, this.graphOptions.selectedGoal.length - 1)
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
