<template>
  <v-footer app absolute class="footer">
    <v-row>
      <v-col cols="12" md="1">
        <div class="logo">
          <Logo />
        </div>
      </v-col>
      <v-spacer />
      <v-col cols="4" md="3" class="quick-links d-flex flex-column">
        <div>Quick Links</div>
        <router-link
          class="router"
          :to="{
            name: 'Home',
            params: { country: currentCountry, region: currentRegion }
          }"
        >
          Home
        </router-link>
        <router-link
          class="router"
          :to="{
            name: 'About',
            params: { country: currentCountry, region: currentRegion }
          }"
        >
          About
        </router-link>
        <router-link
          class="router"
          :to="{
            name: 'Browse',
            params: { country: currentCountry, region: currentRegion }
          }"
        >
          Activities
        </router-link>
      </v-col>
      <v-col cols="8" md="3" class="contact d-flex flex-column">
        Contact Us
        <a href="mailto:info@covidcanidoit.com">info@covidcanidoit.com</a>
        <div class="social mt-5">
          <a href="https://www.facebook.com/covidcanidoit">
            <v-icon small>mdi-facebook</v-icon>
          </a>
          <a href="https://www.instagram.com/covidcanidoit/">
            <v-icon small>mdi-instagram</v-icon>
          </a>
          <a href="https://twitter.com/COVIDCanIDoIt">
            <v-icon small>mdi-twitter</v-icon>
          </a>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "@/assets/ccidi-logo-full.svg";

export default {
  components: {
    Logo
  },
  computed: {
    ...mapGetters(["currentCountry", "currentRegion"])
  }
};
</script>

<style lang="scss" scoped>
.footer {
  font-size: 0.75em;
}

.logo {
  text-align: center;
}

.logo svg {
  height: 100px;
  width: auto;
}
.quick-links,
.contact {
  text-align: right;
}

.social a {
  border: 1px solid grey;
  border-radius: 20px;
  padding: 10px;
  margin: 5px;
}
</style>
