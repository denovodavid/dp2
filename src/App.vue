<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-link to="/">Home</router-link>
    -
    <router-link to="/inventory">Inventory</router-link>
    -
    <router-link to="/sales">Sales</router-link>
    -
    <router-link to="/reports">Reports</router-link>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
