<template>
  <div>
    <hero-component></hero-component>
    <input-component></input-component>
    <data-visualization-component></data-visualization-component>
  </div>
</template>

<script>
import HeroComponent from '~/components/Option1/Hero.vue'
import InputComponent from '~/components/Option1/InputForm.vue'
import DataVisualizationComponent from '~/components/Option1/DataVisualization.vue'

export default {
  components: {
    HeroComponent,
    InputComponent,
    DataVisualizationComponent
  }
}
</script>

<style lang="scss">
.hero {
  min-height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url('/hero.jpg');
  background-size: cover;
  position: relative;
  padding: 40px;
  margin-top: -80px;
  position: relative;

  &-content {
    position: relative;
    z-index: 2;
  }
  &:before {
    content: '';
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.7);
    display: block;
    position: absolute;
    z-index: 0;
  }
  h1 {
    display: block;
    margin-bottom: 40px;
    color: #ededed !important; 
  }
  &-intro {
    max-width: 60ch;
    line-height: 1.4;
    color: #ededed !important; 
  }
}


</style>
