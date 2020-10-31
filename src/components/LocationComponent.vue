<template>
  <div class="crowdingBar">
    <v-container
      fluid
      class="crowdingContainer"
      v-show="activity.showLocation == 'TRUE'"
    >
      <v-row dense align="center">
        <v-col cols="12" md="3" style="white-space: nowrap">
          How crowded will it be?
        </v-col>
        <v-col cols="12" md="6">
          <VueGoogleAutocomplete
            classname="busyLocation"
            id="map"
            placeholder="Please enter the activity location"
            @placechanged="getAddressData"
            :enableGeolocation="true"
            :geolocationOptions="{ enableHighAccuracy: false }"
            types="establishment"
          />
        </v-col>
        <v-col cols="12" md="3">
          <button class="busyCheckButton btn-primary" @click="getBusyInfo">
            Check location
          </button>
        </v-col>
      </v-row>
      <v-row v-if="loadingBusyResults || busyResults">
        <v-col>
          <div v-if="loadingBusyResults">Loading...</div>
          <div v-else>
            <div v-if="busyResults" class="d-flex justify-center">
              <div v-if="busyResults == 'error'">Data not available</div>
              <Chart
                v-else-if="busyResults.populartimes"
                :crowdingData="busyResults"
                class="busyChart"
              />
              <div v-else>
                <p>
                  No popular times were found. Please check another activity
                  location.
                </p>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Chart from "@/components/PopularTimesChart";
import VueGoogleAutocomplete from "vue-google-autocomplete";

import axios from "axios";

export default {
  components: {
    Chart,
    VueGoogleAutocomplete
  },
  props: {
    activity: Object
  },
  data() {
    return {
      location: "",
      business: "",
      placeId: undefined,
      busyResults: undefined,
      loadingBusyResults: false
    };
  },
  computed: {},
  methods: {
    async getBusyInfo() {
      this.busyResults = undefined;
      this.loadingBusyResults = true;
      try {
        const locationResults = await axios.get(
          "https://thelackthereof.org/api",
          {
            params: {
              location: this.location,
              name: this.business,
              placeId: this.placeId
            }
          }
        );
        this.busyResults = locationResults.data;
      } catch (e) {
        console.log("error fetching location data");
        console.error(e);
        this.busyResults = "error";
      } finally {
        this.loadingBusyResults = false;
        this.hasSearched = true;
      }
    },
    getAddressData(something, rawSomething) {
      this.placeId = rawSomething.reference;
      this.getBusyInfo();
    }
  }
};
</script>

<style scoped lang="scss">
.crowdingBar {
  background-color: $selectorgray;
  color: white;
  text-align: center;
}

.busyChart {
  background-color: white;
}

.busyLocation {
  background-color: white;
  color: black;
  border-radius: 2em;
  width: 90%;
  padding: 0.5em 1em;
}

.busyCheckButton {
  background-color: $primary;
  color: $selectorgray;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 2em;

  &:hover {
    background-color: $secondary;
    color: $selectorgray;
  }
}
</style>
