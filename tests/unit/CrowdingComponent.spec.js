import { shallowMount } from "@vue/test-utils";
import CrowdingComponent from "@/components/CrowdingComponent.vue";

describe("CrowdingComponent", () => {
  describe("Methods", () => {
    test("searchLocation should return the search location and set haveSearched to true", () => {
      const data = {
        haveSearched: false,
        selectedTime: 0,
        selectedLocation: "391 Amsterdam Ave",
        time: null
      };

      const wrapper = shallowMount(CrowdingComponent, {
        propsData: data
      });
      expect(data.selectedLocation).toMatchInlineSnapshot(
        `"391 Amsterdam Ave"`
      );
    });
  });

  test("returns correctly", () => {
    const wrapper = shallowMount(CrowdingComponent, {
      props: { busyResults: "", hasSearched: false }
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="crowding-data">
        <div style="display: none;">
          <chart-stub style="display: none;"></chart-stub>
        </div>
      </div>
    `);
  });
});
