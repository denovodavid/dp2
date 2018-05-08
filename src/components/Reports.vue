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
          <br><br>
          <p>Average Monthly Sales: {{ averageMonthlyItemSales | money }}</p>
          <p>Previous Month Sales: {{ lastMonthItemSales | money }}</p>
          <h2>Predicted Monthly Sales: {{ predictedMonthlyItemSales | money }}</h2>
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
          <br><br>
          <p>Average Monthly Sales: {{ averageMonthlyCategorySales | money }}</p>
          <p>Previous Month Sales: {{ lastMonthCategorySales | money }}</p>
          <h2>Predicted Monthly Sales: {{ predictedMonthlyCategorySales | money }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import df from 'date-fns'

// Date ranges from previous month minus 12 months
const endDate = df.lastDayOfMonth(df.subMonths(new Date(), 1))
const startDate = df.subMonths(df.startOfMonth(new Date()), 12)

export default {
  name: 'reports',
  data () {
    return {
      selectedItem: {},
      selectedCategory: ''
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
