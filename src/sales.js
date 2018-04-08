import uuidv4 from 'uuid/v4'

export default {
  data: {
    sales: [
      {
        products: [
          {
            id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
            quantity: 1,
            priceEach: 5.99
          },
          {
            id: '403d687a-e6df-4e74-b4f8-5f6ac42c130f',
            quantity: 3,
            priceEach: 11.99
          }
        ],
        id: 'da2db1d8-6397-4012-8e39-104883ab151a'
      }
    ]
  },
  methods: {
    addSalesRecord (record) {
      record.id = uuidv4()
      this.sales.push(record)
    }
  }
}
