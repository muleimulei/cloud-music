<template>
    <div>
        <dl id="tuijian">
            <dt>推荐</dt>
            <dd class="thickBG"><router-link to="/main/findMusic">发现音乐</router-link></dd>
            <dd><router-link to="/main/privateFM"> 私人FM</router-link></dd>
            <dd><router-link to="/main/findMV">MV</router-link></dd>
            <dd><router-link to="/main/findFriend">朋友</router-link></dd>
        </dl>
        <dl id="mymusic">
            <dt>我的音乐</dt>
            <dd> <router-link to="/main/myMusic"> 本地音乐 </router-link> </dd>
            <dd> <router-link to="/main/downloadManage/singleMusic"> 下载管理 </router-link></dd>
            <dd> <router-link to="/main/mySave"> 我的收藏 </router-link></dd>
        </dl>
        <dl>
            <dt>收藏的歌单</dt>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
            <dd>都是废话就算</dd>
        </dl>
    </div>
</template>

<script>

export default{
  data () {
    return {
      clickItem: null,
      dds: []
    }
  },
  methods: {
    changeBG (m, x) {
      if (this.clickItem !== null) {
        console.log(this.clickItem)
        this.clickItem.classList.remove('thickBG')
      }
      this.clickItem = x
      this.clickItem.classList.add('thickBG')
    }
  },
  mounted () {
    this.dds = Array.from(document.querySelectorAll('dd'))
    this.clickItem = this.dds[0]
    let m = this
    this.dds.forEach((item) => {
      item.addEventListener('click', function () {
        m.changeBG(m, this)
      })
    })
  }
}
</script>

<style>
   @import './fontawesome/css/font-awesome.css';
   div, dl, dd, a{
    -webkit-app-region: no-drag;
   }
   dd{
    font-family: 宋体;
    padding-left: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
    letter-spacing: 1px;
    
    cursor: pointer;
    font-size: 16px;
    position: relative;
    transition: all .5s ease;
   }
   dd > a{
    text-decoration: none;
    color: rgba(0, 0, 0, .6);
    
   }
   dd >a:hover{
    color: rgba(0, 0, 0, 1.0);
   }
   dl:not(:first-child){
    margin-top: 10px;
   }
   dt{
    margin: 4px 0;
    font-size: 14px;
   }

   dl#tuijian > dd:nth-child(2)::before{
    content: '\f001';
    font: normal normal normal 16px/1 FontAwesome;
    position: absolute;
    left: 15px;
    top: 6px;
    color: black;
   }

   dl#tuijian > dd:nth-child(3)::before{
    content: "\f03d";
    font: normal normal normal 16px/1 FontAwesome;
    position: absolute;
    left: 15px;
    top: 6px;
   }
    dl#tuijian > dd:nth-child(4)::before{
    content: "\f008";
    font: normal normal normal 16px/1 FontAwesome;
    position: absolute;
    left: 15px;
    top: 6px;
   }

   dl#tuijian > dd:nth-child(5)::before{
    content: "\f0c0";
    font: normal normal normal 16px/1 FontAwesome;
    position: absolute;
    left: 15px;
    top: 6px;
   }
    
    dl#mymusic > dd:nth-child(2)::before{
        content: "\f218";
        font: normal normal normal 16px/1 FontAwesome;
        position: absolute;
        left: 15px;
        top: 6px;
    }

    dl#mymusic > dd:nth-child(3)::before{
        content: "\f019";
        font: normal normal normal 16px/1 FontAwesome;
        position: absolute;
        left: 15px;
        top: 6px;
    }
    dl#mymusic > dd:nth-child(4)::before{
        content: "\f218";
        font: normal normal normal 16px/1 FontAwesome;
        position: absolute;
        left: 15px;
        top: 6px;
    }
    
    .thickBG{
      background: rgba(0, 0, 0, .3);
      margin-left: 10px;
    }

</style>
