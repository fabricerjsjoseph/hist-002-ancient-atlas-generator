"use strict";
// Ancient Celtic Civilization Profile

window.CivilizationCeltic = {
  id: "celtic",
  name: "Celtic",
  period: "classical",
  
  // Name generation
  nameBase: 1, // Generic Celtic pattern
  cityPrefix: ["Lug", "Brig", "Nov", "Vind", "Dur", "Med", "Cam", "Ux", "Ver", "Al", "Bib"],
  citySuffix: ["dunum", "omagus", "antum", "obriga", "elaunum", "etum", "ona", "acum"],
  
  // Leader titles and naming
  ruleTitles: ["Vercingetorix", "Rix", "Brennus", "Chieftain", "High King"],
  leaderNames: {
    male: ["Vercingetorix", "Brennus", "Ambiorix", "Dumnorix", "Commius", "Indutiomarus", "Cassivellaunus", "Caratacus", "Cunobelinus"],
    female: ["Boudicca", "Cartimandua", "Medb", "Scathach", "Brigid"]
  },
  dynastyNames: ["Arverni", "Aedui", "Sequani", "Belgae", "Iceni", "Brigantes"],
  
  // Geography requirements
  geography: {
    requiresRiver: false,
    preferredBiomes: ["temperate", "forest"],
    riverValleyDependent: 0.5,
    coastalPreference: 0.5,
    forestPreference: 0.8
  },
  
  // Government
  governmentTypes: ["tribal_confederation", "chiefdom", "kingdom"],
  defaultGovernment: "tribal_confederation",
  
  // Military
  militaryComposition: {
    warriors: 0.5,
    cavalry: 0.25,
    chariots: 0.15,
    druids: 0.1
  },
  militaryUnits: ["Gaesatae", "Noble Cavalry", "War Chariots", "Tribal Warriors", "Naked Fanatics"],
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.4,
    urbanization: 0.5,
    fortification: 0.7,
    expansion: 0.7,
    trade: 0.7,
    literacy: 0.2
  },
  
  // Religion
  pantheon: [
    {name: "Lugus", domain: "Light/Crafts", importance: 1.0},
    {name: "Taranis", domain: "Thunder", importance: 0.9},
    {name: "Teutatis", domain: "Tribe", importance: 0.85},
    {name: "Esus", domain: "Trees", importance: 0.8},
    {name: "Cernunnos", domain: "Animals", importance: 0.75},
    {name: "Brigantia", domain: "Victory", importance: 0.7},
    {name: "Epona", domain: "Horses", importance: 0.65},
    {name: "Belenos", domain: "Sun", importance: 0.6}
  ],
  religiousImportance: 0.85,
  religiousSites: ["Sacred Grove", "Nemeton", "Spring Sanctuary", "Hilltop Shrine"],
  
  // Landmarks
  landmarks: ["oppidum", "hill_fort", "sacred_grove", "druid_sanctuary", "crannog"],
  
  // Historical constraints
  constraints: {
    minYear: -500,
    maxYear: 100,
    maxStateSize: 40,
    preferredLatitude: {min: 42, max: 58}
  }
};
