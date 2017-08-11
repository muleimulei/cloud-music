<template>
  <div id="maincontent">
    <section id="tuijian">
        <header>
          <span>推荐歌单</span>
          <span @click="gengduogedan">更多></span>
        </header>
        <div id="tuijiangedan">
          <div class="item" v-for="n in 10">
            <img :src="musiclist[0].pic" alt="专辑图片">
            <div id="title"></div>
            <span> <i class="fa fa-play-circle-o"></i></span>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
export default{
  data () {
    return {
      musiclist: null
    }
  },
  methods: {
    gengduogedan () {
      this.$root.eventHub.$emit('gengduogedan')
    }
  },
  created () {
    let vue = this
    vue.$nextTick(function () {
      this.$http.get('/getpartgedan').then(function (res) {
        vue.musiclist = res.data
      }, function (err) {
        console.log(err)
      })
    })
  }
}
</script>

<style>
  @import '../fontawesome/css/font-awesome.css';
  #maincontent header{
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  #maincontent header a{
    color: black;
    text-decoration: none;
  }
  #maincontent header{
    border-bottom: 1px solid rgba(0, 0, 0, .3);
    padding: 10px 5px;
  }
  #maincontent header span:nth-child(2){
    cursor: pointer;
  }
  #tuijiangedan{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  #tuijiangedan .item{
    width: 20%;
    height: 200px;
    padding: 5px;
    overflow: hidden;
    background: rgba(236, 227, 227, 0.5);
    cursor: pointer;
  }
  #tuijiangedan .item img{
    width: 100%;
  }
</style>
