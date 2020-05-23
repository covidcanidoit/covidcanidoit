<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1>Edit RiskFactor</h1>
    <div class="edit-form">
      <div class="form-group">
        <label>Name</label>
        <input
          @input="saveField('name', $event)"
          class="form-control"
          type="text"
          :value="this.riskFactor.name"
        />
      </div>
      <div class="form-group">
        <label>icon</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('icon', $event)"
          :value="this.riskFactor.icon"
        />
      </div>
      <div class="form-group">
        <label>description</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('description', $event)"
          :value="this.riskFactor.description"
        />
      </div>
      <div class="form-group">
        <label>shortDescription</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('shortDescription', $event)"
          :value="this.riskFactor.shortDescription"
        />
      </div>
      <div class="form-group">
        <label>longDescription</label>
        <textarea
          class="form-control"
          @input="saveField('longDescription', $event)"
          :value="this.riskFactor.longDescription"
        />
      </div>
      <div class="form-group">
        <label>showWhen</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('showWhen', $event)"
          :value="this.riskFactor.showWhen"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";

export default {
  props: ["name"],
  computed: {
    ...mapGetters(["riskFactors", "currentCountry"]),
    riskFactor() {
      return this.riskFactors[this.name];
    }
  },
  methods: {
    saveField(name, event) {
      console.log("So... you want to save...", { name, event });
      console.log("New value", event.target.value);
      db.ref("content")
        .child(this.currentCountry)
        .child("riskFactors")
        .child(this.name)
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
