import uuidv4 from 'uuid/v4'

export default {
  data: {
    inventory: [
      {
        name: 'Vitamin D Liquid',
        category: 'Vitamins',
        price: 5.99,
        quantity: 2,
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2'
      },
      {
        name: 'Vitamin E Cream',
        category: 'Vitamins',
        price: 11.99,
        quantity: 3,
        id: '403d687a-e6df-4e74-b4f8-5f6ac42c130f'
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
        return item.id
      }
      return null
    },
    removeInventoryItem (id) {
      const item = this.inventory.find(item => item.id === id)
      if (item == null) return
      const index = this.inventory.indexOf(item)
      this.inventory.splice(index, 1)
    }
  }
}
