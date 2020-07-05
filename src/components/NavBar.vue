<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right absolute>
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

    <v-app-bar fixed color="white">
      <div class="logo" v-if="!isHome">
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

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="mobileView" />
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SmallLogo from "@/assets/ccidi-logo-small.svg";

export default {
  components: {
    SmallLogo
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
.logo {
  float: left;
  font-size: 20px;

  .can-i {
    color: $logodark;
  }
}
.hero {
  text-align: center;
}

/* .navigation { */
/*   text-align: right; */
/*  */
/*   a { */
/*     font-weight: bold; */
/*     color: #0f4a5c; */
/*     margin: 0 0.5em; */
/*  */
/*     &.router-link-exact-active { */
/*       color: #8ad4b4; */
/*     } */
/*   } */
/* } */

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
