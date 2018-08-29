<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="md-display-3">The State Of The Youth: Visualized</h1>
      <p class="md-display-1 hero-intro">
        A tool to facilitate the preparation of regular reports on the progress in youth development and well-being in the SDGs. Supporting policy makers to make timely adjustments where needed as well as advocacy efforts where progress needs to be stepped up in order to ensure that no young person will be left behind.        
      </p>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url('~/assets/images/hero.jpg');
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
