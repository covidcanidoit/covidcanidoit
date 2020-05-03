# COVID Can I Do It?

This project is for helping folks learn about the risks created by various
activities in the context of the COVID-19 pandemic.

![](https://github.com/covidcanidoit/covidcanidoit/workflows/End-to-end%20tests/badge.svg?branch=master)

## Dev workflow
```
# Initial setup
yarn install

# Compiles and hot-reloads for development
yarn serve

# Deploy! Builds app and uploads to Firebase
yarn deploy

# Deploy Firebase db rule changes
# The rules are defined in firebase.rules.json
yarn deploy-db-rules

# Run your tests
yarn test:unit
yarn test:e2e

# Lint (and fix) cruft
yarn lint
```
