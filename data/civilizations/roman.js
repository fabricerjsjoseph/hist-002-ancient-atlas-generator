"use strict";
// Ancient Roman Civilization Profile

window.CivilizationRoman = {
  id: "roman",
  name: "Roman",
  period: "classical",
  
  // Name generation
  nameBase: 8, // Roman
  cityPrefix: ["Rom", "Med", "Lug", "Aug", "Col", "Tarent", "Neap", "Syr", "Ant", "Caes", "Rav", "Veron"],
  citySuffix: ["um", "a", "ium", "olis", "dunum", "usta", "aria", "ensis"],
  
  // Leader titles and naming
  ruleTitles: ["Consul", "Imperator", "Caesar", "Augustus", "Princeps", "Dictator", "Rex"],
  leaderNames: {
    male: ["Julius", "Augustus", "Marcus", "Gaius", "Tiberius", "Claudius", "Nero", "Trajan", "Hadrian", "Aurelius", "Constantine", "Scipio", "Pompey", "Crassus"],
    female: ["Livia", "Agrippina", "Julia", "Octavia", "Messalina", "Plotina", "Faustina", "Cornelia"]
  },
  dynastyNames: ["Julio-Claudian", "Flavian", "Nerva-Antonine", "Severan", "Constantinian", "Theodosian"],
  familyNames: ["Julius", "Claudius", "Cornelius", "Aemilius", "Fabius", "Valerius", "Sergius", "Tullius"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["temperate", "mediterranean"],
    riverValleyDependent: 0.4,
    coastalPreference: 0.7,
    roadBuilding: 0.95
  },
  
  // Government
  governmentTypes: ["republic", "empire", "principate"],
  defaultGovernment: "republic",
  
  // Military
  militaryComposition: {
    legionnaires: 0.45,
    auxiliaries: 0.25,
    cavalry: 0.15,
    naval: 0.15
  },
  militaryUnits: ["Legion", "Praetorian Guard", "Auxiliary Cohort", "Equites", "Trireme Fleet"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.9,
    urbanization: 0.95,
    fortification: 0.9,
    expansion: 0.95,
    trade: 0.85,
    literacy: 0.7
  },
  
  // Religion
  pantheon: [
    {name: "Jupiter", domain: "Sky/King", importance: 1.0},
    {name: "Mars", domain: "War", importance: 0.95},
    {name: "Minerva", domain: "Wisdom", importance: 0.9},
    {name: "Juno", domain: "Marriage", importance: 0.85},
    {name: "Neptune", domain: "Sea", importance: 0.8},
    {name: "Venus", domain: "Love", importance: 0.75},
    {name: "Apollo", domain: "Sun", importance: 0.7},
    {name: "Diana", domain: "Hunt", importance: 0.65},
    {name: "Mercury", domain: "Trade", importance: 0.6},
    {name: "Vulcan", domain: "Forge", importance: 0.55},
    {name: "Ceres", domain: "Harvest", importance: 0.5},
    {name: "Bacchus", domain: "Wine", importance: 0.45}
  ],
  religiousImportance: 0.7,
  religiousSites: ["Temple", "Capitol", "Shrine", "Sacred Grove", "Vestal Temple"],
  
  // Landmarks
  landmarks: ["forum", "colosseum", "aqueduct", "triumphal_arch", "basilica", "thermae", "circus"],
  
  // Historical constraints
  constraints: {
    minYear: -753,
    maxYear: 476,
    maxStateSize: 200,
    preferredLatitude: {min: 25, max: 55}
  }
};
