<template>
  <section class="form-area md-accent">
    <div class="form-area__content">
      <div class="transition-up" v-delay="{delay:800,cssClass:'up'}">
        <p class="instruction-text">To create your story, select the countries/regions and indicators of interest.  This will help generate initial visualizations to enable further configuration to begin to generate your story. 
        </p>
        <p class="instruction-text instruction-text__emphasize">Hint: The more countries/regions, the better the outcome.</p>
      </div>
      <div class="transition-up"  v-delay="{delay:1600,cssClass:'up'}">
        <multiselect v-model="selectedGeography" :options="geoList" @select="countrySelected" :multiple="true" :close-on-select="true" :clear-on-select="true"  placeholder="Select Countries or Regions" label="name" track-by="name" :preselect-first="false">          
        </multiselect>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeCountry(country)" v-for="country in selectedCountries" :key="country">{{country}} <md-icon>close</md-icon></span>
        </div>
        <multiselect v-model="selectedGoal" :options="goalList" @select="goalSelected" :multiple="true" :close-on-select="true" :clear-on-select="true"  placeholder="Select Goals, Targets, or Indicators" label="name" track-by="name" :preselect-first="false">          
        </multiselect>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeGoal(goal)" v-for="goal in selectedGoals" :key="goal">{{goal}} <md-icon>close</md-icon></span>
        </div>
        <md-button :md-ripple="false" class="md-display-1 md-accent md-raised form-area__btn transition-up" v-delay="{delay:3800,cssClass:'up'}" @click="runSearch">View <md-icon>arrow_forward</md-icon></md-button>
      </div>
    </div>
  </section>
</template>

<script>
import geolist from '~/assets/json/geolist.json'
// import goalList from '~/assets/json/goallist.json'
import goalsAndIndicators from '~/assets/json/YouthGoalsAndndicators.json'
import IEMixin from '~/mixins/IsIe.mixin.js';

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

export default {
  data: () => ({
    geoList: geolist.map(x => { return {name:x.geoAreaName, value: x.geoAreaName}}), 
    goalList: flatGoalIndicatorList.map(x => { return {name: x.code + ': ' + x.description}}),
    selectedGeography: '',
    selectedGoal: '',
    selectedCountries: [],
    selectedGoals: [], 
    false: false,
    true: true
  }),
  props: {
    startClicked: {
      type: Function,
      required: true
    }
  },
  mixins: [IEMixin],
  components: {
  },
  created () {
    if(this.$route.query.countries) {
      this.selectedCountries = this.$route.query.countries;
    }
    if(this.$route.query.selectedGoals) {
      if(!Array.isArray(this.$route.query.selectedGoals))
        this.$route.query.selectedGoals = [this.$route.query.selectedGoals];
      this.selectedGoals = this.$route.query.selectedGoals.map(x => flatGoalIndicatorList.find(y => y.code == x)).map(x => x.code + ': ' + x.description);
    }
  },
  methods: {
    countrySelected (val) {
      this.selectedCountries.push(val.name);
      let that = this;
      setTimeout(() => {  
        that.selectedGeography = []
      }, 40)
    },
    goalSelected (val) {
      this.selectedGoals.push(val.name);
      let that = this;
      setTimeout(() => {
        this.selectedGoal = []
      }, 40)
    },
    removeCountry (country) {
      this.selectedCountries = this.selectedCountries.filter(x => x != country);
    },
    removeGoal (goal) {
      this.selectedGoals = this.selectedGoals.filter(x => x != goal);
    },

    runSearch () {
      //add codes
      let goals = this.selectedGoals.map(x => x.split(':')[0]);
      this.$router.push({path: this.$route.path, query: { countries: this.selectedCountries, selectedGoals: goals, view: 'visualization'}})
      this.startClicked()
    }
  }
}
</script>

<style lang="scss" >
@import '~assets/breakpoints';
@import '~assets/functions';

.form-area {
  min-height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: normal;
  text-align: center;
  background-color: #0099d6;
  padding: 40px;
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  @include bp-max($bp-between) {
    position: relative;
    padding: 60px 40px;
  }

  &__content {
    position: relative;
    z-index: 2;
    width: 60vw;
    padding-top: 100px;
    @include bp-max($bp-between) {
      width: 90vw;
    }
  }
  h1 {
    display: block;
    margin-bottom: 40px;
    color: #ededed !important; 
  }
  .instruction-text {
    color: #ededed !important; 
    //color: #f6931e;
    text-align: left;
    font-size: px-to-rem(20px);
    line-height: 1.3;
    margin-bottom: px-to-rem(16px);
    &__emphasize {
      font-size: px-to-rem(18px);
      font-style: italic;
      margin-bottom: px-to-rem(40px);
      //font-weight: bold;
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
    .multiselect__option--highlight:after{
      background: #f6931e;      
    }
  }
  &__input {
    margin-bottom: 20px;
    input {
      color: #ededed !important; 
    }
  }
  &__btn {
    width: 30vw;
    // position: relative;
    // z-index: 1;
    .md-ripple {
      border: solid 1px white;     
    }
    .md-button-content, i {
      color: white !important;     
    }
  }
  .md-field.md-theme-default:before, .md-field.md-theme-default:after{
    background-color: white;
  }
  .md-field.md-theme-default label, .md-field.md-theme-default.md-has-value .md-input{
    color: white;
    -webkit-text-fill-color: white;
  }
  .md-field.md-theme-default.md-has-value .md-input {

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



</style>
