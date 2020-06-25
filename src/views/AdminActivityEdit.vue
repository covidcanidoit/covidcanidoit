<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1 class="display-2">Editing {{ this.activity.activityName }}</h1>
    <h6><small class="lastEdited">{{lastEdited}}</small></h6>
    <v-form v-show="hasBetaAccess">
      <v-container fluid>
        <v-layout>
          <v-flex lg12 md12 sm12 xs12>
            <h2 class="headline">Names</h2>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 md4 m-1>
            <v-text-field
              label="Activity Slug"
              :value="activity.slug"
              @input="saveValue('slug', $event)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 m-1>
            <v-text-field
              label="Activity Name"
              :value="activity.activityName"
              @input="saveValue('activityName', $event)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 m-1>
            <v-text-field
              label="Activity Search name"
              :value="activity.searchActivityName"
              @input="saveValue('searchActivityName', $event)"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex>
            <h2 class="headline">Scores</h2>
          </v-flex>
        </v-layout>

        <v-layout justify-space-around>
          <v-flex xs12 md3>
            <v-text-field
              type="number"
              label="Trending Bad Risk Score"
              min="1"
              max="5"
              :value="activity.TrendBadRiskScore"
              @input="saveValue('TrendBadRiskScore', $event)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md3>
            <v-text-field
              type="number"
              label="Trending Medium Risk Score"
              min="1"
              max="5"
              :value="activity.TrendMediumRiskScore"
              @input="saveValue('TrendMediumRiskScore', $event)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md3>
            <v-text-field
              type="number"
              label="Trending Good Risk Score"
              min="1"
              max="5"
              :value="activity.TrendGoodRiskScore"
              @input="saveValue('TrendGoodRiskScore', $event)"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex>
            <h2 class="headline">Categorization</h2>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-row>
            <v-col lg12>
              <v-select
                :items="categoryNames"
                label="Activity Category"
                :value="activity.category"
                @input="saveValue('category', $event)"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg12>
              <v-switch
                label="Inside?"
                input-value="activity.inside"
                @change="saveValue('inside', !activity.inside)"
              ></v-switch>
              <!--<v-checkbox label="Inside?" input-value="activity.inside" @click='saveValue("inside",!activity.inside,$event)'></v-checkbox>-->
              <!-- uncommment line above if we want to use a checkbox instead of a switch -->
            </v-col>
          </v-row>
        </v-layout>

        <v-layout row>
          <v-flex col lg8>
            <v-text-field
              label="Add a keyword"
              v-model="newKeyword"
              @keydown.enter="
                saveValue(
                  'activityKeywords',
                  activity.activityKeywords + ',' + newKeyword
                )
              "
            ></v-text-field>
          </v-flex>
          <v-flex col lg4></v-flex>
          <v-flex lg1></v-flex>
          <v-flex lg10>
            <v-layout row wrap justify-start>
              <v-chip
                close
                v-for="keyword in keywords"
                :key="keyword"
                @click:close="removeKeyword(keyword)"
                >{{ keyword }}</v-chip
              >
            </v-layout>
          </v-flex>
          <v-flex lg1></v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex>
            <h2 class="headline">Risk Components</h2>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-tabs fixed-tabs icons-and-text>
            <v-tab>
              Crowding
              <v-icon>mdi-account-switch</v-icon>
            </v-tab>
            <v-tab>
              Droplets
              <v-icon>mdi-water</v-icon>
            </v-tab>
            <v-tab>
              Exposure Time
              <v-icon>mdi-timer-sand-full</v-icon>
            </v-tab>
            <v-tab>
              Ventilation
              <v-icon>mdi-fan</v-icon>
            </v-tab>

            <v-tab-item>
              <v-card flat tile>
                <v-card-text>
                  <v-textarea
                    label="Crowding Notes"
                    :value="activity.crowdingNotes"
                    @input="saveValue('crowdingNotes', $event)"
                  ></v-textarea>
                  <v-label>Crowding Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown :source="activity.crowdingNotes" />
                  </v-card>
                  <v-text-field label="Crowding Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile>
                <v-card-text>
                  <v-textarea
                    label="Droplets Notes"
                    :value="activity.dropletsNotes"
                    @input="saveValue('dropletsNotes', $event)"
                  ></v-textarea>
                  <v-label>Droplets Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown :source="activity.dropletsNotes" />
                  </v-card>
                  <v-text-field label="Droplets Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile>
                <v-card-text>
                  <v-textarea
                    label="Exposure Time Notes"
                    :value="activity.exposureTimeNotes"
                    @input="saveValue('exposureTimeNotes', $event)"
                  ></v-textarea>
                  <v-label> Exposure Time Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown :source="activity.exposureTimeNotes" />
                  </v-card>
                  <v-text-field label="Exposure Time Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile>
                <v-card-text>
                  <v-textarea
                    label="Ventilation Notes"
                    :value="activity.ventilationNotes"
                    @input="saveValue('ventilationNotes', $event)"
                  ></v-textarea>
                  <v-label>Ventilation Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown :source="activity.ventilationNotes" />
                  </v-card>
                  <v-text-field label="Ventilation Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-layout>
      </v-container>
    </v-form>

    <h1>Edit Activity</h1>
    Current key: {{ currentKey }}
    <div class="edit-form">
      <div class="form-group">
        <label>slug</label>
        <input
          @input="saveField('slug', $event)"
          class="form-control"
          type="text"
          :value="this.activity.slug"
        />
      </div>
      <div class="form-group">
        <label>activityName</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('activityName', $event)"
          :value="this.activity.activityName"
        />
      </div>
      <div class="form-group">
        <label>searchActivityName</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('searchActivityName', $event)"
          :value="this.activity.searchActivityName"
        />
      </div>
      <div class="form-group">
        <label>activitykeywords</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('activitykeywords', $event)"
          :value="this.activity.activitykeywords"
        />
      </div>
      <div class="form-group">
        <label>category</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('category', $event)"
          :value="this.activity.category"
        />
      </div>
      <div class="form-group">
        <label>showLocation</label>
        <select
          class="form-control"
          @input="saveField('showLocation', $event)"
          :value="this.activity.showLocation"
        >
          <option>FALSE</option>
          <option>TRUE</option>
        </select>
      </div>
      <div class="form-group">
        <label>extraRiskDescription</label>
        <textarea
          class="form-control"
          @input="saveField('extraRiskDescription', $event)"
          :value="this.activity.extraRiskDescription"
        />
      </div>
      <div class="form-group">
        <label>generalRiskScore</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('generalRiskScore', $event)"
          :value="this.activity.generalRiskScore"
        />
      </div>
      <div class="form-group">
        <label>risk50To69</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('risk50To69', $event)"
          :value="this.activity.risk50To69"
        />
      </div>
      <div class="form-group">
        <label>riskOver70</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('riskOver70', $event)"
          :value="this.activity.riskOver70"
        />
      </div>
      <div class="form-group">
        <label>reference1</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference1', $event)"
          :value="this.activity.reference1"
        />
      </div>
      <div class="form-group">
        <label>reference2</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference2', $event)"
          :value="this.activity.reference2"
        />
      </div>
      <div class="form-group">
        <label>reference3</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference3', $event)"
          :value="this.activity.reference3"
        />
      </div>
      <div class="form-group">
        <label>reference4</label>
        <input
          class="form-control"
          type="text"
          @input="saveField('reference4', $event)"
          :value="this.activity.reference4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";
import Markdown from "vue-markdown";

export default {
  components: { Markdown },
  props: ["slug", "activityName"],
  data() {
    return {
      currentKey: undefined,
      newKeyword: ""
    };
  },
  created() {
    this.lookupActivity();
  },
  computed: {
    ...mapGetters(["activities", "currentCountry","categories","currentUserSettings","currentUserUid","users"]),
    activity() {
      return this.activities[this.currentKey];
    },
    keywords() {
      return this.activity.activityKeywords
        ? this.activity.activityKeywords.split(",")
        : [];
    },
    hasBetaAccess() {
      return !!this.currentUserSettings?.hasBetaAccess;
    },
    categoryNames() {
      return Object.keys(this.categories);
    },
    lastEdited() {
      if (!(this.activity.lastEditedBy && this.activity.lastEditedOn)) return "Last edit was before timestamps feature was introduced"
      return `Last edited by ${this.readableUser(this.activity.lastEditedBy)} on ${this.readableTimestamp(this.activity.lastEditedOn)}`
    }

  },
  methods: {
    saveField(name, event) {
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(this.currentKey)
        .child(name)
        .set(event.target.value);
        this.updateTimestamp();
    },
    saveValue(name, value) {
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(this.currentKey)
        .child(name)
        .set(value);
      this.updateTimestamp();
    },
    updateTimestamp() {
      var now = new Date();
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(this.currentKey)
        .child("lastEditedBy")
        .set(this.currentUserUid);
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(this.currentKey)
        .child("lastEditedOn")
        .set(Date.parse(now.toUTCString()));
    },
    lookupActivity() {
      this.currentKey = Object.keys(this.activities).find(
        key => this.activities[key].activityName === this.activityName
      );
    },
    removeKeyword(deleteKeyword) {
      this.activity.activityKeywords = this.keywords.filter((keyword) => keyword !== deleteKeyword).join(",");
      this.saveValue("activityKeywords",this.activity.activityKeywords);
    },
    readableTimestamp(milliseconds) {
      return new Date(milliseconds).toLocaleString();
    },
    readableUser(uid) {
      const email = this.users[uid].email;
      return email;
    }
  }
};
</script>

<style scoped lang="scss">
.edit-form {
  margin: 0 2em;
}
.lastEdited {
  font-size: 0.75em;
}
</style>
