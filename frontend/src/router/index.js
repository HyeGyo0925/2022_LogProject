import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import MoniView from '@/components/MoniView'
import LogView from '@/components/LogView'
import SetView from '@/components/SetView'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/moni',
      name: 'MoniView',
      component : MoniView
    },
    {
      path: '/log',
      name: 'LogView',
      component : LogView
    },
    {
      path: '/set',
      name: 'SetView',
      component : SetView
    },
  ]
})
