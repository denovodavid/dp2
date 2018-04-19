<template>
  <div id="sales" class="page">
    <div class="content-block centered">
      <div class="inner">
        <div class="form-container">
          <h4>Item</h4>
          <label for="item">Select an item:</label>
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
          <br><br>
          <p>Average Monthly Sales: {{ averageMonthlyItemSales }}</p>
          <p>Previous Month Sales: {{ lastMonthItemSales }}</p>
          <h2>Predicted Monthly Sales: {{ predictedMonthlyItemSales }}</h2>
        </div>
        <hr>
        <div class="form-container">
          <h4>Category</h4>
          <label for="item">Select a category:</label>
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
          <br><br>
          <p>Average Monthly Sales: {{ averageMonthlyCategorySales }}</p>
          <p>Previous Month Sales: {{ lastMonthCategorySales }}</p>
          <h2>Predicted Monthly Sales: {{ predictedMonthlyCategorySales }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    averageMonthlyItemSales () {
      // get all sales of item by month
      // average them
      return 20
    },
    lastMonthItemSales () {
      // get all sales of item from last month
      return 30
    },
    predictedMonthlyItemSales () {
      // Regression towards the mean
      return this.lastMonthItemSales +
        (this.averageMonthlyItemSales - this.lastMonthItemSales) / 2
    },
    averageMonthlyCategorySales () {
      // get all sales of category by month
      // average them
      return 50
    },
    lastMonthCategorySales () {
      // get all sales of a category from last month
      return 37
    },
    predictedMonthlyCategorySales () {
      // Regression towards the mean
      return this.lastMonthCategorySales +
        (this.averageMonthlyCategorySales - this.lastMonthCategorySales) / 2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
