<template>
  <section class="data-visualization">
    <div class="data-visualization__content">
      <h3 class="md-display-1">South Africa, Tanzania, Burundi, Cameroon, Canada</h3>        
    </div>
    <div class="data-visualization__content">
      <div class="data-visualization__left">
        <graph-component container-id="container1"></graph-component>  
      </div>
      <div class="data-visualization__right">      
        <span class="md-title">8. Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all</span>
        <div class="dimensions">
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedAge" :md-options="ageOptions">
              <label>Age</label>
            </md-autocomplete>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedSex" :md-options="sexOptions">
              <label>Sex</label>
            </md-autocomplete>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedYear" :md-options="yearList">
              <label>Year</label>
            </md-autocomplete>
          </div>          
        </div>
      </div>
    </div>
    <div class="data-visualization__content">
      <div class="data-visualization__left">
        <span class="md-title">8.5.2 Unemployment rate, by sex, age and persons with disabilities</span>
        <div class="dimensions">
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedAge" :md-options="ageOptions">
              <label>Age</label>
            </md-autocomplete>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedSex" :md-options="sexOptions">
              <label>Sex</label>
            </md-autocomplete>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedYear" :md-options="yearList">
              <label>Year</label>
            </md-autocomplete>
          </div>          
        </div>
      </div>
      <div class="data-visualization__right">      
        <graph-component container-id="container2"></graph-component>  
      </div>
    </div>
    <div class="data-visualization__content">
      <div class="data-visualization__left">
        <graph-component container-id="container3"></graph-component>  
      </div>
      <div class="data-visualization__right">      
        <span class="md-title">8.6.1 Proportion of youth (aged 15-24 years) not in education, employment or training</span>
        <div class="dimensions">
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedAge" :md-options="ageOptions">
              <label>Age</label>
            </md-autocomplete>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedSex" :md-options="sexOptions">
              <label>Sex</label>
            </md-autocomplete>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedYear" :md-options="yearList">
              <label>Year</label>
            </md-autocomplete>
          </div>          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GraphComponent from '~/components/Graph.vue'
const yearList = [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
const ageOptions = ['10-24', '14-24', '15-29', '18-35']
const sexOptions = ['Male', 'Female', 'Both Sexes']

export default {
  data: () => ({
    ageArray: [],
    sexArray: [],
    selectedYear: '',
    selectedAge: '',
    selectedSex: '',
    ageOptions,
    sexOptions,
    yearList
  }),
  components: {
    GraphComponent
  },
  methods: {
    fake () {
      console.log(yearList)
    },
    yearSelected (val) {
      console.log(val)
      this.selectedYear = val
    },
    yearOpened () {
      this.selectedYear += ' '
      this.selectedYear = this.selectedYear.substring(0, this.selectedYear.length - 1)
    },
    ageSelected (val) {
      console.log(val)
      this.selectedAge = val
    },
    ageOpened () {
      this.selectedAge += ' '
      this.selectedAge = this.selectedAge.substring(0, this.selectedAge.length - 1)
    },
    sexSelected (val) {
      console.log(val)
      this.selectedSex = val
    },
    sexOpened () {
      this.selectedSex += ' '
      this.selectedSex = this.selectedSex.substring(0, this.selectedSex.length - 1)
    }

  }
}
</script>

<style lang="scss" >
.data-visualization {
  min-height: calc(100vh - 40px);
  background-color: #efefef;
  padding: 80px 40px;
  position: relative;

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    justify-content: space-between;
  }
  h3.md-display-1 {
    color: #f6931e;
    margin-bottom: 20px;
    text-align: center;
    display: block;
    width: 100%;
    font-weight: bold;
  }
  &__left {
    width: 40%;
    text-align: left;
  }
  &__right {
    width: 56%;
  }
  .md-title {
    text-align: left;
    display: block;
    margin-bottom: 20px;
    color: #0099d6;
    padding-top: 40px;
  }
  .dimensions {
    display: flex;
    flex-direction: column;
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
</style>
