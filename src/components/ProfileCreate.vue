<template>
  <div>
    <div class="profile-create">
      <!-- <div class="left&#45;side"> -->
      <!--   <h1> -->
      <!--     Tell us more about you, so we can give you more accurate information -->
      <!--   </h1> -->
      <!--   <h2>Create a profile &#38;#x25b6;</h2> -->
      <!--   <a href="#">Read more about your privacy and rights</a> -->
      <!-- </div> -->
      <div class="right-side">
        <h1>
          Please enter the following information about yourself:
        </h1>
        <div class="profile-questions">
          <MultiQuestion
            @input="profileEdited"
            v-model="userProfile.age"
            questionPrompt="How old are you?"
            :options="[
              ['Under 10', 'riskUnder10'],
              ['10 to 18', 'risk10To18'],
              ['18 to 19', 'risk18To19'],
              ['20 to 29', 'risk20To29'],
              ['30 to 49', 'risk30To49'],
              ['50 to 69', 'risk50To69'],
              ['70+', 'riskOver70']
            ]"
          />

          <MultiQuestion
            @input="profileEdited"
            v-model="userProfile.smoking"
            questionPrompt="Do you smoke/vape?"
            :options="[
              ['Yes, I smoke/vape', 'yes'],
              ['No, I do not smoke/vape', 'no'],
              ['I used to smoke/vape', 'used']
            ]"
          />

          <!-- pregnancy -->
          <MultiQuestion
            @input="profileEdited"
            v-model="userProfile.pregnant"
            questionPrompt="Are you pregnant?"
            :options="[
              ['Yes', 'yes'],
              ['No', 'no']
            ]"
          />
          <!-- feel sick -->
          <MultiQuestion
            @input="profileEdited"
            v-model="userProfile.feelSick"
            questionPrompt="Do you feel sick?"
            :options="[
              ['Yes', 'yes'],
              ['No', 'no']
            ]"
          />
          <!-- family sick -->
          <MultiQuestion
            @input="profileEdited"
            v-model="userProfile.familySick"
            questionPrompt="Do you have family members who are sick?"
            :options="[
              ['Yes', 'yes'],
              ['No', 'no']
            ]"
          />

          <!-- test postive for COVID-19? -->
          <MultiQuestion
            @input="profileEdited"
            v-model="userProfile.COVIDpositive"
            questionPrompt="Has anyone in your household or apartment tested positive for COVID-19 (coronavirus)?"
            :options="[
              ['Yes', 'yes'],
              ['No', 'no']
            ]"
          />

          <!-- chronic medical condition input -->
          <MultiQuestion
            @input="profileEdited"
            v-model="userProfile.comorbidity"
            questionPrompt="Do you have any of the following chronic medical conditions?"
            :options="[
              ['Yes', 'yes'],
              ['No', 'no']
            ]"
          >
            <ul class="listMedConditions">
              <li>Moderate to severe asthma or chronic lung disease</li>
              <li>Cancer treatment or medicines causing immune suppression</li>
              <li>Inherited immune system deficiencies or HIV</li>
              <li>
                Serious heart conditions, such as heart failure or prior heart
                attack
              </li>
              <li>Diabetes with complications</li>
              <li>Kidney failure that need dialysis</li>
              <li>Cirrhosis of the liver</li>
              <li>Diseases or conditions that make It harder to cough</li>
              <li>Extreme obesity</li>
              <li>Pregnancy</li>
              <li>None of the above</li>
            </ul>
          </MultiQuestion>
        </div>
        <router-link
          class="submit"
          tag="button"
          :to="{ name: 'Home', params: { search: search, skipProfile: true } }"
        >
          Submit
          <i class="fas fa-angle-double-right"></i>
        </router-link>
      </div>
    </div>
    <div>
      <h1>Information Collection Statement (In the Brief)</h1>
      <ol>
        <li>
          You should
          <b>not</b> rely on us for medical advice. You should seek medical
          advice from a licensed professional and follow the instructions of
          government authorities.
        </li>

        <li>
          We will do our best to provide you with the best information
          available.
        </li>
        <li>
          If you notice something is incorrect or outdated, please
          <a href="mailto:info@covidcanidoit.com">contact us</a>
        </li>
        <li>
          When using this service, you may provide additional details about
          yourself.
        </li>
        <li>
          The information provided is not collected or stored by
          <i>COVID Can I Do It</i> in any way.
        </li>
        <li>
          If you have any questions, please
          <a href="mailto:info@covidcanidoit.com">contact us</a>
        </li>
        <li>
          Read the full Information Collection Statement
          <router-link class="router" to="/about">here</router-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import MultiQuestion from "@/components/MultiQuestion.vue";

export default {
  components: {
    MultiQuestion
  },
  props: ["search"],
  data: function() {
    return {
      userProfile: {
        age: 0,
        gender: "male",
        smoking: "no",
        comorbidity: "no",
        pregnant: "no",
        feelSick: "no",
        familySick: "no",
        COVIDpositive: "no"
      }
    };
  },
  mounted() {
    this.userProfile = this.$store.getters.getProfile;
  },
  methods: {
    profileEdited() {
      console.log("edited");
      this.$store.commit("setProfile", this.userProfile);
    }
  }
};
</script>

<style scoped lang="scss">
.profile-create {
  display: flex;
  flex-direction: row;
  text-align: left;
  width: 100%;
  overflow-x: auto;

  .right-side {
    padding: 1em;
    background-color: $color-mint;
    color: $color-navy;
    flex: 70%;

    font-size: 1em;

    h1 {
      font-size: 1em;
    }

    .profile-questions {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow-x: auto;

      .multi-question {
        margin: 1em;
        flex: 45%;
      }
    }

    .submit {
      font-size: 15px;
      border-radius: 30px 30px 30px 30px;
      border: 1px solid black;
      background-color: $color-peach;
      width: 10em;
      padding: 5px 20px;
      text-align: center;
      float: right;
    }
  }
}

.results {
  color: black;
  background-color: #e8ebf5;
}
h3 {
  margin: 40px 0 0;
}
ul {
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
li:before {
  content: "• ";
}
a {
  color: #42b983;
}
.listMedConditions li {
  display: block;
}
.listMedConditions {
  display: inline-block;
}
</style>
