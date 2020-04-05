<template>
  <div id="app">
    <div id="nav" class="navigation">
      <router-link class="router" to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="profileCreated" to="/userProfile">
        View/Edit Profile
      </router-link>
      <router-link v-else to="/createUserProfile">Create Profile</router-link>
    </div>
    <div v-if="!hasCoronavirus"><router-view /></div>
    <div v-else>
      Warning

      <!-- if someone tested positive for coronavirus -->
      <b class="warning">
        Do not leave home except for essential medical visits. Even if you have
        not tested positive and do not feel ill, you can spread COVID-19.
      </b>

      <div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                You or someone in your household has tested positive for
                COVID-19 (coronavirus).
              </button>
            </h2>
          </div>
          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <p align="left">
                The CDC recommends the following:
              </p>
              <ul>
                <li>
                  When you need medical care, call ahead to the doctor or
                  medical facility to alert them that you have COVID-19 so they
                  can prepare to care for you and protect others at the
                  facility.
                </li>
                <br />
                <li>
                  Outside of getting medical care, you should isolate yourself
                  to your home. Do not go to work, school, place of worship or
                  other public areas. Avoid using public transportation,
                  ride-sharing or taxis.
                </li>
              </ul>
              <p>
                Learn more:
                <a
                  href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
                  target="_blank"
                  >https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    profileCreated() {
      //track if the user has created a profile yet
      return this.$store.getters.createProfile;
    },
    hasCoronavirus() {
      //check if the user or someone they live with has coronavirus, as soon as this is true they get a warning message and nothing else
      if (this.$store.getters.submitProfile.COVIDpositive == "yes") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navigation {
  text-align: right;
  padding: 1em;

  a {
    font-weight: bold;
    /* color: #2c3e50; */

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.form-select {
  /* display: inline-block;
  max-width: 100%;
  height: 34px;
  padding-right: 24px; */
  /* background-color: rgb(186, 214, 26); */
  /* background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 8px 10px; */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right 16px center #ddd;

  min-height: 34px;
  min-width: 120px;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  /* color: #24292e; */
  vertical-align: middle;
  /* background-color: rgb(247, 12, 12); */
  /* background-repeat: no-repeat;
  background-position: right 8px center; */
  /* border: 1px solid #d1d5da; */
  border-radius: 30px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
}
</style>
