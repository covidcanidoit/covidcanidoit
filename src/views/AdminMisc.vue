<template>
  <div>
    <h1>Misc Utilities</h1>
    <button @click="loadData">Load data</button>
    <button @click="updateRegionData">Update data</button>

    <h2>Time Series Data (10)</h2>
    <ul>
      <li
        v-for="row in Object.values(timeSeriesData).slice(0, 10)"
        :key="row.UID"
      >
        {{ row }}
      </li>
    </ul>

    <h2>Regions (10)</h2>
    <ul>
      <li v-for="region in regions" :key="region.slug">
        {{ region.slug }}
        {{ region }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Papa from "papaparse";

export default {
  data() {
    return {
      timeSeriesData: {}
    };
  },
  computed: {
    ...mapGetters(["regions"])
  },
  methods: {
    ...mapActions(["updateRegion", "updateAllRegions"]),
    async loadData() {
      // For some reason using Papa.parse(url,...) directly caused a CORS error
      const url =
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv";
      const response = await fetch(url);
      const data = await response.text();
      console.log(data);
      Papa.parse(data, {
        header: true,
        // download: true,
        // step(something) {
        //   console.log({something});
        // },
        complete: data => {
          const today = new Date();
          const todayFormatted = `${today.getMonth() + 1}/${today.getDate() -
            1}/${today.getYear() - 100}`;
          const yesterdayFormatted = `${today.getMonth() +
            1}/${today.getDate() - 2}/${today.getYear() - 100}`;
          console.log("today:", todayFormatted);
          console.log("yesterday:", yesterdayFormatted);

          const cleanedData = {};
          data.data.forEach(row => {
            cleanedData[row.FIPS] = {
              CSSEGISUID: row.UID,
              FIPS: row.FIPS,
              longName: row.Combined_Key,
              confirmedOn: todayFormatted,
              confirmed: row[todayFormatted],
              confirmedPreviousDay: row[yesterdayFormatted]
            };

            // Roll up state-level
            if (!cleanedData[row.Province_State]) {
              cleanedData[row.Province_State] = {
                CSSEGISUID: row.Province_State,
                FIPS: row.Province_State,
                longName: row.Province_State,
                confirmedOn: todayFormatted,
                confirmed: 0,
                confirmedPreviousDay: 0
              };
            }
            cleanedData[row.Province_State].confirmed += parseInt(
              row[todayFormatted]
            );
            cleanedData[row.Province_State].confirmedPreviousDay += parseInt(
              row[yesterdayFormatted]
            );
          });

          this.timeSeriesData = cleanedData;
        }
      });
    },
    updateRegionData() {
      Object.keys(this.regions).forEach(regionSlug => {
        console.log(regionSlug);
        const region = this.regions[regionSlug];
        region.confirmedOn = this.timeSeriesData[region.FIPS].confirmedOn;
        region.confirmed = this.timeSeriesData[region.FIPS].confirmed;
        region.confirmedPreviousDay = this.timeSeriesData[
          region.FIPS
        ].confirmedPreviousDay;
      });
      console.log({ updatedRegions: this.regions });
      this.updateAllRegions(this.regions);
    }
  }
};
</script>
