<template>
  <div class="risk-description">
    <table width="100%">
      <tr>
        <td width="25%">
          <div v-if="isAgeScore">
            Age-Specific Risk Score:
          </div>
          <div v-else>
            Risk Score:
          </div>
          <br />
          <br />
          <h1>{{ score }}</h1>
        </td>
        <td width="75%">
          <ul
            v-for="(desc, index) in riskDescription[score]"
            :key="index"
            align="left"
          >
            <li>{{ desc }}</li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    score: undefined,
    isAgeScore: {
      default: false
    }
  },
  computed: {
    scoreIndex() {
      return this.score - 1;
    }
  },
  data() {
    return {
      riskCategory: ["Low", "Moderate", "Elevated", "High", "Critical"],
      riskDescription: [
        [
          "You can continue to do this activity.",
          "The frequency and nature of the activity puts you at low risk for contracting or transmitting COVID-19.",
          "You may still want to take extra precautions for prevent infection."
        ],
        [
          "You can continue to do this activity but you should consider ways to do this activity less or during less risky times.",
          "The frequency and nature of the activity puts you at some risk for contracting or transmitting COVID-19.",
          "Make sure to take extra precautions for prevent infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person."
        ],
        [
          "You should consider stopping this activity.",
          "If you are unable to stop, you should consider ways to do this activity less or during less risky times.",
          "The frequency and nature of the activity puts you at more risk for contracting or transmitting COVID-19.",
          "Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
        ],
        [
          "You should stop this activity.",
          "The frequency and nature of the activity puts you at high risk for contracting or transmitting COVID-19.",
          "You may be endangering others and efforts to control the outbreak.",
          "Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
        ],
        [
          "Stop this activity immediately.",
          "The frequency and nature of the activity is endangering yourself and efforts to control the COVID-19 outbreak, regardless of extra precautions to preventing infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
        ]
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.risk-description {
  color: black;
  background-color: #e8ebf5;
}
</style>
