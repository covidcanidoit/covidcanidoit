<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1>Edit User</h1>
    <div class="edit-form">
      Email: {{ user.email }}
      <div class="form-group">
        <label>Is Admin?</label>
        <select
          @input="saveField('isAdmin', $event)"
          class="form-control"
          :value="this.userSetting.isAdmin"
        >
          <option>false</option>
          <option>true</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapState } from "vuex";

export default {
  props: ["userId"],
  computed: {
    ...mapState(["users", "userSettings"]),
    user() {
      return this.users[this.userId];
    },
    userSetting() {
      if (this.userSettings[this.userId]) {
        return this.userSettings[this.userId];
      } else {
        return {
          isAdmin: false
        };
      }
    }
  },
  methods: {
    saveField(name, event) {
      console.log("So... you want to save...", { name, event });
      console.log("New value", event.target.value);
      db.ref("userSettings")
        .child(this.userId)
        .child(name)
        .set(event.target.value == "true");
    }
  }
};
</script>

<style scoped lang="scss">
.edit-form {
  margin: 0 2em;
}
</style>
