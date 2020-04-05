<template>
  <div class="create-user-profile">
    <h1>Personalized Risk Screener</h1>
    <ProfileCreate />
  </div>
</template>

<script>
import ProfileCreate from "@/components/ProfileCreate.vue";
export default {
  components: {
    ProfileCreate
  },
  data: function() {
    return {
      searched: true
    };
  }
};
</script>

<style lang="scss">
.create-user-profile > h1 {
  background-color: $color-teal;
  text-align: center;
  padding: 1em;
  margin: 0;
}
</style>
