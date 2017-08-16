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
          component: require('@/components/findMusic'),
          children: [
            {
              path: 'tuijian',
              component: require('@/components/findmusic/tuijian')
            },
            {
              path: 'musicpaper',
              component: require('@/components/findmusic/musicpaper')
            },
            {
              path: 'newmusic',
              component: require('@/components/findmusic/newmusic')
            },
            {
              path: '*',
              redirect: '/main/findMusic/tuijian'
            }
          ]
        },
        {
          path: '/gedan/:id',
          name: 'gedan',
          component: require('@/components/musiclist/gedanmain'),
          children: [
            {
              path: 'musictable',
              name: 'musictable',
              component: require('@/components/musiclist/musictable')
            },
            {
              path: 'musiccomment',
              name: 'musiccomment',
              component: require('@/components/musiclist/musiccomment')
            },
            {
              path: '*',
              redirect: 'musictable'
            }
          ]
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
          component: require('@/components/downloadManage'),
          children: [
            {
              path: 'singleMusic',
              component: require('@/components/download/singleMusic')
            },
            {
              path: '*',
              redirect: '/main/downloadManage/singleMusic'
            }
          ]
        },
        {
          path: 'mySave',
          component: require('@/components/mySave')
        }
      ]
    },
    {
      path: '*',
      redirect: '/main/findMusic/tuijian'
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/settings')
    }
  ]
})
