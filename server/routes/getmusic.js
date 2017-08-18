var express = require('express');
var router = express.Router();
var config = require('../config.js');
var songList = require('../db/songlist.js');

router.get('/getpartgedan', function (req, res, next) {
    songList.find({}, 'playNum pic title', {limit: 10},  function (err, docs) {
        if (err) {
            console.log(err)
        } else{
            res.json(docs)
        }
    })
})

router.get('/getgedandetail/:id', function (req, res, next) {
    songList.findOneAndUpdate({_id: req.params.id}, {$inc: {playNum: 1}}).populate('list').exec(function (err, doc){
        if(err){
            console.log(err)
        }else{
            doc.list.map(function (item) {
                item.file_link = `http://${config.listenhost}:${config.listenport}${item.file_link}`
                return item
            })
            res.json(doc)
        }
    })
})
module.exports = router;
