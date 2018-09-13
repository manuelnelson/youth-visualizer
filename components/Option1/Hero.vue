<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="md-display-3">The State Of The Youth: Visualized</h1>
      <p class="md-display-1 hero-intro">
        This application serves as a tool to facilitate the preparation of regular reports on the progress in youth development and well-being in the SDGs.  It has the aim of supporting policy makers to make timely adjustments where needed as well as advocacy efforts where progress needs to be stepped up in order to ensure that no young person will be left behind.        
      </p>
      <md-button class="md-display-1 hero__btn" @click="viewForm">Start <md-icon>arrow_forward</md-icon></md-button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    startClicked: {
      type: Function,
      required: true
    }
  },
  components: {
  },
  methods: {
    viewForm () {
      this.$router.push({path: this.$route.path, query: { view: 'input'}})
      this.startClicked()
    }
  }
}
</script>

<style lang="scss">
@import '~assets/functions';
.hero {
  min-height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &-content {
    position: relative;
    z-index: 2;
  }
  h1 {
    display: block;
    margin-bottom: 40px;
    color: #ededed !important; 
    font-size: px-to-rem(50px);
  }
  &-intro {
    max-width: 60ch;
    line-height: 1.4;
    color: #ededed !important; 
    margin-bottom: 40px;
    font-size: px-to-rem(24px)
  }
  
  &__btn {
    width: 30vw; 
    .md-ripple {
      border: solid 1px #0099d6;     
      background-color: #0099d6;
    }
    .md-button-content, i {
      color: white !important;     
    }
  }
  // .md-field.md-theme-default:before, .md-field.md-theme-default:after{
  //   background-color: #0099d6;
  // }
  // .md-field.md-theme-default label, .md-field.md-theme-default.md-has-value .md-input{
  //   color: #0099d6;
  //   -webkit-text-fill-color: #0099d6;
  // }

}


</style>
