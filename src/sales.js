import uuidv4 from 'uuid/v4'

export default {
  data: {
    sales: [
      {
        transactionNumber: 1,
        transactionDate: '2018-03-29',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 1,
        priceEach: 5.99,
        total: 1 * 5.99
      },
      {
        transactionNumber: 2,
        transactionDate: '2018-04-03',
        id: '403d687a-e6df-4e74-b4f8-5f6ac42c130f',
        quantity: 3,
        priceEach: 11.99,
        total: 3 * 11.99
      }
    ]
  },
  methods: {
    addSalesRecord (record) {
      if (record.transactionNumber !== '' &&
      record.transactionDate !== '' &&
      record.id !== '' &&
      record.quantity > 0 &&
      record.priceEach > 0 &&
      record.total > 0
      ) {
        record.id = uuidv4()
        this.sales.push(record)
        return record.id
      }
      return null
    },
    removeSalesRecord (id) {
      const record = this.sales.find(record => record.id === id)
      if (record == null) return
      const index = this.sales.indexOf(record)
      this.sales.splice(index, 1)
    }
  }
}
