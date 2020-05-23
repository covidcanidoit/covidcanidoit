<template>
  <div>
    <div class="container-sm text-center p-5 colorBlock">
      <h2>Thanks for suggesting "{{ this.suggested }}" as an activity!</h2>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";

export default {
  props: ["suggested"],
  computed: {
    ...mapGetters(["currentCountry", "suggestions"])
  },
  methods: {
    save() {
      //let count = 0;
      db.ref("suggestions")
        .child(this.currentCountry)
        .child("activitySuggestions")
        .child(this.suggested)
        .child("count")
        .once("value")
        .then(this.saveInner);
    },
    saveInner(snapshot) {
      if (!snapshot) return;
      let count = snapshot.val();
      console.log(this.suggested, " : ", count);

      db.ref("suggestions")
        .child(this.currentCountry)
        .child("activitySuggestions")
        .child(this.suggested)
        .child("count")
        .set(count + 1);
    }
  },
  watch: {
    suggested: "save"
  },
  mounted() {
    this.save();
  }
};
</script>

<style scoped>
.colorBlock {
  background-color: #8ad4b4;
}
</style>
