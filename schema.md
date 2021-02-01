
Top level keys:

```
dataset: {}, // Contains main datasets
userSettings: {}, // logged-in user settings
users: {} // list of known users
```

Each dataset has a "slug" which is also the top-level region name -- "US", "UK", etc.
```
dataset: {
  <slug1>: {},
  <slug2>: {},
}
```

Below 
```
dataset: {
  US: {
    activities: {}, // Individual activity data
    riskComponents: {}, // Info on risk components for this dataset
    riskFactors: {}, // Additional factors, information sharing
    riskLevels: {}, // Text info for overall risk levels (?)
    regions: {} // Info for each region, such as name and population
  }
}
```

Here is an expanded single activity:
```
"walking-with-friend": {
  slug: "walking-with-friend",
  name: "Walking with a friend",
  searchName: "Walk with a friend",
  
  // Clarifying information
  isInside: false,
  showLocation: false,
  
  // Discoverability information
  category: "excercise",
  keywords: [ "walk", "friend" ].
  related-activities: [
    "walking-alone",
    "hanging-with-a-friend"
  ],
  
  // Risk information
  // Could get these by looping over riskProfiles
  publishedRiskProfile: "v2",
  needRating: ["v4", "v5"],
  beingRated: ["v3"],
  needReview: [],
  underReview: [],
 
  // Both written by humans and events
  ratingLogEntries: [
    { authoredAt, author, content },
  ],
  
  riskProfiles: {
    v1: { ... },
    v2: { ... },
    v3: { ... },
    v4: { ... },
    v5: {
      // needs-rating, being-rated, being-reviewed, published, retired, deleted
      status: "under-review",
      assignee: "user@place",
      characteristics: {
        ventilation: {
          description: "...",
          riskScore: 2,
          
          // Future tagged info to generate descriptive content
          riskInfoNotes: [
            "masks-work",
            "distance-no-worky"
          ]
        }
      }
    }
  }
}
```

Regions hold on to the current risk levels there:
```
dataset: {
  US: {
    regions: {
      "ak": {
        longName: "Alaska",
        shortName: "AK",
        slug: "ak",
        population: 2349494,
        currentDate: "2021-01-31",
        newCasesToday: 23293,
        adjustedActiveInfections: 99293,
        infectedEncounterRate: 0.0234
      }
    }
  }
}
```
