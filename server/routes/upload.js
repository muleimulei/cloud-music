var express = require('express');
var router = express.Router();
var multer = require('multer');
var config = require('../config.js');
var fs = require('fs');
var Music = require('../db/music.js');
var songList = require('../db/songlist.js');
var storage = multer.diskStorage({
  destination: function (req, file, cb){
    if (file.originalname.indexOf('.mp3')!=-1){
      cb(null, config.publicDir + '/media');
    }else if(/\.jpg|\.png/.test(file.originalname)){
      cb(null, config.publicDir + '/pictures');
    }
  }
})
var upload = multer({
  storage: storage
});

router.post('/music', upload.fields([{name: 'file', maxCount: 1}]) ,function (req, res, next) {
  //处理音乐
  let musicBase = req.files.file[0].path + '.mp3';
  fs.rename(req.files.file[0].path, musicBase, function (err) {
    console.log(err)
  });

  // // //处理图片
  // let pictail = req.files.pic[0].originalname.slice(req.files.pic[0].originalname.indexOf('.'));
  // let picBase = req.files.pic[0].path + pictail;
  // fs.rename(req.files.pic[0].path,
  //           picBase, 
  //           function(err){
  //             console.log(err);
  // });

  var music = new Music({
    title: req.body.name.trim(),   //  歌曲名称
    pic: req.body.pic,//('/pictures/' + req.files.pic[0].filename + pictail).trim(),    //歌曲图片
    author: req.body.author.trim(), //歌曲作者
    file_link: '/media/'+ req.files.file[0].filename + '.mp3',   //文件位置
    language: req.body.language.trim(),    //语言
    duration: req.body.duration
  });

  music.save(function(err, doc){
    if(err){
      console.log(err);
    }else{
      console.log(doc);
      res.end('上传成功');
    }
    //将歌曲添加到歌单中
    songList.update({_id: req.body.songlist}, {$push:{list: doc._id}}, function (err, doc){
      if(err){
        console.log(err);
      }else{
        console.log('success');
        console.log(doc);
      }
    })
  })
});

router.post('/songlist', upload.none(),function (req, res, next) {
  //存储图片
  console.log(req.body)
  // //处理图片
  // let pictail = req.file.originalname.slice(req.file.originalname.indexOf('.'));
  // let picBase = req.file.path + pictail;
  // fs.rename(req.file.path,
  //           picBase,
  //           function(err){
  //             console.log(err);
  // });

  let songlist = new songList({
    pic: req.body.pic,//'/pictures/' + req.file.filename + pictail,
    title: req.body.name,
    summary: req.body.summary, 
    keyword: req.body.keyword.split(/,|，/),
  });

  songlist.save(function(err, doc){
    if(err){
      console.log(err);
    }else{
      console.log(doc);
      res.end('成功');
    }
  })
});

module.exports = router;