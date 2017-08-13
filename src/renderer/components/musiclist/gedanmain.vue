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
        <div id="author">

        </div>
        <div id="summary">

        </div>
      </div>
    </header>
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
        musiclist: null //  数组
      }
    },
    created () {
      //  组件创建完成后获取数据，
      //  此时data已经被observed了
      this.fetchData()
    },
    methods: {
      fetchData () {
        let vm = this
        this.$http.get(`/getgedandetail/${this.$route.params.id}`).then(function (res) {
          console.log(res)
          let ret = res.data
          vm.title = ret.title
          vm.musiclist = ret.list
          vm.musicnum = vm.musiclist.length
          vm.listennum = ret.playNum
          vm.picsrc = ret.pic
        }, function (err) {
          console.log(`获取失败：${err}`)
        })
      }
    }
  }
</script>

<style>
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
  #title{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #title nav{
    background: #d09435;
    padding: 3px 5px;
    color: white;
    font-size: 13px;
    border-radius: 4px;
    margin-right: 30px;
  }

  #title span:nth-of-type(1){
    margin-right: 30px;
  }

  #title span:nth-of-type(1)::before{
    content: '';
    display: inline-block;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNjEyNTM3OTIyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0NDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODI1LjU0MjA0MiA2NTIuODI1MzUyYzQ0LjAzMDgxOS0yMjMuMTA3MzU3LTEyNC45NDc3MzMtMjY0LjcyNTIyLTIyNS43NTc3Mi0yOTYuNTI2NTA3bDAgNDAxLjU5NzU0MS0wLjQ5NzMyNyAwYy0xLjE3NTc3OSA2NC44NTQwNzctNDcuMTIzMjUgMTM0LjQwNTEyOS0xMjQuMDc5OTcgMTc2LjM2ODg3LTEwNi4wMjM3MzIgNTcuODE3ODI0LTIzMC42ODE4NyA0MS4zNjQwODMtMjc4LjQzMDM2LTM2Ljc0NDg3OS00Ny43NDQzOTctNzguMTEyMDMyLTAuNTAxNDItMTg4LjI5OTU5NyAxMDUuNTI2NDA1LTI0Ni4xMTc0MiA3OC40NDk3MjMtNDIuNzc3MjY5IDE2Ny4wNjM5NDctNDQuODU0NTgxIDIyNy4yMTE4MzgtMTEuNDI2MjM3TDUyOS41MTQ5MDkgMzExLjMyMTQ2OGwwLTQ1LjMxNjA5MmMwLTc2LjM5Mjg3OCAwLTExNC41MDQ4OTQgMC0yMTAuODExMzFDNTc2LjQzOTYzOCAzNjQuNjc0NjA3IDkzMy43MzYyMDcgMjc0LjgyNTI1MiA4MjUuNTQyMDQyIDY1Mi44MjUzNTJ6IiBwLWlkPSI0NDQyIiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+');
    width: 15px;
    height: 15px;
    background-size: cover;
    margin-right: 5px;
  }
  #title span:nth-of-type(2){
    margin-right: 30px;
  }
  #title span:nth-of-type(2)::before{
    content: '';
    display: inline-block;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAyNjEyMTQ1NTgyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM2MTgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk0NC4zMkMyNzMuNjY0IDk0NC4zMiA3OS42OCA3NTAuMzY4IDc5LjY4IDUxMlMyNzMuNjY0IDc5LjY4IDUxMiA3OS42OGMyMzguMzY4IDAgNDMyLjMyIDE5My45ODQgNDMyLjMyIDQzMi4zMiAwIDIzOC4zNjgtMTkzLjk1MiA0MzIuMzItNDMyLjMyIDQzMi4zMnogbTAtODIxLjMxMkMyOTcuNTA0IDEyMy4wMDggMTIzLjAwOCAyOTcuNTA0IDEyMy4wMDggNTEyYzAgMjE0LjUyOCAxNzQuNDY0IDM4OC45NiAzODguOTkyIDM4OC45NiAyMTQuNTYgMCAzODguOTYtMTc0LjQgMzg4Ljk2LTM4OC45NiAwLTIxNC41MjgtMTc0LjQzMi0zODguOTkyLTM4OC45Ni0zODguOTkyeiIgcC1pZD0iMzYxOSIgZmlsbD0iIzEyOTZkYiI+PC9wYXRoPjxwYXRoIGQ9Ik0zOTIuODk2IDcyMC4wNjRjLTIxLjIxNiAwLTM2Ljg2NC0xNy4yNDgtMzcuMDI0LTQwLjkyOGwtMi40MzItMzMzLjgyNGMtMC4xMjgtMTUuOTY4IDYuMjQtMjUuNzkyIDExLjU1Mi0zMS4xNjggMTEuODA4LTExLjkzNiAzMS4xMDQtMTMuODI0IDQ4LjI4OC00bDI5MC4yNCAxNjQuNzY4YzE0LjE3NiA4LjAzMiAyMi4zNjggMjAuNjQgMjIuNDY0IDM0LjQ5NiAwLjE2IDEzLjg4OC03Ljg0IDI2LjU5Mi0yMS45MiAzNC45NDRsLTI4Ny44NzIgMTY4Ljk2Yy03LjY4IDQuNDQ4LTE1LjQ4OCA2Ljc1Mi0yMy4yOTYgNi43NTJ6IG00LjEyOC0zNjkuMzQ0bDIuMTEyIDMyMi4xMTIgMjc3Ljk1Mi0xNjIuOTEyLTI4MC4wNjQtMTU5LjJ6IiBwLWlkPSIzNjIwIiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+');
    width: 15px;
    height: 15px;
    background-size: cover;
    margin-right: 5px;
  }

  #title > h2{
    margin-right: auto;
  }
</style>
