#!/bin/bash

INFILE=$1

# echo "Converting $INFILE from v1 to v2 activities -> $OUTFILE"

cat $INFILE | jq '
  [
    .[]

    # Rename
    | .name = .activityName
    | .searchName = .searchActivityName
    | del(
        .activityName,
        .searchActivityName
      )

    # Move the general risk score into trendScore
    | .riskScore = {
        poor: .generalRiskScore,
        caution: .generalRiskScore,
        better: .generalRiskScore
      }
    | del( .generalRiskScore )

    # Break keywords into an array
    | .keywords = (
        .activitykeywords
        | split(",\\s*"; "")
        | map(select(length > 0))
      )
    | del( .activitykeywords )

    # Delete unused fields
    | del(
        .risk50To69,
        .riskOver70,
        .extraRiskDescription
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
'
