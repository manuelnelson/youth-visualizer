<template>
  <section class="intro">
    <div class="intro__content">
      <p class="md-display-1 hero-intro">
        A tool to facilitate the preparation of regular reports on the progress in youth development and well-being in the SDGs. Supporting policy makers to make timely adjustments where needed as well as advocacy efforts where progress needs to be stepped up in order to ensure that no young person will be left behind.        
      </p>
    </div>
    <div class="form-area md-accent">
      <div class="form-area__content">
        <md-autocomplete class="form-area__input" @md-selected="countrySelected" @md-opened="opened" v-model="selectedGeography" :md-options="geoList">
          <label>Country or Region</label>
        </md-autocomplete>
        <md-autocomplete class="form-area__input" @md-selected="goalSelected" @md-opened="goalOpened" v-model="selectedGoal" :md-options="goalList">
          <label>Goals and Targets</label>
        </md-autocomplete>
        <md-button class="md-display-1 form-area__btn">View <md-icon>arrow_forward</md-icon></md-button>
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
    selectedGoal: ''
  }),
  components: {
  },
  methods: {
    countrySelected (val) {
      console.log(val)
      this.selectedGeography = val
    },
    opened () {
      this.selectedGeography += ' '
      this.selectedGeography = this.selectedGeography.substring(0, this.selectedGeography.length - 1)
    },
    goalSelected (val) {
      console.log(val)
      this.selectedGoal = val
    },
    goalOpened () {
      this.selectedGoal += ' '
      this.selectedGoal = this.selectedGoal.substring(0, this.selectedGoal.length - 1)
    }
  }
}
</script>

<style lang="scss" >
.intro {
  min-height: calc(70vh - 40px);
  display: flex;
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
    margin-bottom: 80px;
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


</style>
