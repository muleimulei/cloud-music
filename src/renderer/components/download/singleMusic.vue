<template>
  <div id="wrap">
    <div id="head">
      <div>
        <span>存储目录：{{saveDir}}</span><span @click="openDir">打开目录</span>
      </div>
      <div>
        <input type="text" placeholder="搜索我下载的音乐" v-model="musicname">
      </div>
    </div>
    <div id="music_list">
        <table>
          <thead>
            <th>序号</th>
            <th>音乐标题</th>
            <th>大小</th>
          </thead>
          <tbody>
            <tr  v-for = "(item, index) in list" @click="playMusic(item.name, $event)">
              <td>{{index+1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.size}}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import config from '../../../../config.js'
import {shell} from 'electron'
import Tool from '../../../../tools'

export default{
  data () {
    return {
      saveDir: config.getValue('downloadDir'),
      musicList: null,
      musicSrc: null,
      musicname: ''
    }
  },
  methods: {
    openDir () {
      shell.openItem(this.saveDir)
    },
    playMusic (path, e) {
      let prefix = `http://${config.getValue('host')}:${config.getValue('port')}/music/`
      this.musicList.map(function (item) {
        item.src = `${prefix}${item.name}`
      })
      let num = this.musicList.map(function (item) {
        return item.src
      }).indexOf(`${prefix}${path}`)
      // console.log(this.musicList, `${prefix}${path}`, num)
      this.$root.eventHub.$emit('playmusic', num, this.musicList)
    }
  },
  created () {
    this.musicList = Tool.getMP3('E:/CloudMusic/music')
    console.log(this.musicList)
  },
  mounted () {
  },
  computed: {
    list () {
      return this.musicList.filter(function (item) {
        return item.name.toLowerCase().indexOf(this.musicname.toLowerCase()) !== -1
      }.bind(this))
    }
  }
}

</script>

<style>
    #head{
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, .6);
    }
    #wrap *{
      -webkit-app-region: no-drag;
    }
    #head  >div{
      position: relative;
    }
    #head > div > input{
      outline: none;
      border-radius: 15px/13px;
      border: 1px solid rgba(0, 0, 0, .5);
      padding: 5px 10px;
    }
    #head div:nth-child(2)::after{
      content: '\f002';
      font: normal normal normal 14px/1 FontAwesome;
      display: inline-block;
      width: 10px;
      height: 10px;
      opacity: .6;
      position: absolute;
      top: 5px;
      right: 10px;
    }
    #head div:nth-child(1) span:nth-child(2){
      margin: 0 10px;
      color: blue;
      font-size: .8em;
      cursor: pointer;
    }
    #music_list{
      text-align: center;
    }
    #music_list > table{
      width: 100%;
    }
    #music_list  tr{
      cursor: pointer;
      transition: all .5s ease;
    }
    #music_list   tr:nth-child(even){
      background-color: rgba(27, 86, 2, 0.43);
    }
    #music_list   tr:nth-child(even):hover{
      background-color: rgba(27, 86, 2, .7);
    }
    #music_list   tr:nth-child(odd){
      background-color: rgba(128, 36, 36, 0.56);
    }
    #music_list   tr:nth-child(odd):hover{
      background-color: rgba(128, 36, 36, 0.7);
    }
</style>
