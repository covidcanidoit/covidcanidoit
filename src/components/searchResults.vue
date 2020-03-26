<template>
  <div class="introduction" style="border: 1px solid black">
    <div v-show="searched" >
      <h1>{{searchResult["Activity"]}}</h1>
      <table class="results">
        <tr>
          <td width="25%">
            Risk Score: 
            <br><br>
            <h1>{{searchResult["Overall Risk Scoring"]}}</h1>
            </td>
          <td >
            <ul v-for="desc in riskDescription">
              <li>{{desc}}</li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchResults',
  props: {
    searchedTerm: String,
    searchResult: Object,
    searched: {
      type:Boolean,
      default:false
      }
  },
    data: function() {
    return {
      scores: {
        score: [1, 2, 3, 4, 5],
        riskCategory: ["Low", "Moderate", "Elevated", "High", "Critical"],
        riskDescription: [
          ["You can continue to do this activity.", "The frequency and nature of the activity puts you at low risk for contracting or transmitting COVID-19.", "You may still want to take extra precautions for prevent infection."],
          ["You can continue to do this activity but you should consider ways to do this activity less or during less risky times.", "The frequency and nature of the activity puts you at some risk for contracting or transmitting COVID-19.", "Make sure to take extra precautions for prevent infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person."],
          ["You should consider stopping this activity.", "If you are unable to stop, you should consider ways to do this activity less or during less risky times.", "The frequency and nature of the activity puts you at more risk for contracting or transmitting COVID-19.", "Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "],
          ["You should stop this activity.", "The frequency and nature of the activity puts you at high risk for contracting or transmitting COVID-19.", "You may be endangering others and efforts to control the outbreak.", "Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "],
          ["Stop this activity immediately.", "The frequency and nature of the activity is endangering yourself and efforts to control the COVID-19 outbreak, regardless of extra precautions to preventing infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "]
        ]
      }
    };
  },
  computed: {
    riskScore() {
      return this.searchResult["Overall Risk Scoring"]
    },
    riskDescription() {
      return this.scores.riskDescription[this.riskScore]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results {
  color: black;
  background-color: #e8ebf5;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
