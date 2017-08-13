var express = require('express');
var router = express.Router();
var config = require('../config.js');
var songList = require('../db/songlist.js');

router.get('/getpartgedan', function (req, res, next) {
    songList.find({}, null, {limit: 10}, function (err, docs) {
        if (err) {
            console.log(err)
        } else{
            // let list = docs.map(function (item) {
            //     item.pic = `http://${config.listenhost}:${config.listenport}${item.pic}`
            //     return item
            // })
            res.json(list)
        }
    })
})

router.get('/getgedandetail/:id', function (req, res, next) {
    songList.findOneAndUpdate({_id: req.params.id}, {$inc: {playNum: 1}}).populate('list').exec(function (err, doc){
        if(err){
            console.log(err)
        }else{
            // doc.pic = `http://${config.listenhost}:${config.listenport}${doc.pic}`
            // doc.list.map(function (item) {
            //     item.pic = `http://${config.listenhost}:${config.listenport}${item.pic}`
            //     return item
            // })
            res.json(doc)
        }
    })
})
module.exports = router;
