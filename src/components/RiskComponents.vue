<template>
  <v-container v-if="hasRiskData">
    <v-row v-if="onMediumandUp">
      <v-col cols="12" md="3" class="crowding">
        <RiskComponent :activity="activity" type="crowding"></RiskComponent>
      </v-col>
      <v-col cols="12" md="3" class="droplets" :class="maybeSeparator">
        <RiskComponent :activity="activity" type="droplets"></RiskComponent>
      </v-col>
      <v-col cols="12" md="3" class="exposureTime" :class="maybeSeparator">
        <RiskComponent :activity="activity" type="exposureTime"></RiskComponent>
      </v-col>
      <v-col cols="12" md="3" class="ventilation" :class="maybeSeparator">
        <RiskComponent :activity="activity" type="ventilation"></RiskComponent>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="!onMediumandUp">
      <v-col cols="12" sm-and-down>
        <v-expansion-panels flat>
          <RiskComponentDropdown
            :activity="activity"
            type="crowding"
          ></RiskComponentDropdown>
          <RiskComponentDropdown
            :activity="activity"
            type="droplets"
          ></RiskComponentDropdown>
          <RiskComponentDropdown
            :activity="activity"
            type="exposureTime"
          ></RiskComponentDropdown>
          <RiskComponentDropdown
            :activity="activity"
            type="ventilation"
          ></RiskComponentDropdown>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RiskComponent from "@/components/RiskComponent.vue";
import RiskComponentDropdown from "@/components/RiskComponentDropdown.vue";

export default {
  components: {
    RiskComponent,
    RiskComponentDropdown
  },
  props: {
    activity: Object
  },
  computed: {
    hasRiskData() {
      return (
        this.activity.dropletsNotes &&
        this.activity.exposureTimeNotes &&
        this.activity.crowdingNotes &&
        this.activity.ventilationNotes
      );
    },
    maybeSeparator() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "left-border";
      } else {
        return "top-border";
      }
    },
    onMediumandUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  },
  methods: {},
  mounted() {
    //console.log("MY ACTIVITY: ",this.activity);
  }
};
</script>

<style scoped lang="scss">
.left-border {
  border-left: 1px solid $color-lightgrey;
}
.top-border {
  border-top: 1px solid $color-lightgrey;
}
</style>
