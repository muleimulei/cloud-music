<template>
  <header>
    <ul>
      <li id="brand">
        <i class="fa fa-github-alt" aria-hidden="true"></i>
        <span>我的云音乐</span>
      </li>
      <li id="history">
        <a id="back" v-on:click.prevent="router.go(-1)" class="fa fa-chevron-left"></a>|
        <a id="forward" v-on:click.prevent="router.go(1)" class="fa fa-chevron-right"></a>
      </li>
      <li :class="{max: maxed}" style="margin-right: auto">
        <input type="text" name="search" placeholder="搜索音乐，歌手，歌词，用户">
      </li>
      <li>
        <img src="../assets/至尊宝.jpg" id="avator">
        <span>风的影子</span>
      </li>
      <li>
        <i class="fa fa-tachometer" aria-hidden="true"></i>
      </li>
      <li>
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </li>
      <li>
        <router-link to="/settings" class="fa fa-cog"></router-link>
      </li>
      <li>
        <i></i>
      </li>
      <li>
        <i class="fa fa-minus" aria-hidden="true" @click="minimum"></i>
      </li>
      <li>
        <i class="fa fa-window-maximize" aria-hidden="true" @click="maxorminWin"></i>
      </li>
      <li>
        <i class="fa fa-times" aria-hidden="true" @click="exit"></i>
      </li>
    </ul>
  </header>
</template>

<script>
import Vue from 'vue'
import VueElectron from 'vue-electron'
import router from '../router/index.js'
// router.push('/')
Vue.use(VueElectron)
export default {
  methods: {
    exit () {
      return this.$electron.ipcRenderer.send('exit')
    },
    maxorminWin () {
      this.maxed = !this.maxed
      if (!this.maxed) {
        return this.$electron.ipcRenderer.send('minWin')
      } else {
        return this.$electron.ipcRenderer.send('maxWin')
      }
    },
    minimum () {
      return this.$electron.ipcRenderer.send('minimum')
    }
  },
  data () {
    return {
      maxed: false,
      router
    }
  }
}
</script>
 
<style>
@import 'fontawesome/css/font-awesome.css';
#brand, #brand > span{
  -webkit-app-region: drag;
}
.max{
  margin-right: auto !important;
}
header ul{
  display: flex;
  list-style: none;
  background: rgb(208, 25, 25);
  color: white;
  height: 6.8%;
}
#avator{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
header li, li> *{
  -webkit-app-region: no-drag;
}
header ul > li:nth-child(1){
  padding: 6px;
  font-size: 1.1em;
  font-weight: 500;
  margin: 3px 3em 3px 2px;
  cursor: pointer;
}

header ul > li:nth-child(2){
  margin: 8px 9px;
  border: 1px solid rgba(0, 0, 0, .5);
  width: 60px;
  border-radius: 5px;
  display: flex;
  color: black;
}
header ul > li:nth-child(2) > a {
  color: white;
  border: none;
  padding-top: 3px;
  width: 50%;
  background: rgb(208, 25, 25);
  cursor: pointer;
  outline: none;
  text-align: center;
  text-decoration: none;
}
header ul > li:nth-child(2) > a:active{
  opacity: .2;
}
header ul > li:nth-child(3){
  margin: 9px 9px;
  position: relative;
}
header ul > li:nth-child(3) > input{
  font-size: 12px;
  width: 200px;
  height: 21px;
  border: none;
  border-radius: 10px/9px;
  padding: 0 8px;
  color: white;
  background: rgba(0, 0, 0, .2);
  /* margin-right: 200px; */
  outline: none;
}
header ul > li:nth-child(3)::after{
  content: '\f002';
  font: normal normal normal 14px/1 FontAwesome;
  display: inline-block;
  width: 5px;
  height: 5px;
  opacity: .6;
  position: absolute;
  right: 13px;
  top: 4px;
}
header ul > li:nth-child(4){
  display: flex;
  align-items: center;
  /* align-self: right; */
}
header ul > li:nth-child(4) > span{
  margin-left: 3px;
  font-size: .8em;
  opacity: .7;
  position: relative;

}
header ul > li:nth-child(4) > span:hover{
  opacity: 1;
  cursor: pointer;
}
header ul > li:nth-child(4) > span::after{
  content: '';
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
  opacity: .9;
  right: -15px;
  top: 6px;
}

header ul > li:nth-child(5){
  margin: 10px 35px;
  cursor: pointer;
  opacity: .7;
}
header ul > li:nth-child(5):hover{
  opacity: 1;
}

header ul > li:nth-child(6){
  margin: 10px 0px;
  cursor: pointer;
  opacity: .7;
}
header ul > li:nth-child(6):hover{
  opacity: 1;
}

header ul > li:nth-child(7){
  margin: 10px 30px;
  cursor: pointer;
  opacity: .7;
}
header ul > li:nth-child(7):hover{
  opacity: 1;
}
header ul > li:nth-child(8)::after{
  content: "";
  margin: 8px 0;
  display: inline-block;
  width: 1px;
  height: 20px;
  background: rgba(0, 0, 0, .5);
}

header ul > li:nth-child(9){
  margin: 10px 20px;
  cursor: pointer;
  opacity: .7;
}

header ul > li:nth-child(7) > a{
  color: white;
  text-decoration: none;
}

header ul > li:nth-child(9):hover{
  opacity: 1;
}
header ul > li:nth-child(10){
  margin: 10px 0px;
  cursor: pointer;
  opacity: .7;
}
header ul > li:nth-child(10):hover{
  opacity: 1;
}

header ul > li:nth-child(11){
  margin: 10px 15px;
  cursor: pointer;
  opacity: .7;
  align-self: right;
}
header ul > li:nth-child(11):hover{
  opacity: 1;
}
</style>
