<template>
  <div class="score-scale">
    <div class="score-scale-entry" :class="[score == 1 ? 'selected-1' : '']">
      1
    </div>
    <div class="connector"></div>
    <div class="score-scale-entry" :class="[score == 2 ? 'selected-2' : '']">
      2
    </div>
    <div class="connector"></div>
    <div class="score-scale-entry" :class="[score == 3 ? 'selected-3' : '']">
      3
    </div>
    <div class="connector"></div>
    <div class="score-scale-entry" :class="[score == 4 ? 'selected-4' : '']">
      4
    </div>
    <div class="connector"></div>
    <div class="score-scale-entry" :class="[score == 5 ? 'selected-5' : '']">
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

  .selected-1 {
    background-color: #339900;
  }
  .selected-2 {
    background-color: #99cc33;
  }
  .selected-3 {
    background-color: #ffcc00;
  }
  .selected-4 {
    background-color: #ff9966;
  }
  .selected-5 {
    background-color: #cc3300;
  }
}
</style>
