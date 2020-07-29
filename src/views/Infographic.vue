<template>
  <v-container>
    <v-layout row align-center justify-center>
      <v-flex>
        <div class="infographicContainer">
          <img
            :src="
              `${publicPath}images/riskcomponents/CCIDI_infographic_mobile_compressed.svg`
            "
            alt="Infographic"
            class="infographic"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>
<style lang="scss" scoped>
.infographic {
  margin: 0 auto;
  max-width: 100%;
}
.infographicContainer {
  text-align: center;
}
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap");
</style>
