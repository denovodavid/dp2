<template>
  <div id="app">
    <header>
      <nav>
        <div class="nav-inner">
          <div class="logo-container">
            <img src="./assets/img/logo.png" alt="" class="logo">
          </div>
          <ul class="nav-menu">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/inventory">Inventory</router-link>
            </li>
            <li>
              <router-link to="/sales">Sales</router-link>
            </li>
            <li>
              <router-link to="/reports">Reports</router-link>
            </li>
          </ul>
          <div class="hamburger-container">
            <div class="hamburger">
              <div class="hamburger-segment segment-1"></div>
              <div class="hamburger-segment segment-2"></div>
              <div class="hamburger-segment segment-3"></div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', 'Lato', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* import package styles */
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

/* The site.scss file contains the imports for all the invdividual sass files */
@import 'assets/sass/site.scss';
</style>
