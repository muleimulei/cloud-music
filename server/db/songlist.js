
var mongoose  = require('mongoose'),
    Schema = mongoose.Schema

let songlist = new Schema({
  pic: String,  //图片
  language: String, //语言
  createTime: Date,   //创建日期
  title: String,  //歌单名称
  summary: String,  //简介
  keyword: [],  //标签
  list: [{
    type: Schema.Types.ObjectId,
    ref: 'musics'
  }],
  playNum: Number,  //播放次数
  owner: {  //创建者
    type: Schema.Types.ObjectId,
    ref: 'customers'
  }
})

module.exports = mongoose.model('songlists', music)
