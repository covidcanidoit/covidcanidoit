<template>
  <div class="create-user-profile">
    <div class="header">
      <h1>Personalized Risk Screener</h1>
      <p>With a few more details, we can provide customized risk level scores</p>
      <router-link
        class="skip-link"
        tag="button"
        v-if="search"
        :to="{ name: 'Home', params: { search: search, skipProfile: true }}">
          Skip
          <i class="fas fa-angle-double-right"></i>
      </router-link>
      <div class="clear"></div>
    </div>
    <ProfileCreate :search="search" />
  </div>
</template>

<script>
import ProfileCreate from "@/components/ProfileCreate.vue";
export default {
  components: {
    ProfileCreate
  },
  props: ["search"]
};
</script>

<style lang="scss">
.create-user-profile .header {
  background-color: $color-teal;
  text-align: center;
  padding: 1em;
  margin: 0;
  font-size: 15px;
  
  h1 {
    font-size: 1.5em;
  }

  .skip-link {
    border: 1px solid black;
    // background-color: $color-peach;
    width: 10em;
    padding: 5px 20px;
    text-align: center;
    float: right;
  }
  .clear {
    clear: both;
  }
}
</style>
