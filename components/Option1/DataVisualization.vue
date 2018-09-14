<template>
  <section class="data-visualization">
    <div class="data-visualization__content">
      <md-button class="md-display-1 data-visualization__btn" @click="returnBack"><md-icon>arrow_back</md-icon> Back</md-button>
      <div class="data-visualization__content">
        <h3 class="md-display-1">{{countryList}}</h3>        
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

const targetList = goalsAndIndicators.reduce((acc, x) => {acc.push(...x.targets); return acc;}, [] )
const fullIndicatorList = targetList.reduce( (acc, y) => {acc.push(...y.indicators);return acc},[]);

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
      let indicators = fullIndicatorList.filter(x => this.codes.indexOf(x.code) > -1);
      this.indicators = indicators.map( x=> Object.assign(x, {
        infoOpened: false,
        goal: x.code.split('.')[0],
        goalDescription: goalsAndIndicators.find(goal => goal.code === x.code.split('.')[0]).description,
        target: `${x.code.split('.')[0]}.${x.code.split('.')[1]}`,
        targetDescription: targetList.find(goal => goal.code === `${x.code.split('.')[0]}.${x.code.split('.')[1]}`).description,
      }))
    }
    
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

    returnBack () {
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
  h3.md-display-1 {
    color: #f6931e;
    margin-bottom: 20px;
    text-align: center;
    display: block;
    width: 100%;
    font-weight: bold;
  }

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    justify-content: space-between;
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

</style>
