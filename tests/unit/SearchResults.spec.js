import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import SearchResults from "@/components/SearchResults.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("SearchResults", () => {
  describe("riskScore calculation", () => {
    const regions = () => ({
      all: {
        trending: "bad",
        slug: "all"
      },
      regionGood: {
        trending: "good",
        slug: "regionGood"
      },
      regionBad: {
        trending: "bad",
        slug: "regionBad"
      },
      regionMedium: {
        trending: "medium",
        slug: "regionMedium"
      },
      regionNoTrending: {
        slug: "regionNoTrending"
      },
      regionInvalidTrending: {
        trending: "none",
        slug: "regionInvalidTrending"
      }
    });

    const riskLevels = () => ({
      riskLevel1: {
        color: "",
        longDescription: "",
        riskName: "Low",
        riskScore: "1"
      },
      riskLevel2: {
        color: "",
        longDescription: "",
        riskName: "Moderate",
        riskScore: "2"
      },
      riskLevel3: {
        color: "",
        longDescription: "",
        riskName: "Elevated",
        riskScore: "3"
      },
      riskLevel4: {
        color: "",
        longDescription: "",
        riskName: "High",
        riskScore: "4"
      },
      riskLevel5: {
        color: "",
        longDescription: "",
        riskName: "Critical",
        riskScore: "5"
      }
    });

    test.each([
      ["all", true, "1"],
      ["regionGood", true, "2"],
      ["regionMedium", true, "3"],
      ["regionBad", true, "4"],
      ["regionNoTrending", true, "1"],
      ["regionInvalidTrending", true, "1"],
      ["all", false, "1"],
      ["regionGood", false, "1"],
      ["regionMedium", false, "1"],
      ["regionBad", false, "1"],
      ["regionNoTrending", false, "1"],
      ["regionInvalidTrending", false, "1"]
    ])(
      "when region is %p, activity has trending scores: %p, riskScore is %p",
      (region, activityHasTrending, expected) => {
        const activity = {
          activityName: "Test activity",
          generalRiskScore: "1",
          slug: "test-activity",
          ...(activityHasTrending && {
            TrendBadRiskScore: "4",
            TrendGoodRiskScore: "2",
            TrendMediumRiskScore: "3"
          })
        };

        const getters = {
          currentRegion: () => region,
          regions,
          riskLevels,
          riskFactors: () => {}
        };
        const store = new Vuex.Store({ getters });

        const wrapper = shallowMount(SearchResults, {
          localVue,
          store,
          propsData: { activity: activity }
        });
        expect(wrapper.vm.riskScore).toBe(expected);
      }
    );
  });
});
