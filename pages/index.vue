<template>
  <div>
    <div class="slide-container" :class="{'slide-1':activeSlide === 0,'slide-2':activeSlide === 1,'slide-3':activeSlide === 2}">
      <transition name="fade">
        <hero-component :startClicked="nextSlide" v-if="activeSlide === 0"></hero-component>
      </transition>
      <transition name="fade">
        <input-component :startClicked="nextSlide" v-if="activeSlide === 1"></input-component>
      </transition>
      <transition name="fade">
        <data-visualization-component :prevClicked="prevSlide" v-if="activeSlide === 2"></data-visualization-component>
      </transition>
    </div>
  </div>
</template>

<script>
import HeroComponent from '~/components/Option1/Hero.vue'
import InputComponent from '~/components/Option1/InputForm.vue'
import DataVisualizationComponent from '~/components/Option1/DataVisualization.vue'

export default {
  data: () => ({
    activeSlide: 0
  }),
  components: {
    HeroComponent,
    InputComponent,
    DataVisualizationComponent
  },
  mounted() {
    switch(this.$route.query.view) {
      case 'input':
        this.activeSlide = 1;
        break;
      case 'visualization':
        this.activeSlide = 2;
        break;
      default:
        this.activeSlide = 0;
    }
  },
  methods: {
    nextSlide () {
      if (this.activeSlide === 2) {
        return
      }
      this.activeSlide++
    },
    prevSlide () {
      if (this.activeSlide === 0) {
        return
      }
      this.activeSlide--
    }
  }
}
</script>

<style lang="scss">
  .slide-container {
    min-height: calc(100vh - 40px);
    background-image: url('~/assets/images/hero.jpg');
    background-size: cover;
    opacity: 1;
    position: relative;
    margin-top: -80px;
    &:before {
      content: '';
      height: 100%;
      width: 100%;
      background-color: rgba(0,0,0,0.7);
      display: block;
      position: absolute;
      z-index: 0;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 1.4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
