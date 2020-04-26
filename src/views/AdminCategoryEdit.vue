<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1>Edit RiskLevel</h1>
    <div class="edit-form">
      <div class="form-group">
        <label>Score</label>
        <input
          @input="saveField('riskScore', $event)"
          class="form-control"
          type="text"
          :value="this.riskLevel.riskScore"
        />
      </div>
      <div class="form-group">
        <label>Name</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('riskName', $event)"
          :value="this.riskLevel.riskName"
        />
      </div>
      <div class="form-group">
        <label>Color</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('color', $event)"
          :value="this.riskLevel.color"
        />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea
          class="form-control"
          @input="saveField('longDescription', $event)"
          :value="this.riskLevel.longDescription"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";

export default {
  props: ["riskScore"],
  computed: {
    ...mapGetters(["riskLevels"]),
    riskLevel() {
      return this.riskLevels[this.riskScore - 1];
    }
  },
  methods: {
    saveField(name, event) {
      console.log("So... you want to save...", { name, event });
      console.log("New value", event.target.value);
      db.ref("content/riskLevels")
        .child(this.riskScore - 1)
        .child(name)
        .set(event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.edit-form {
  margin: 0 2em;
}
</style>
