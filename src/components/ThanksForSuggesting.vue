<template>
  <div v-show="NoResultsToShow">
    <div class="container-sm text-center p-5 colorBlock">
      <h2>Thanks for suggesting "{{this.suggested}}" as an activity!</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ["NoResultsToShow","suggested"],
}
</script>

<style scoped>
.colorBlock {
  background-color: #8ad4b4;
}
</style>