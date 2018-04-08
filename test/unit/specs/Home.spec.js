import Vue from 'vue'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it.skip('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('This is Home page!')
  })
})
