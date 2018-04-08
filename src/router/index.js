import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Inventory from '@/components/Inventory'
import Sales from '@/components/Sales'
import Reports from '@/components/Reports'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory
    },
    {
      path: '/sales',
      name: 'Sales',
      component: Sales
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    }
  ]
})
