<template>
    <div id="findmusic">
        <ul id="tool">
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
      currentItem: null
    }
  },
  methods: {
  },
  created () {
    this.$root.eventHub.$on('gengduogedan', function () {
      let li = document.querySelectorAll('#findmusic #tool li')[1].children[0]
      //  调用document对象的 createEvent 方法得到一个event的对象实例。
      var event = document.createEvent('HTMLEvents')
      //  initEvent接受3个参数：
      //  事件类型，是否冒泡，是否阻止浏览器的默认行为
      event.initEvent('click', true, true)
      event.eventType = 'message'
      //  触发document上绑定的自定义事件ondataavailable
      li.dispatchEvent(event)
    })
  },
  mounted () {
    this.currentItem = document.querySelector('#tool li')
    this.currentItem.classList.add('active')
    let vue = this
    let lis = document.querySelectorAll('#findmusic #tool li')
    lis[1].style = 'padding: 0 16px'
    lis.forEach(function (li) {
      li.addEventListener('click', function () {
        this.classList.add('active')
        vue.currentItem.classList.remove('active')
        vue.currentItem = this
      })
    })
  }
}
</script>

<style>
#findmusic{
  background: white;
  padding: 0 10px;
  width: 84%;
  overflow-x: hidden;
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
#findmusic #tool  a{
  text-decoration: none;
  color: black;
  padding: 10px 0;
  display: inline-block;
}
.active{
  color: #d09435;
  border-bottom: 2px solid #d09435;
}
</style>
