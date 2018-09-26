<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="display-3 transition-up" v-delay="{delay:800,cssClass:'up'}" >The State Of The Youth: Visualized</h1> 
      <p class="md-display-1 hero-intro transition-up" v-delay="{delay:2200,cssClass:'up'}">
        This application serves as a tool to facilitate the preparation of regular reports on the progress in youth development and well-being in the SDGs.  It has the aim of supporting policy makers to make timely adjustments where needed as well as advocacy efforts where progress needs to be stepped up in order to ensure that no young person will be left behind.        
      </p>
      <v-btn color="primary" class="flat hero__btn transition-up" v-delay="{delay:3200,cssClass:'up'}" @click="viewForm">Start <v-icon>arrow_forward</v-icon></v-btn>
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
@import '~assets/breakpoints';

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
    font-size: px-to-rem(30px);
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
    background-color: #0099d6;
      border: solid 1px #0099d6;     
    .v-btn-content, i {
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
  @include bp-max($bp-between) {
    top: 40px;
    align-items: flex-start;
    position: relative;
    h1 {
      margin-bottom: 20px;
      font-size: px-to-rem(40px);
      line-height: 1.2;
    }
    &-content {
      padding-bottom: 20px;
    }

  }

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
