<template>
  <div id="sales" class="page">
    <div class="banner">
      <div class="inner">
        <div class="banner-title">
          <span>Sales</span>
        </div>
      </div>
    </div>
    <div class="content-block centered">
      <div class="inner">
        <div class="form-container">
          <div class="input-block">
            <div class="row">
              <div class="column input-column half">
                <label>Transaction Number</label>
                <input type="number" v-model.trim="newRecord.transactionNumber">
              </div>
              <div class="column input-column half" style="position: relative">
                <label>Transaction Date</label>
                <date-picker v-model.trim="newRecord.transactionDate" :config="date_config"></date-picker>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="row">
              <div class="column input-column">
                <label>Please Select the Inventory Item: </label>
                <select v-model="selected">
                  <option v-for="item in $root.inventory" :key="item.id" v-bind:value="item">
                    {{item.name}}
                  </option>
                </select>
                <input type="text" v-model="selected.id">
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="row">
              <div class="column input-column half">
                <label>Quantity</label>
                <input type="number" v-model="newRecord.quantity"><br>
              </div>
              <div class="column input-column half">
                <label>Price</label>
                <input type="number" v-model="selected.price"><br>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="row">
              <div class="column input-column">
                <label>Total</label>
                <input type="number" v-model="newRecord.total"><br>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="buttons-container">
              <div class="row">
                <div class="column">
                  <button id="sales-add-button" @click="addSalesRecord">Add To Sales</button>
                  <button id="sales-edit-button"
                    @click="editSales = !editSales"
                  >
                    {{ editSales ? 'Done' : 'Edit' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-container">
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
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
Vue.use(datePicker)

export default {
  name: 'Sales',
  data () {
    return {
      date_config: {
        format: 'YYYY-MM-DD'
      },
      selected: {},
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
        id: this.newRecord.id,
        quantity: this.newRecord.quantity,
        priceEach: this.newRecord.priceEach,
        total: this.newRecord.total

      }
      this.$root.addSalesRecord(record)
      this.newRecord.transactionNumber = 0
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
