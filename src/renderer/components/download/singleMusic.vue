<template>
  <div>
    <div id="head">
      <div>
        <span>存储目录：{{saveDir}}</span><span @click="openDir">打开目录</span>
      </div>
      <div>
        <input type="text" placeholder="搜索我下载的音乐">
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
            <tr  v-for = "(item, index) in musicList" @dblclick="playMusic(item.path, $event)">
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
      musicSrc: null
    }
  },
  methods: {
    openDir () {
      shell.openItem(this.saveDir)
    },
    playMusic (path, e) {
      this.$root.eventHub.$emit('playmusic', path)
    }
  },
  created () {
    this.musicList = Tool.getMP3('E:/CloudMusic/music')
  },
  mounted () {
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
    #head > div{
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
    }
    #music_list   tr:nth-child(even){
      background-color: cadetblue;
      opacity: .6;
    }
    #music_list   tr:nth-child(even):hover{
      background-color: cadetblue;
      opacity: 1;
    }
    #music_list   tr:nth-child(odd){
      background-color: bisque;
      opacity: .6;
    }
    #music_list   tr:nth-child(odd):hover{
      background-color: bisque;
      opacity: 1;
    }
</style>
