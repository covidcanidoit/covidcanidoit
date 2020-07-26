import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import SearchResults from "@/components/SearchResults.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("SearchResults", () => {
  describe("riskScore calculation", () => {
    const regions = () => ({
      all: {
        trending: "poor",
        slug: "all"
      },
      regionBetter: {
        trending: "better",
        slug: "regionBetter"
      },
      regionPoor: {
        trending: "poor",
        slug: "regionPoor"
      },
      regionCaution: {
        trending: "caution",
        slug: "regionCaution"
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
      ["all", "4"],
      ["regionBetter", "2"],
      ["regionCaution", "3"],
      ["regionPoor", "4"],
      ["regionNoTrending", "4"],
      ["regionInvalidTrending", "4"]
    ])("when region is %p, activity has riskScore %p", (region, expected) => {
      const activity = {
        name: "Test activity",
        slug: "test-activity",
        riskScore: {
          poor: "4",
          caution: "3",
          better: "2"
        }
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
    });
  });
});
