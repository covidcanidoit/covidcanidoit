<template>
  <div id="app">
    <img src="@/assets/logo.png" class="logo" align="left" />
    <div id="nav" class="navigation">
      <router-link class="router" to="/">Home</router-link> |
      <router-link class="router" to="/browse">Find An Activity</router-link> |
      <router-link to="/createUserProfile">Profile</router-link> |
      <router-link to="/about">Learn More</router-link>
    </div>
    <div><router-view /></div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logo {
  width: 200px;
  height: 100px;
}

.navigation {
  height: 100px;
  text-align: right;
  padding: 1em;

  a {
    font-weight: bold;
    /* color: #2c3e50; */

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.form-select {
  /* display: inline-block;
  max-width: 100%;
  height: 34px;
  padding-right: 24px; */
  /* background-color: rgb(186, 214, 26); */
  /* background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 8px 10px; */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right 16px center #ddd;

  min-height: 34px;
  min-width: 120px;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  /* color: #24292e; */
  vertical-align: middle;
  /* background-color: rgb(247, 12, 12); */
  /* background-repeat: no-repeat;
  background-position: right 8px center; */
  /* border: 1px solid #d1d5da; */
  border-radius: 30px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
}
</style>
