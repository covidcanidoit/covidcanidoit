#!/bin/bash

US_SHEET_URL='https://docs.google.com/spreadsheets/d/135us82p8GlOYXFhu2vdpKGz-kpvQntA8/export?format=csv&gid=1549954680'

# URL from param
SHEET_URL=${1:-$US_SHEET_URL};

curl -s "$SHEET_URL" > raw.csv

# Slice off the extra header
sed -e '1,10d' < raw.csv | csv2json > base.json

cat base.json|jq '
  [
    .[]

    # Break keywords into an array
    | .keywords = (
        .keywords
        | split(",\\s*"; "")
        | map(select(length > 0))
      )

    # Restructure characteristics
    | .characteristics = {
         crowding: {
           score: .crowdingScore,
           notes: .crowdingNotes,
           referenceSlug: (.crowdingReferenceSlug | ascii_downcase)
         },
         droplets: {
           score: .dropletsScore,
           notes: .dropletsNotes,
           referenceSlug: (.dropletsReferenceSlug | ascii_downcase)
         },
         exposureTime: {
           score: .exposureTimeScore,
           notes: .exposureTimeNotes,
           referenceSlug: (.exposureTimeReferenceSlug | ascii_downcase)
         },
         ventilation: {
           score: .ventilationScore,
           notes: .ventilationNotes,
           referenceSlug: (.ventilationReferenceSlug | ascii_downcase)
         }
       }
    | del(
        .crowdingScore,
        .crowdingNotes,
        .crowdingReferenceSlug,
        .dropletsScore,
        .dropletsNotes,
        .dropletsReferenceSlug,
        .exposureTimeScore,
        .exposureTimeNotes,
        .exposureTimeReferenceSlug,
        .ventilationScore,
        .ventilationNotes,
        .ventilationReferenceSlug
      )

    # Restructure trendScore
    | .riskScore = {
        poor: .trendScorePoor,
        caution: .trendScoreCaution,
        better: .trendScoreBetter
      }
    | del(
        .trendScorePoor,
        .trendScoreCaution,
        .trendScoreBetter
      )

    # Restructure references into an array
    | .references = ([
        .reference1,
        .reference2,
        .reference3,
        .reference4
      ] | map(select(length > 0)))
    | del(
        .reference1,
        .reference2,
        .reference3,
        .reference4
      )

    # Force ower-case slug
    | .slug = (.slug | ascii_downcase)

    # Pull this out into the slug as the key
    | [.]
    | map( { (.slug): (. | del(.[""])) } )
    []
  ]

  # Merge all these into one object
  | add
'

