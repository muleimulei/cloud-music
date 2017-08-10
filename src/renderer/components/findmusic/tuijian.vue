<template>
  <div id="maincontent">
    <section id="tuijian">
        <header>
          <span>推荐歌单</span>
          <span @click="gengduogedan">更多></span>
        </header>
        <div id="tuijiangedan">
          
        </div>
    </section>
  </div>
</template>

<script>
export default{
  methods: {
    gengduogedan () {
      this.$root.eventHub.$emit('gengduogedan')
    }
  }
}
</script>

<style>
  #maincontent header{
    flex-direction: row;
    display: flex;
    justify-content: space-between;
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
</style>
