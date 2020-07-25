import { shallowMount } from "@vue/test-utils";
import ScoreScale from "@/components/ScoreScale.vue";

describe("ScoreScale", () => {
  test("all score entries have class 'score-scale-entry'", () => {
    const wrapper = shallowMount(ScoreScale);
    expect(wrapper.findAll(".score-scale__entry").length).toEqual(5);
  });

  test("if no score is provided, no score will be selected", () => {
    const wrapper = shallowMount(ScoreScale);
    expect(wrapper.find(".selected").exists()).toBeFalsy();
  });

  test.each([[1], [2], [3], [4], [5]])(
    "returns correctly with score set to 1",
    score => {
      const wrapper = shallowMount(ScoreScale, {
        propsData: { score }
      });

      const selectedScores = wrapper.findAll(".selected");
      expect(selectedScores).toHaveLength(1);
      expect(selectedScores.at(0).classes()).toContain(`score-${score}`);
    }
  );
});
