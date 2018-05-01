
export default {
  data: {
    sales: [
      {
        transactionNumber: 1,
        transactionDate: '2018-03-29',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 1,
        priceEach: 5.99
      },
      {
        transactionNumber: 2,
        transactionDate: '2018-04-03',
        id: '403d687a-e6df-4e74-b4f8-5f6ac42c130f',
        quantity: 3,
        priceEach: 11.99
      },
      {
        transactionNumber: 3,
        transactionDate: '2018-05-01',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 2,
        priceEach: 5.99
      },
      {
        transactionNumber: 4,
        transactionDate: '2018-04-30',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 2,
        priceEach: 7
      },
      {
        transactionNumber: 5,
        transactionDate: '2018-03-02',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 2,
        priceEach: 5.99
      },
      {
        transactionNumber: 6,
        transactionDate: '2018-01-13',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 1,
        priceEach: 5.99
      },
      {
        transactionNumber: 7,
        transactionDate: '2018-01-12',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 1,
        priceEach: 4.50
      },
      {
        transactionNumber: 8,
        transactionDate: '2018-02-09',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 1,
        priceEach: 5.99
      },
      {
        transactionNumber: 9,
        transactionDate: '2018-02-18',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 2,
        priceEach: 5.99
      },
      {
        transactionNumber: 10,
        transactionDate: '2018-03-26',
        id: '5ccdd07c-b5c2-417c-a2ef-bcbe422d06c2',
        quantity: 3,
        priceEach: 4
      }
    ]
  },
  methods: {
    addSalesRecord (record) {
      if (
        record.transactionNumber !== '' &&
        record.transactionDate !== '' &&
        record.id !== '' &&
        record.quantity > 0 &&
        record.priceEach > 0
      ) {
        record.transactionNumber = Object.keys(this.sales).length + 1
        this.sales.push(record)
        return record.transactionNumber
      }
      return null
    },
    removeSalesRecord (transactionNumber) {
      const record = this.sales.find(record => record.transactionNumber === transactionNumber)
      if (record == null) return
      const index = this.sales.indexOf(record)
      this.sales.splice(index, 1)
    }
  }
}
