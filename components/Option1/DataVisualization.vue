<template>
  <section class="data-visualization">
    <div class="data-visualization__content">
      <md-button class="md-display-1 data-visualization__btn" @click="returnBack"><md-icon>arrow_back</md-icon> Back</md-button>
      <div class="data-visualization__content transition-up" v-delay="{delay:800,cssClass:'up'}" >
        <h3 class="md-display-2">Create Your Story</h3>        
        <h4 class="md-headline">Regions: {{countryList}}</h4>        
      </div>
    </div>
    <visualization-component v-for="(indicator,ndx) in indicators" :ref="getReference(ndx)"  :key="ndx" :index="ndx" :indicator="indicator"></visualization-component>
    <md-button class="md-primary md-raised configure-trigger" @click="generateStory">Generate Story</md-button>            
  </section>
</template>

<script>
import VisualizationComponent from '~/components/Visualization.vue'
import geolist from '~/assets/json/geolist.json'
import goalsAndIndicators from '~/assets/json/YouthGoalsAndndicators.json'

import {mapMutations,mapGetters,mapActions} from 'vuex';

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

// const targetList = goalsAndIndicators.reduce((acc, x) => {acc.push(...x.targets); return acc;}, [] )
// const fullIndicatorList = targetList.reduce( (acc, y) => {acc.push(...y.indicators);return acc},[]);

export default {
  data: () => ({
    countries: [],
    codes: [],
    indicators: [],
    dimensions: [{name:'Freq', values:['Annual']}],
    slides: []
  }),

  async mounted() {
    this.countries = this.$route.query.countries.map(x => geolist.find(y => y.geoAreaName === x));
    this.codes = this.$route.query.selectedGoals;
    if(this.codes) {
      this.codes.forEach(code => {
        let indicator = flatGoalIndicatorList.find(x => code === x.code)
        this.indicators.push(Object.assign(indicator, {
          infoOpened: false,
          goal: indicator.code.split('.')[0],
          goalDescription: goalsAndIndicators.find(goal => goal.code === indicator.code.split('.')[0]).description,
          target: this.getTargetCode(indicator),
          targetDescription: flatGoalIndicatorList.find(goal => goal.code === this.getTargetCode(indicator)) ? flatGoalIndicatorList.find(goal => goal.code === this.getTargetCode(indicator)).description : '',
        }))
      });
    }
    //   let indicators = flatGoalIndicatorList.filter(x => this.codes.indexOf(x.code) > -1);
    //   this.indicators = indicators.map( x=> Object.assign(x, {
    //     infoOpened: false,
    //     goal: x.code.split('.')[0],
    //     goalDescription: goalsAndIndicators.find(goal => goal.code === x.code.split('.')[0]).description,
    //     target: this.getTargetCode(x),
    //     targetDescription: flatGoalIndicatorList.find(goal => goal.code === this.getTargetCode(x)) ? flatGoalIndicatorList.find(goal => goal.code === this.getTargetCode(x)).description : '',
    //   }))
    // }
    
  },
  props: {
    prevClicked: {
      type: Function,
      required: true
    }
  },
  components: {
    VisualizationComponent
  },
  computed: {
    ...mapGetters({
      story: 'story/story'
    }),
    countryList() {
      return this.countries.map(x => x.geoAreaName).join(', ')
    }
  },
  methods: {
    ...mapActions({
      saveStory: 'story/saveStory'
    }),
    getTargetCode(indicator) {
      if(indicator.code.split('.').length > 0)
        return `${indicator.code.split('.')[0]}.${indicator.code.split('.')[1]}`
      return '';
    },
    returnBack () {
      // let query = Object.assign({},this.$route.query)
      // query.view = 'input'
      this.$router.push({path: this.$route.path, query: { view: 'input', countries: this.$route.query.countries, selectedGoals: this.$route.query.selectedGoals}})

      // this.$router.push({path: this.$route.path, query})
      this.prevClicked()
    }, 
    async generateStory() {
      Object.keys(this.$refs).forEach(component => {
        this.slides.push(this.$refs[component][0].exportData());
      });
      await this.saveStory({
        slides: this.slides
      })
      this.$router.push(`/story/${this.story._id}`)
    },
    getReference(index) {
      return `visual${index}`
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
  h3.md-display-2 {
    color: #f6931e;
    text-align: center;
    display: block;
    width: 100%;
    font-weight: bold;
    display: block;
  }
  h4.md-headline {
    //color: #f6931e;
    text-align: center;
    margin-bottom: 20px;
    text-align: center;
    display: block;
    width: 100%;
  }

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    justify-content: space-between;
    flex-wrap: wrap;
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
@include bp-max($bp-between) {
  .data-visualization {
    &__content {
      flex-wrap: wrap;
      &__left {
        width: 100%;
      }
      &__right {
        width: 100%;
      }
    }
  }
}

.indicator-description-info {
  padding: 40px;
  h4 {
    margin-bottom: 12px;
    font-size: 22px;
  }
  li {
    margin-bottom: 8px;
  }
}
.transition-up {
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 1.4s, transform 1.4s;
  &.up {
    opacity: 1;
    transform: translateY(0)  
  }
}


</style>
