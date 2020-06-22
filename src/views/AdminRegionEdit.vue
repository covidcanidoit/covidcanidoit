<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1 class="display-2">Editing {{ this.region.shortName }}</h1>
    <v-form>
      <v-container fluid>
        <v-layout>
          <v-flex lg12 md12 sm12 xs12>
            <h2 class="headline">Identifiers</h2>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 md4 m-1>
            <v-text-field
              label="Slug"
              :value="region.slug"
              @input="saveValue('slug', $event)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 m-1>
            <v-text-field
              label="Short Name"
              :value="region.shortName"
              @input="saveValue('shortName', $event)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 m-1>
            <v-text-field
              label="Long Name"
              :value="region.longName"
              @input="saveValue('longName', $event)"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex lg12 md12 sm12 xs12>
            <h2 class="headline">Configuration</h2>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 md4 m-1>
            <v-select
              label="Country"
              :items="countries"
              :value="region.country"
              @input="saveValue('country', $event)"
            />
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex lg12 md12 sm12 xs12>
            <h2 class="headline">Trending Status</h2>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 md4 m-1>
            <v-select
              :items="['good', 'medium', 'bad']"
              label="trending"
              :value="region.trending"
              @input="saveValue('trending', $event)"
            />
          </v-flex>
        </v-layout>

      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/db.js";

export default {
  props: ["slug"],
  async created() {
    if (!this.regions) {
      await this.$store.dispatch("bindRegions");
    }
  },
  computed: {
    ...mapGetters(["regions", "countries"]),
    region() {
      return this.regions[this.slug];
    }
  },
  methods: {
    saveValue(name, value) {
      console.log("saveValue", {name, value});
      db.ref("regions")
        .child(this.slug)
        .child(name)
        .set(value);
    }
  }
};
</script>
