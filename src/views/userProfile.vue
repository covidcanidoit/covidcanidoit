<template>
  <div class="about">
    <u><h1>My Profile:</h1></u>
    <router-link to="/createUserProfile">Edit Profile</router-link>
    <table class="table table-bordered">
      <tr>
        <td>Question</td>
        <td>Answer</td>
      </tr>
      <tr>
        <td>Age</td>
        <td>{{ userProfile.age }}</td>
      </tr>
      <tr>
        <td>Smoking Status</td>
        <td>{{ userProfile.smoking }}</td>
      </tr>
      <tr>
        <td>Comorbidity Present</td>
        <td>{{ userProfile.comorbidity }}</td>
      </tr>
      <tr>
        <td>Pregnancy Status</td>
        <td>{{ userProfile.pregnant }}</td>
      </tr>
      <tr>
        <td>Do you feel sick?</td>
        <td>{{ userProfile.feelSick }}</td>
      </tr>
      <tr>
        <td>Does a family memeber feel sick?</td>
        <td>{{ userProfile.familySick }}</td>
      </tr>
      <tr>
        <td>COVID-19 (coronavirus) Status</td>
        <td>{{ userProfile.COVIDpositive }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "userProfile",
  data: function() {
    return {
      userProfile: {}
    };
  },
  mounted() {
    this.userProfile = this.$store.getters.submitProfile;
    console.log("userProfile");
    console.log(this.userProfile);
  },
  methods: {}
};
</script>

<style scoped>
.table {
  width: 75%;
  margin-left: 12.5%;
  margin-right: 12.5%;
}
</style>
