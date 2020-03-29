<template>
  <div id="app">
    <div id="nav" class="navigation">
      <router-link class="router" to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="profileCreated" to="/userProfile">View/Edit Profile</router-link>
      <router-link v-else to="/createUserProfile">Create Profile</router-link>
    </div>
    <br>
    <div v-if="!hasCoronavirus"><router-view/></div>
    <div v-else>Warning

      <!-- if someone tested positive for coronavirus -->
                <b class="warning">Do not leave home except for essential medical visits. Even if you have not tested positive and do not feel ill, you can spread COVID-19.</b>

          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    You or someone in your household has tested positive for COVID-19 (coronavirus).
                  </button>
                </h2>
              </div>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                  <p align="left">
                    The CDC recommends the following:
                    </p>
                    <ul>
                      <li>When you need medical care, call ahead to the doctor or medical facility to alert them that you have COVID-19 so they can prepare to care for you and protect others at the facility.</li><br>
                      <li>Outside of getting medical care, you should isolate yourself to your home. Do not go to work, school, place of worship or other public areas. Avoid using public transportation, ride-sharing or taxis.</li>
                    </ul>
                   <p>
                    Learn more: <a href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html" target="_blank" >https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html</a>
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
    hasCoronavirus() {//check if the user or someone they live with has coronavirus, as soon as this is true they get a warning message and nothing else
      if(this.$store.getters.submitProfile.COVIDpositive == 'yes'){return true}else{return false}
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
