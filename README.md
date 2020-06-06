# COVID Can I Do It?

This project is for helping folks learn about the risks created by various
activities in the context of the COVID-19 pandemic.

![](https://github.com/covidcanidoit/covidcanidoit/workflows/End-to-end%20tests/badge.svg?branch=master)

## Technology overview

* [VueJS](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/)
* [Firebase Hosting](https://firebase.google.com/docs/hosting)
* [Firebase Database](https://firebase.google.com/docs/database)

## Dev workflow

* Initial project setup
* Create/update branch and develop locally
* Open a PR, automatically runs tests
* Optional: Deploy to staging
* Merges to master automatically deploy to production

### Initial Project Setup

Git, github, and technical fork/branch management is a little out of scope here, but we can help coordinate via slack.

This project uses `nodejs`, `yarn`, and `vue-cli`, so to get started you should have nodejs and yarn installed. We recommend `asdf` as your version manager:

* Install [brew](https://brew.sh/)
* Install [asdf](https://asdf-vm.com/#/core-manage-asdf-vm) (possibly using brew)
* Install [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)
* Install nodejs itself
* Install yarn
* Install project dependencies

#### Full MacOS Example
This is a from-scratch installation. Hopefully you can copy/paste bits of ths
at a time into a terminal. If you have brew, asdf, nodejs, or yarn, then you
can skip those parts.

```sh
# Install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# Install asdf
brew install asdf
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
yarn test:unit # ... we don't have any of these yet
yarn test:e2e

# Lint (and fix) cruft
yarn lint
```

## Infrastructure - Staging and Production

This project is hosted on Firebase, using both the Realtime Database and the static asset Hosting service.

* `yarn build` compiles vue components and assets into .js files
* These assets and compiled js files are uploaded to Firebase Hosting, and are directly served to browsers
* The browsers are then running the VueJS app
* The app uses Firebase Database API to get (realitime) data from the Firebase Database. This is how the app gets the actual COVID activities and risk scores
* There is an admin section in the app that also uses the Database API to update activities
* Based on project needs, sometimes we do a bulk-data-import using tools in the `utils/` directory
* We have a separate firebase project named `ccidi-staging` that does all of the same things, which is nice for testing infrastructure and major database changes

