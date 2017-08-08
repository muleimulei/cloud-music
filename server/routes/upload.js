var express = require('express');
var router = express.Router();
var multer = require('multer');
var config = require('../config.js');
var fs = require('fs');
var Music = require('../db/music.js');

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

router.post('/music', upload.fields([{name: 'file', maxCount: 1}, {name: 'pic', maxCount: 1}]) ,function (req, res, next) {
  
  //处理音乐
  let musicBase = req.files.file[0].path + '.mp3';
  fs.rename(req.files.file[0].path, musicBase, function (err) {
    console.log(err)
  });

  // //处理图片
  let pictail = req.files.pic[0].originalname.slice(req.files.pic[0].originalname.indexOf('.'));
  let picBase = req.files.pic[0].path + pictail;
  fs.rename(req.files.pic[0].path,
            picBase, 
            function(err){
              console.log(err);
  });

  var music = new Music({
    title: req.body.name,   //  歌曲名称
    pic: '/pictures/' + req.files.pic[0].filename + pictail,    //歌曲图片
    author: req.body.author, //歌曲作者
    file_link: '/media/'+ req.files.file[0].filename + '.mp3',   //文件位置
    language: req.body.language    //语言
  });

  music.save(function(err, doc){
    if(err){
      console.log(err);
    }else{
      console.log(doc);
      res.end('上传成功');
    }
  })

});

module.exports = router;