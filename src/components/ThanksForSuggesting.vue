<template>
  <div v-show="NoResultsToShow">
    <div class="container-sm text-center m-5">
      <span>Thanks for suggesting this activity!</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["NoResultsToShow"]
}
</script>

<style scoped>

</style>