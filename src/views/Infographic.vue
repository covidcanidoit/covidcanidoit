<template>
  <!-- <Infographic class="infographic" /> -->
  <div class="infographicContainer">
    <!-- <Infographic /> -->
    <img
      :src="
        `${publicPath}images/riskcomponents/CCIDI_infographic_formatted.svg`
      "
      alt="Infographic"
      class="infographic"
    />
  </div>
</template>

<script>
// import Infographic from "@/assets/CCIDI_infographic_formatted.svg";
export default {
  components: {
    // Infographic
  },
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
}
.infographicContainer {
  text-align: center;
}
</style>
