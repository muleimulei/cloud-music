<template>
    <div id="findmusic">
        <ul>
            <li> <router-link to='/main/findmusic/tuijian'>个性推荐</router-link></li>
            <li> <router-link to='/main/findmusic/musicpaper' > 歌单 </router-link></li>
            <li> <router-link to='/main/findmusic/newmusic' > 最新音乐 </router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default{
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
#findmusic{
  background: white;
  flex-grow: 1;
  padding: 0 10px;
}
#findmusic *{
  -webkit-app-region: no-drag;
}
#findmusic ul{
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: center;
  border-bottom: 1px solid rgba(112, 112, 112, .5);
}
#findmusic ul li{
  margin: 0 2em;
  cursor: pointer;
}
#findmusic ul li a:hover{
  color: #d09435;
}
#findmusic a{
  text-decoration: none;
  color: black;
  padding: 10px 0;
  display: inline-block;
}
.router-link-active{
  color: #d09435;
  border-bottom: 2px solid #d09435;
}
</style>
