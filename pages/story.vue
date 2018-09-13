<template>
  <div>
    <div class="story-container">
      <transition-group name="fade">
        <div class="story-container__slide" v-for="(slide,ndx) in story.slides" :key="ndx" v-show="slide.active">        
          <div class="story-container__slide-text">
            <h2>{{slide.story.title}}</h2>
            <p v-html="slide.story.text"></p>
          </div>
          <div class="story-container__slide-graph" v-if="slide.url">
            <e-chart-component title="title" :graph-options="slide.graphOptions" :url="slide.url" :countries="slide.countries"></e-chart-component>
          </div>
          <div class="story-container__actions">
            <md-button class="md-primary md-raised" @click="nextSlide">
              Continue
              <md-icon>arrow_right_alt</md-icon>
            </md-button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapGetters,mapActions} from 'vuex';
import EChartComponent from '~/components/EChartStory.vue'

export default {
  data: () => ({
    slideIndex: 0
  }),
  layout: 'story-layout',
  components: {
    EChartComponent
  },
  computed: {
    ...mapGetters({
      story:'story/story'
    })
  },
  mounted() {
    if(this.story && this.story.slides && this.story.slides.length > 0){
      this.setSlideActive(this.slideIndex)
    } else {
      //TO DO - show message that story failed to load and take user back to home page
      //this.$router.
    }
  },
  methods: {
    ...mapMutations({
      setSlideActive:'story/setSlideActive'
    }),
    nextSlide() {
      if((this.slideIndex + 1) === this.story.slides.length) {
        this.slideIndex = 0;
        this.setSlideActive(this.slideIndex);
        return;
      }
      else {
        this.slideIndex++;
        this.setSlideActive(this.slideIndex);
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/functions';

  .story-container {
    background-color: rgba(0,0,0,0.8);
    height: 100vh;
    width: 100vw;
    color: white;
    position: relative;
    overflow: hidden;
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
      }
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
    }

  }
  // .enter { transform: translateX(100%) }
  // .enter-to { transform: translateX(0) }
  // .slide-enter-active { position: absolute }

  // .leave { transform: translateX(0) }
  // .leave-to { transform: translateX(-100%) }

  // .slide-enter-active,
  // .slide-leave-active { transition: all 750ms ease-in-out }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
