"use strict";
// Ancient Minoan Civilization Profile

window.CivilizationMinoan = {
  id: "minoan",
  name: "Minoan",
  period: "bronzeAge",
  
  // Name generation
  nameBase: 7, // Greek
  cityPrefix: ["Knos", "Phais", "Mall", "Zak", "Gour", "Tyliss", "Palaik", "Kyd", "Apt", "Hier"],
  citySuffix: ["os", "sos", "ia", "on", "nia", "era", "astro"],
  
  // Leader titles and naming
  ruleTitles: ["Minos", "Wanax", "Priest-King", "Labrys-Bearer"],
  leaderNames: {
    male: ["Minos", "Rhadamanthys", "Sarpedon", "Asterion", "Idomeneus", "Deucalion", "Catreus", "Glaucus", "Androgeus"],
    female: ["Ariadne", "Pasiphae", "Phaedra", "Britomartis", "Europa", "Akakallis"]
  },
  dynastyNames: ["Minoan", "Knossian", "Phaistos"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["temperate", "mediterranean"],
    riverValleyDependent: 0.2,
    coastalPreference: 0.95,
    islandPreference: 0.9
  },
  
  // Government
  governmentTypes: ["thalassocracy", "theocracy"],
  defaultGovernment: "thalassocracy",
  
  // Military
  militaryComposition: {
    naval: 0.45,
    infantry: 0.3,
    archers: 0.15,
    chariots: 0.1
  },
  militaryUnits: ["Naval Marines", "Palace Guards", "Bull-Leapers", "Merchant Marines"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.8,
    urbanization: 0.75,
    fortification: 0.3,
    expansion: 0.6,
    trade: 0.95,
    literacy: 0.6
  },
  
  // Religion
  pantheon: [
    {name: "Potnia", domain: "Nature", importance: 1.0},
    {name: "Snake Goddess", domain: "Household", importance: 0.9},
    {name: "Bull God", domain: "Power", importance: 0.85},
    {name: "Britomartis", domain: "Hunting", importance: 0.8},
    {name: "Velchanos", domain: "Vegetation", importance: 0.75},
    {name: "Diktynna", domain: "Mountains", importance: 0.7}
  ],
  religiousImportance: 0.85,
  religiousSites: ["Palace Shrine", "Peak Sanctuary", "Cave Sanctuary", "Sacred Grove"],
  
  // Landmarks
  landmarks: ["palace_complex", "lustral_basin", "bull_ring", "lighthouse", "harbor"],
  
  // Historical constraints
  constraints: {
    minYear: -2700,
    maxYear: -1450,
    maxStateSize: 40,
    preferredLatitude: {min: 30, max: 40}
  }
};
