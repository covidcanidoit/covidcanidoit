<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1>Edit Banner</h1>
    <div class="edit-form">
      <div class="form-group">
        <label>Text</label>
        <input
          @input="saveField('text', $event)"
          class="form-control"
          type="text"
          :value="this.banner.text"
        />
      </div>
      <div class="form-group">
        <label>Link</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('link', $event)"
          :value="this.banner.link"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["banner", "currentDataset"]),
    bannerContent() {
      return this.banner[this.text];
    }
  },
  methods: {
    saveField(name, event) {
      db.ref("datasets")
        .child(this.currentDataset)
        .child("banner")
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
