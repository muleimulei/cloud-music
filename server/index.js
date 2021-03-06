var express = require('express');
var app = express();
var basicAuth = require('basic-auth');
var config = require('./config.js')
var path = require('path');
var songList = require('./db/songlist.js');

var mongoose = require('mongoose');
    DB_URL = 'mongodb://' + config.host + ':' + config.port + '/' + config.database

mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to '+ DB_URL)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
  console.log('123')
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
},express.static(path.join(__dirname, 'public')));

app.use('/admin', function (req, res, next) {
  function unauthorized(resp) {
    resp.set('WWW-Authenticate', 'Basic realm=Input User&Password');
    return resp.sendStatus(401);
  }
  let user = basicAuth(req);
  console.log(user)
  if (!user) {
    unauthorized(res);
  }
  if (user.name==='user' && user.pass === '123') {
    next();
  }else{
    unauthorized(res);
  }
  }
});

app.use('/admin/addmusic', function (req, res, next) {
  songList.find({}, '_id title', function (err, docs) {
      res.render('pages/addmusic',{
        title: '添加音乐',
        list: docs
    });
  })
});
app.use('/admin/addsonglist', function (req, res, next){
  res.render('pages/addsonglist',{
    title: '添加歌单'
  });
})

app.use('/admin/upload', require('./routes/upload.js'));

// api操作
app.use('/api', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
} ,require('./routes/getmusic.js'));
// 下载音乐
app.use('/media', function (req, res) {
  
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
