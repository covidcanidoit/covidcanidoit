#!/bin/bash

set -x

# Grab the CSV from google sheets
# curl -s -L 'https://docs.google.com/spreadsheets/d/1s_zniwUtBQcZmad9TpQNr3et5HPlOcvZ/export?format=csv&gid=1001752799' > activities.csv

# First some text slice and dice to chop out rows and do
# some reformatting. Basically get rid of the
# instructional content at the top
# sed -i '1,38d' activities.csv
# perl -pi -e 's/\*(\w)/* \U$1/g' activities.csv

# Now to JSON land
# csv2json activities.csv > activities.json

cat activities.json \
  | jq '
    [
      .[]
      | {
          slug: (.slug | ascii_downcase),
          name,
          searchName,
          keywords: (
            .keywords
            | split(",")
            | map(gsub("^\\s+"; ""))
            | map(gsub("\\s+$"; ""))
            | map(select(length > 0))
          ),
          isInside: (.isInside | test("Yes")),
          ratingLogEntries: [
            {
              loggedAt: (now | gmtime | todate),
              loggedBy: "Importer",
              message: "Imported from spreadsheet"
            }
          ],
          riskProfiles: {
            v1: {
              status: "published",
              characteristics: {
                crowding: {
                  description: .crowdingContext,
                  riskScore: (.crowdingScore | tonumber)
                },
                droplets: {
                  description: .dropletContext,
                  riskScore: (.dropletScore | tonumber)
                },
                masking: {
                  description: .maskContext,
                  riskScore: (.maskScore | tonumber)
                },
                exposureTime: {
                  description: .timeContext,
                  riskScore: (.timeScore | tonumber)
                },
                ventilation: {
                  description: .ventilationContext,
                  riskScore: (.ventilationScore | tonumber)
                }
              }
            }
          }
        }
      | [.]
      | map({ (.slug): (. | del(.[""])) })[]
    ]
    | add
    ' > activities_clean.json

# Seed the basic region info
# cat regions_content.json \
#   | jq '
#     [
#       .[]
#       | map(del(.trending))
#       | map({ (.slug): (. | del(.[""])) })[]
#     ] | add
#   ' > us_regions.json

cat county-regions.json \
  | jq '
    [
      map({ (.slug): (. | del(.[""])) })[]
    ] | add
  ' > county-regions_clean.json

# Merge them all together!
jq -s '{ activities: .[0], riskLevels: .[1], riskFactors: .[2], categories: .[2], regions: .[3] }' activities_clean.json us_risk_levels.json us_risk_factors.json us_categories.json county-regions_clean.json > us_dataset.json
