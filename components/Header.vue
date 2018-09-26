<template>
  <v-toolbar class="header">
      <h1 class="md-title">
        <img class="logo" src="~/assets/images/un-youth-envoy-logo-en.png" />
      </h1>
  </v-toolbar>
</template>
<script>
</script>

<style lang="scss">
  .header {
    //opacity: 0.4;
    background-color: rgba(0,0,0,0.1) !important;
    width: 100%;
    height: 80px;
    display: block;
    color:  white;
    text-align: left;
    box-shadow: none;
    position: relative;
    z-index: 3;
    // position: fixed;
    // top: 0;
    // left: 0;
    .logo {
      max-height: 100%;
      margin-top: 8px;
    }
  }
</style>
