#!/bin/bash

SHEET_URL='https://docs.google.com/spreadsheets/d/135us82p8GlOYXFhu2vdpKGz-kpvQntA8/export?format=csv&gid=1549954680'

curl "$SHEET_URL" > raw.csv

# Slice off the extra header
sed -e '1,10d' < raw.csv | csv2json > base.json

cat base.json|jq '
  [
    .[]

    # Break keywords into an array
    | .keywords = (.keywords | split(",\\s*"; ""))

    # Restructure characteristics
    | .characteristics = {
         crowding: {
           score: .crowdingScore,
           notes: .crowdingNotes,
           referenceSlug: .crowdingReferenceSlug
         },
         droplets: {
           score: .dropletsScore,
           notes: .dropletsNotes,
           referenceSlug: .dropletsReferenceSlug
         },
         exposureTime: {
           score: .exposureTimeScore,
           notes: .exposureTimeNotes,
           referenceSlug: .exposureTimeReferenceSlug
         },
         ventilation: {
           score: .ventilationScore,
           notes: .ventilationNotes,
           referenceSlug: .ventilationReferenceSlug
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
    | .trendScore = {
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

    # Pull this out into the slug as the key
    | [.]
    | map( { (.slug): (. | del(.[""])) } )
    []
  ]

  # Merge all these into one object
  | add
' > activities_clean.json

