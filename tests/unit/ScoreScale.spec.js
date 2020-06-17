import { shallowMount } from "@vue/test-utils";
import ScoreScale from "@/components/ScoreScale.vue";

describe("ScoreScale", () => {
  test("returns with class `connector`", () => {
    const wrapper = shallowMount(ScoreScale);
    expect(wrapper.findAll(".connector").length).toEqual(4);
  });

  test("returns with class `score-scale-entry", () => {
    const wrapper = shallowMount(ScoreScale);
    expect(wrapper.findAll(".score-scale-entry").length).toEqual(5);
  });

  test("returns correctly without set score", () => {
    const wrapper = shallowMount(ScoreScale);
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="score-scale">
        <div class="score-scale-entry">
          1
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          2
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          3
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          4
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          5
        </div>
      </div>
    `);
  });

  test("returns correctly with score set to 1", () => {
    const wrapper = shallowMount(ScoreScale, {
      propsData: { score: 1 }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="score-scale">
        <div class="score-scale-entry selected-1">
          1
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          2
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          3
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          4
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          5
        </div>
      </div>
    `);
  });

  test("returns correctly with score set to 2", () => {
    const wrapper = shallowMount(ScoreScale, {
      propsData: { score: 2 }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="score-scale">
        <div class="score-scale-entry">
          1
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry selected-2">
          2
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          3
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          4
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          5
        </div>
      </div>
    `);
  });

  test("returns correctly with score set to 3", () => {
    const wrapper = shallowMount(ScoreScale, {
      propsData: { score: 3 }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="score-scale">
        <div class="score-scale-entry">
          1
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          2
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry selected-3">
          3
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          4
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          5
        </div>
      </div>
    `);
  });

  test("returns correctly with score set to 4", () => {
    const wrapper = shallowMount(ScoreScale, {
      propsData: { score: 4 }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="score-scale">
        <div class="score-scale-entry">
          1
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          2
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          3
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry selected-4">
          4
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          5
        </div>
      </div>
    `);
  });

  test("returns correctly with score set to 5", () => {
    const wrapper = shallowMount(ScoreScale, {
      propsData: { score: 5 }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="score-scale">
        <div class="score-scale-entry">
          1
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          2
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          3
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry">
          4
        </div>
        <div class="connector"></div>
        <div class="score-scale-entry selected-5">
          5
        </div>
      </div>
    `);
  });
});
