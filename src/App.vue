<template>
  <v-app>
    <NavBar />
    <router-view />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap");

body {
  background-color: #ccc;
}

#app {
  font-family: "Comfortaa", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: white;

  max-width: 1024px;
  margin: 0 auto;
  border: 1px solid $color-lightgrey;
}

</style>
