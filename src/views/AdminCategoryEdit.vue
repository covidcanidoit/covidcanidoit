<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1>Edit Category</h1>
    <div class="edit-form">
      <div class="form-group">
        <label>Name</label>
        <input
          @input="saveField('name', $event)"
          class="form-control"
          type="text"
          :value="this.category.name"
        />
      </div>
      <div class="form-group">
        <label>icon</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('icon', $event)"
          :value="this.category.icon"
        />
      </div>
      <div class="form-group">
        <label>Short Description</label>
        <input
          type="text"
          class="form-control"
          @input="saveField('shortDescription', $event)"
          :value="this.category.shortDescription"
        />
      </div>
      <div class="form-group">
        <label>Long Description</label>
        <textarea
          class="form-control"
          @input="saveField('longDescription', $event)"
          :value="this.category.longDescription"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";

export default {
  props: ["categoryName"],
  computed: {
    ...mapGetters(["categories", "currentDataset"]),
    category() {
      return this.categories[this.categoryName];
    }
  },
  methods: {
    saveField(name, event) {
      console.log("So... you want to save...", { name, event });
      console.log("New value", event.target.value);
      db.ref("datasets")
        .child(this.currentDataset)
        .child("categories")
        .child(this.categoryName)
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
