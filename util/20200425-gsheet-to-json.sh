#!/bin/bash

curl 'https://docs.google.com/spreadsheets/d/11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8/export?format=csv&gid=1087436199' > categories.csv
csv2json categories.csv > categories.json
cat categories.json| jq 'map( { (.category): (. + {name: .category} | del(.category)) }) | add' > categories_clean.json


curl 'https://docs.google.com/spreadsheets/d/11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8/export?format=csv&gid=1126986858' > riskFactors.csv
csv2json riskFactors.csv > riskFactors.json
cat riskFactors.json| jq 'map( { (.name): . }) | add' > riskFactors_clean.json

curl 'https://docs.google.com/spreadsheets/d/11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8/export?format=csv&gid=1690487024' > riskLevels.csv
csv2json riskLevels.csv > riskLevels.json
cat riskLevels.json|jq 'map( {( "riskLevel\(.riskScore)"): . })| add' > riskLevels_clean.json

curl 'https://docs.google.com/spreadsheets/d/11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8/export?format=csv&gid=219638739' > activities.csv
csv2json activities.csv > activities.json
cat activities.json|jq '[.[] | .slug = ( .activityName | sub("[ /]";"-";"g") | sub("[(),'"'"'.]";"";"g") | ascii_downcase ) | [.] | map( { (.slug): (. | del(.[""])) } ) []]|add' > activities_clean.json

# Merge them all together!
jq -s '{ activities: .[0], riskLevels: .[1], riskFactors: .[2], categories: .[2] }' activities_clean.json riskLevels_clean.json riskFactors_clean.json categories_clean.json > content.json
