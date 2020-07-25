<template functional>
  <v-row class="risk-component" justify="center">
    <v-col cols="2" md="12">
      <slot name="icon" />
    </v-col>
    <v-col cols="6" md="12">
      <div class="componentTitle">{{ props.title }}</div>
      <div class="componentRiskLabel">{{ props.riskLabel }}</div>
      <slot name="notes" />
    </v-col>
  </v-row>
</template>
