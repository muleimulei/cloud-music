
var mongoose  = require('mongoose'),
    Schema = mongoose.Schema

let customer = new Schema({
  name: String, //姓名
  pic: String,  //头像
  sumary: String, //介绍
  birthday: Date, //生日
  place: String,  //地区
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  savemusics: [{
    type: Schema.Types.ObjectId,
    ref: 'musics'
  }],
  createlist: [{
    type: Schema.Types.ObjectId,
    ref: 'songlists'
  }]
})

module.exports = mongoose.model('customers', customer)
