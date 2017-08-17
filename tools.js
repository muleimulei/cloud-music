// import fs from 'fs'

var fs = require('fs')
const SIZE = ['Byte', 'KB', 'MB']

exports.getMP3 = function (path) {
  let set = []
  iterator(path, set)
  return set
}

function getSize (num) {
  let i = 0
  while (num / 1024 > 1) {
    i++
    num /= 1024
  }
  return num.toFixed(1) + SIZE[i]
}

function iterator (dir, x) {
  let list = fs.readdirSync(dir)
  list.forEach(function (item) {
    let stat = fs.lstatSync(dir + '/' + item)
    if (stat.isFile() && /\.mp3/.test(item)) {
      var obj = {}
      obj.size = getSize(stat.size)
      obj.title = item
      // obj.path = path.join(__static + '/msuic/', item)
      x.push(obj)
    } else {
      iterator(dir + '/' + item, x)
    }
  })
}
