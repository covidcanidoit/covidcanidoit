<template>
  <v-app>
    <div id="nav" class="navigation">
      <router-link class="router" :to="{ name: 'Home' }">
        <img src="@/assets/logo.png" class="logo" align="left" />
      </router-link>
      <router-link class="router" :to="{ name: 'Home' }">Home</router-link> |
      <router-link class="router" :to="{ name: 'Browse' }"
        >Find An Activity</router-link
      >
      | <router-link :to="{ name: 'CreateUserProfile' }">Profile</router-link> |
      <router-link :to="{ name: 'About' }">Learn More</router-link>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" aria-label="Select country">
            <img :src="`${publicPath}images/flag/${currentCountry}.png`" />
            {{ currentCountry }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="country in countries"
            :key="country"
            @click="setCurrentCountry(country)"
          >
            <img :src="`${publicPath}images/flag/${country}.png`" />
            {{ country }}
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div><router-view /></div>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    ...mapState(["currentCountry"]),
    ...mapGetters(["countries","activitySuggestions"])
  },
  async created() {
    console.log("Loading content from Firebase");
    this.$store.dispatch("bindContent");
    this.$store.dispatch("bindSuggestions");
    this.$store.dispatch("changeCountry", this.$store.state.currentCountry);
  },
  methods: {
    setCurrentCountry(country) {
      this.$store.dispatch("changeCountry", country);
    }
  },
  watch: {
    currentCountry() {
      this.$router
        .replace({ params: { country: this.currentCountry } })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

body {
  background-color: #ccc;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: white;

  max-width: 1024px;
  margin: 0 auto;
  border: 1px solid $color-lightgrey;
}

.logo {
  width: 200px;
  height: 100px;
  margin: 0;
}

.navigation {
  height: 100px;
  text-align: right;

  a {
    font-weight: bold;
    color: #0f4a5c;

    &.router-link-exact-active {
      color: #8ad4b4;
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
