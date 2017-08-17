<template>
  <div id="gedandetail">
    <header>
      <img :src="picsrc" alt="图片">
      <div id="detail">
        <div id="title">
          <nav>歌单</nav>
          <h2>{{title}}</h2>
          <span>{{musicnum}}</span>
          <span>{{listennum}}</span>
        </div>
        <div id="author"></div>
        <div id="tool">
          <div>
            <nav @click="playmusic">播放全部</nav>
            <nav @click="addTosonglist">+</nav>
          </div>
          <div>
            <nav>收藏</nav>
          </div>
          <div>
            <nav>下载全部</nav>
          </div>
        </div>
        <div id="summary">
          <div id="label" v-if="keyword">
            标签：
            <span v-for="i of keyword">{{i}}</span>
          </div>
          <div id="jianjie" v-if="detail">
            <span>简介：</span>
            <span style="max-height: 80px">{{detail.join('\n')}} <i @click="opendetail" :class="['detail', 'opendetail']"></i></span>
          </div>
        </div>
      </div>
    </header>
    <div id="tab">
      <ul>
        <li><router-link :to="{name: 'musictable'}">歌曲列表</router-link></li>
        <li><router-link :to="{name: 'musiccomment'}">评论</router-link></li>
      </ul>
      <router-view></router-view>
  </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        title: null,
        musicnum: 0,
        listennum: 0,
        picsrc: null,
        musiclist: null, //  数组
        keyword: null,
        detail: null,
        added: false, //  是否添加到歌单
        played: false //  歌单是否播放
      }
    },
    created () {
      //  组件创建完成后获取数据，
      //  此时data已经被observed了
      this.fetchData()
    },
    mounted () {
      let a = document.querySelector('#tab ul li a')
      console.log(a)
      //  调用document对象的 createEvent 方法得到一个event的对象实例。
      var event = document.createEvent('HTMLEvents')
      //  initEvent接受3个参数：
      //  事件类型，是否冒泡，是否阻止浏览器的默认行为
      event.initEvent('click', true, true)
      event.eventType = 'message'
      //  触发document上绑定的自定义事件ondataavailable
      a.dispatchEvent(event)
    },
    methods: {
      fetchData () {
        let vm = this
        this.$http.get(`/getgedandetail/${this.$route.params.id}`).then(function (res) {
          let ret = res.data
          vm.title = ret.title
          vm.musiclist = ret.list
          vm.musicnum = vm.musiclist.length
          vm.listennum = ret.playNum
          vm.picsrc = ret.pic
          vm.keyword = ret.keyword
          vm.detail = ret.summary.split('\n').filter((str) => { return str !== '\r' })
        }, function (err) {
          console.log(`获取失败：${err}`)
        })
      },
      opendetail () {
        let detail = document.querySelector('#jianjie').children[1]
        let ctrl = detail.children[0]
        if (detail.style.maxHeight === '') {
          detail.style.maxHeight = '80px'
          ctrl.classList.remove('closedetail')
          ctrl.classList.add('opendetail')
        } else {
          detail.style.maxHeight = ''
          ctrl.classList.remove('opendetail')
          ctrl.classList.add('closedetail')
        }
      },
      addTosonglist () {
        if (this.added) {
          return this.$root.eventHub.$emit('addTosonglist', {errno: 1})
        }
        let vm = this
        vm.musiclist.map(function (item) {
          item.src = item.file_link
        })
        this.$root.eventHub.$emit('addTosonglist', {data: vm.musiclist, errno: 0})
        vm.added = true
        vm.played = true
      },
      playmusic () {
        if (this.played) {
          return this.$root.eventHub.$emit('playmusic', '已经播放')
        } else {
          this.musiclist.map(function (item) {
            item.src = item.file_link
          })
          this.$root.eventHub.$emit('playmusic', 0, this.musiclist)
          this.played = true
          this.added = true
        }
      }
    }
  }
</script>

<style>

  #gedandetail *{
    -webkit-app-region: no-drag;
  }
  #gedandetail {
    display: flex;
    flex-direction: column;
    width: 84%;
    overflow-x: hidden;
    background: white;
    padding: 10px 10px 0;
  }
  #gedandetail header{
    display: flex;
    flex-direction: row;
  }
  #gedandetail header #detail{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  #gedandetail header img{
    width: 200px;
    height: 200px;
    margin-right: 30px;
  }
   #gedandetail #title{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
   #gedandetail #title nav{
    background: #d09435;
    padding: 3px 5px;
    color: white;
    font-size: 13px;
    border-radius: 4px;
    margin-right: 30px;
    display: inline-block;
    min-width: 40px;
  }

  #gedandetail  #title span:nth-of-type(1){
    margin-right: 30px;
  }

  #gedandetail #title span:nth-of-type(1)::before{
    content: '';
    display: inline-block;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNjEyNTM3OTIyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0NDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODI1LjU0MjA0MiA2NTIuODI1MzUyYzQ0LjAzMDgxOS0yMjMuMTA3MzU3LTEyNC45NDc3MzMtMjY0LjcyNTIyLTIyNS43NTc3Mi0yOTYuNTI2NTA3bDAgNDAxLjU5NzU0MS0wLjQ5NzMyNyAwYy0xLjE3NTc3OSA2NC44NTQwNzctNDcuMTIzMjUgMTM0LjQwNTEyOS0xMjQuMDc5OTcgMTc2LjM2ODg3LTEwNi4wMjM3MzIgNTcuODE3ODI0LTIzMC42ODE4NyA0MS4zNjQwODMtMjc4LjQzMDM2LTM2Ljc0NDg3OS00Ny43NDQzOTctNzguMTEyMDMyLTAuNTAxNDItMTg4LjI5OTU5NyAxMDUuNTI2NDA1LTI0Ni4xMTc0MiA3OC40NDk3MjMtNDIuNzc3MjY5IDE2Ny4wNjM5NDctNDQuODU0NTgxIDIyNy4yMTE4MzgtMTEuNDI2MjM3TDUyOS41MTQ5MDkgMzExLjMyMTQ2OGwwLTQ1LjMxNjA5MmMwLTc2LjM5Mjg3OCAwLTExNC41MDQ4OTQgMC0yMTAuODExMzFDNTc2LjQzOTYzOCAzNjQuNjc0NjA3IDkzMy43MzYyMDcgMjc0LjgyNTI1MiA4MjUuNTQyMDQyIDY1Mi44MjUzNTJ6IiBwLWlkPSI0NDQyIiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+');
    width: 15px;
    height: 15px;
    background-size: cover;
    margin-right: 5px;
  }
  #gedandetail #title span:nth-of-type(2){
    margin-right: 30px;
  }
  #gedandetail #title span:nth-of-type(2)::before{
    content: '';
    display: inline-block;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNjEyMTQ1NTgyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM2MTgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk0NC4zMkMyNzMuNjY0IDk0NC4zMiA3OS42OCA3NTAuMzY4IDc5LjY4IDUxMlMyNzMuNjY0IDc5LjY4IDUxMiA3OS42OGMyMzguMzY4IDAgNDMyLjMyIDE5My45ODQgNDMyLjMyIDQzMi4zMiAwIDIzOC4zNjgtMTkzLjk1MiA0MzIuMzItNDMyLjMyIDQzMi4zMnogbTAtODIxLjMxMkMyOTcuNTA0IDEyMy4wMDggMTIzLjAwOCAyOTcuNTA0IDEyMy4wMDggNTEyYzAgMjE0LjUyOCAxNzQuNDY0IDM4OC45NiAzODguOTkyIDM4OC45NiAyMTQuNTYgMCAzODguOTYtMTc0LjQgMzg4Ljk2LTM4OC45NiAwLTIxNC41MjgtMTc0LjQzMi0zODguOTkyLTM4OC45Ni0zODguOTkyeiIgcC1pZD0iMzYxOSIgZmlsbD0iIzEyOTZkYiI+PC9wYXRoPjxwYXRoIGQ9Ik0zOTIuODk2IDcyMC4wNjRjLTIxLjIxNiAwLTM2Ljg2NC0xNy4yNDgtMzcuMDI0LTQwLjkyOGwtMi40MzItMzMzLjgyNGMtMC4xMjgtMTUuOTY4IDYuMjQtMjUuNzkyIDExLjU1Mi0zMS4xNjggMTEuODA4LTExLjkzNiAzMS4xMDQtMTMuODI0IDQ4LjI4OC00bDI5MC4yNCAxNjQuNzY4YzE0LjE3NiA4LjAzMiAyMi4zNjggMjAuNjQgMjIuNDY0IDM0LjQ5NiAwLjE2IDEzLjg4OC03Ljg0IDI2LjU5Mi0yMS45MiAzNC45NDRsLTI4Ny44NzIgMTY4Ljk2Yy03LjY4IDQuNDQ4LTE1LjQ4OCA2Ljc1Mi0yMy4yOTYgNi43NTJ6IG00LjEyOC0zNjkuMzQ0bDIuMTEyIDMyMi4xMTIgMjc3Ljk1Mi0xNjIuOTEyLTI4MC4wNjQtMTU5LjJ6IiBwLWlkPSIzNjIwIiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+');
    width: 15px;
    height: 15px;
    background-size: cover;
    margin-right: 5px;
  }
   #gedandetail #title > h2{
    margin-right: auto;
  }

  #gedandetail #tool{
    display: flex;
    flex-direction: row;
    font-size: 14px;
    margin: 15px 0;
    align-items: center;
  }
  #gedandetail #tool > div{
    border-radius: 4px;
    border: .5px solid #ccc;
    margin-right: 20px;
    cursor: pointer;
  }
  #gedandetail #tool > div > nav{
    cursor: pointer;
    padding: 4px 6px;
    display: inline-block;
    height: 31px;
  }
  #gedandetail #tool > div > nav:hover{
    background: rgba(101, 181, 152, 0.5);
  }
  #gedandetail #tool div > nav:nth-child(1){
    padding-left: 20px;
  }
  #gedandetail #tool div:nth-child(1) > nav:nth-child(2){
    font-size: 18px;
    padding: 4px 10px;
    display: inline-block;
  }
  #gedandetail #tool div:nth-child(1) > nav:nth-child(1)::before{
    content: '';
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNzAzMTkxNDA0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQwNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzc3LjYyNTYgNDk3LjkybC0zNzUuNTAwOC0yNTZhMTcuMTAwOCAxNy4xMDA4IDAgMCAwLTI2LjYyNCAxNC4wOHY1MTJhMTcuMDQ5NiAxNy4wNDk2IDAgMCAwIDI2LjYyNCAxNC4wOGwzNzUuNTAwOC0yNTZhMTcuMDQ5NiAxNy4wNDk2IDAgMCAwIDAtMjguMTZ6TTQwOS42IDczNS42OTI4VjI4OC4zMDcyTDczNy42ODk2IDUxMiA0MDkuNiA3MzUuNjkyOHoiIHAtaWQ9IjQwNjUiIGZpbGw9IiNkODFlMDYiPjwvcGF0aD48cGF0aCBkPSJNNTEyIDBDMjI5LjY4MzIgMCAwIDIyOS42ODMyIDAgNTEyczIyOS42ODMyIDUxMiA1MTIgNTEyIDUxMi0yMjkuNjgzMiA1MTItNTEyUzc5NC4zMTY4IDAgNTEyIDB6IG0wIDk4OS44NDk2QzI0OC41MjQ4IDk4OS44NDk2IDM0LjE1MDQgNzc1LjQ3NTIgMzQuMTUwNCA1MTJTMjQ4LjUyNDggMzQuMTUwNCA1MTIgMzQuMTUwNCA5ODkuODQ5NiAyNDguNTI0OCA5ODkuODQ5NiA1MTIgNzc1LjQ3NTIgOTg5Ljg0OTYgNTEyIDk4OS44NDk2eiIgcC1pZD0iNDA2NiIgZmlsbD0iI2Q4MWUwNiI+PC9wYXRoPjwvc3ZnPg==');
    background-size: cover;
    width: 16px;
    height: 16px;
    display: inline-block;
    position: relative;
    left: -15px;
    top: 3px;
  }
  #gedandetail #tool div:nth-child(2) > nav::before{
    content: '';
    display: inline-block;
    background-size: cover;
    width: 16px;
    height: 16px;
    position: relative;
    left: -15px;
    top: 3px;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNzAzODIyNjQzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc2NzciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTI4LjUxIDEwMDcuMTcyQzU3LjY1IDEwMDcuMTcyIDAgOTQ5LjUyNCAwIDg3OC42NkwwIDM0MC4xNDRjMC03MC44NiA1Ny42NS0xMjguNTEgMTI4LjUxLTEyOC41MWw4OC40MjggMC0wLjU0Ni0xMC43MThjLTAuMTEyLTIuMTg4LTAuMTY4LTQuNDE2LTAuMTY4LTYuNjIyTDIxNi4yMjQgMTQ1LjMzOGMwLTcwLjg2IDU3LjY1LTEyOC41MSAxMjguNTEtMTI4LjUxbDMzNC41MzQgMGM3MC44NiAwIDEyOC41MSA1Ny42NSAxMjguNTEgMTI4LjUxbDAgNDguOTU2YzAgMi4xODgtMC4wNTYgNC40MTYtMC4xNjggNi42MjZsLTAuNTQyIDEwLjcxNCA4OC40MjIgMGM3MC44NjIgMCAxMjguNTEgNTcuNjUgMTI4LjUxIDEyOC41MUwxMDI0IDg3OC42NmMwIDcwLjg2NC01Ny42NDggMTI4LjUxMi0xMjguNTEgMTI4LjUxMkwxMjguNTEgMTAwNy4xNzJ6TTYxLjE5NiA4NzguNjZjMCAzNy4xMjIgMzAuMTk4IDY3LjMxNiA2Ny4zMTQgNjcuMzE2bDc2Ni45OCAwYzM3LjExOCAwIDY3LjMxNC0zMC4xOTYgNjcuMzE0LTY3LjMxNkw5NjIuODA0IDUyOS43OTJsLTI1Ny4wMiAwIDAgMzIuNjk2YzAgNzAuODYtNTcuNjUgMTI4LjUwOC0xMjguNTEgMTI4LjUwOGwtMTMwLjU1IDBjLTcwLjg2IDAtMTI4LjUxLTU3LjY0OC0xMjguNTEtMTI4LjUwOGwwLTMyLjY5Nkw2MS4xOTYgNTI5Ljc5MiA2MS4xOTYgODc4LjY2ek0zNzkuNDEgNTYyLjQ4OGMwIDM3LjExOCAzMC4xOTggNjcuMzEyIDY3LjMxNCA2Ny4zMTJsMTMwLjU1IDBjMzcuMTE4IDAgNjcuMzE0LTMwLjE5NiA2Ny4zMTQtNjcuMzEybDAtMzIuNjk2LTI2NS4xOCAwTDM3OS40MDggNTYyLjQ4OHpNMTI4LjUxIDI3Mi44M2MtMzcuMTE4IDAtNjcuMzE0IDMwLjE5OC02Ny4zMTQgNjcuMzE0bDAgMTI4LjQ1NCA5MDEuNjEgMCAwLTEyOC40NTRjMC0zNy4xMTgtMzAuMTk4LTY3LjMxNC02Ny4zMTQtNjcuMzE0TDEyOC41MSAyNzIuODN6TTM0NC43MzQgNzguMDI0Yy0zNy4xMTggMC02Ny4zMTYgMzAuMTk4LTY3LjMxNiA2Ny4zMTRsMCA0OC45NTZjMCAyLjcxNCAwLjE4MiA1LjU0NCAwLjU0MiA4LjQxMmwxLjEyMiA4LjkyOCA0NjUuODM4IDAgMS4xMTgtOC45MzJjMC4zNjItMi44NyAwLjU0Mi01LjY5NiAwLjU0Mi04LjQwNkw3NDYuNTggMTQ1LjMzOGMwLTM3LjExOC0zMC4xOTgtNjcuMzE0LTY3LjMxNC02Ny4zMTRMMzQ0LjczNCA3OC4wMjR6IiBwLWlkPSI3Njc4IiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+')
  }
  #gedandetail #tool div:nth-child(3) > nav::before{
    content: '';
    display: inline-block;
    background-size: cover;
    width: 16px;
    height: 16px;
    position: relative;
    left: -15px;
    top: 3px;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNzAzOTcyNjg4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg1MDIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzA4LjMgNTc3LjRsMTgxIDE4MWMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMGwxODEtMTgxYzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zbDAgMGMtMTIuNS0xMi41LTMyLjctMTIuNS00NS4yIDBMNTQ0IDY1OC41IDU0NCA5NmMwLTE3LjctMTQuMy0zMi0zMi0zMmwwIDBjLTE3LjcgMC0zMiAxNC4zLTMyIDMybDAgNTYyLjVMMzUzLjYgNTMyLjFjLTEyLjUtMTIuNS0zMi43LTEyLjUtNDUuMiAwbDAgMEMyOTUuOSA1NDQuNiAyOTUuOCA1NjQuOCAzMDguMyA1NzcuNHoiIHAtaWQ9Ijg1MDMiIGZpbGw9IiMxMzIyN2EiPjwvcGF0aD48cGF0aCBkPSJNODk2IDY3MmwwIDE5MmMwIDE3LjctMTQuMyAzMi0zMiAzMkwxNjAgODk2Yy0xNy43IDAtMzItMTQuMy0zMi0zMkwxMjggNjcyYzAtMTcuNy0xNC4zLTMyLTMyLTMybDAgMGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJsMCAyMjRjMCAzNS4zIDI4LjcgNjQgNjQgNjRsNzY4IDBjMzUuMyAwIDY0LTI4LjcgNjQtNjRMOTYwIDY3MmMwLTE3LjctMTQuMy0zMi0zMi0zMmwwIDBDOTEwLjMgNjQwIDg5NiA2NTQuMyA4OTYgNjcyeiIgcC1pZD0iODUwNCIgZmlsbD0iIzEzMjI3YSI+PC9wYXRoPjwvc3ZnPg==')
  }

  #summary{
    display: flex;
    flex-direction: column;
  }
  #summary #label span{
    font-size: 13px;
    margin-right: 10px;
    color: white;
    background: rgba(105, 33, 33, 0.84);
    border-radius: 5px;
    padding: 4px 6px;
  }

  #gedandetail #summary #jianjie{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: left;
  }
  #gedandetail #summary #jianjie > span:nth-child(1){
    min-width: 50px;
  }
  #gedandetail #summary #jianjie > span:nth-child(2){
    flex-grow: 1;
    line-height: 2em;
    letter-spacing: .05em;
    color: white;
    background: rgba(5, 23, 6, 0.79);
    border-radius: 5px;
    padding: 5px 10px;
    text-overflow: ellipsis;
    position: relative;
    white-space: pre;
    font-size: .8em;
    overflow: hidden;
  }
  
  i.detail{
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    display: inline-block;
    width: 40px;
    height: 20px;
    transform: scale(.5);
    cursor: pointer;
  }

  i.opendetail{
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNzE5ODMzMjU4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDE4MTUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM5NjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzU0LjQ5MjE4NzUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0wIDcyLjQ1MzUyNUMwLjczNjY5MSAzNi4yODIwMTQgMzEuNTY3MTk0IDUuODU2NjkxIDY2LjYzMzY2OSAxLjUxMDIxNmMyMy4yNzk0MjQtMy4wMjA0MzIgNDcuNDQyODc4IDYuMTg4MjAxIDYzLjk4MTU4MyAyMi42MTY0MDMgMjU5LjA1NzI2NiAyNzMuNjgwNTc2IDUxNy45MzAzNiA1NDcuNTA4NDg5IDc3Ny4wNjEyOTUgODIxLjExNTM5NUMxMTYwLjI4Nzc3IDU3OC40MTI2NjIgMTQxMy4wODMxNjUgMzExLjY5MzgxMyAxNjY1LjYyMDcxOSA0NC43OTA3OTFjMTIuMTE4NTYxLTEyLjI2NTg5OSAyMi44MDA1NzYtMjYuNzQxODcxIDM4LjYwMjU5LTM0LjYyNDQ2IDE4LjQxNzI2Ni05LjkwODQ4OSA0MS4zMjgzNDUtMTIuNzQ0NzQ4IDYwLjg4NzQ4Mi00LjM0NjQ3NUMxNzkzLjQ3MzM4MSAxNC43MzM4MTMgMTgxNC43MjY5MDYgNDEuOTkxMzY3IDE4MTUuOTQyNDQ2IDcxLjc5MDUwNHY2LjE4ODIwMWMtMC45NTc2OTggMTcuOTc1MjUyLTguNDcxOTQyIDM1LjM5Nzk4Ni0yMS4yOTAzNiA0OC4wNjkwNjVDMTUxOS40MjQ0NiA0MTYuOTY2OTA2IDEyNDQuMjcwNTA0IDcwNy45MjI4NzggOTY4Ljk2OTIwOSA5OTguNzMxNTExYy0xNS42MTc4NDIgMTcuNjA2OTA2LTM5Ljc4MTI5NSAyNS43ODQxNzMtNjIuOTUwMjE2IDI0LjIwMDI4OC0yMi4wNjM4ODUgMS4xNDE4NzEtNDQuNDU5MjgxLTcuODgyNTktNTkuMjI5OTI4LTI0LjM4NDQ2MUM1NzIuNzQwMTQ0IDcwOS4xMDE1ODMgMjk4Ljg3NTM5NiA0MTkuMzk3OTg2IDI0Ljg2MzMwOSAxMjkuODc4NTYxIDEwLjYwODM0NSAxMTYuNTA3NjI2IDAuOTk0NTMyIDk4LjI3NDUzMiAwIDc4LjU2ODA1OHYtNi4xMTQ1MzN6IiBwLWlkPSIzOTY4IiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+');
    background-size: cover;

  }
  i.closedetail{
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNzI0Mjg0OTM2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ3MTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTE0LjMwNCAyODkuOTMxbDQyNS44OTQgNDI1Ljg5NGMxNi4yOTUgMTYuMjk1IDQyLjcxNiAxNi4yOTUgNTkuMDExIDBzMTYuMjk1LTQyLjcxNiAwLTU5LjAxMWwtNDU1LjIxOS00NTUuMjE4Yy04LjE5My04LjE5My0xOC45NDYtMTIuMjY1LTI5LjY4NS0xMi4yMTctMTAuNzM5LTAuMDQ3LTIxLjQ5MiA0LjAyMy0yOS42ODUgMTIuMjE3bC00NTUuMjE5IDQ1NS4yMTljLTE2LjI5NSAxNi4yOTUtMTYuMjk1IDQyLjcxNiAwIDU5LjAxMXM0Mi43MTYgMTYuMjk1IDU5LjAxMSAwbDQyNS44OTQtNDI1Ljg5NXoiIHAtaWQ9IjQ3MTciIGZpbGw9IiMxMjk2ZGIiPjwvcGF0aD48L3N2Zz4=');
    background-size: cover;
  }

  #tab{
    margin-top: 30px;
  }
  #tab > ul{
    display: flex;
    flex-direction: row;
    list-style: none;
    align-items: center;
    border-bottom: 1px solid rgba(202, 169, 11, 0.73);
  }
  #tab > ul > li{
    border: .5px solid rgba(0, 0, 0, .3);
    margin-right: 10px;
    cursor: pointer;
    border-bottom: none;
  }

  #tab > ul > li:not(.router-link-active):hover{
    background: rgba(224, 150, 9, 0.39);
  }

  #tab > ul > li a{
    color: black;
    padding: 6px 10px;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
  }

  #tab a.router-link-active{
    background: rgba(224, 150, 9, 0.94);
    color: white;
  }
</style>
