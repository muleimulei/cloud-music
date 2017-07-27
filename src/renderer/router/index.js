import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'my-project',
      component: require('@/components/musicMain'),
      children: [
        {
          path: 'findMusic',
          component: require('@/components/findMusic')
        },
        {
          path: 'privateFM',
          component: require('@/components/privateFM')
        },
        {
          path: 'findMV',
          component: require('@/components/findMV')
        },
        {
          path: 'findFriend',
          component: require('@/components/findFriend')
        },
        {
          path: 'myMusic',
          component: require('@/components/myMusic')
        },
        {
          path: 'downloadManage',
          component: require('@/components/downloadManage')
        },
        {
          path: 'mySave',
          component: require('@/components/mySave')
        }
      ]
    },
    {
      path: '*',
      redirect: '/main/findMusic'
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/settings')
    }
  ]
})
