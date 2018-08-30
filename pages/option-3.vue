<template>
  <div>
    <hero-component></hero-component>
    <input-component :view-clicked="executeSearch"></input-component>
    <data-visualization-component v-if="showResults"></data-visualization-component>
  </div>
</template>

<script>
import HeroComponent from '~/components/Option3/Hero.vue'
import InputComponent from '~/components/Option3/InputForm.vue'
import DataVisualizationComponent from '~/components/Option3/DataVisualization.vue'

export default {
  data: () => ({
    showResults: false
  }),
  components: {
    HeroComponent,
    InputComponent,
    DataVisualizationComponent
  },
  methods: {
    executeSearch () {
      this.showResults = true
    }
  }
}
</script>