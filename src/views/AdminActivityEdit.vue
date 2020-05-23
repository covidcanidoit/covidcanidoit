<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1>Edit Activity</h1>
    Current key: {{ currentKey }}
    <div class="edit-form">
      <div class="form-group">
        <label>slug</label>
        <input
          @input="saveField('slug', $event)"
          class="form-control"
          type="text"
          :value="this.activity.slug"
        />
      </div>
      <div class="form-group">
        <label>activityName</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('activityName', $event)"
          :value="this.activity.activityName"
        />
      </div>
      <div class="form-group">
        <label>searchActivityName</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('searchActivityName', $event)"
          :value="this.activity.searchActivityName"
        />
      </div>
      <div class="form-group">
        <label>activitykeywords</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('activitykeywords', $event)"
          :value="this.activity.activitykeywords"
        />
      </div>
      <div class="form-group">
        <label>category</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('category', $event)"
          :value="this.activity.category"
        />
      </div>
      <div class="form-group">
        <label>showLocation</label>
        <select
          class="form-control"
          @input="saveField('showLocation', $event)"
          :value="this.activity.showLocation"
        >
          <option>FALSE</option>
          <option>TRUE</option>
        </select>
      </div>
      <div class="form-group">
        <label>extraRiskDescription</label>
        <textarea
          class="form-control"
          @input="saveField('extraRiskDescription', $event)"
          :value="this.activity.extraRiskDescription"
        />
      </div>
      <div class="form-group">
        <label>generalRiskScore</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('generalRiskScore', $event)"
          :value="this.activity.generalRiskScore"
        />
      </div>
      <div class="form-group">
        <label>risk50To69</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('risk50To69', $event)"
          :value="this.activity.risk50To69"
        />
      </div>
      <div class="form-group">
        <label>riskOver70</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('riskOver70', $event)"
          :value="this.activity.riskOver70"
        />
      </div>
      <div class="form-group">
        <label>reference1</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference1', $event)"
          :value="this.activity.reference1"
        />
      </div>
      <div class="form-group">
        <label>reference2</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference2', $event)"
          :value="this.activity.reference2"
        />
      </div>
      <div class="form-group">
        <label>reference3</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference3', $event)"
          :value="this.activity.reference3"
        />
      </div>
      <div class="form-group">
        <label>reference4</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference4', $event)"
          :value="this.activity.reference4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";

export default {
  props: ["slug", "activityName"],
  data() {
    return {
      currentKey: undefined
    };
  },
  created() {
    this.lookupActivity();
  },
  computed: {
    ...mapGetters(["activities", "currentCountry"]),
    activity() {
      return this.activities[this.currentKey];
    }
  },
  methods: {
    saveField(name, event) {
      console.log("So... you want to save...", { name, event });
      console.log("New value", event.target.value);
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(this.currentKey)
        .child(name)
        .set(event.target.value);
    },
    // saveField(field, event) {
    //
    // },
    lookupActivity() {
      console.log({ activities: this.activities });
      console.log({ keys: Object.keys(this.activities) });
      this.currentKey = Object.keys(this.activities).find(
        key => this.activities[key].activityName === this.activityName
      );
      console.log({ key: this.currentKey });
    }
  }
};
</script>

<style scoped lang="scss">
.edit-form {
  margin: 0 2em;
}
</style>
