<template>
  <div class="d-flex flex-column align-stretch suggested-searches">
    <v-container fluid>
      <v-row>
        <v-col class="suggestions-title">
          Example Activities
        </v-col>
      </v-row>
      <v-row>
        <v-col md="2" v-if="getHoliday" class="seasonalEventImage3">
          <SeasonalImage index="3" />
        </v-col>
        <v-col
          md="suggestionsSpan"
          class="or-others d-flex flex-wrap justify-center"
        >
          <button
            v-for="search in searches"
            :key="search"
            @click="quickSearch(search)"
          >
            {{ search }}
          </button>
        </v-col>
        <v-col md="2" v-if="getHoliday" class="seasonalEventImage4">
          <SeasonalImage index="4" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sampleSize } from "lodash";
import getSeasonalEvent from "../utils/seasonalCheck";
import SeasonalImage from "@/components/SeasonalImage";

export default {
  components: {
    SeasonalImage
  },
  data() {
    return {
      searches: []
    };
  },
  created() {
    this.searches = sampleSize(this.availableActivities, 6).map(
      activity => activity.name
    );
  },
  computed: {
    ...mapGetters(["activities"]),
    availableActivities() {
      return Object.values(this.activities).filter(
        activity => !activity.disabled
      );
    },
    getHoliday() {
      return getSeasonalEvent();
    },
    suggestionsSpan() {
      if (this.getHoliday) {
        return 8;
      } else {
        return 12;
      }
    }
  },
  methods: {
    quickSearch(search) {
      this.$emit("searched", search);
    }
  }
};
</script>

<style scoped lang="scss">
.suggested-searches {
  background-color: $secondary;
  text-align: center;
  padding-top: 0.25em;
  padding-bottom: 2em;
}

.or-others {
  button {
    border-radius: 30px;
    border: 1px solid $primary;
    padding: 1em 1.5em;
    background-color: $primary;
    color: black;
    margin: 0.5em 1em;
  }

  button:hover {
    background-color: white;
  }
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .or-others button {
    font-size: 0.75em;
  }
}
.seasonalEventImage3 {
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    display: none;
  }
}
.seasonalEventImage4 {
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    opacity: 0.15;
    position: absolute;
  }
}
</style>
