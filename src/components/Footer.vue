<template>
  <div class="footer d-flex mb-5">
    <div class="logo ml-10 mr-auto">
      <Logo />
    </div>
    <div class="quick-links mr-10 d-flex flex-column">
      <div>Quick Links</div>
      <router-link class="router" :to="{ name: 'Home' }">Home</router-link>
      <router-link class="router" :to="{ name: 'About' }">About</router-link>
      <router-link class="router" :to="{ name: 'Browse' }">
        Activities
      </router-link>
    </div>
    <div class="contact d-flex flex-column mr-5">
      Contact Us
      <a href="mailto:info@covidcanidoit.com">info@covidcanidoit.com</a>
      <div class="social mt-5">
        <a href="facebook"><v-icon small>mdi-facebook</v-icon></a>
        <a href="instagram"><v-icon small>mdi-instagram</v-icon></a>
        <a href="twitter"><v-icon small>mdi-twitter</v-icon></a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/assets/ccidi-logo-full.svg";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="scss">
.footer {
  font-size: 0.75em;
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
