<template>
  <div id="reports" class="page">
    <div class="banner">
      <div class="inner">
        <div class="banner-title">
          <span>Reports</span>
        </div>
      </div>
    </div>
    <div class="content-block centered">
      <div class="inner">
        <h1>Item</h1>
        <div class="form-container">
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
          <p>Average Monthly Sales: {{ averageMonthlyItemSales | money }}<br><small>(over the last 12 months)</small></p>
          <p>Previous Month Sales: {{ lastMonthItemSales | money }}</p>
          <p><b>Predicted Monthly Sales: {{ predictedMonthlyItemSales | money }}</b></p>
        </div>
        <line-chart
          :chart-data="monthlyItemSalesChartData"
          :options="monthlyItemSalesChartOptions"
          :height="100"
        />
        <a
          :href="monthlyItemSalesCsvDataUri"
          download="monthlyItemSales.csv"
        >
          Download CSV
        </a>
        <br><br>
        <div class="form-container">
          <h4>Transactions</h4>
          <Label>Please select start date:</Label>
          <div style="position: relative">
            <date-picker v-model="monthStartDate" :config="date_config"></date-picker>
          </div>
          <Label>Please select end date:</Label>
          <div style="position: relative">
            <date-picker v-model="monthEndDate" :config="date_config"></date-picker>
          </div>
        </div>
        <br>
        <div class="table-container">
          <table border="1">
            <thead>
              <tr>
                <th>Transaction Date</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in getSales" :key="sale.transactionNumber">
                <td>{{sale.transactionDate}}</td>
                <td>{{sale.quantity}}</td>
                <td>{{sale.priceEach | money}}</td>
                <td>{{sale.quantity * sale.priceEach | money}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{{ totalQuantity }}</th>
                <th></th>
                <th>{{ totalSales | money }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <hr>
        <h1>Category</h1>
        <div class="form-container">
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
          <p>Average Monthly Sales: {{ averageMonthlyCategorySales | money }}<br><small>(over the last 12 months)</small></p>
          <p>Previous Month Sales: {{ lastMonthCategorySales | money }}</p>
          <p><b>Predicted Monthly Sales: {{ predictedMonthlyCategorySales | money }}</b></p>
        </div>
        <line-chart
          :chart-data="monthlyCategorySalesChartData"
          :options="monthlyCategorySalesChartOptions"
          :height="100"
        />
        <a
          :href="monthlyCategorySalesCsvDataUri"
          download="monthlyCategorySales.csv"
        >
          Download CSV
        </a>
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
    monthlyItemSalesChartData () {
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
              return df.isAfter(a.x, b.x)
            })
        }]
      }
    },
    monthlyItemSalesChartOptions () {
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
    monthlyItemSalesCsvDataUri () {
      const data = this.monthlyItemSalesChartData.datasets[0].data
      const headingLine = data.map(point => point.x).join(',')
      const dataLine = data.map(point => point.y).join(',')
      const csvString = [headingLine, dataLine].join('\n')
      return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString)
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
    monthlyCategorySalesChartData () {
      const months = []
      for (let i = 0; i < 12; i++) {
        months[11 - i] = df.subMonths(endDate, i).toISOString().slice(0, 7)
      }
      return {
        labels: months,
        datasets: [{
          label: this.selectedCategory,
          data: Object.entries(this.monthlyCategorySales)
            .map(([month, sales]) => {
              return {
                x: new Date(month),
                y: sumBy(sales, sale => sale.quantity * sale.priceEach)
              }
            })
            .sort((a, b) => {
              return df.isAfter(a.x, b.x)
            })
        }]
      }
    },
    monthlyCategorySalesChartOptions () {
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
    monthlyCategorySalesCsvDataUri () {
      const data = this.monthlyCategorySalesChartData.datasets[0].data
      const headingLine = data.map(point => point.x).join(',')
      const dataLine = data.map(point => point.y).join(',')
      const csvString = [headingLine, dataLine].join('\n')
      return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString)
    },
    getSales () {
      return this.$root.sales.filter(sale => {
        const item = this.$root.inventory.find(item => item.id === sale.id)
        const saleDate = new Date(sale.transactionDate)
        return item.id === this.selectedItem.id &&
          df.isAfter(saleDate, this.monthStartDate) &&
          df.isBefore(saleDate, this.monthEndDate)
      })
    },
    totalQuantity () {
      return sumBy(this.getSales, sale => sale.quantity)
    },
    totalSales () {
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
