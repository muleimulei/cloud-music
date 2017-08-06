var express = require('express');
var router = express.Router();
var upload = require('multer')({dest: '../public/media'});

router.post('/music', upload.single('file') ,function (req, res, next) {
    // 没有附带文件
     if (!req.file) {
        res.json({ ok: false });
        return;
     }

     // 输出文件信息
     console.log('====================================================');
     console.log('fieldname: ' + req.file.fieldname);
     console.log('originalname: ' + req.file.originalname);
     console.log('encoding: ' + req.file.encoding);
     console.log('mimetype: ' + req.file.mimetype);
     console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
     console.log('destination: ' + req.file.destination);
     console.log('filename: ' + req.file.filename);
     console.log('path: ' + req.file.path);

});

module.exports = router;