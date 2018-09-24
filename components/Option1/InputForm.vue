<template>
  <section class="form-area md-accent">
    <div class="form-area__content">
      <div class="transition-up" v-delay="{delay:800,cssClass:'up'}">
        <md-autocomplete class="form-area__input" @md-selected="countrySelected" @md-opened="opened" v-model="selectedGeography" :md-options="geoList">
          <label>Country or Region</label>
        </md-autocomplete>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeCountry(country)" v-for="country in selectedCountries" :key="country">{{country}} <md-icon>close</md-icon></span>
        </div>
        <md-autocomplete class="form-area__input" @md-selected="goalSelected" @md-opened="goalOpened" v-model="selectedGoal" :md-options="goalList">
          <label>Gaols, Targets, Indicators</label>
        </md-autocomplete>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeGoal(goal)" v-for="goal in selectedGoals" :key="goal">{{goal}} <md-icon>close</md-icon></span>
        </div>
      </div>
      <md-button class="md-display-1 form-area__btn transition-up" v-delay="{delay:3800,cssClass:'up'}" @click="runSearch">View <md-icon>arrow_forward</md-icon></md-button>
    </div>
  </section>
</template>

<script>
import geolist from '~/assets/json/geolist.json'
// import goalList from '~/assets/json/goallist.json'
import goalsAndIndicators from '~/assets/json/YouthGoalsAndndicators.json'

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
    geoList: geolist.map(x => x.geoAreaName),
    goalList: flatGoalIndicatorList.map(x => x.code + ': ' + x.description),
    selectedGeography: '',
    selectedGoal: '',
    selectedCountries: [],
    selectedGoals: []
  }),
  props: {
    startClicked: {
      type: Function,
      required: true
    }
  },

  components: {
  },
  mounted () {
    console.log(flatGoalIndicatorList)
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
      this.selectedCountries.push(val);
      let that = this;
      setTimeout(() => {
        that.selectedGeography = ''
      }, 20)
    },
    opened () {
      this.selectedGeography += ' '
      this.selectedGeography = this.selectedGeography.substring(0, this.selectedGeography.length - 1)
    },
    goalSelected (val) {
      this.selectedGoals.push(val);
      let that = this;
      setTimeout(() => {
        this.selectedGoal = ''
      }, 20)
    },
    goalOpened () {
      this.selectedGoal += ' '
      this.selectedGoal = this.selectedGoal.substring(0, this.selectedGoal.length - 1)
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

.form-area {
  min-height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #0099d6;
  padding: 40px;
  position: absolute;
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
    @include bp-max($bp-between) {
      width: 90vw;
    }
  }
  h1 {
    display: block;
    margin-bottom: 40px;
    color: #ededed !important; 
  }
  &__input {
    margin-bottom: 20px;
    input {
      color: #ededed !important; 
    }
  }
  &__btn {
    width: 30vw;
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
  margin-bottom: 60px;
  flex-wrap: wrap;
  &__item {
    background-color: #f6931e;
    padding: 8px;
    color: white;
    margin-right: 20px;
    margin-bottom: 20px;
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
