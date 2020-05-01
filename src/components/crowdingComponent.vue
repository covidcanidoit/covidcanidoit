<template>
  <div class="crowding-data">
    <form>
      <label for="location">Location:</label>
      <input type="text" id="location" name="location" /><br /><br />
      <select class="form-select" v-bind:selectedTime="selectedTime">
        <option
          v-for="(time, index) in times"
          :key="index"
          :selectedTime="time"
        >
          {{ time }}
        </option>
      </select>
      <button type="button" @click="searchLocation">Submit</button>
    </form>
    <div v-show="haveSearched">
      <Chart />
      <!-- <Chart :crowdingData="" /> -->
    </div>
  </div>
</template>

<script>
import Chart from "@/components/PopularTimesChart";
export default {
  components: {Chart},
  props: {},
  data() {
    return {
      haveSearched: false,
      selectedTime: 0,
      selectedLocation: null,
      times: [
        "1:00 AM",
        "2:00 AM",
        "3:00 AM",
        "4:00 AM",
        "5:00 AM",
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
        "10:00 PM",
        "11:00 PM",
        "12:00 AM"
      ]
    };
  },
  computed: {},
  methods: {
    searchLocation() {
      this.selectedLocation = document.getElementById("location").value;
      console.log("searched: ", this.selectedLocation, " at ", this.times[this.selectedTime]);
      this.haveSearched = true;
    }
  }
};
</script>

<style scoped lang="scss"></style>
