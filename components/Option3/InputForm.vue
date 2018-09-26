<template>
  <section class="intro">
    <div class="form-area md-accent">
      <div class="form-area__content">
        <md-autocomplete class="form-area__input" @md-selected="countrySelected" @md-opened="opened" v-model="selectedGeography" :md-options="geoList">
          <label>Country or Region</label>
        </md-autocomplete>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeCountry(country)" v-for="country in selectedCountries" :key="country">{{country}} <v-icon>close</v-icon></span>
        </div>
        <md-autocomplete class="form-area__input" @md-selected="goalSelected" @md-opened="goalOpened" v-model="selectedGoal" :md-options="goalList">
          <label>Goals and Targets</label>
        </md-autocomplete>
        <div class="selected-tags">
          <span class="selected-tags__item" @click="removeGoal(goal)" v-for="goal in selectedGoals" :key="goal">{{goal}} <v-icon>close</v-icon></span>
        </div>
        <v-btn class="md-display-1 form-area__btn" @click="runSearch">View <v-icon>arrow_forward</v-icon></v-btn>
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
    viewClicked: {
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
    runSearch () {
      console.log('click')
      this.viewClicked()
    }
  }
}
</script>

<style lang="scss" >
.intro {
  min-height: calc(70vh - 40px);
  display: flex;
  // width: 100%;
}
.form-area {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
  position: relative;
  background-color: #ededed;
  width: 100%;
  &__content {
    position: relative;
    z-index: 2;
    width: 60vw;
  }
  h1 {
    display: block;
    margin-bottom: 40px;
    color: #973737 !important; 
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
      border: solid 1px #0099d6;     
      background-color: #0099d6;
    }
    .v-btn-content, i {
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

}


</style>
