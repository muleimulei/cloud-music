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
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
div::-webkit-scrollbar 
{  
    width: 6px;  
    height: 16px;  
    background-color: #F5F5F5;
}  
  
/*定义滚动条轨道 内阴影+圆角*/ 
div::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
div::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #555;  
}  
</style>
