<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="profileCreated" to="/userProfile">Profile</router-link>
      <router-link v-else to="/createUserProfile">Create Profile</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    profileCreated() {
      //track if the user has created a profile yet
      return this.$store.getters.createProfile;
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
