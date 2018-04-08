import Vue from 'vue'
import inventory from '@/inventory'

describe('inventory.js', () => {
  beforeEach(() => {
    inventory.data.inventory = []
  })
  it('adds item to inventory', () => {
    const vm = new Vue(inventory)
    const item = {
      name: 'name',
      category: 'category',
      price: 1,
      quantity: 1
    }
    const id = vm.addInventoryItem(item)
    const expected = { ...item, id }
    expect(vm.$data.inventory).toContainEqual(expected)
  })
  it('removes item from inventory', () => {
    const item = {
      name: 'name',
      category: 'category',
      price: 1,
      quantity: 1,
      id: '442a7b65-ec3f-4990-8206-43f96ca13fd1'
    }
    inventory.data.inventory = [ item ]
    const vm = new Vue(inventory)
    vm.removeInventoryItem(item.id)
    expect(vm.$data.inventory).not.toContainEqual(item)
  })
})
