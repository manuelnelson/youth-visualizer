<template>
  <section class="form-area md-accent">
    <div class="form-area__content">
      <md-autocomplete class="form-area__input" @md-selected="countrySelected" @md-opened="opened" v-model="selectedGeography" :md-options="geoList">
        <label>Country or Region</label>
      </md-autocomplete>
      <md-autocomplete class="form-area__input" @md-selected="goalSelected" @md-opened="goalOpened" v-model="selectedGoal" :md-options="goalList">
        <label>Goals and Targets</label>
      </md-autocomplete>
      <md-button class="md-display-1 form-area__btn">View <md-icon>arrow_forward</md-icon></md-button>
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
.form-area {
  min-height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #0099d6;
  padding: 40px;
  // margin-top: -80px;
  position: relative;

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


</style>
