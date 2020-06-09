import { shallowMount } from "@vue/test-utils";
import ScoreScale from "@/components/ScoreScale.vue";

describe('ScoreScale', () => {
  const wrapper = shallowMount(ScoreScale);

  test('renders with class `connector`', () => {
    expect(wrapper.findAll('.connector').length).toEqual(4)
  })

  test('renders with class `score-scale-entry', () => {
    expect(wrapper.findAll('.score-scale-entry').length).toEqual(5)
  })
})