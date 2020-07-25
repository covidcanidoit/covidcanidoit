<template functional>
  <div class="score-scale">
    <div v-for="n in 5" :key="n" class="score-scale__entry-wrapper">
      <div
        class="score-scale__entry"
        :class="`score-${n} ${props.score == n ? 'selected' : ''}`"
      >
        <span>{{ n }}</span>
      </div>
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
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  text-align: center;
  font-size: 1.5em;

  .score-scale__entry-wrapper {
    display: flex;
    align-items: center;
    &:not(:last-child):after {
      content: "";
      height: 2px;
      background-color: $color-medgrey;
      width: 0.75em;
    }
  }

  .score-scale__entry {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-medgrey;
    border: 2px solid $color-medgrey;
    border-radius: 100%;
    width: 1.5em;
    height: 1.5em;
  }

  .selected {
    border: none;
    width: 2.5em;
    height: 2.5em;
    color: white;

    &.score-1 {
      background-color: $gogreen;
    }
    &.score-2 {
      background-color: $pausegreen;
    }
    &.score-3 {
      background-color: $cautionyellow;
    }
    &.score-4 {
      background-color: $warningorange;
    }
    &.score-5 {
      background-color: $stopred;
    }
  }
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .score-scale {
    font-size: 3em;
  }
}
</style>
