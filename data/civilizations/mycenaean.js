"use strict";
// Ancient Mycenaean Civilization Profile

window.CivilizationMycenaean = {
  id: "mycenaean",
  name: "Mycenaean Greek",
  period: "bronzeAge",
  
  // Name generation
  nameBase: 7, // Greek
  cityPrefix: ["Myken", "Tir", "Pyl", "Theb", "Orch", "Arg", "Spar", "Iol", "Kop", "Glau"],
  citySuffix: ["ae", "yns", "os", "ai", "ene", "kos", "eia"],
  
  // Leader titles and naming
  ruleTitles: ["Wanax", "Lawagetas", "Basileus", "Anax"],
  leaderNames: {
    male: ["Agamemnon", "Menelaus", "Nestor", "Odysseus", "Achilles", "Atreus", "Perseus", "Eurystheus", "Pelops", "Diomedes", "Ajax"],
    female: ["Clytemnestra", "Helen", "Iphigenia", "Andromache", "Penelope", "Elektra", "Hermione"]
  },
  dynastyNames: ["Pelopid", "Atreid", "Perseids", "Heracleid", "Neleid"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["temperate", "mediterranean"],
    riverValleyDependent: 0.3,
    coastalPreference: 0.75,
    hillPreference: 0.8
  },
  
  // Government
  governmentTypes: ["kingdom", "palace_economy"],
  defaultGovernment: "kingdom",
  
  // Military
  militaryComposition: {
    infantry: 0.45,
    chariots: 0.25,
    naval: 0.2,
    archers: 0.1
  },
  militaryUnits: ["Chariot Warriors", "Dendra-armored Infantry", "Sea Raiders", "Palace Guards"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.8,
    urbanization: 0.65,
    fortification: 0.95,
    expansion: 0.7,
    trade: 0.8,
    literacy: 0.5
  },
  
  // Religion
  pantheon: [
    {name: "Zeus", domain: "Sky", importance: 1.0},
    {name: "Poseidon", domain: "Sea", importance: 0.95},
    {name: "Hera", domain: "Marriage", importance: 0.85},
    {name: "Athena", domain: "Wisdom", importance: 0.8},
    {name: "Ares", domain: "War", importance: 0.75},
    {name: "Dionysus", domain: "Wine", importance: 0.7},
    {name: "Potnia", domain: "Mistress", importance: 0.65}
  ],
  religiousImportance: 0.75,
  religiousSites: ["Megaron", "Tholos Tomb", "Cult Center", "Sacred Spring"],
  
  // Landmarks
  landmarks: ["cyclopean_walls", "lions_gate", "tholos_tomb", "megaron_palace", "citadel"],
  
  // Historical constraints
  constraints: {
    minYear: -1600,
    maxYear: -1100,
    maxStateSize: 50,
    preferredLatitude: {min: 35, max: 42}
  }
};
