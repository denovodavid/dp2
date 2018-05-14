// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import inventory from './inventory'
import sales from './sales'

Vue.config.productionTip = false

Vue.filter('money', (number) => {
  if (isNaN(Number(number))) number = 0
  return '$' + number.toFixed(2).toLocaleString('en-AU')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    ...inventory.data,
    ...sales.data
  },
  methods: {
    ...inventory.methods,
    ...sales.methods
  }
})
