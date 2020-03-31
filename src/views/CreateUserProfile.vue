<template>
  <div class="about">
    <h1><u>Personalized Risk Screener</u></h1>
    <br />
    <ProfileCreate
      :searched="searched"
      style="margin-left:30%; margin-right:30%"
    />
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
