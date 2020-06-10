import { shallowMount } from "@vue/test-utils";
import CrowdingComponent from "@/components/CrowdingComponent.vue";

describe("CrowdingComponent", () => {
  const wrapper = shallowMount(CrowdingComponent, {
    props: {busyResults: '', hasSearched: false},
  });

  test("returns correctly", () => {
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="crowding-data">
        <div style="display: none;">
          <chart-stub style="display: none;"></chart-stub>
        </div>
      </div>
    `);
  });
});
