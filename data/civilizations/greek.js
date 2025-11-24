"use strict";
// Ancient Greek Civilization Profile

window.CivilizationGreek = {
  id: "greek",
  name: "Ancient Greek",
  period: "classical",
  
  // Name generation
  nameBase: 7, // Greek
  cityPrefix: ["Ath", "Spar", "Cor", "Theb", "Arg", "Del", "Olymp", "Epi", "Meg", "Mil", "Eph", "Hal"],
  citySuffix: ["ena", "ene", "ia", "os", "inth", "phi", "etos", "oi", "eus"],
  
  // Leader titles and naming
  ruleTitles: ["Archon", "Strategos", "Tyrant", "Basileus", "Hegemon"],
  leaderNames: {
    male: ["Pericles", "Themistocles", "Leonidas", "Alexander", "Philip", "Solon", "Cleisthenes", "Alcibiades", "Demosthenes", "Epaminondas", "Lysander", "Agesilaus"],
    female: ["Aspasia", "Artemisia", "Gorgo", "Cynisca", "Arete", "Diotima", "Telesilla"]
  },
  dynastyNames: ["Antigonid", "Ptolemaic", "Seleucid", "Attalid", "Agiad", "Eurypontid"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["temperate", "mediterranean"],
    riverValleyDependent: 0.2,
    coastalPreference: 0.85,
    mountainPreference: 0.6
  },
  
  // Government
  governmentTypes: ["democracy", "oligarchy", "tyranny", "cityState"],
  defaultGovernment: "cityState",
  
  // Military
  militaryComposition: {
    hoplites: 0.5,
    peltasts: 0.15,
    cavalry: 0.1,
    naval: 0.25
  },
  militaryUnits: ["Hoplite Phalanx", "Peltasts", "Trireme Crews", "Companion Cavalry", "Sacred Band"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.85,
    urbanization: 0.8,
    fortification: 0.7,
    expansion: 0.6,
    trade: 0.9,
    literacy: 0.8
  },
  
  // Religion
  pantheon: [
    {name: "Zeus", domain: "Sky/King", importance: 1.0},
    {name: "Athena", domain: "Wisdom", importance: 0.95},
    {name: "Apollo", domain: "Sun/Arts", importance: 0.9},
    {name: "Poseidon", domain: "Sea", importance: 0.85},
    {name: "Hera", domain: "Marriage", importance: 0.8},
    {name: "Ares", domain: "War", importance: 0.75},
    {name: "Artemis", domain: "Hunt", importance: 0.7},
    {name: "Aphrodite", domain: "Love", importance: 0.65},
    {name: "Hermes", domain: "Trade", importance: 0.6},
    {name: "Hephaestus", domain: "Forge", importance: 0.55},
    {name: "Demeter", domain: "Harvest", importance: 0.5},
    {name: "Dionysus", domain: "Wine", importance: 0.45}
  ],
  religiousImportance: 0.8,
  religiousSites: ["Temple", "Oracle", "Agora Shrine", "Mystery Sanctuary", "Panhellenic Sanctuary"],
  
  // Landmarks
  landmarks: ["temple", "agora", "theater", "gymnasium", "stoa", "acropolis"],
  
  // Historical constraints
  constraints: {
    minYear: -800,
    maxYear: -30,
    maxStateSize: 25,
    preferredLatitude: {min: 33, max: 45}
  }
};
