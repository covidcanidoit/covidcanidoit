#!/bin/bash

DB=$1
OUTPUT=$2

echo "Converting DB dump $DB (v1) -> $OUTPUT (v2)"

# Extract out just the activities
echo "Extracting US activities"
cat $DB | jq '.content.US.activities' > activities_us_v1.json
echo "Extracting UG activities"
cat $DB | jq '.content.UG.activities' > activities_ug_v1.json

# First we do the US based on new dataset
echo "Downloading/converting US v2 activities"
./v2-gsheet-import.sh > activities_us_v2.json

# Also load the US regional data
echo "Downloading latest US region statuses"
./import-us-regions.sh > regions_us_v2.json

# UG is a migration of existing data
echo "Migrating UG activities from v1 to v2"
./migrate-activities-v1-to-v2.sh \
  activities_ug_v1.json \
  > activities_ug_v2.json

echo "Merging it all back in"
cat $DB | \
  jq --slurpfile activitiesUS activities_us_v2.json \
     --slurpfile regionsUS regions_us_v2.json \
     --slurpfile activitiesUG activities_ug_v2.json \
  '
    .content.US.activities = $activitiesUS[0]
    | .content.US.regions = $regionsUS[0]
    | .content.UG.activities = $activitiesUG[0]
  ' > $OUTPUT

