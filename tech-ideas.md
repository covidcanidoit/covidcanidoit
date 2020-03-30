
* Rename repo to `covid19-risk-assessment`
* Make repo public
* Update README
  * General info
  * Contributor starting points
  * Deploy instructions
* Store data in a google-sheet
  * You can get a raw CSV from a google sheet "https://docs.google.com/spreadsheets/d/[DOC-ID]/gviz/tq?tqx=out:csv&sheet=importable"
  * Pull this down over http as needed, server or client side
  * Then the google sheet becomes the "database"
* Host server side code somewhere
  * Heroku, firebase-app microservices?
  * Google and Azure both give away a bunch of free hours
* Track activity
  * Add Google Analytics
  * Add some sort of logging - is there a free DataDog tier?
* Add elasticsearch or similar
  * Find some way to do fuzzy search matching
  * This is a very small dataset -- so maybe lots of hand-rolled keywords and/or client-side search?
* Instant autocomplete to help exploration
* Some way to manage secrets? Mostly for google-maps api key so far
* Some kind of CI (testing)?

Product ideas:
* Monitor searches to gather more common queries
* Allow people to submit new questions of things they want to do
* Don't say you are having the user "share" their personal data, that might imply that we are in turn using or storing their data
  * Maybe "provide" rather than "share"?
  * Be clear about when/if their data is going to be used anywhere

