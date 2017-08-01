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
      file: null
    }
  },
  methods: {
    handleData (s) {
      this.audio.src = '刘若英 - 知道不知道.mp3'
      this.audio.play()
    },
    updateProgress () {
      this.currentTime = this._parseTime(this.audio.currentTime)
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
      this.playmusic.children[0].classList.remove('fa-play')
      this.playmusic.children[0].classList.add('fa-pause')
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
    this.audio.addEventListener('timeupdate', this.updateProgress, false)
    this.audio.addEventListener('canplay', this._audioPlay, false)
    this.audio.addEventListener('pause', this.audioPause, false)
    this.audio.addEventListener('ended', this.audioEnded, false)
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
}
#bar > div > i#point{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    top: 50%;
    left: 0;
    background: white;
    transform: translate(0, -5px);
}
i#point::after{
    content: "";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: orange;
    top: 50%;
    left: 50%;
    transform: translate(-3.5px, -3.5px);
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
</style>
