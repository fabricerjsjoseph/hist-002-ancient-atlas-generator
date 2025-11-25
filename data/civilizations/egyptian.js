"use strict";
// Ancient Egyptian Civilization Profile

window.CivilizationEgyptian = {
  id: "egyptian",
  name: "Ancient Egyptian",
  period: "bronzeAge",
  
  // Name generation
  nameBase: 42, // Levantine (closest to Egyptian)
  cityPrefix: ["Akh", "Men", "Theb", "Mem", "Heli", "Abyd", "Asy", "Elephan", "Ombos", "Her", "Naqad", "Beni"],
  citySuffix: ["phis", "is", "opolis", "tine", "os", "amon", "en"],
  
  // Leader titles and naming
  ruleTitles: ["Pharaoh", "Per-aa", "Divine Ruler", "King of Upper and Lower Egypt"],
  leaderNames: {
    male: ["Ramesses", "Amenhotep", "Thutmose", "Akhenaten", "Seti", "Khufu", "Sneferu", "Khafre", "Menkaure", "Pepi", "Djoser", "Narmer"],
    female: ["Hatshepsut", "Nefertiti", "Cleopatra", "Nefertari", "Meritaten", "Ankhesenamun", "Sobekneferu", "Tausret", "Nitocris"]
  },
  dynastyNames: ["Ptolemaic", "Thutmosid", "Ramesside", "Memphite", "Theban", "Heracleopolitan"],
  
  // Geography requirements
  geography: {
    requiresRiver: true,
    preferredBiomes: ["desert", "savanna"],
    riverValleyDependent: 0.9,
    coastalPreference: 0.4
  },
  
  // Government
  governmentTypes: ["theocracy", "kingdom"],
  defaultGovernment: "theocracy",
  
  // Military
  militaryComposition: {
    chariotArchers: 0.3,
    infantry: 0.4,
    archers: 0.2,
    naval: 0.1
  },
  militaryUnits: ["Sherden Guard", "Nubian Archers", "Chariot Corps", "Medjay Police"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.95,
    urbanization: 0.7,
    fortification: 0.6,
    expansion: 0.5,
    trade: 0.7,
    literacy: 0.6
  },
  
  // Religion
  pantheon: [
    {name: "Ra", domain: "Sun", importance: 1.0},
    {name: "Osiris", domain: "Afterlife", importance: 0.95},
    {name: "Isis", domain: "Magic", importance: 0.9},
    {name: "Horus", domain: "Sky", importance: 0.85},
    {name: "Anubis", domain: "Death", importance: 0.8},
    {name: "Thoth", domain: "Wisdom", importance: 0.75},
    {name: "Ptah", domain: "Crafts", importance: 0.7},
    {name: "Hathor", domain: "Love", importance: 0.65},
    {name: "Set", domain: "Chaos", importance: 0.6},
    {name: "Bastet", domain: "Protection", importance: 0.55}
  ],
  religiousImportance: 0.95,
  religiousSites: ["Temple", "Pyramid Complex", "Mortuary Temple", "Sacred Lake"],
  
  // Landmarks
  landmarks: ["pyramid", "temple", "obelisk", "sphinx", "mastaba"],
  
  // Historical constraints
  constraints: {
    minYear: -3100,
    maxYear: -30,
    maxStateSize: 80,
    preferredLatitude: {min: 20, max: 35}
  }
};
