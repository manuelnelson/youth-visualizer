<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="md-display-3">The State Of The Youth: Visualized</h1>
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
  min-height: calc(33vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url('~/assets/images/hero.jpg');
  background-size: cover;
  background-position: center;
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
    color: #ededed !important; 
  }
}


</style>
