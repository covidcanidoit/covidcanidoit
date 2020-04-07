<template>
  <div class="about">
    <!-- <HowItWorks /> -->
    <div class="info">
      <table class="table">
        <tr>
          <th>What you shared:</th>
          <th>What the tool can tell you:</th>
          <th>How the tool knows:</th>
        </tr>
        <tr>
          <td>The location and time that you do certain activities.</td>
          <td>
            Whether it’s crowded at that time and location <br />Suggest
            alternative times that reduce crowding risk.
          </td>
          <td>
            The tool uses Google Maps data which tracks location-specific
            popularity and wait times to estimate whether a place is busy and
            let you know that it might be too busy to go.
          </td>
        </tr>
        <tr>
          <td>
            Whether you have been diagnosed with additional diseases/conditions.
          </td>
          <td>
            Whether your comorbidity increases your risk of developing severe
            illness.
            <br />
            Suggest that you take additional precautions, including avoiding
            public and more crowded places.
            <br />
            Suggest that you find alternative, lower risk ways of accomplishing
            your daily tasks.
          </td>
          <td>
            Research has shown that having one or more specific
            diseases/conditions can increase your risk of developing severe
            illness. The tool summarizes recommendations from health authorities
            when you share your disease/medical condition information with us.
          </td>
        </tr>
      </table>
    </div>

    <br />
    <b><u>Who Are We?</u></b>
    <br />
    <p align="left">
      We are an independent and multi-disciplinary team. Our core development
      team is comprised of:
    </p>
    <p></p>
    <ul align="left">
      <li>Jarjieh Fang: Link to Bio <a href="https://www.linkedin.com/in/jarjiehfang/">(LinkedIn)</a></li>
      <li>Gayatri Sanku: Link to Bio <a href="https://www.linkedin.com/in/gayatri-sanku-16212a4/">(LinkedIn)</a></li>
      <li>Grant Hussey: Link to Bio <a href="https://www.linkedin.com/in/grant-hussey-a9854bb4/">(LinkedIn)</a></li>
      <li>David Kratochvil: Link to Bio <a href="https://www.linkedin.com/in/david-kratochvil-1bb61a11b/">(LinkedIn)</a></li>
      <li>Andrew Loeb: Link to Bio <a href="https://www.linkedin.com/in/andrewloeb/">(LinkedIn)</a></li>
    </ul>
    <br />
    <p align="left">The following experts reviewed our tool:</p>
    <br />
    <p align="left">
      No one involved in the development of this tool has received any funding
      or profits for this project.
    </p>
    <b><u>Your Privacy and Your Rights</u></b>
    <b>[Andrew to fill out]</b>
  </div>
</template>

<script>
// import HowItWorks from "@/components/HowItWorks.vue";

export default {
  components: {
    // HowItWorks
  }
};
</script>

<style lang="scss">
.about {
  margin: 0 2em;
  border: 1px solid #ccc;
  background-color: $color-peach;
  .info {
    overflow-x: auto;
  }
}
</style>
