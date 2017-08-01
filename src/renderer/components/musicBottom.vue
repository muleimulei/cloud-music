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
            <div id="vbar">
                <div class="v_progress"></div>
            </div>
        </div>
        <div id="lyric">
            <span>
                <i class="fa fa-circle-o-notch" aria-hidden="true"></i>
            </span>
            <span>词</span>
            <span><i class="fa fa-list-alt" aria-hidden="true"></i></span>
        </div>
        <input id="file" type="file" style="display:none">
    </div>
</template>

<script>
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
      voiceprobg: null
    }
  },
  methods: {
    handleData (s) {
      this.audio.src = '刘若英 - 知道不知道.mp3'
      this.audio.play()
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
      this._pause()
    },
    _changeVoice (e) {
      this.voicepro.style.width = e.layerX + 'px'
      this.audio.volume = e.layerX / this.voiceprobg.clientWidth
    }
  },
  created () {
    this.$root.eventHub.$on('playmusic', function (s) {
      this.handleData(s)
    }.bind(this))
  },
  mounted () {
    this.prevmusic = document.querySelector('#prevmusic')
    this.playmusic = document.querySelector('#playmusic')
    this.nextmusic = document.querySelector('#nextmusic')
    this.playmusic.addEventListener('click', this._changeStatus, false)
    this.pro = document.querySelector('.progress')
    this.probg = document.querySelector('#bar > div')
    this.point = document.querySelector('#point')
    this.audio.addEventListener('timeupdate', this.updateProgress, false)
    this.audio.addEventListener('canplay', this._audioPlay, false)
    this.audio.addEventListener('pause', this.audioPause, false)
    this.audio.addEventListener('ended', this._audioEnded, false)
    // this.point.addEventListener('mousedown', function () { this.press = true }.bind(this), false)
    // this.point.addEventListener('mouseup', function () { this.press = false }.bind(this), false)
    // this.point.addEventListener('mousemove', function (e) { if (this.press) { console.log('213'); this._movebar(e) } }.bind(this), false)
    this.probg.addEventListener('click', this._movebar, false)
    this.voicepro = document.querySelector('.v_progress')
    this.voiceprobg = document.querySelector('#vbar')
    this.voiceprobg.addEventListener('click', this._changeVoice, false)
  }
}
</script>

<style>
@import './fontawesome/css/font-awesome.css';
#bottom,#ctrl{
    display: flex;
    flex-direction: row;
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
</style>
