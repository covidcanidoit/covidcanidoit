<template>
  <div class="about">
    <h1><u>Personalized Risk Screener</u></h1>
    <br />
    <profile-create :searched="searched" />
  </div>
</template>
<script>
import profileCreate from "@/components/profileCreate.vue"
export default {
  name: "createUserProfile",
  components: {
    profileCreate
  },
  data: function() {
    return {
      searched: true
    }
  }
}
</script>
