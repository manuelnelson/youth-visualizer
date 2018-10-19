<template>
  <section class="data-visualization">
    <visualization-component v-for="(slide,ndx) in graphSlides" v-if="story && story.slides" :ref="getReference(ndx)"  :key="ndx" :indicator="getSlideIndicator(slide)" :index="ndx" :slide="slide"></visualization-component>
    <span class="headline">About You (optional)</span>
    <md-button :md-ripple="false" class="md-primary md-raised configure-trigger" @click="generateStory">Generate Story</md-button>            
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

export default {
  data: () => ({
    countries: [],
    codes: [],
    indicators: [],
    dimensions: [{name:'Freq', values:['Annual']}],
    slides: [], 
    false: false,
  }),

  async mounted() {

  },
  components: {
    VisualizationComponent
  },
  computed: {
    ...mapGetters({
      story: 'story/story'
    }),
    graphSlides() {
      return this.story && this.story.slides ? this.story.slides.filter(x=>!x.showCopy).map(y=> Object.assign(y,{})) : []
    },
    
    countryList() {
      return this.countries.map(x => x.geoAreaName).join(', ')
    }
  },
  methods: {
    ...mapActions({
      updateStory: 'story/updateStory',
    }),
    getTargetCode(indicator) {
      if(indicator.code.split('.').length > 0)
        return `${indicator.code.split('.')[0]}.${indicator.code.split('.')[1]}`
      return '';
    },
    getSlideIndicator(slide) {
      let dataType = slide.url.split('sdg/').splice(1)[0].split('/Pivot')[0];
      let code = slide.url.split(`?${dataType}=`).splice(1)[0].split('&')[0];
      let indicator = flatGoalIndicatorList.find(x => code === x.code)
      return Object.assign(indicator, {
        infoOpened: false,
        goal: indicator.code.split('.')[0],
        goalDescription: goalsAndIndicators.find(goal => goal.code === indicator.code.split('.')[0]).description,
        target: this.getTargetCode(indicator),
        targetDescription: flatGoalIndicatorList.find(goal => goal.code === this.getTargetCode(indicator)) ? flatGoalIndicatorList.find(goal => goal.code === this.getTargetCode(indicator)).description : '',
      }); 
    },
    async generateStory() {
      Object.keys(this.$refs).forEach(component => {
        this.slides.push(this.$refs[component][0].exportData());
      });
      await this.updateStory({
        _id: this.story._id,
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
