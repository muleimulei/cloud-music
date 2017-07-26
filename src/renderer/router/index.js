import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'my-project',
      component: require('@/components/musicMain')
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/settings')
    }
  ]
})
