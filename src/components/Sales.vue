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
                <select v-model="selected" @change="selectItem">
                  <option v-for="item in $root.inventory" :key="item.id" v-bind:value="item">
                    {{item.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="row">
              <div class="column input-column half">
                <label>Quantity</label>
                <input type="number" v-model.number="newRecord.quantity"><br>
              </div>
              <div class="column input-column half">
                <label>Price</label>
                <input type="number" v-model.number="newRecord.priceEach"><br>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="row">
              <div class="column input-column">
                <label>Total</label>
                <span v-if="newRecord.priceEach != null">
                  <label>{{ newRecord.priceEach * newRecord.quantity }}</label>
                </span>
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
                <th>Inventory Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th v-show="editSales">Remove</th>
              </tr>
            </thead>
            <tbody v-show="!editSales">
              <tr
                v-for="record in $root.$data.sales"
                :key="record.transactionNumber"
              >
                <td>{{ record.transactionNumber }}</td>
                <td>{{ record.transactionDate }}</td>
                <td>{{ $root.inventory.find(item => item.id == record.id).name }}</td>
                <td>{{ record.quantity }}</td>
                <td>{{ record.priceEach}}</td>
                <td>{{ record.quantity * record.priceEach }}</td>
              </tr>
            </tbody>
            <tbody v-show="editSales">
              <tr
                v-for="record in $root.$data.sales"
                :key="record.transactionNumber"
              >
                <td><input type="number" v-model="record.transactionNumber"></td>
                <td>
                  <div style="position: relative">
                    <date-picker v-model.trim="record.transactionDate" :config="date_config"></date-picker>
                  </div>
                </td>
                <td>
                  <select v-model="record.id">
                  <option v-for="item in $root.inventory" :key="item.id" v-bind:value="item.id">
                    {{item.name}}
                  </option>
                </select>
                </td>
                <td><input type="number" v-model="record.quantity"></td>
                <td><input type="number" v-model="record.priceEach"></td>
                <td>
                  <label>{{record.quantity * record.priceEach}}</label>
                </td>
                <td v-show="editSales">
                  <button @click="$root.removeSalesRecord(record.transactionNumber)">Remove</button>
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
import clone from 'lodash/clone'
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
        transactionDate: '',
        id: '',
        quantity: 1,
        priceEach: 0
      },
      editSales: false
    }
  },
  methods: {
    selectItem () {
      this.newRecord.id = this.selected.id
      this.newRecord.priceEach = this.selected.price
    },
    addSalesRecord () {
      this.$root.addSalesRecord(clone(this.newRecord))
      this.newRecord.transactionDate = ''
      this.newRecord.quantity = 1
      this.newRecord.priceEach = 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
