<template>
  <div>
    <hero-component></hero-component>
    <div class="content-container">
      <transition name="fade">
        <input-component :next-clicked="runSearch" v-if="!showData"></input-component>
      </transition>
      <transition name="fade">
        <data-visualization-component v-if="showData"></data-visualization-component>
      </transition>
    </div>
  </div>
</template>

<script>
import HeroComponent from '~/components/Option2/Hero.vue'
import InputComponent from '~/components/Option2/InputForm.vue'
import DataVisualizationComponent from '~/components/Option2/DataVisualization.vue'

export default {
  data: () => ({
    showData: false
  }),
  components: {
    HeroComponent,
    InputComponent,
    DataVisualizationComponent
  },
  methods: {
    runSearch () {
      this.showData = true
    }
  }
}
</script>
<style lang="scss">
.content-container {
  position: relative;
}
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
