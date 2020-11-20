# COVID Can I Do It?

This project is for helping folks learn about the risks created by various
activities in the context of the COVID-19 pandemic.

![](https://github.com/covidcanidoit/covidcanidoit/workflows/End-to-end%20tests/badge.svg?branch=master)

Users load the website and can search for an activity. If this is their first
search, they are also prompted to fill out a risk-profile (that stays on their
computer, not shared). Each activity has a risk-score along with some content
about that risk-score. Some activities also alow you to use Google Maps
(Places) data to see busy-times for a specific place. The additional profile
data is used to possibly modify the score (for age), but to generally provide
other information.

Work is coordinated via Github Issues, on our Slack
(covid-19risktool.slack.com), and on synchronous video meetings (Zoom,
generally Monday and Thursday nights EDT). Email an introduction to
info@covidcanidoit.com and we can get you set up with the slack and meetings.

Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for more details!

## Technology overview

- [VueJS](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firebase Database](https://firebase.google.com/docs/database)
- [Firebase Functions](https://firebase.google.com/docs/functions)

## Dev workflow

- Initial project setup
- Create/update branch and develop locally
- Open a PR, automatically runs tests
- Optional: Deploy to staging
- Merges to master automatically deploy to production

### Initial Project Setup

Git, github, and technical fork/branch management is a little out of scope here, but we can help coordinate via slack.

This project uses `nodejs`, `yarn`, and `vue-cli`, so to get started you should have nodejs and yarn installed. We recommend `asdf` as your version manager:

- Install [asdf](https://asdf-vm.com/#/core-manage-asdf-vm) (possibly using [brew](https://brew.sh/))
- Install [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)
- Install nodejs itself
- Install yarn
- Install project dependencies

#### Full MacOS Example

This is a from-scratch installation. Hopefully you can copy/paste bits of ths
at a time into a terminal. If you have brew, asdf, nodejs, or yarn, then you
can skip those parts.

```sh
# Install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# Install asdf and gnupg
brew install asdf
brew install gnupg
echo '. $(brew --prefix asdf)/asdf.sh' >> ~/.zshrc # Add asdf to path
source ~/.zshrc # Load Zsh config to get path (new terminals get it too)

# Install asdf-nodejs
brew install coreutils
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring

# Now that we have asdf-nodejs, lets set up the actual project. If you haven't
# cloned the project you should do that now, and then cd into the project
# directory. This requires your github account to be setup up with ssh
git clone git@github.com:covidcanidoit/covidcanidoit.git
cd covidcanidoit

# Use the .tool-versions file to install the right nodejs version
asdf install

# Install yarn (this is specific to this nodejs version)
npm install -g yarn

# Finally! Install the project dependencies
yarn install
```

### Run locally

```sh
# Make sure you are up to date with your git branch
# Then update dependencies
yarn install

# Compile and hot-reload for development!
yarn serve # Then open up http://localhost:8080

# Optional: Deploy to staging! Builds app and uploads to Firebase Hosting
yarn deploy-staging

# Optional: Deploy Firebase db rule changes
# The rules are defined in firebase.rules.json
yarn deploy-db-rules

# Run your tests
yarn test:unit # html test coverage report is viewable at ./coverage/lcov-report/index.html
yarn test:e2e  # uses cypress / headless-chrome

# Lint (and fix) cruft
yarn lint
```

## Infrastructure - Staging and Production

This project is hosted on Firebase, using both Firebase Hosting (for
compiled/static content) and the Firebase Realtime Database (for the activities
database and other dynamic content).

- `yarn build` compiles vue components and assets into .js files
- These assets and compiled js files are uploaded to Firebase Hosting, and are directly served to browsers
- The browsers are then running the VueJS app
- The app uses Firebase Database API to get (realitime) data from the Firebase Database. This is how the app gets the actual COVID activities and risk scores
- There is an admin section in the app that also uses the Database API to update activities
- Based on project needs, sometimes we do a bulk-data-import using tools in the `utils/` directory
- We have a separate firebase project named `ccidi-staging` that does all of the same things, which is nice for testing infrastructure and major database changes
- The Google Places API doesn't provide busyness data directly, so there is also an API service that uses the [populartimes](https://github.com/m-wrzr/populartimes) python library to scrape this data. Right now this is hosted on @awwaiid's server, but we'll move it into a Google Cloud function at some point

## Functions

### Daily Covidexitstrategy Data Import

This is a firebase function that automatically loads each region (in the form of US States including Puerto Rico and D.C.) provided by CovidExitStrategy along with their current risk level.

- The code will run every midnight EST.
- Each region will have a timestamp node `updated` with the time it was last updated. Viewing this node will let you know if it ran properly.
![image](https://user-images.githubusercontent.com/61799449/99341945-afa7ea00-283f-11eb-8b40-f3049ae85b1c.png)
- To run manually, visit the [cloud scheduler dashboard](https://console.cloud.google.com/cloudscheduler?_ga=2.94024345.543360165.1605582414-1181068750.1594143574&project=ccidi-staging&folder=&organizationId=). Click RUN NOW.
![image](https://user-images.githubusercontent.com/61799449/99342307-7623ae80-2840-11eb-80e3-521eba12d327.png)
- You can also see information about the run by going to the [Firebase console](https://console.firebase.google.com/u/0/project/ccidi-staging/functions/logs?search=&&severity=DEBUG). Click Functions. Click Logs.
![image](https://user-images.githubusercontent.com/61799449/99341819-73748980-283f-11eb-9d7f-05ef04df95d8.png)

To deploy changes, run `firebase deploy --only functions`