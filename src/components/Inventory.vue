<template>
  <div id="inventory" class="page">
    <div class="banner">
      <div class="inner">
        <div class="banner-title">
          <span>Inventory</span>
        </div>
      </div>
    </div>
    <div class="content-block centered">
      <div class="inner">
        <div class="form-container">
          <div class="input-block">
            <div class="row">
              <div class="column input-column">
                <label>Name</label>
                <input type="text" v-model.trim="newItem.name"><br>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="row">
              <div class="column input-column">
                <label>Category</label>
                <input type="text" v-model.trim="newItem.category"><br>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="row">
              <div class="column input-column half">
                <label>Price</label>
                <input type="number" v-model="newItem.price"><br>
              </div>
              <div class="column input-column half">
                <label>Quantity</label>
                <input type="number" v-model="newItem.quantity"><br>
              </div>
            </div>
          </div>
          <div class="input-block">
            <div class="buttons-container">
              <div class="row">
                <div class="column">
                  <button id="inventory-add-button" @click="addInventoryItem">Add To Inventory</button>
                  <button id="inventory-edit-button"
                    @click="editInventory = !editInventory"
                  >
                    {{ editInventory ? 'Done' : 'Edit' }}
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
                v-for="item in $root.$data.inventory"
                :key="item.id"
              >
                <td><input type="text" v-model="item.name"></td>
                <td><input type="text" v-model="item.category"></td>
                <td><input type="number" v-model="item.price"></td>
                <td><input type="number" v-model="item.quantity"></td>
                <td v-show="editInventory">
                  <button @click="$root.removeInventoryItem(item.id)">Remove</button>
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
