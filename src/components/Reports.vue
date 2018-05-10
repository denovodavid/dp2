<template>
  <div id="sales" class="page">
    <div class="content-block centered">
      <div class="inner">
        <div class="form-container">
          <h4>Item</h4>
          <label for="item">Select an item:</label>
          <div class="select-container">
            <select
              name="item"
              v-model="selectedItem"
            >
              <option
                v-for="item in $root.inventory"
                :key="item.id"
                :value="item"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <br>
          <p>Average Monthly Sales: {{ averageMonthlyItemSales | money }}</p>
          <p>Previous Month Sales: {{ lastMonthItemSales | money }}</p>
          <h2>Predicted Monthly Sales: {{ predictedMonthlyItemSales | money }}</h2>
          <line-chart
            :chart-data="monthlySalesChartData"
            :options="monthlySalesChartOptions"
          />
        </div>
        <hr>
        <div class="form-container">
          <h4>Category</h4>
          <label for="item">Select a category:</label>
          <div class="select-container">
            <select
              name="item"
              v-model="selectedCategory"
            >
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
          <br>
          <p>Average Monthly Sales: {{ averageMonthlyCategorySales | money }}</p>
          <p>Previous Month Sales: {{ lastMonthCategorySales | money }}</p>
          <h2>Predicted Monthly Sales: {{ predictedMonthlyCategorySales | money }}</h2>
        </div>
        <hr>
        <div class="form-container">
          <h4>Monthly Sales</h4>
          <label for="item">Select An Item:</label>
          <div class="select-container">
            <select name="item" v-model="selectedItem">
              <option v-for="item in $root.inventory" :key="item.id" :value="item">
                {{item.name}}
              </option>
            </select>
          </div>
          <div>
            <Label>Please select start date:</Label>
            <div style="position: relative">
              <date-picker v-model="monthStartDate" :config="date_config"></date-picker>
            </div>
          </div>
          <div>
            <Label>Please select end date:</Label>
            <div style="position: relative">
              <date-picker v-model="monthEndDate" :config="date_config"></date-picker>
            </div>
          </div>
        </div>
        <hr>
        <div class="table-container">
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <body>
              <tr>
                <td>{{selectedItem.name}}</td>
                <td>{{selectedItem.category}}</td>
                <td>{{totalQuantity}}</td>
                <td>{{selectedItem.price}}</td>
                <td>{{totalMonthlySales}}</td>
              </tr>
            </body>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import df from 'date-fns'
import LineChart from '@/components/LineChart'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
Vue.use(datePicker)

// Date ranges from previous month minus 12 months
const endDate = df.lastDayOfMonth(df.subMonths(new Date(), 1))
const startDate = df.subMonths(df.startOfMonth(new Date()), 12)

export default {
  name: 'reports',
  components: {
    LineChart
  },
  data () {
    return {
      date_config: {
        format: 'YYYY-MM-DD'
      },
      selectedItem: {},
      selectedCategory: '',
      monthStartDate: '',
      monthEndDate: ''
    }
  },
  computed: {
    categories () {
      // get all categories
      return [...new Set(this.$root.inventory.map(item => item.category))]
    },
    itemSales () {
      return this.$root.sales.filter(sale => {
        const saleDate = new Date(sale.transactionDate)
        return sale.id === this.selectedItem.id &&
          df.isAfter(saleDate, startDate) &&
          df.isBefore(saleDate, endDate)
      })
    },
    monthlyItemSales () {
      return groupBy(this.itemSales, sale => sale.transactionDate.slice(0, 7))
    },
    averageMonthlyItemSales () {
      // get all sales of item by month
      // average their totals them
      const total = Object.values(this.monthlyItemSales)
        .reduce((total, sales) => {
          total += sumBy(sales, sale => sale.quantity * sale.priceEach)
          return total
        }, 0)
      return total / 12
    },
    lastMonthItemSales () {
      // get all sales of item from last month
      const lastMonthSales = this.monthlyItemSales[endDate.toISOString().slice(0, 7)]
      return sumBy(lastMonthSales, sale => sale.quantity * sale.priceEach)
    },
    predictedMonthlyItemSales () {
      // Regression towards the mean
      return this.lastMonthItemSales +
        (this.averageMonthlyItemSales - this.lastMonthItemSales) / 2
    },
    categorySales () {
      return this.$root.sales.filter(sale => {
        const item = this.$root.inventory.find(item => item.id === sale.id)
        const saleDate = new Date(sale.transactionDate)
        return item.category === this.selectedCategory &&
          df.isAfter(saleDate, startDate) &&
          df.isBefore(saleDate, endDate)
      })
    },
    monthlyCategorySales () {
      return groupBy(this.categorySales, sale => sale.transactionDate.slice(0, 7))
    },
    averageMonthlyCategorySales () {
      // get all sales of category by month
      // average them
      const total = Object.values(this.monthlyCategorySales)
        .reduce((total, sales) => {
          total += sumBy(sales, sale => sale.quantity * sale.priceEach)
          return total
        }, 0)
      return total / 12
    },
    lastMonthCategorySales () {
      // get all sales of a category from last month
      const lastMonthSales = this.monthlyCategorySales[endDate.toISOString().slice(0, 7)]
      return sumBy(lastMonthSales, sale => sale.quantity * sale.priceEach)
    },
    predictedMonthlyCategorySales () {
      // Regression towards the mean
      return this.lastMonthCategorySales +
        (this.averageMonthlyCategorySales - this.lastMonthCategorySales) / 2
    },
    monthlySalesChartData () {
      const months = []
      for (let i = 0; i < 12; i++) {
        months[11 - i] = df.subMonths(endDate, i).toISOString().slice(0, 7)
      }
      return {
        labels: months,
        datasets: [{
          label: this.selectedItem.name,
          data: Object.entries(this.monthlyItemSales)
            .map(([month, sales]) => {
              return {
                x: new Date(month),
                y: sumBy(sales, sale => sale.quantity * sale.priceEach)
              }
            })
            .sort((a, b) => {
              return df.isBefore(a.x, b.x)
            })
        }]
      }
    },
    monthlySalesChartOptions () {
      return {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }]
        }
      }
    },
    getSales () {
      return this.$root.sales.filter(sale => {
        const item = this.$root.inventory.find(item => item.id === sale.id)
        const saleDate = new Date(sale.transactionDate)
        return item.category === this.selectedCategory &&
          df.isAfter(saleDate, this.monthStartDate) &&
          df.isBefore(saleDate, this.monthEndDate)
      })
    },
    totalQuantity () {
      return sumBy(this.getSales, sale => sale.quantity)
    },
    totalMonthlySales () {
      return sumBy(this.getSales, sale => sale.quantity * sale.priceEach)
    }
  },
  created () {
    this.selectedItem = this.$root.inventory[0]
    this.selectedCategory = this.categories[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
