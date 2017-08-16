
var mongoose  = require('mongoose'),
    Schema = mongoose.Schema

let music = new Schema({
    title: String,   //  歌曲名称
    pic: String,    //歌曲图片
    author: String, //歌曲作者
    file_link: String,   //文件位置
    language: String,    //语言
    album: String,   //  专辑
    duration: String // 时常
})

module.exports = mongoose.model('musics', music)
