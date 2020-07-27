
# Obtained URL using hint @ https://www.reddit.com/r/googlesheets/comments/aymwjd/how_do_you_select_csv_output_for_individual/
region_data_url="https://docs.google.com/spreadsheets/d/e/2PACX-1vStD_EMR9El7agVp-Oi6d1c5EMAOYgoYOsSc2xhwzht1ae4Fku7F6zSmF4PB9J_aHA1DAb2PpAelomO/pub?output=csv&gid=237779988"

curl -s "$region_data_url" > region_data.csv

csv2json region_data.csv | \
  jq --slurpfile abbr state-abbrev.json \
     --slurpfile trend trend-names.json \
  '
    [
      .[]
      | {
        longName: .STATE,
        shortName: $abbr[0][.STATE],
        slug: ($abbr[0][.STATE] | ascii_downcase),
        trending: $trend[0][.["GATING SCORE"]]
      }

      # Pull this out into the slug as the key
      | [.]
      | map( { (.slug): (. | del(.[""])) } )
      []
    ]

    # Merge all these into one object
    | add
  '
