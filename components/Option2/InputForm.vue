<template>
  <section class="intro">
    <div class="intro__content">
      <p class="md-display-1 hero-intro">
        This application serves as a tool to facilitate the preparation of regular reports on the progress in youth development and well-being in the SDGs.  It has the aim of supporting policy makers to make timely adjustments where needed as well as advocacy efforts where progress needs to be stepped up in order to ensure that no young person will be left behind.        
      </p>
    </div>
    <div class="form-area md-accent">
      <div class="form-area__content">
        <md-autocomplete class="form-area__input" @md-selected="countrySelected" @md-opened="opened" v-model="selectedGeography" :md-options="geoList">
          <label>Country or Region</label>
        </md-autocomplete>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeCountry(country)" v-for="country in selectedCountries" :key="country">{{country}} <md-icon>close</md-icon></span>
        </div>
        <md-autocomplete class="form-area__input" @md-selected="goalSelected" @md-opened="goalOpened" v-model="selectedGoal" :md-options="goalList">
          <label>Goals and Targets</label>
        </md-autocomplete>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeGoal(goal)" v-for="goal in selectedGoals" :key="goal">{{goal}} <md-icon>close</md-icon></span>
        </div>
        <md-button class="md-display-1 form-area__btn" @click="viewData">View <md-icon>arrow_forward</md-icon></md-button>
      </div>
    </div>
  </section>
</template>

<script>
import geolist from '~/assets/json/geolist.json'
import goalList from '~/assets/json/goallist.json'
export default {
  data: () => ({
    geoList: geolist.map(x => x.geoAreaName),
    goalList: goalList.map(x => x.code + ': ' + x.title),
    selectedGeography: '',
    selectedGoal: '',
    selectedCountries: [],
    selectedGoals: []
  }),
  props: {
    nextClicked: {
      type: Function,
      required: true
    }
  },

  components: {
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

    viewData () {
      this.nextClicked()
    }
  }
}
</script>

<style lang="scss" >
.intro {
  min-height: calc(70vh - 40px);
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  &__content {
    background-color: #0099d6;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 80px;
    width: 50%;
    position: relative;
  }
  .hero-intro {
    font-size: 30px;
    color: white;
    line-height: 1.4;
  }
}
.form-area {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
  width: 50%;
  position: relative;
  background-color: #ededed;

  &__content {
    position: relative;
    z-index: 2;
    width: 60vw;
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
      border: solid 1px #f6931e;     
      background-color: #f6931e;
    }
    .md-button-content, i {
      color: white !important;     
    }
  }
  .md-field.md-theme-default:before, .md-field.md-theme-default:after{
    background-color: #0099d6;
  }
  .md-field.md-theme-default label, .md-field.md-theme-default.md-has-value .md-input{
    color: #0099d6;
    -webkit-text-fill-color: #0099d6;
  }
  .md-field.md-theme-default.md-has-value .md-input {

  }
}
.selected-tags {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 60px;
  &__item {
    background-color: #f6931e;
    padding: 8px;
    color: white;
    margin-right: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: darken(#f6931e, 10%);
    }
  }
  i {
    color: white !important;
  }
}


</style>
