<template>
  <div id="musictable">
    <input type="text" placeholder="搜索歌单音乐">
    <ul>
      <li>
        <span>操作</span>
        <span>音乐标题</span>
        <span>歌手</span>
        <span>时长</span>
      </li>
      <li v-if="musiclist" v-for="item in musiclist">
        <span>
          <i class="collect"></i>
          <i @click='downloadmusic(item.file_link, item.title)' class="download"></i>
        </span>
        <span>{{item.title}}</span>
        <span>{{item.author}}</span>
        <span>{{item.duration ? item.duration : '00:00'}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import fs from 'fs'
  import axios from 'axios'
  import config from '../../../../config.js'
  import path from 'path'
  export default{
    data () {
      return {
      }
    },
    props: {
      musiclist: {
        type: Array,
        default () {
          return null
        }
      }
    },
    methods: {
      mounted () {
      },
      downloadmusic (src, title) {
        axios({
          method: 'get',
          url: src,
          responseType: 'stream'
        })
        .then(function (response) {
          response.data.pipe(fs.createWriteStream(path.resolve(config.getValue('downloadDir'), `${title}.mp3`)))
        })
      }
    }
  }
</script>

<style>
  #musictable {
    position: relative;
  }

  #musictable ul{
    list-style: none;
  }

  #musictable ul li{
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 3px 15px;
  }
  
  #musictable ul li:nth-child(1){
    font-size: 14px;
    opacity: .5;
  }

  #musictable ul li span i{
    width: 17px;
    height: 17px;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    cursor: pointer;
  }

  #musictable ul li span i:hover{
    opacity:  1;
  }

  #musictable ul li span i:not(:first-child){
    margin-left: .6em;
    font-size: large;
  }

  #musictable ul li:not(:first-child):nth-child(even){
    background: #f5f5f7;
  }

  #musictable ul li:not(:first-child):nth-child(odd){
    background: #fafafa;
  }

  #musictable ul li:not(:first-child):hover{
   background: #ebeced; 
  }

  #musictable ul li span i.collect{
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAzMDE5NjQ3NjkwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM5NDkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk4Ni44NDhjLTE3LjIyNiAwLTMzLjM4OC02LjYzMi00NS41MDYtMTguNjY4TDE0Ny41MjggNjYwLjQ0MmwwLjI5LTAuMjMtOC42NTgtNy44NTJjLTUuNjE4LTUuMDg2LTM1LjExOC0zMi41NjItNjQuMzUyLTc0LjUxMkMzMi40MSA1MTcuMDE2IDEwIDQ1My42NDggMTAgMzk0LjU4OGMwLTgzLjY2NCAyNi4zOC0xNTMuNzU4IDc2LjI4OC0yMDIuNzA0IDQ5Ljg0OC00OC44OSAxMjEuMjE4LTc0LjczMiAyMDYuMzk0LTc0LjczMiA4NC40MzIgMCAxNjIuMzEyIDUyLjA3NCAyMTIuNzc4IDk1Ljc1OGw2LjU0NCA1LjY2NiA2LjU0Ni01LjY2NGM1MC40NzQtNDMuNjg0IDEyOC4zNjItOTUuNzU4IDIxMi43NzItOTUuNzU4IDg1LjE2OCAwIDE1Ni41MzYgMjUuODQyIDIwNi4zOSA3NC43MzJDOTg3LjYyIDI0MC44MzQgMTAxNCAzMTAuOTI4IDEwMTQgMzk0LjU4OGMwIDEyNS4wNi05OC43NCAyMjkuMjQ0LTEyOS4wMDIgMjU4LjE5Nkw1NTcuMzMyIDk2OC4zNTJDNTQ1LjI5MiA5ODAuMzE2IDUyOS4yMzQgOTg2Ljg0OCA1MTIgOTg2Ljg0OHpNNTEyLjAwMiA5MjMuNDZsMzI3Ljg0Mi0zMTUuNzM0YzI1Ljg3Ni0yNC43NjYgMTEwLjM3NC0xMTMuMzg4IDExMC4zNzQtMjEzLjEzOCAwLTEzNy43NzgtNzcuNzQtMjEzLjY1Ni0yMTguOS0yMTMuNjU2LTc5LjU0MiAwLTE1Ny41MTQgNjUuMjQtMTk2LjkxNCAxMDQuMTI2TDUxMiAzMDcuMTg0bC0yMi40MDgtMjIuMTI2Yy0zOS4zOTItMzguODg4LTExNy4zNTItMTA0LjEyNi0xOTYuOTE0LTEwNC4xMjYtMTQxLjE2IDAtMjE4LjkgNzUuODc4LTIxOC45IDIxMy42NTYgMCAxMTEuNDE2IDEwNy42NzggMjEwLjA5OCAxMDguNzY2IDIxMS4wOGwwLjI3OCAwLjI0Nkw1MTIuMDAyIDkyMy40NnoiIHAtaWQ9IjM5NTAiIGZpbGw9IiNiZmJmYmYiPjwvcGF0aD48L3N2Zz4='); 
  }

  #musictable ul li span i.download{
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAzMDE5NzA5NjIxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ3NDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDk5LjcyNyA3NTQuMzU5YzYuNzYxIDcuNTEzIDE3LjcyMyA3LjUxNSAyNC40NzkgMC4wMWwxNDIuMjA3LTE1Ny45NzRjMTAuMTQtMTEuMjY0IDYuMDYyLTIwLjM5Ni05LjA3OS0yMC4zOTZMNTQ0LjAxMiA1NzUuOTk5IDU0NC4wMTIgOTYuOTk4YzAtMTcuNjcyLTE0LjMyMi0zMS45OTgtMzItMzEuOTk4LTE3LjY3MyAwLTMyIDE0LjMyMS0zMiAzMS45OThMNDgwLjAxMiA1NzZsLTExMy4zNCAwYy0xNS4xNTQgMC0xOS4yMjQgOS4xMy05LjA3NiAyMC40MDdMNDk5LjcyNyA3NTQuMzU5ek05MjggNjQwYy0xNy42NzMgMC0zMiAxNC4zMjctMzIgMzJsMCAyMjRMMTI4IDg5NiAxMjggNjcyYzAtMTcuNjczLTE0LjMyNy0zMi0zMi0zMnMtMzIgMTQuMzI3LTMyIDMybDAgMjU2YzAgMTcuNjczIDE0LjMyNyAzMiAzMiAzMmw4MzIgMGMxNy42NzMgMCAzMi0xNC4zMjcgMzItMzJMOTYwIDY3MkM5NjAgNjU0LjMyNyA5NDUuNjczIDY0MCA5MjggNjQweiIgcC1pZD0iNDc0OSIgZmlsbD0iIzhhOGE4YSI+PC9wYXRoPjwvc3ZnPg==');
  }

  #musictable > input{
    font-size: 14px;
    width: 200px;
    height: 21px;
    border: .5px solid rgba(0, 0, 0, .3);
    border-radius: 10px/9px;
    padding: 8px 8px;
    color: black;
    outline: none;
    position: absolute;
    right: 0;
    top: -25px;
  }
</style>
