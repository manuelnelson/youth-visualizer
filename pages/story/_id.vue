<template>
  <div>
    <div class="story-container">
      <div v-if="story.slides">
      <transition-group name="fade">
        <div class="story-container__slide" v-for="(slide,ndx) in story.slides" :key="ndx" v-if="slide.active">        
          <div class="story-container__slide-text">
            <h2 class="transition-up" v-delay="{delay:800,cssClass:'up'}">{{slide.title}}</h2>
            <p class="transition-up" v-delay="{delay:1800,cssClass:'up'}" v-html="slide.text"></p>
            <p v-if="slide.showCopy" class="transition-up copy-area" v-delay="{delay:1800,cssClass:'up'}">
              <md-button class="md-primary md-raised" v-clipboard:copy="copyLink" v-clipboard:success="onCopy">Copy</md-button>
              <span class="copy-success" v-if="copySuccess">Copied!</span>
            </p>
          </div>
          <div class="story-container__slide-graph transition-up" v-delay="{delay:2400,cssClass:'up'}" v-if="slide.url">
            <e-chart-component v-if="showEChart(slide)" title="title" :slide="slide" :url="slide.url" :countries="slide.countries"></e-chart-component>
            <e-timeline-chart ref="timelineComponent" v-if="showTimelineChart(slide)" :countries="slide.countries" :slide="slide"></e-timeline-chart>
            <e-map-component ref="mapComponent" v-if="slide.graphType === 'map'" :countries="slide.countries" :slide="slide"></e-map-component>
          </div>
          <div class="story-container__actions transition-up" v-delay="{delay:2400,cssClass:'up'}" >
            <md-button class="md-primary md-raised" @click="previousSlide" v-if="showPreviousButton">
              <md-icon class="rotate">arrow_right_alt</md-icon>
              Previous
            </md-button>
            <md-button class="md-primary md-raised" @click="nextSlide" v-if="showContinueButton">
              Continue
              <md-icon>arrow_right_alt</md-icon>
            </md-button>
          </div>
        </div>
      </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapGetters,mapActions} from 'vuex';
import EChartComponent from '~/components/EChartStory.vue'
import ETimelineChart from '~/components/ETimelineChartStory.vue'
import EMapComponent from '~/components/MapStory.vue'
import geolist from '~/assets/json/geolist.json'
//import DataMixin from '~/mixins/dataMethods.mixin.js';

export default {
  data: () => ({
    slideIndex: 0,
    copySuccess:false
  }),
  layout: 'story-layout',
  components: {
    EChartComponent, ETimelineChart, EMapComponent
  },
  computed: {
    ...mapGetters({
      story:'story/story'
    }),
    showContinueButton() {
      return this.slideIndex != (this.story.slides.length -1)
    },
    showPreviousButton() {
      return this.slideIndex != 0
    },
    copyLink() {
      return `https://youthindicators.herokuapp.com/story/${this.story._id}`
    }
  },
  async mounted() {
    await this.getStory({id:this.$route.params.id, geolist})
    if(this.story && this.story.slides && this.story.slides.length > 0){
      this.setSlideActive(this.slideIndex)
      console.log('activeslide')
      console.log(this.story)
    } else {
      //TO DO - show message that story failed to load and take user back to home page
      //this.$router.
    }
  },
  methods: {
    ...mapActions({
      getStory:'story/getStory'
    }),
    ...mapMutations({
      setSlideActive:'story/setSlideActive'
    }),
    nextSlide() {
      this.slideIndex++;
      this.setSlideActive(this.slideIndex);
    }, 
    previousSlide() {
      this.slideIndex--;
      this.setSlideActive(this.slideIndex);
    },
    onCopy() {
      this.copySuccess = true;
    },
    showTimelineChart(slide) {
      return slide.graphType === 'timeline'
    },
    showMap(slide) { 
      console.log(slide.graphType.trim() === 'map')     
      return slide.graphType.trim() === 'map'
    },
    showEChart(slide) {
      return !this.showMap(slide) && !this.showTimelineChart(slide)
    }

  }
}
</script>

<style lang="scss">
@import '~assets/functions';

  .story-container {
    background-color: rgba(0,0,0,0.8);
    min-height: 100vh;
    width: 100vw;
    color: white;
    position: relative;
    overflow-x: hidden;
    .rotate {
      transform: rotate(180deg);
    }
    &__slide {
      padding: 30px 10vw;
      height: 100%;
      width: 100%;
      position: absolute;
      &-text {
        margin-bottom: 20px;
        font-size: px-to-rem(20px);
      }
      h2 {
        font-size: px-to-rem(34px);
        line-height: 1.4;
        text-align: center;
        margin-bottom: 8px;
      }
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      width: 50%;
      position: relative;
      left: 50%;
    }
    p {
      max-width: 80ch;
      margin: 0 auto;
      line-height: 1.2;
    }
    .copy-area {
      margin-top: 40px;
      display: block;
      .copy-success {
        display: block;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  
  .transition-left {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 1.4s, transform 1.4s;
    &.left {
      opacity: 1;
      transform: translateX(0)  
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
