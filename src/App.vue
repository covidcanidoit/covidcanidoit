<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      :disable-resize-watcher="true"
    >
      <v-list dense>
        <v-list-item link>
          <router-link
            class="router"
            :to="{
              name: 'Home',
              params: { country: currentCountry, region: currentRegion }
            }"
          >
            Home
          </router-link>
        </v-list-item>
        <v-list-item link>
          <router-link
            class="router"
            :to="{
              name: 'About',
              params: { country: currentCountry, region: currentRegion }
            }"
          >
            About
          </router-link>
        </v-list-item>
        <v-list-item link>
          <router-link
            class="router"
            :to="{
              name: 'Browse',
              params: { country: currentCountry, region: currentRegion }
            }"
          >
            Activities
          </router-link>
        </v-list-item>
        <v-list-item link>
          <router-link
            class="router"
            :to="{
              name: 'Home',
              params: { country: currentCountry, region: currentRegion }
            }"
          >
            <v-icon>mdi-magnify</v-icon>
          </router-link>
        </v-list-item>
        <v-list-item>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" aria-label="Select country">
                <img :src="`${publicPath}images/flag/${currentCountry}.png`" />
                {{ currentCountry }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="country in countrySlugs"
                :key="country"
                @click="setCurrentCountry(country)"
              >
                <img :src="`${publicPath}images/flag/${country}.png`" />
                {{ country }}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
        <v-list-item>
          <v-menu v-if="regionSlugs.length > 1">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" aria-label="Select region">
                {{ currentRegion }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="region in regionSlugs"
                :key="region"
                @click="setCurrentRegion(region)"
              >
                {{ region }}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <div>
        <SmallLogo style="height: 2em; width: auto" />
        COVID
        <span class="can-i">Can I Do It?</span>
      </div>

      <v-spacer />

      <div v-if="!mobileView" class="d-flex align-center">
        <router-link
          class="router mx-3"
          :to="{
            name: 'Home',
            params: { country: currentCountry, region: currentRegion }
          }"
        >
          Home
        </router-link>
        <router-link
          class="router mx-3"
          :to="{
            name: 'About',
            params: { country: currentCountry, region: currentRegion }
          }"
        >
          About
        </router-link>
        <router-link
          class="router mx-3"
          :to="{
            name: 'Browse',
            params: { country: currentCountry, region: currentRegion }
          }"
        >
          Activities
        </router-link>
        <router-link
          class="router mx-3"
          :to="{
            name: 'Home',
            params: { country: currentCountry, region: currentRegion }
          }"
        >
          <v-icon>mdi-magnify</v-icon>
        </router-link>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" aria-label="Select country">
              <img :src="`${publicPath}images/flag/${currentCountry}.png`" />
              {{ currentCountry }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="country in countrySlugs"
              :key="country"
              @click="setCurrentCountry(country)"
            >
              <img :src="`${publicPath}images/flag/${country}.png`" />
              {{ country }}
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-if="regionSlugs.length > 1">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" aria-label="Select region">
              {{ currentRegion }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="region in regionSlugs"
              :key="region"
              @click="setCurrentRegion(region)"
            >
              {{ region }}
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-app-bar-nav-icon
        class="d-block d-md-none"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "@/components/Footer.vue";
import SmallLogo from "@/assets/ccidi-logo-small.svg";

export default {
  components: {
    SmallLogo,
    Footer
  },
  data() {
    return {
      drawer: false,
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    ...mapGetters([
      "countrySlugs",
      "activitySuggestions",
      "currentCountry",
      "currentRegion",
      "regionSlugs"
    ]),
    isHome() {
      return this.$route.name == "Home";
    },
    mobileView() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    setCurrentCountry(country) {
      this.$store.dispatch("changeCountry", country);
    },
    setCurrentRegion(region) {
      this.$store.dispatch("changeRegion", region);
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

  /* max-width: 1024px; */
  /* margin: 0 auto;
  border: 1px solid $color-lightgrey; */
}
</style>
