<template>
  <section class="form-area md-accent">
    <div class="form-area__content">
      <div class="transition-up" v-delay="{delay:800,cssClass:'up'}">
        <p class="instruction-text">To create your story, select the countries/regions and indicators of interest.  This will help generate initial visualizations to enable further configuration to begin to generate your story. 
        </p>
        <p class="instruction-text instruction-text__emphasize">Hint: The more countries/regions, the better the outcome.</p>
      </div>
      <div class="transition-up form-area__content-input" v-delay="{delay:1600,cssClass:'up'}">
        <v-autocomplete class="form-area__input" :menu-props="menuProps"  append-icon="" color="white" multiple :clearable="true" v-model="selectedCountries" label="Select Countries or Regions" :items="geoList">            
        </v-autocomplete>
        <!-- <div class="selected-tags">
          <span class="selected-tags__item" @click="removeCountry(country)" v-for="country in selectedCountries" :key="country">{{country}} <v-icon>close</v-icon></span>
        </div> -->
        <v-autocomplete class="form-area__input" :menu-props="menuProps"  multiple color="white" append-icon="" :clearable="true" v-model="selectedGoals" :items="goalList"  label="Select Goals, Targets, or Indicators">
        </v-autocomplete>
        <!-- <div class="selected-tags">
          <span class="selected-tags__item" @click="removeGoal(goal)" v-for="goal in selectedGoals" :key="goal">{{goal}} <v-icon>close</v-icon></span>
        </div> -->
      </div>
      <div class="transition-up form-area__content-button" v-delay="{delay:2800,cssClass:'up'}">
          <v-btn color="secondary" class="secondary form-area__btn" @click="runSearch">View <v-icon>arrow_forward</v-icon></v-btn>
      </div>
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
    selectedGoals: [],
    showAuto: false,
    true: true,
    false: false,
    menuProps: {
      absolute: true,
      positionX: -10,
      minWidth: "100%",
      maxWidth: "100%"
    }
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
    let that = this;
    setTimeout(()=>{that.showAuto = true;},3000)
  },
  methods: {

    runSearch () {
      //add codes
      console.log(this.selectedCountries)
      console.log(this.selectedGoals)
      let goals = this.selectedGoals.map(x => x.split(':')[0]);
      this.$router.push({path: this.$route.path, query: { countries: this.selectedCountries, selectedGoals: goals, view: 'visualization'}})
      this.startClicked()
    },
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
  align-items: center;
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
    @include bp-max($bp-between) {
      width: 90vw;
    }
    &-input {
      position: relative;
      z-index: 2;
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
  .v-input {
    color: white;
    &__slot{
      flex-wrap: wrap;
    }
  }
  &__input {
    margin-bottom: 20px;
  }
  .v-text-field .v-label{
    color: white;
  }
  .v-select__selection--comma{
      background-color: #f6931e !important;
      padding: 4px;
      border-radius: 2px;
  }
  .v-menu {
    left: -10px;
    .white--text{
      color: #f6931e !important;
    }
  }
  &__btn {
    width: 30vw;
    //border: solid 1px white;     
    color: white !important;   
    background-color: #f6931e;  
    z-index: 0;
    position: relative;
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
