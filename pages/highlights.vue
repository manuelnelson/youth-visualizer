<template>
  <section class="hero">
    <div class="hero-content transition-up" v-delay="{delay:800,cssClass:'up'}">
      <h1 class="md-display-2">Highlights</h1> 
      <md-list dark>
        <md-list-item @click="goToHighlight(highlight)" v-for="highlight in highlights" :key="highlight._id">
           <md-icon class="md-primary">timeline</md-icon>
            <div class="md-list-item-text">
              <span>{{highlight.name}}</span>
              <span>{{highlight.user.first}} {{highlight.user.last}} - {{formatDate(highlight.created)}}</span>
            </div>
            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-accent">play_arrow</md-icon>
            </md-button>
        </md-list-item>
      </md-list>
      <!-- <div class="highlight-container">
        <div class="highlight-container__item" v-for="highlight in highlights" :key="highlight._id">
          <span>{{highlight.name}}</span>
        </div>
      </div> -->
    </div>
    <div class="hero-secondary">
      <div class="hero-secondary__text">
        <h2 class="md-headline">{{aboutTitle}}</h2>
        <div v-html="aboutText">          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const apiUrl = 'https://youthindicator.herokuapp.com/api'
const Months = ['January','February','March','April','June','July','August','September','October','November','December'];
export default {
  data: () => ({
    highlights: [],
    aboutTitle:'',
    aboutText:''
  }),
  components: {
  },
  async mounted() {
    const highlightArray = await this.$axios.$get(`${apiUrl}/highlights`);
    if(highlightArray && highlightArray.length > 0) {
      this.highlights = highlightArray[0].stories;
      this.aboutTitle = highlightArray[0].aboutTitle;
      this.aboutText = highlightArray[0].aboutText;
    }
    console.log(this.highlights)
  },
  methods: {
    formatDate(date) {
      let jsDate = new Date(date);
      return `${Months[jsDate.getMonth() - 1]} ${jsDate.getDate()}, ${jsDate.getFullYear()}`;
    },
    goToHighlight(highlight) {
      this.$router.push(`/story/${highlight._id}`)
    }
  }
}
</script>

<style lang="scss">
  @import '~assets/functions';
@import '~assets/breakpoints';

.hero {
  min-height: calc(100vh - 60px);
  display: flex;
  background-color: #fff; 
  text-align: center;
  position: relative;
  padding: 40px;
  //top: -80px;
  margin-top: -80px;
  left: 0;
  height: 100%;
  width: 100%;
  &-content {
    position: relative;
    z-index: 2;
    width: 50%;
    padding: 80px 40px 20px;
  }
  &-secondary {
    z-index: 2;
    width: 50%;
    padding: 80px 40px 20px;
    text-align: left;
    h2 {

    }
    &__text {
      text-align: left;
      position: relative;
      // top: 50%;
      // transform: translateY(-50%);
    }
  }
  .md-list-item-content{
    border-bottom: solid 1px #ccc;
  }
  h1 {
    display: block;
    margin-bottom: 40px;
    color: black !important; 
    //font-size: px-to-rem(50px);
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

  }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 1.4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
