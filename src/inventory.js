import uuidv4 from 'uuid/v4'

export default {
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
    },
    removeInventoryItem (index) {
      this.inventory.splice(index, 1)
    }
  }
}
