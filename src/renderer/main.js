import Vue from 'vue'
import axios from 'axios'
import config from '../../config.js'
import App from './App'
import router from './router/index'
import store from './store'

//  配置axio
var instance = axios.create({
  baseURL: `http://${config.getValue('remotehost')}:${config.getValue('remoteport')}/api`
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = instance
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
