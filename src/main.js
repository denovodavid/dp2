// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import uuidv4 from 'uuid/v4'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    inventory: [
      {
        name: 'Vitamin D Liquid',
        category: 'Vitamins',
        price: 5.99,
        quantity: 2,
        id: uuidv4()
      },
      {
        name: 'Vitamin E Cream',
        category: 'Vitamins',
        price: 11.99,
        quantity: 3,
        id: uuidv4()
      }
    ]
  },
  methods: {
    addInventoryItem (item) {
      if (
        item.name !== '' &&
        item.category !== '' &&
        item.price > 0 &&
        item.quantity > 0
      ) {
        item.id = uuidv4()
        this.inventory.push(item)
      }
    }
  }
})
