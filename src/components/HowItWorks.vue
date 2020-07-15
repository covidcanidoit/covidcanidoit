<template>
  <div class="how-it-works">
    <h1>How "COVID Can I Do It" Works</h1>
    <h2>The Risk Score</h2>
    <ul>
      <li>
        COVID-19, aka coronavirus, is a new virus that the public health and
        medical community is
        <b>still learning about.</b>
      </li>
      <li>
        Our team reviewed
        <b>public comments</b>
        made by infectious disease experts and, when available,
        <b>published scientific literature</b>
        , to assess the
        <b>potential risk of getting and spreading</b>
        COVID-19 posed by doing common, everyday things.
      </li>
      <li>
        Two independent
        <b>reviewers</b>
        rated the overall risk of each activity and for seven specific age
        groups.
      </li>
      <li>
        These ratings were
        <b>independently reviewed</b>
        by a panel of experts and revised based on their comments and feedback.
      </li>
      <li>
        These ratings reflect what we know about risk associated with doing any
        activity and are reviewed each week to reflect
        <b>changing research</b>
        on COVID-19.
      </li>
    </ul>
    <!-- <p>image placeholder</p> -->

    <!-- <h2>Personalized Suggestions</h2>
    <p>
      By providing some additional information with the tool, the tool can
      provide additional, personalized suggestions.
    </p>-->
  </div>
</template>

<style lang="scss">
.how-it-works {
  padding: 5em;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    padding: 2em;
  }

  // background-color: $color-salmon;
  // color: $color-peach;
  // background-color: #ccc;
  color: #333;
  font-size: 16px;

  b {
    font-weight: bolder;
  }

  h1 {
    font-size: 1.5em;
  }

  h2 {
    font-size: 1.25em;
  }
}
</style>
