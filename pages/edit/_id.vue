<template>
  <div>
    <div class="slide-container slide-3">
      <edit-data-visualization-component></edit-data-visualization-component>
    </div>
  </div>
</template>

<script>
import EditDataVisualizationComponent from '~/components/Option1/DataVisualizationEdit.vue'
const apiUrl = 'https://youthindicator.herokuapp.com/api'
import {mapMutations,mapGetters,mapActions} from 'vuex';
import geolist from '~/assets/json/geolist.json'

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      story:'story/story'
    })
  },
  components: {
    EditDataVisualizationComponent
  },
  async mounted() {
      await this.getStory({id:this.$route.params.id, geolist});
      console.log(this.story);    
  },
  methods: {
    ...mapActions({
      getStory:'story/getStory'
    }),
  }
}
</script>

<style lang="scss">
  .slide-container {
    min-height: calc(100vh - 40px);
    background-image: url('~assets/images/hero.jpg');
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
