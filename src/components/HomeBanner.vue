<template>
  <div>
    <a :href="this.banner.link" target="_blank">
      <v-alert class="banner" color="$secondary">
        {{ this.banner.text }} &gt;&gt;&gt;
      </v-alert>
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["banner"]),
    bannerContent() {
      return this.banner[this.text];
    }
  }
};
</script>

<style scoped lang="scss">
.banner {
  text-align: center;
  background-color: $primary;
  color: black;
  font-size: 0.75em;
}
</style>
