<template>
  <div id="music">
    <music-head></music-head>
    <router-view></router-view>
  </div>
</template>

<script>
import musicHead from './components/musicHead'

export default {
  name: 'my-project',
  components: {
    musicHead
  }
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
        -webkit-app-region: drag;
        -webkit-user-select: none;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }
    body,#music,html{
        height: 100%;
        width: 100%;
    }
</style>
