"use strict";
// Ancient Carthaginian Civilization Profile

window.CivilizationCarthaginian = {
  id: "carthaginian",
  name: "Carthaginian",
  period: "classical",
  
  // Name generation
  nameBase: 42, // Levantine
  cityPrefix: ["Carth", "Utic", "Had", "Lept", "Taps", "Gad", "Lixus", "Ting", "Sald", "Mal"],
  citySuffix: ["ago", "a", "rumetum", "is", "ae", "aca", "os"],
  
  // Leader titles and naming
  ruleTitles: ["Shophet", "Suffete", "Rab", "General"],
  leaderNames: {
    male: ["Hannibal", "Hamilcar", "Hasdrubal", "Hanno", "Mago", "Bomilcar", "Gisco", "Himilco", "Maharbal", "Adherbal"],
    female: ["Dido", "Sophonisba", "Salambo", "Elissa"]
  },
  dynastyNames: ["Barcid", "Magonid", "Hannonic"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["mediterranean", "desert"],
    riverValleyDependent: 0.2,
    coastalPreference: 0.95,
    islandPreference: 0.7
  },
  
  // Government
  governmentTypes: ["republic", "oligarchy"],
  defaultGovernment: "republic",
  
  // Military
  militaryComposition: {
    mercenaries: 0.4,
    naval: 0.35,
    elephants: 0.1,
    cavalry: 0.15
  },
  militaryUnits: ["Sacred Band", "Libyan Infantry", "Numidian Cavalry", "War Elephants", "Quinquereme Fleet"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.6,
    urbanization: 0.85,
    fortification: 0.75,
    expansion: 0.8,
    trade: 0.98,
    literacy: 0.6
  },
  
  // Religion
  pantheon: [
    {name: "Baal Hammon", domain: "Sky/Fertility", importance: 1.0},
    {name: "Tanit", domain: "Moon/War", importance: 0.95},
    {name: "Melqart", domain: "City/Sea", importance: 0.85},
    {name: "Eshmun", domain: "Healing", importance: 0.75},
    {name: "Astarte", domain: "Love/War", importance: 0.7},
    {name: "Resheph", domain: "Plague/War", importance: 0.6}
  ],
  religiousImportance: 0.85,
  religiousSites: ["Tophet", "Temple of Tanit", "Harbor Temple", "Sacred Precinct"],
  
  // Landmarks
  landmarks: ["circular_harbor", "tophet", "merchant_quarter", "triple_walls", "cothon"],
  
  // Historical constraints
  constraints: {
    minYear: -814,
    maxYear: -146,
    maxStateSize: 80,
    preferredLatitude: {min: 30, max: 45}
  }
};
