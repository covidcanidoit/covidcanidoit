const functions = require("firebase-functions");
const axios = require("axios");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.pullCovidExitStrategyData = functions.https.onRequest((request, response) => {
  const covidExitStrategyData = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStD_EMR9El7agVp-Oi6d1c5EMAOYgoYOsSc2xhwzht1ae4Fku7F6zSmF4PB9J_aHA1DAb2PpAelomO/pub?output=csv&gid=237779988";
  axios.get(covidExitStrategyData).then((response) => {
    console.log("response",response);
    console.log("response.body", response.body);
    return response;
  }).catch((err) => {
    console.log(err);
  });
  response.send("processing");
});
