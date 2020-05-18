<template>
  <div v-show="NoResultsToShow">
    <div class="container-sm text-center p-5 colorBlock">
      <h2>Thanks for suggesting "{{this.suggested}}" as an activity!</h2>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";

export default {
  props: ["NoResultsToShow","suggested"],
  computed: {
    ...mapGetters(["currentCountry","suggestions"]),
  },
  mounted() {
    if (!this.suggestions) {
        db.ref("suggestions");
      }
      if (!this.suggestions[this.currentCountry]) {
        db.ref("suggestions").child(this.currentCountry);
        this.suggestions[this.currentCountry] = {};
      }
      if (!this.suggestions[this.currentCountry]["activitySuggestions"]) {
        db.ref("suggestions").child(this.currentCountry).child("activitySuggestions");
        this.suggestions[this.currentCountry]["activitySuggestions"] = {};
      }
      if (this.suggestions[this.currentCountry]["activitySuggestions"][this.suggested] === null) {
        db.ref("suggestions").child(this.currentCountry).child("activitySuggestions").child(this.suggested).child("count").set(1);
      }
      else {
        let count;
        if (!this.suggestions[this.currentCountry]["activitySuggestions"][this.suggested]) count = 0;
        else count = this.suggestions[this.currentCountry]["activitySuggestions"][this.suggested].count;
        db.ref("suggestions").child(this.currentCountry).child("activitySuggestions").child(this.suggested).child("count").set(count+1);
      }
  }
}
</script>

<style scoped>
.colorBlock {
  background-color: #8ad4b4;
}
</style>