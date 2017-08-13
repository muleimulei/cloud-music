<template>
  <div id="maincontent">
    <section id="tuijian">
        <header>
          <span>推荐歌单</span>
          <span @click="gengduogedan">更多></span>
        </header>
        <div id="tuijiangedan" v-if="musiclist">
          <div class="item" v-for="n in 10">
            <img :src="musiclist[0].pic" alt="专辑图片">
            <div id="title">{{ musiclist[0].title }}</div>
            <span> <i class="fa fa-play-circle-o"></i>{{ musiclist[0].playNum }}</span>
             <router-link :to="{name: 'gedan', params: {id: musiclist[0]._id}}"><i class="fa fa-play-circle-o"></i></router-link>
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
    cursor: pointer;
    position: relative;
    margin-top: 15px;
  }
  #tuijiangedan .item  img{
    width: 100%;
    transition: all .5s ease;
  }
  #tuijiangedan #title{
    position: absolute;
    width: 95%;
    height: 37px;
    top: -38px;
    transition: all .5s ease;
    left: 5px;
    color: white;
    padding: 3px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: .98rem;
    background: rgba(0, 0, 0, .5);
  }

  #tuijiangedan .item:hover #title{
    top: 5px;
    z-index: 1;
  }

  #tuijiangedan .item span{
    transition: all .5s ease;
    opacity: .7;
    position: absolute;
    right: 5px;
    top: 5px;
    color: white;
    font-size: 20px;
    width: 95%;
    text-align: right;
    padding-right: 3px;
    background-image: -webkit-linear-gradient(
          to right,
          rgba(255,255,255, .5) 70%,
          rgba(0, 0, 0, .8) 100%
      );
    background-image: -o-linear-gradient(
          to right,
          rgba(255,255,255, .5) 70%,
          rgba(0, 0, 0, .8) 100%
      );
    background-image: linear-gradient(
          to right,
          rgba(255,255,255, .5) 70%,
          rgba(0, 0, 0, .8) 100%
      );
  }
  #tuijiangedan .item span i{
    margin: 0 3px;
  }
  #tuijiangedan .item:hover span{
    top: -23px;
  }

  #tuijiangedan > .item > a{
    position: absolute;
    width: 95%;
    height: 100%;
    top: 5px;
    left: 5px;
    transition: all .5s ease;
  }
  #tuijiangedan > .item > a > i{
    font-size: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: rgba(0, 0, 0, 0);
    transition: all .5s ease;
    /* opacity: 0; */
  }

  #tuijiangedan > .item:hover > a{
    background-image: linear-gradient(to top right, 
        rgba(255, 255, 255, .6),
        rgba(0, 0, 0, .9)
      )
  }
  #tuijiangedan > .item:hover > a > i{
    color: rgba(255, 255, 255, .6);
  }
  #tuijiangedan > .item:hover > a > i:hover{
    color: rgba(0, 0, 0, .6);
  }
</style>
