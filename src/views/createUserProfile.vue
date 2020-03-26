<template>
  <div class="about">
    <h1>create a profile page</h1>
    <profile-create searched="true" />
  </div>
</template>
<script>
import profileCreate from "@/components/profileCreate.vue"
export default {
  name: "createUserProfile",
  components: {
    profileCreate
  }
}
</script>
