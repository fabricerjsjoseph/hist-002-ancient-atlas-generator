"use strict";
// Ancient Persian Civilization Profile

window.CivilizationPersian = {
  id: "persian",
  name: "Persian (Achaemenid)",
  period: "classical",
  
  // Name generation
  nameBase: 18, // Arabic (closest)
  cityPrefix: ["Pers", "Ek", "Susa", "Bab", "Pass", "Sar", "Ham", "Gor", "Ray", "Mar", "Bach"],
  citySuffix: ["epolis", "batana", "gard", "a", "ana", "is", "tan"],
  
  // Leader titles and naming
  ruleTitles: ["Shahanshah", "King of Kings", "Great King", "King of Persia", "King of Lands"],
  leaderNames: {
    male: ["Cyrus", "Darius", "Xerxes", "Artaxerxes", "Cambyses", "Bardiya", "Bessus", "Mazaeus", "Ariobarzanes", "Pharnabazus"],
    female: ["Atossa", "Amestris", "Stateira", "Parysatis", "Sisygambis", "Roxana", "Drypetis"]
  },
  dynastyNames: ["Achaemenid", "Arsacid", "Sasanian"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["desert", "highlands", "temperate"],
    riverValleyDependent: 0.5,
    coastalPreference: 0.4,
    mountainPreference: 0.6
  },
  
  // Government
  governmentTypes: ["empire", "satrapy_system"],
  defaultGovernment: "empire",
  
  // Military
  militaryComposition: {
    immortals: 0.2,
    cavalry: 0.3,
    infantry: 0.35,
    archers: 0.15
  },
  militaryUnits: ["Immortals", "Sparabara", "Persian Cavalry", "Kardakes", "Scythed Chariots"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.85,
    urbanization: 0.7,
    fortification: 0.6,
    expansion: 0.95,
    trade: 0.9,
    literacy: 0.6
  },
  
  // Religion
  pantheon: [
    {name: "Ahura Mazda", domain: "Wisdom/Light", importance: 1.0},
    {name: "Mithra", domain: "Sun/Contracts", importance: 0.85},
    {name: "Anahita", domain: "Water/Fertility", importance: 0.8},
    {name: "Verethragna", domain: "Victory", importance: 0.7},
    {name: "Atar", domain: "Fire", importance: 0.65},
    {name: "Tishtrya", domain: "Rain", importance: 0.6}
  ],
  religiousImportance: 0.85,
  religiousSites: ["Fire Temple", "Royal Palace", "Apadana", "Paradise Garden"],
  
  // Landmarks
  landmarks: ["apadana", "royal_road", "paradise_garden", "rock_relief", "royal_tomb"],
  
  // Historical constraints
  constraints: {
    minYear: -550,
    maxYear: -330,
    maxStateSize: 250,
    preferredLatitude: {min: 25, max: 45}
  }
};
