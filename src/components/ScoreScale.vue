<template>
  <div class="score-scale">
    <div
      class="score-scale-entry"
      :class="[score == 1 ? 'selected selected-1' : '']"
    >
      1
    </div>
    <div class="connector"></div>
    <div
      class="score-scale-entry"
      :class="[score == 2 ? 'selected selected-2' : '']"
    >
      2
    </div>
    <div class="connector"></div>
    <div
      class="score-scale-entry"
      :class="[score == 3 ? 'selected selected-3' : '']"
    >
      3
    </div>
    <div class="connector"></div>
    <div
      class="score-scale-entry"
      :class="[score == 4 ? 'selected selected-4' : '']"
    >
      4
    </div>
    <div class="connector"></div>
    <div
      class="score-scale-entry"
      :class="[score == 5 ? 'selected selected-5' : '']"
    >
      5
    </div>
  </div>
</template>

<script>
export default {
  props: ["score"]
};
</script>

<style lang="scss">
.score-scale {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  vertical-align: middle;

  .score-scale-entry {
    // background-color: $color-medgrey;
    color: black;
    border: 2px solid $color-darkgrey;
    border-radius: 16px;
    width: 32px;
    height: 32px;
    line-height: 30px;
    text-align: center;
  }

  .connector {
    height: 2px;
    line-height: 2px;
    background-color: $color-darkgrey;
    width: 10px;
  }

  .selected {
    border-radius: 30px;
    width: 60px;
    height: 60px;
    line-height: 58px;
    font-size: 2em;
    color: white;
  }
  $gogreen: #37b34a;
  $pausegreen: #98ca3c;
  $cautionyellow: #faaf40;
  $warningorange: #f89961;
  $stopred: #d03727;

  .selected-1 {
    background-color: $gogreen;
  }
  .selected-2 {
    background-color: $pausegreen;
  }
  .selected-3 {
    background-color: $cautionyellow;
  }
  .selected-4 {
    background-color: $warningorange;
  }
  .selected-5 {
    background-color: $stopred;
  }
}
</style>
