"use strict";
// Ancient Sumerian Civilization Profile

window.CivilizationSumerian = {
  id: "sumerian",
  name: "Ancient Sumerian",
  period: "bronzeAge",
  
  // Name generation
  nameBase: 42, // Levantine
  cityPrefix: ["Ur", "Erid", "Nipp", "Lag", "Kis", "Um", "Shur", "Bad", "Lar", "Gir", "Issin", "Lar"],
  citySuffix: ["uk", "ur", "ash", "sa", "su", "ma", "ak", "uppak"],
  
  // Leader titles and naming
  ruleTitles: ["Lugal", "Ensi", "King of Kish", "King of the Four Quarters"],
  leaderNames: {
    male: ["Gilgamesh", "Ur-Nammu", "Shulgi", "Hammurabi", "Sargon", "Naram-Sin", "Gudea", "Lugalbanda", "Dumuzi", "Etana", "Eannatum"],
    female: ["Kubaba", "Puabi", "Shagshag", "Baranamtarra", "Nin-banda"]
  },
  dynastyNames: ["First Dynasty of Ur", "Third Dynasty of Ur", "Akkadian", "Old Babylonian", "Lagashite"],
  
  // Geography requirements
  geography: {
    requiresRiver: true,
    preferredBiomes: ["desert", "wetland"],
    riverValleyDependent: 0.95,
    coastalPreference: 0.3
  },
  
  // Government
  governmentTypes: ["cityState", "theocracy"],
  defaultGovernment: "cityState",
  
  // Military
  militaryComposition: {
    infantry: 0.5,
    spearmen: 0.25,
    archers: 0.15,
    chariots: 0.1
  },
  militaryUnits: ["Spearmen Phalanx", "Battle Wagons", "Royal Guard", "City Militia"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.85,
    urbanization: 0.9,
    fortification: 0.8,
    expansion: 0.4,
    trade: 0.8,
    literacy: 0.7
  },
  
  // Religion
  pantheon: [
    {name: "An", domain: "Heaven", importance: 1.0},
    {name: "Enlil", domain: "Air", importance: 0.95},
    {name: "Enki", domain: "Water", importance: 0.9},
    {name: "Inanna", domain: "Love/War", importance: 0.85},
    {name: "Nanna", domain: "Moon", importance: 0.8},
    {name: "Utu", domain: "Sun", importance: 0.75},
    {name: "Ninhursag", domain: "Earth", importance: 0.7},
    {name: "Nergal", domain: "Death", importance: 0.65},
    {name: "Dumuzi", domain: "Shepherds", importance: 0.6},
    {name: "Ereshkigal", domain: "Underworld", importance: 0.55}
  ],
  religiousImportance: 0.9,
  religiousSites: ["Ziggurat", "Temple Complex", "Sacred Precinct", "E-temple"],
  
  // Landmarks
  landmarks: ["ziggurat", "temple", "palace", "city_wall", "irrigation_canal"],
  
  // Historical constraints
  constraints: {
    minYear: -4500,
    maxYear: -1900,
    maxStateSize: 30,
    preferredLatitude: {min: 28, max: 38}
  }
};
