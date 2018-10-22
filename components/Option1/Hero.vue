<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="md-display-3 transition-up" v-delay="{delay:800,cssClass:'up'}" >{{heroTitle}}</h1> 
      <p class="md-display-1 hero-intro transition-up" v-delay="{delay:2200,cssClass:'up'}" v-html="heroText">        
      </p>
      <md-button :md-ripple="false" class="md-display-1 hero__btn transition-up" v-delay="{delay:3200,cssClass:'up'}" @click="goToStory">View Example Story <md-icon>play_arrow</md-icon></md-button>
      <md-button :md-ripple="false" class="md-display-1 hero__btn transition-up" v-delay="{delay:3200,cssClass:'up'}" @click="viewForm">Start Your Own<md-icon>arrow_forward</md-icon></md-button>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      false: false
    }
  },
  props: {
    startClicked: {
      type: Function,
      required: true
    },
    storyUrl: {
      type:String
    },
    heroTitle: {
      type:String
    },
    heroText: {
      type:String
    },
  },
  components: {
  },
  methods: {
    viewForm () {
      this.$router.push({path: this.$route.path, query: { view: 'input'}})
      this.startClicked()
    },
    goToStory() {
      this.$router.push({path: this.storyUrl})
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
    font-size: px-to-rem(50px);
  }
  &-intro {
    max-width: 60ch;
    line-height: 1.4;
    color: #ededed !important; 
    margin: 0 auto 40px;
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
    .hero__btn {
      width: 100%;
      margin-left: 0;
      margin-right: 0;
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
