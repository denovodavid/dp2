<template>
  <div>
    <h1>This is Sales page!</h1>
    <span>Transaction Number: </span><input type="number" v-model.trim="newRecord.transactionNumber"><br>
    <span>Transaction Date: </span><input type="text" v-model.trim="newRecord.transDate"><br>
    <span>Inventory id: </span><input type="text" v-model="newRecord.name"><br>
    <span>Quantity: </span><input type="number" v-model="newRecord.quantity"><br>
    <span>Price: </span><input type="number" v-model="newRecord.priceEach"><br>
    <span>Total: </span><input type="number" v-model="newRecord.total"><br>
    <button @click="addSalesRecord">Add To Sales</button>
    <br><br>
    <button
      @click="editSales = !editSales"
    >
      {{ editSales ? 'Done' : 'Edit' }}
    </button>
        <table border="1">
      <thead>
        <tr>
          <th>Transaction Number</th>
          <th>Transaction Date</th>
          <th>Inventory id</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th v-show="editSales">Remove</th>
        </tr>
      </thead>
      <tbody v-show="!editSales">
        <tr
          v-for="record in $root.$data.sales"
          :key="record.id"
        >
          <td>{{ record.transactionNumber }}</td>             <!--TODO: auto generate-->
          <td>{{ record.transactionDate }}</td>               <!--TODO: date picker-->
          <td>{{ record.id }}</td>                            <!--TODO: intergrate with inventory id-->
          <td>{{ record.quantity }}</td>                      <!--TODO: change inventory items quantity-->
          <td>{{ record.priceEach}}</td>
          <td>{{ record.total }}</td>
        </tr>
      </tbody>
      <tbody v-show="editSales">
        <tr
          v-for="record in $root.$data.sales"
          :key="record.id"
        >
          <td><input type="number" v-model="record.transactionNumber"></td>
          <td><input type="text" v-model="record.transactionDate"></td>
          <td><input type="text" v-model="record.id"></td>
          <td><input type="number" v-model="record.quantity"></td>
          <td><input type="number" v-model="record.priceEach"></td>
          <td><input type="number" v-model="record.total"></td>
          <td v-show="editSales">
            <button @click="$root.removeSalesRecord(record.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Sales',
  data () {
    return {
      newRecord: {
        transactionNumber: 0,
        transactionDate: '',
        id: '',
        quantity: 1,
        priceEach: 0,
        total: 0
      },
      editSales: false
    }
  },
  methods: {
    addSalesRecord () {
      const record = {
        transactionNumber: this.newRecord.transactionNumber,
        transactionDate: this.newRecord.transactionDate,
        price: this.newRecord.id,
        quantity: this.newRecord.quantity,
        priceEach: this.newRecord.priceEach,
        total: this.newRecord.total

      }
      this.$root.addSalesRecord(record)
      this.newRecord.transationNumber = 0
      this.newRecord.transactionDate = ''
      this.newRecord.id = ''
      this.newRecord.quantity = 1
      this.newRecord.priceEach = 0
      this.newRecord.total = 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
