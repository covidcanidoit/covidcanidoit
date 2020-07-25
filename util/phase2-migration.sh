#!/bin/bash

CONTENT=$1
OUTPUT=$2

echo "Converting content DB dump $CONTENT (v1) -> $OUTPUT (v2)"

# First we do the US based on new dataset
./v2-gsheet-import.sh > activities_us_v2.json

# UG is a migration of existing data
cat $CONTENT | jq '.UG.activities' > activities_ug_v1.json
./migrate-activities-v1-to-v2.sh activities_ug_v1.json > activities_ug_v2.json

# Merge together
jq -s '{ US: .[0], UG: .[1] }' activities_us_v2.json activities_ug_v2.json > $OUTPUT

