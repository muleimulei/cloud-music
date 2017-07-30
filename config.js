var nconf = require('nconf')
nconf.file('./config.json')

exports.getValue = function (key) {
  nconf.load()
  return nconf.get(key) || null
}

exports.save = function (key, value) {
  nconf.set(key, value)
  nconf.save()
}
