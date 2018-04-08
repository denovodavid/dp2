<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <header>
      <nav>
        <div class="nav-inner">
          <div class="b-row">
            <div class="b-col">
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* import package styles */
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

/* The site.scss file contains the imports for all the invdividual sass files */
@import 'assets/sass/site.scss';
</style>
