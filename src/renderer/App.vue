<template>
  <div id="music">
    <music-head></music-head>
    <music-left></music-left>
    <router-view></router-view>
    <music-bottom></music-bottom>
  </div>
</template>

<script>
import musicHead from './components/musicHead'
import musicLeft from './components/musicLeft'
import musicBottom from './components/musicBottom'

export default {
  name: 'my-project',
  components: {
    musicHead,
    musicLeft,
    musicBottom
  }
}
</script>

<style>
    
    *{
        margin: 0;
        padding: 0;
        -webkit-app-region: drag;
    }
    body,#music{
        height: 100%;
        width: 100%;
    }
</style>
