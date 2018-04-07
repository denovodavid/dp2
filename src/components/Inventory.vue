<template>
  <div>
    <h1>This is Inventory Page!</h1>
    <span>Name: </span><input type="text" v-model.trim="newItem.name"><br>
    <span>Category: </span><input type="text" v-model.trim="newItem.category"><br>
    <span>Price: </span><input type="number" v-model="newItem.price"><br>
    <span>Quantity: </span><input type="number" v-model="newItem.quantity"><br>
    <button @click="addInventoryItem">Add To Inventory</button>
    <br><br>
    <button
      @click="editInventory = !editInventory"
    >
      {{ editInventory ? 'Done' : 'Edit' }}
    </button>
    <table border="1">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th v-show="editInventory">Remove</th>
        </tr>
      </thead>
      <tbody v-show="!editInventory">
        <tr
          v-for="item in $root.$data.inventory"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
      <tbody v-show="editInventory">
        <tr
          v-for="(item, index) in $root.$data.inventory"
          :key="item.id"
        >
          <td><input type="text" v-model="item.name"></td>
          <td><input type="text" v-model="item.category"></td>
          <td><input type="number" v-model="item.price"></td>
          <td><input type="number" v-model="item.quantity"></td>
          <td v-show="editInventory">
            <button @click="$root.removeInventoryItem(index)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Inventory',
  data () {
    return {
      newItem: {
        name: '',
        category: '',
        price: 0,
        quantity: 1
      },
      editInventory: false
    }
  },
  methods: {
    addInventoryItem () {
      const item = {
        name: this.newItem.name,
        category: this.newItem.category,
        price: this.newItem.price,
        quantity: this.newItem.quantity
      }
      this.$root.addInventoryItem(item)
      this.newItem.name = ''
      this.newItem.category = ''
      this.newItem.price = 0
      this.newItem.quantity = 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
