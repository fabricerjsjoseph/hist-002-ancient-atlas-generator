"use strict";
// Ancient Hittite Civilization Profile

window.CivilizationHittite = {
  id: "hittite",
  name: "Hittite",
  period: "bronzeAge",
  
  // Name generation
  nameBase: 42, // Levantine
  cityPrefix: ["Hatt", "Kanes", "Ankuw", "Kar", "Zal", "Taw", "Sariss", "Alal", "Tar", "Ner"],
  citySuffix: ["usa", "esh", "ash", "a", "ik", "pa", "sa", "uwa"],
  
  // Leader titles and naming
  ruleTitles: ["Labarna", "Tabarna", "Great King", "My Sun"],
  leaderNames: {
    male: ["Hattusili", "Muwatalli", "Suppiluliuma", "Mursili", "Tudhaliya", "Arnuwanda", "Telipinu", "Labarna", "Shattiwaza"],
    female: ["Puduhepa", "Tawananna", "Asmunikal", "Nikalmati", "Gassulawiya"]
  },
  dynastyNames: ["Old Kingdom", "New Kingdom", "Hattusili Line", "Suppiluliuma Line"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["temperate", "highlands"],
    riverValleyDependent: 0.4,
    coastalPreference: 0.3,
    mountainPreference: 0.7
  },
  
  // Government
  governmentTypes: ["kingdom", "empire"],
  defaultGovernment: "kingdom",
  
  // Military
  militaryComposition: {
    chariots: 0.35,
    infantry: 0.4,
    archers: 0.15,
    siege: 0.1
  },
  militaryUnits: ["Chariot Warriors", "Meshedi Guards", "Iron Swordsmen", "Auxiliary Infantry"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.7,
    urbanization: 0.6,
    fortification: 0.9,
    expansion: 0.75,
    trade: 0.6,
    literacy: 0.7
  },
  
  // Religion
  pantheon: [
    {name: "Tarhunt", domain: "Storm", importance: 1.0},
    {name: "Arinniti", domain: "Sun", importance: 0.95},
    {name: "Hepat", domain: "Queen", importance: 0.85},
    {name: "Telepinu", domain: "Fertility", importance: 0.8},
    {name: "Kumarbi", domain: "Father of Gods", importance: 0.75},
    {name: "Shaushka", domain: "War/Love", importance: 0.7},
    {name: "Lelwani", domain: "Underworld", importance: 0.65}
  ],
  religiousImportance: 0.85,
  religiousSites: ["Rock Sanctuary", "Temple", "Storm God Shrine", "Yazılıkaya"],
  
  // Landmarks
  landmarks: ["fortress", "rock_relief", "lions_gate", "palace", "granary"],
  
  // Historical constraints
  constraints: {
    minYear: -1650,
    maxYear: -1178,
    maxStateSize: 100,
    preferredLatitude: {min: 35, max: 42}
  }
};
