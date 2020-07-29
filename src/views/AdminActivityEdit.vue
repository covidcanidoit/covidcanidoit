<template>
  <div>
    <router-link :to="{ name: 'Admin' }">Back</router-link>
    <h1 class="display-2">Editing {{ this.activity.name }}</h1>

    <h6>
      <small class="lastEdited">{{ lastEdited }}</small>
    </h6>

    <v-form>
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
              :value="activity.name"
              @input="saveValue('name', $event)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4 m-1>
            <v-text-field
              label="Activity Search name"
              :value="activity.searchName"
              @input="saveValue('searchName', $event)"
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
            <v-combobox
              label="Trending Poor Risk Score"
              :value="activity.riskScore.poor"
              @input="saveValue('riskScore/poor', $event)"
              :items="OneTwoThreeFourFive"
            />
          </v-flex>
          <v-flex xs12 md3>
            <v-combobox
              label="Trending Caution Risk Score"
              :value="activity.riskScore.caution"
              @input="saveValue('riskScore/caution', $event)"
              :items="OneTwoThreeFourFive"
            />
          </v-flex>
          <v-flex xs12 md3>
            <v-combobox
              label="Trending Better Risk Score"
              :value="activity.riskScore.better"
              @input="saveValue('riskScore/better', $event)"
              :items="OneTwoThreeFourFive"
            />
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
            <v-col>
              <v-select
                :items="categoryNames"
                label="Activity Category"
                :value="activity.category"
                @input="saveValue('category', $event)"
              ></v-select>
            </v-col>
            <v-col>
              <v-switch
                label="Inside?"
                :input-value="activity.isInside === 'TRUE'"
                @change="saveValue('isInside', isInsideToggled)"
              ></v-switch>
            </v-col>
            <v-col>
              <v-switch
                label="Show Location?"
                :input-value="activity.showLocation === 'TRUE'"
                @change="saveValue('showLocation', showLocationToggled)"
              ></v-switch>
            </v-col>
          </v-row>
        </v-layout>

        <v-layout row>
          <v-flex col lg8>
            <v-text-field
              label="Add a keyword"
              v-model="newKeyword"
              @keydown.enter="addKeyword(newKeyword)"
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
              >
                {{ keyword }}
              </v-chip>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-textarea
              label="Additional Notes"
              :value="activity.additionalNotes"
              @input="saveValue('activity.additionalNotes', $event)"
            ></v-textarea>
            <v-label>Additional Notes Preview</v-label>
            <v-card outlined>
              <Markdown :source="activity.additionalNotes" />
            </v-card>
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
                  <v-combobox
                    label="Crowding score"
                    :value="activity.characteristics.crowding.score"
                    @input="saveValue('characteristics/crowding/score', $event)"
                    :items="LowMediumHigh"
                  />
                  <v-textarea
                    label="Crowding Notes"
                    :value="activity.characteristics.crowding.notes"
                    @input="saveValue('characteristics/crowding/notes', $event)"
                  ></v-textarea>
                  <v-label>Crowding Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown
                      :source="activity.characteristics.crowding.notes"
                    />
                  </v-card>
                  <v-text-field label="Crowding Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile>
                <v-card-text>
                  <v-combobox
                    label="Droplets score"
                    :value="activity.characteristics.droplets.score"
                    @input="saveValue('characteristics/droplets/score', $event)"
                    :items="LowMediumHigh"
                  />
                  <v-textarea
                    label="Droplets Notes"
                    :value="activity.characteristics.droplets.notes"
                    @input="saveValue('characteristics/droplets/notes', $event)"
                  ></v-textarea>
                  <v-label>Droplets Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown
                      :source="activity.characteristics.droplets.notes"
                    />
                  </v-card>
                  <v-text-field label="Droplets Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile>
                <v-card-text>
                  <v-combobox
                    label="Exposure Time score"
                    :value="activity.characteristics.exposureTime.score"
                    @input="
                      saveValue('characteristics/exposureTime/score', $event)
                    "
                    :items="LowMediumHigh"
                  />
                  <v-textarea
                    label="Exposure Time Notes"
                    :value="activity.characteristics.exposureTime.notes"
                    @input="
                      saveValue('characteristics/exposureTime/notes', $event)
                    "
                  ></v-textarea>
                  <v-label>Exposure Time Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown
                      :source="activity.characteristics.exposureTime.notes"
                    />
                  </v-card>
                  <v-text-field label="Exposure Time Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile>
                <v-card-text>
                  <v-combobox
                    label="Ventilation score"
                    :value="activity.characteristics.ventilation.score"
                    @input="
                      saveValue('characteristics/ventilation/score', $event)
                    "
                    :items="LowMediumHigh"
                  />
                  <v-textarea
                    label="Ventilation Notes"
                    :value="activity.characteristics.ventilation.notes"
                    @input="
                      saveValue('characteristics/ventilation/notes', $event)
                    "
                  ></v-textarea>
                  <v-label>Ventilation Notes Preview</v-label>
                  <v-card outlined>
                    <Markdown
                      :source="activity.characteristics.ventilation.notes"
                    />
                  </v-card>
                  <v-text-field label="Ventilation Reference Slugs" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapGetters } from "vuex";
import Markdown from "vue-markdown";
import { union } from "lodash";

export default {
  components: { Markdown },
  props: ["slug", "name"],
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
    ...mapGetters([
      "activities",
      "currentCountry",
      "categories",
      "currentUserSettings",
      "currentUserUid",
      "users"
    ]),
    activity() {
      return this.activities[this.currentKey];
    },
    keywords() {
      return this.activity.keywords;
    },
    categoryNames() {
      return Object.keys(this.categories);
    },
    lastEdited() {
      if (!(this.activity.lastEditedBy && this.activity.lastEditedOn))
        return "Last edit was before timestamps feature was introduced";
      return `Last edited by ${this.readableUser(
        this.activity.lastEditedBy
      )} on ${this.readableTimestamp(this.activity.lastEditedOn)}`;
    },
    showLocationToggled() {
      return this.activity.showLocation === "TRUE" ? "FALSE" : "TRUE";
    },
    isInsideToggled() {
      return this.activity.isInside === "TRUE" ? "FALSE" : "TRUE";
    },
    LowMediumHigh() {
      return ["Low", "Medium", "High"];
    },
    OneTwoThreeFourFive() {
      return ["1", "2", "3", "4", "5"];
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
      console.log("saveValue value: ", value);
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
      this.currentKey = this.slug;
    },
    removeKeyword(deleteKeyword) {
      this.activity.keywords = this.keywords.filter(
        keyword => keyword !== deleteKeyword
      );
      this.saveValue("keywords", this.activity.keywords);
    },
    readableTimestamp(milliseconds) {
      return new Date(milliseconds).toLocaleString();
    },
    readableUser(uid) {
      const email = this.users[uid]?.email || "unknown";
      return email;
    },
    addKeyword(newKeyword) {
      this.saveValue("keywords", union(this.keywords, [newKeyword]));
      this.newKeyword = "";
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
