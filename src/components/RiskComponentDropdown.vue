<template>
  <v-expansion-panel class="riskComponentDropdown">
    <v-expansion-panel-header class="d-flex flex-row">
      <div :class="riskClass" class="componentIconContainer flex-grow-0">
        <slot name="icon" />
      </div>
      <div class="componentHeaderText">
        <div class="componentTitle">{{ title }}</div>
        <div class="componentRiskLabel">
          {{ riskLabel }}
          <v-switch :label="'Do not measure'" />
        </div>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="dropdown-notes">
        <slot name="notes" />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    type: String,
    riskClass: String,
    riskLabel: String,
    description: String,
    title: String
  }
};
</script>

<style scoped lang="scss">
.v-expansion-panel-header {
  padding: 16px 8px;
}

.v-expansion-panel-content {
  padding-left: 0.5em;
}

.componentHeaderText {
  text-align: left;
  margin-left: 1em;
}

.componentTitle {
  font-size: 1.5em;
  font-weight: 900;
  margin-bottom: 0.25em;
}

.componentRiskLabel {
  font-size: 1.25em;
  font-weight: 100;
  color: $color-medgrey;
}
</style>
