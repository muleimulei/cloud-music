<template>
    <div id="main">
        <div id="top">
            <control-list id="list"></control-list>
            <router-view></router-view>
        </div>
        <music-bottom id="bottom"></music-bottom>
    </div>
</template>

<script>
  import controlList from './controlList'
  import musicBottom from './musicBottom'
  export default {
    data () {
      return {
        musics: ['1.mp4', '2.mp4', '3.mp4', '4.mp4']
      }
    },
    components: {
      controlList,
      musicBottom
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
        width: 16%;
        height: inherit;
        display: flex;
        flex-direction: column;
        background: #f5f5f7;
        padding: 5px;
    }
    
    #bottom{
        height: 40px;
        background: #f5f5f7;
        width: 100%;
        border-top: .5px solid gray;
    }
</style>
