<template>
  <md-toolbar class="header">
      <h1 class="md-title">
        <a href="/">
          <img class="logo" src="~/assets/images/un-youth-envoy-logo-en.png" />
        </a>
      </h1>
      <nav class="nav-area">
        <a href="/highlights">Highlights</a>
      </nav>
  </md-toolbar>
</template>
<script>
</script>

<style lang="scss">
  .header {
    //opacity: 0.4;
    //background-color: rgba(0,0,0,0.1) !important;
    background-color: rgba(0,0,0,0) !important;
    width: 100%;
    height: 80px;
    display: flex;
    flex-flow: nowrap;
    color:  white;
    text-align: left;
    box-shadow: none;
    // position: fixed;
    // top: 0;
    // left: 0;
    .md-title {
      width: 50%;    
    }
    .nav-area {
      display: block;
      width: 50%;
      text-align: right;
      padding-right: 100px;
      a {
        font-size: 18px;
        color: white;
        text-transform: uppercase;
        &:hover {
          color: #f6931e;
        }
      }
    }
    .logo {
      max-height: 100%;
      margin-top: 8px;
    }
  }
</style>
