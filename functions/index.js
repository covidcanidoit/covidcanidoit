const firebase = require("firebase");
const functions = require("firebase-functions");
const auth = require("firebase/auth");
const axios = require("axios");
const { firebaseConfig } = require("firebase-functions");
const csv = require("csvtojson");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const abbrv = {
  Arizona: "AZ",
  Alabama: "AL",
  Alaska:"AK",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  'District of Columbia': "DC",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  'New Hampshire': "NH",
  'New Jersey': "NJ",
  'New Mexico': "NM",
  'New York': "NY",
  'North Carolina': "NC",
  'North Dakota': "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  'Rhode Island': "RI",
  'South Carolina': "SC",
  'South Dakota': "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  'West Virginia': "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  'Puerto Rico': "PR"
};

const trendNames = {
  "0": "better",
  "1": "caution",
  "2": "poor",
  "3": "poor"
};

exports.autoPullCovidExitStrategyData = functions.pubsub
  .schedule("every day 00:00")
  .onRun(context => {
    const covidExitStrategyData = 
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vStD_EMR9El7agVp-Oi6d1c5EMAOYgoYOsSc2xhwzht1ae4Fku7F6zSmF4PB9J_aHA1DAb2PpAelomO/pub?output=csv&gid=237779988";
    // COMM W/ DB
    var admin = require("firebase-admin");
    //var functions = require("firebase-functions");

    console.log(`admin.name: ${admin.name}`);
    try {
      admin.initializeApp();
    }
    catch (err) {
      console.error("firebase likely already exists", err);
    }
    
    const database = admin.database();

    // FETCH DATA FROM COVID EXIT STRATEGY
    axios
      .get(covidExitStrategyData)
      .then((response) => {

        csv()
        .fromString(response.data)
        .then(regionsArray => {
          console.log(`${regionsArray.length} number of regions to update`)
          regionsArray.forEach((region) => {
            const longName = region["STATE"];
            const shortName = abbrv[region["STATE"]];
            if (longName && shortName) {
              const slug = shortName.toLowerCase();
              const trending = trendNames[region["GATING SCORE"]];

              try {
                database.ref(`content/US/regions/${slug}`).set({
                  longName,
                  shortName,
                  slug,
                  trending,
                  updated: new Date().toString()
                });
              }
              catch (err) {
                console.error("error accessing content", err);
              }
            }
            else {
              console.error(
                `row has no region name: `,
                longName,
                shortName, 
                region
              );
            }
            
          });

          console.log('outside array foreach');
          return null;
          
        })
        .catch((err) => {
          console.error('csv error',err);
        });
        
        console.log('outside csv')
        return response;
    })
    .catch((err) => {
      console.log('axios error',err);
    });

    console.log('outside axios');
    return true;
  //response.send("checking for nonexistent region?");
});
