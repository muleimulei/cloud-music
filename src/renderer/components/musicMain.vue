<template>
    <div id="main">
        <div id="top">
            <control-list id="list"></control-list>
            <router-view></router-view>
        </div>
        <div id="bottom"></div>
    </div>
</template>

<script>
  import controlList from './controlList'
  // import router from '../router/index2'
  export default {
    data () {
      return {
        musics: ['1.mp4', '2.mp4', '3.mp4', '4.mp4']
      }
    },
    components: {
      controlList
    }
  }
</script>

<style>
    #main{
        background: rgba(112, 112, 112, .5);
        height: 93.2%;
        display: flex;
        flex-direction: column;
    }
    #top{
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        background: #000;
    }
    #list{
        width: 20%;
        height: inherit;
        display: flex;
        flex-direction: column;
        background: rgba(216, 203, 203, 0.8);
        padding: 5px;
    }
    
    
    #bottom{
        height: 60px;
        background: blue;
        width: 100%;
    }
</style>
