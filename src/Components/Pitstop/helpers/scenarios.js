const scenarioList = [
  {
    name: "C5 Soft",
    pitlap: 22,
    start: 12,
    weather: "Dry to Heavy Rain",
    raceweather: [
      {
        lap: 12,
        weather: "Dry",
      },
      {
        lap: 16,
        weather: "Drizzle",
      },
      {
        lap: 19,
        weather: "Rain",
      },
      {
        lap: 22,
        weather: "Heavy Rain",
      },
    ],
    expected: "Wet",
    goodpit:
      "You pitted at the correct time to perfectly balance out the use of your tyres!",
    toosoon:
      "You could have stayed on your Softs a bit longer in light rain rather weather risking an unnecessary second pit.",
    toolate:
      "You needed to pit sooner risking to run your Softs in heavy rain, losing significant time and putting your safety at risk.",
    righttyre:
      "You selected the correct tyre. Wet tyres help to move large amounts of water and are safer in heavy rain!",
    wrongtyre:
      "The tyre you needed to swap in were your Wet tyres. The Wets help to move large amounts of water and are safer in heavy rain.",
  },
  {
    name: "C5 Medium",
    pitlap: 47,
    start: 37,
    weather: "Dry to Light Rain",
    raceweather: [
      {
        lap: 37,
        weather: "Dry",
      },
      {
        lap: 41,
        weather: "Drizzle",
      },
      {
        lap: 45,
        weather: "Light Rain",
      },
    ],
    expected: "Intermediate",
    goodpit:
      "You pitted at the correct time to perfectly balance out the use of your tyres!",
    toosoon:
      "You could have stayed on your Mediums a bit longer in dry to drizzle weather risking an unnecessary second pit.",
    toolate:
      "You needed to pit sooner risking to run your Mediums in standing water, losing significant time and putting your safety at risk.",
    righttyre:
      "You selected the correct tyre. Intermediate tyres help to move standing water and are safer in light rain!",
    wrongtyre:
      "The tyre you needed to swap in were your Intermediate tyres. The Intermediates help to move standing water and are safer in light rain.",
  },
  {
    name: "C5 Hard",
    pitlap: 56,
    start: 45,
    weather: "Remaining Dry",
    raceweather: [
      {
        lap: 45,
        weather: "Dry",
      },
    ],
    expected: "C5 Soft",
    goodpit:
      "You pitted at the correct time to perfectly balance out the use of your tyres!",
    toosoon:
      "You could have stayed on your Hard tyres a bit longer in dry weather risking an unnecessary second pit.",
    toolate:
      "You needed to pit sooner risking to run your Hards for too long, losing significant time and putting your safety at risk.",
    righttyre:
      "You selected the correct tyre. Soft tyres are the fastest tyres to help gain advantage at the end of the race!",
    wrongtyre:
      "The tyre you needed to swap in were your Soft tyres. The Soft tyres are the fastest tyres to help gain advantage at the end of the race.",
  },
  {
    name: "Intermediate",
    pitlap: 31,
    start: 21,
    weather: "Light Rain to Dry",
    raceweather: [
      {
        lap: 21,
        weather: "Light Rain",
      },
      {
        lap: 25,
        weather: "Drizzle",
      },
      {
        lap: 29,
        weather: "Dry",
      },
    ],
    expected: "C5 Medium",
    goodpit:
      "You pitted at the correct time to perfectly balance out the use of your tyres!",
    toosoon:
      "You could have stayed on your Intermediate tyres a bit longer until the water dried out a bit more.",
    toolate:
      "You needed to pit sooner risking to run your Intermediates in dry weather, losing significant time and putting your safety at risk.",
    righttyre:
      "You selected the correct tyre! Medium tyres are the perfect balance for speed and endurance.",
    wrongtyre:
      "The tyre you needed to swap in were your Medium tyres. The Medium tyres are the perfect balance for speed and endurance.",
  },
  {
    name: "Wet",
    pitlap: 24,
    start: 14,
    weather: "Heavy Rain to Dry",
    raceweather: [
      {
        lap: 14,
        weather: "Heavy Rain",
      },
      {
        lap: 19,
        weather: "Light Rain",
      },
      {
        lap: 21,
        weather: "Drizzle",
      },
      {
        lap: 22,
        weather: "Dry",
      },
    ],
    expected: "C5 Hard",
    goodpit:
      "You pitted at the correct time to perfectly balance out the use of your tyres!",
    toosoon:
      "You could have stayed on your Wet tyres a bit longer until the water dried out a bit more risking an unnecessary second pit.",
    toolate:
      "You needed to pit sooner risking to run your Wets in dry weather, losing significant time.",
    righttyre:
      "You selected the correct tyre! Hard tyres have the strength and endurance to finish the race.",
    wrongtyre:
      "The tyre you needed to swap in were your Hard tyres. The Hard tyres have the strength and endurance to finish the race.",
  },
]
export default scenarioList
