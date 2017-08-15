<template>
	<div id="bottom">
        <div id="ctrl">
            <span id="prevmusic"><i class="fa fa-step-backward" aria-hidden="true"></i></span>
            <span id="playmusic"><i class="fa fa-play" aria-hidden="true"></i></span> 
            <span id="nextmusic"><i class="fa fa-step-forward" aria-hidden="true"></i></span> 
        </div>
        <div id="bar">
            <span>{{currentTime}}</span>
            <div>
                <div class="progress"></div>
                <i id="point"></i>
            </div>
            <span>{{totalTime}}</span>
        </div>
        <div id="voice">
            <div id="vbar" title="音量调节">
                <div class="v_progress"></div>
            </div>
        </div>
        <div id="lyric">
            <span>
                <i class="fa fa-circle-o-notch" aria-hidden="true"></i>
            </span>
            <span>词</span>
            <span id="mlist" title="打开音乐列表">
              <i class="fa fa fa-list-ul" aria-hidden="true"></i>
              <span>{{this.musiclist===null?0:this.musiclist.length}}</span>
            </span>
        </div>
        <div id="time"></div>
        <div id="playlist" class="listhide">
          <div style="margin: 5px 0">
            播放列表
          </div>
          <transition-group tag='ul' name='lis'>
            <li v-for = '(item, index) in musiclist' @click="currentnum = index" :key='index'>
              <span>{{item.name}}</span>
              <!-- <span>{{item.size}}</span> -->
              <span @click='musiclist.splice(index, 1)'><i class="fa fa-times" aria-hidden="true"></i></span>
            </li>
          </transition-group>
        </div>
    </div>
</template>

<script>
import config from '../../../config.js'
export default{
  data () {
    return {
      prevmusic: null,
      playmusic: null,
      nextmusic: null,
      currentTime: '00:00',
      totalTime: '00:00',
      audio: new Audio(),
      file: null,
      press: false,
      pro: null, // 进度条
      point: null,  // 按钮
      probg: null,
      voicepro: null,
      voiceprobg: null,
      musiclist: null, //  播放列表
      currentnum: null
    }
  },
  watch: {
    currentnum (newval, old) {
      console.log(newval, old)
      let pre = document.querySelector('#playlist').children[1].children[old]
      let cur = document.querySelector('#playlist').children[1].children[newval]
      // console.log(pre, cur)
      if (pre) {
        pre.classList.remove('play')
      }
      if (cur) {
        cur.classList.add('play')
      }
      this.audio.src = `http://${config.getValue('host')}:${config.getValue('port')}/music/` + this.musiclist[newval].name
      this.audio.play()
    }
  },
  methods: {
    removeItem (index) {

    },
    updateProgress () {
      this.currentTime = this._parseTime(this.audio.currentTime)
      let barlen = document.querySelector('#bar').children[1].clientWidth
      let dis = this.audio.currentTime / this.audio.duration * barlen
      this.pro.style.width = this.point.style.left = dis + 'px'
    },
    _parseTime (time) {
      let minute = parseInt(parseFloat(time) / 60)
      let seconds = parseInt(time - minute * 60)
      if (minute / 10 < 1) {
        minute = '0' + minute
      }
      if (seconds / 10 < 1) {
        seconds = '0' + seconds
      }
      return `${minute}:${seconds}`
    },
    _audioPlay () {
      this.totalTime = this._parseTime(this.audio.duration)
      this._play()
      this.voicepro.style.width = this.voiceprobg.clientWidth / 4 + 'px'
      this.audio.volume = this.voiceprobg.clientWidth / 4 / this.voiceprobg.clientWidth
    },
    _changeStatus () {
      if (!this.audio.src) return
      if (this.audio.paused) {
        this._play()
      } else {
        this._pause()
      }
    },
    _play () {
      this.audio.play()
      this.playmusic.children[0].classList.remove('fa-play')
      this.playmusic.children[0].classList.add('fa-pause')
    },
    _pause () {
      this.audio.pause()
      this.playmusic.children[0].classList.remove('fa-pause')
      this.playmusic.children[0].classList.add('fa-play')
    },
    _movebar (e) {
      if (!this.audio.paused) {
        let barlen = document.querySelector('#bar').children[1].clientWidth
        this.pro.style.width = this.point.style.left = e.layerX + 'px'
        this.audio.currentTime = Math.floor(e.layerX / barlen * this.audio.duration)
      }
    },
    _audioEnded () {
      if (this.musiclist.length === 0 || this.musiclist.length === 1) {
        this._pause()
        return
      }
      this.currentnum = (this.currentnum + 1) % this.musiclist.length
    },
    _changeVoice (e) {
      this.voicepro.style.width = e.layerX + 'px'
      this.audio.volume = e.layerX / this.voiceprobg.clientWidth
    },
    _showTime (e) {
      if (!this.audio.paused) {
        let time = this._parseTime(this.audio.duration / this.probg.clientWidth * e.layerX)
        let T = document.querySelector('#time')
        T.innerText = time
        T.style.left = (e.pageX - 10) + 'px'
      }
    },
    _hideTime () {
      let T = document.querySelector('#time')
      T.style.left = '-100px'
    },
    _toggleList () {
      let list = document.querySelector('#playlist').classList
      if (list.contains('listhide')) {
        list.remove('listhide')
        list.add('listshow')
      } else {
        list.remove('listshow')
        list.add('listhide')
      }
    },
    _prevmusic () {
      if (this.musiclist.length !== 0) {
        if (this.currentnum === 0) {
          this.currentnum = this.musiclist.length - 1
        } else {
          this.currentnum -= 1
        }
      }
    },
    _nextmusic () {
      if (this.musiclist.length !== 0) {
        if (this.currentnum === this.musiclist.length - 1) {
          this.currentnum = 0
        } else {
          this.currentnum += 1
        }
      }
    }
  },
  created () {
    this.$root.eventHub.$on('playmusic', function (s, list) {
      this.musiclist = [].slice.call(list)
      this.currentnum = this.musiclist.map(function (item) {
        return item.name
      }).indexOf(s)
      this._toggleList()
      this.$nextTick(function () {
        let cur = document.querySelector('#playlist').children[1].children[this.currentnum]
        cur.classList.add('play')
        console.log(cur)
      })
    }.bind(this))
  },
  mounted () {
    this.prevmusic = document.querySelector('#prevmusic') //  播放上一首音乐
    this.playmusic = document.querySelector('#playmusic') //  播放/暂停音乐
    this.nextmusic = document.querySelector('#nextmusic') //  播放下一首音乐
    this.playmusic.addEventListener('click', this._changeStatus, false)
    this.pro = document.querySelector('.progress')
    this.probg = document.querySelector('#bar > div')
    this.point = document.querySelector('#point')
    this.audio.addEventListener('timeupdate', this.updateProgress, false)
    this.audio.addEventListener('canplay', this._audioPlay, false)
    this.audio.addEventListener('pause', this.audioPause, false)
    this.audio.addEventListener('ended', this._audioEnded, false)
    this.probg.addEventListener('click', this._movebar, false)
    this.probg.addEventListener('mousemove', this._showTime, false)
    this.probg.addEventListener('mouseleave', this._hideTime, false)
    this.voicepro = document.querySelector('.v_progress')
    this.voiceprobg = document.querySelector('#vbar')
    this.voiceprobg.addEventListener('click', this._changeVoice, false)
    this.prevmusic.addEventListener('click', this._prevmusic, false)
    this.nextmusic.addEventListener('click', this._nextmusic, false)
    let mlist = document.querySelector('#mlist')
    mlist.addEventListener('click', this._toggleList, false)
    //  渲染完成后执行
  }
}
</script>

<style>

@import './fontawesome/css/font-awesome.css';
.lis-enter-active, .lis-leave-active {
  transition: all 1s;
}
.lis-enter, .lis-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100px);
}
#playlist {
  position: fixed;
  bottom: 60px;
  width: 40%;
  height: 50%;
  right: 10px;
  box-shadow: -4px -3px 11px rgba(0, 0, 0, .5);
  text-align: center;
  border-radius: 5px;
  transition: all .5s ease;
  transform-origin: 100% 100%;
}
#playlist ul{
  list-style: none;
}

#playlist li{
  padding: 5px 25px 5px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  font-size: 15px;
  position: relative;
}
#playlist li:nth-child(2n){
  background: rgba(112, 112, 112, .3);
}
#playlist li:hover{
  background: rgba(112, 112, 112, .6);
}

#playlist ul li span i{
  opacity: .4;
}
#playlist ul li:hover span:hover i{
  opacity: 1;
}

.listshow {
  transform: scale(1);
}

.listhide {
  transform: scale(0);
}
#playlist ul li.play::before{
  content: '\f013';
  position: absolute;
  font: normal normal normal 14px/1 FontAwesome;
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
  left: 5px;
  top: 7px;
}


#bottom,#ctrl{
    display: flex;
    flex-direction: row;
}
#bottom *{
  -webkit-app-region:  no-drag;
}
#ctrl{
    align-items: center;
    padding-left: 30px;
}

#ctrl > span{
    display: block;
    width: 30px;
    height: 30px;
    background: orange;
    opacity: .7;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
}
#ctrl > span:hover{
    opacity: 1;
}
#ctrl > span:not(:first-child){
    margin-left: 10px;
}

#ctrl > span > i{
    text-align: center;
    margin-top: 7px;
    color: white;
    font-size: 1em;
}

#bar{
    display: flex;
    flex-direction: row;
    width: 50%;
    margin-left: 30px;
    align-items: center;
}
#bar > span{
    font-size: .8em;
    margin: 0 10px;
}
#bar > div{
    width: 100%;
    height: 5px;
    background: gray;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
}
#bar > div > i#point{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    top: 50%;
    left: 0;
    background: blue;
    transform: translate(0, -5px);
    cursor: pointer;
}
i#point::after{
    content: "";
    display: block;
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: orange;
    top: 50%;
    left: 50%;
    transform: translate(-2.5px, -2.5px);
}
#voice{
    display: flex;
    align-items: center;

}
#voice > #vbar{
    width: 100px;
    height: 5px;
    border-radius: 2px;
    background: gray;
    margin-left: 40px;
    position: relative;
    cursor: pointer;
}
#vbar::before{
    content: "\f028";
    position: absolute;
    font: normal normal normal 14px/1 FontAwesome;
    left: -20px;
    top: -4px;
}
#lyric{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
}
#lyric > span{
    margin: 0 20px;
    cursor: pointer;
}

#lyric > span:nth-child(2){
    border: 1px solid rgba(0, 0, 0, .5);
    font-size: .8em;
}

.progress{
  background: green;
  border-radius: 5px;
  height: 5px;
  width: 0;
}

.v_progress{
  height: 5px;
  background: orange;
  border-radius: 7px;
  width: 0;
}

#time {
  width: 24px;
  height: 14px;
  background: rgba(0, 0, 0, .5);
  color: white;
  position: fixed;
  bottom: 34px;
  left: -100px;
  text-align: center;
  font-size: 10px;
}

#time::after{
  content: '';
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid rgba(0, 0, 0, .5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-7px, 6px);
}
#mlist{
  background: #ccc;
  padding: 0 5px;
  cursor: pointer;
}
#mlist span{
  font-size: 13px;
}

</style>
