<template>
  <div>
    <hero-component></hero-component>
    <input-component></input-component>
    <data-visualization-component></data-visualization-component>
  </div>
</template>

<script>
import HeroComponent from '~/components/Option3/Hero.vue'
import InputComponent from '~/components/Option3/InputForm.vue'
import DataVisualizationComponent from '~/components/Option3/DataVisualization.vue'

export default {
  components: {
    HeroComponent,
    InputComponent,
    DataVisualizationComponent
  }
}
</script>