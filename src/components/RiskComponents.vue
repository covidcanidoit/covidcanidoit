<template>
   <v-container >
    <v-row>
      <!-- Crowding --> 
      <v-col>
        <RiskComponent :activity="activity" type="crowding" ></RiskComponent>
      </v-col>
      <v-col>
        <RiskComponent :activity="activity" type="droplets" ></RiskComponent>
      </v-col>
      <v-col>
        <RiskComponent :activity="activity" type="exposureTime" ></RiskComponent>
      </v-col>
      <v-col>
        <RiskComponent :activity="activity" type="ventilation" ></RiskComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RiskComponent from "@/components/RiskComponent.vue";

export default {
  components: {
    RiskComponent
  },
  props: {
    activity: Object
  },
  computed: {
    
  },
  methods: {
  },
  mounted() {
    //console.log("MY ACTIVITY: ",this.activity);
  }
}
</script>

<style scoped>

</style>