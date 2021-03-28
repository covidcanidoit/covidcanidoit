#!/usr/bin/env node

import fs from "fs";
import underscore from "underscore";
const { findWhere } = underscore;

const rawTimeSeries = fs.readFileSync("time_series_covid19_confirmed_US.json");
const timeSeries = JSON.parse(rawTimeSeries);

const rawPopData = fs.readFileSync("co-est2019-annres-filtered-cleaned.json");
const popData = JSON.parse(rawPopData);

const result = [];
const stateResult = {};

timeSeries.forEach(row => {
  const popInfo =
    findWhere(
      popData,
      { state: row.Province_State, county: row.Admin2 }
    ) || {};

  const slug =
    row
      .Province_State
      .toLowerCase()
      .replace(/[^\sa-z]+/g, "")
      .replace(/\s+/g, "-")
    + "-" +
    row
      .Admin2
      .toLowerCase()
      .replace(/[^\sa-z]/g, "")
      .replace(/\s+/g, "-");
  result.push({
    slug,
    CSSEGISUID: row.UID,
    FIPS: row.FIPS,
    state: row.Province_State,
    county: row.Admin2,
    population_2019: parseInt(popInfo.population_2019)
  });

  const stateSlug =
    row
      .Province_State
      .toLowerCase()
      .replace(/[^\sa-z]+/g, "")
      .replace(/\s+/g, "-");
  if(!stateResult[stateSlug]) {
    stateResult[stateSlug] = {
      slug: stateSlug,
      CSSEGISUID: row.Province_State,
      FIPS: row.Province_State,
      state: row.Province_State,
      county: "ALL",
      population_2019: 0
    };
  }
  // console.log("adding to state", stateSlug, stateResult[stateSlug], parseInt(popInfo.population_2019));
  stateResult[stateSlug].population_2019 += (parseInt(popInfo.population_2019) || 0);

});

result.push(...(Object.values(stateResult)));

let data = JSON.stringify(result);
fs.writeFileSync('county-regions.json', data);

