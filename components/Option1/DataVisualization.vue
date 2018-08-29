<template>
  <section class="data-visualization">
    <div class="data-visualization__content">
      <div class="data-visualization__left">
        <h3 class="md-display-1">South Africa, Tanzania, Burundi, Cameroon, Canada</h3>        
      </div>
      <div class="data-visualization__right">        
        <md-list>
          <md-list-item @click="fake">
            <md-icon>clear</md-icon>
            <span class="md-list-item-text">8. Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all</span>
          </md-list-item>
          <md-list-item @click="fake">
            <md-icon>clear</md-icon>
            <span class="md-list-item-text">8.5.2 Unemployment rate, by sex, age and persons with disabilities</span>
          </md-list-item>
          <md-list-item @click="fake">
            <md-icon>clear</md-icon>
            <span class="md-list-item-text">8.6.1 Proportion of youth (aged 15-24 years) not in education, employment or training</span>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <div class="data-visualization__content">
      <div class="data-visualization__left">
        <span class="md-title">Additional Dimensions To Add</span>
        <div class="dimensions">
          <div class="dimensions-item">
            <span class="md-subheading">Age</span>
            <md-switch v-model="ageArray" value="1">10-24</md-switch>
            <md-switch v-model="ageArray" value="2">14-24</md-switch>
            <md-switch v-model="ageArray" value="3">15-29</md-switch>
            <md-switch v-model="ageArray" value="4">18-35</md-switch>
          </div>          
          <div class="dimensions-item">
            <span class="md-subheading">Sex</span>
            <md-switch v-model="sexArray" value="1">Male</md-switch>
            <md-switch v-model="sexArray" value="2">Female</md-switch>
            <md-switch v-model="sexArray" value="3">Both Sexes</md-switch>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedYear" :md-options="yearList">
              <label>Year</label>
            </md-autocomplete>
          </div>          
        </div>
      </div>
      <div class="data-visualization__right">      
        <graph-component container-id="container1"></graph-component>  
      </div>
    </div>
    <div class="data-visualization__content">
      <div class="data-visualization__left">
        <span class="md-title">Additional Dimensions To Add</span>
        <div class="dimensions">
          <div class="dimensions-item">
            <span class="md-subheading">Age</span>
            <md-switch v-model="ageArray" value="1">10-24</md-switch>
            <md-switch v-model="ageArray" value="2">14-24</md-switch>
            <md-switch v-model="ageArray" value="3">15-29</md-switch>
            <md-switch v-model="ageArray" value="4">18-35</md-switch>
          </div>          
          <div class="dimensions-item">
            <span class="md-subheading">Sex</span>
            <md-switch v-model="sexArray" value="1">Male</md-switch>
            <md-switch v-model="sexArray" value="2">Female</md-switch>
            <md-switch v-model="sexArray" value="3">Both Sexes</md-switch>
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
        <span class="md-title">Additional Dimensions To Add</span>
        <div class="dimensions">
          <div class="dimensions-item">
            <span class="md-subheading">Age</span>
            <md-switch v-model="ageArray" value="1">10-24</md-switch>
            <md-switch v-model="ageArray" value="2">14-24</md-switch>
            <md-switch v-model="ageArray" value="3">15-29</md-switch>
            <md-switch v-model="ageArray" value="4">18-35</md-switch>
          </div>          
          <div class="dimensions-item">
            <span class="md-subheading">Sex</span>
            <md-switch v-model="sexArray" value="1">Male</md-switch>
            <md-switch v-model="sexArray" value="2">Female</md-switch>
            <md-switch v-model="sexArray" value="3">Both Sexes</md-switch>
          </div>          
          <div class="dimensions-item">
            <md-autocomplete class="form-area__input" @md-selected="yearSelected" @md-opened="yearOpened" v-model="selectedYear" :md-options="yearList">
              <label>Year</label>
            </md-autocomplete>
          </div>          
        </div>
      </div>
      <div class="data-visualization__right">      
        <graph-component container-id="container3"></graph-component>  
      </div>
    </div>
  </section>
</template>

<script>
import GraphComponent from '~/components/Graph.vue'
const yearList = [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

export default {
  data: () => ({
    ageArray: [],
    sexArray: [],
    selectedYear: '',
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
  &__left {
    width: 40%;
    text-align: left;
    h3.md-display-1 {
      color: #0099d6;
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
</style>
