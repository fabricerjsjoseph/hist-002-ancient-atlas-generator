"use strict";
// Historical Pantheons Module
// Comprehensive deity databases for all civilizations

window.HistoricalPantheons = (function() {
  
  // Pantheon data by civilization
  const pantheons = {
    egyptian: {
      deities: [
        {name: "Ra", domain: "Sun", importance: 1.0, description: "King of gods, solar deity"},
        {name: "Osiris", domain: "Afterlife", importance: 0.95, description: "God of the dead and resurrection"},
        {name: "Isis", domain: "Magic", importance: 0.9, description: "Goddess of magic and motherhood"},
        {name: "Horus", domain: "Sky", importance: 0.85, description: "Sky god, protector of pharaohs"},
        {name: "Anubis", domain: "Death", importance: 0.8, description: "God of mummification and guide to the afterlife"},
        {name: "Thoth", domain: "Wisdom", importance: 0.75, description: "God of writing, wisdom, and the moon"},
        {name: "Ptah", domain: "Crafts", importance: 0.7, description: "Creator god, patron of craftsmen"},
        {name: "Hathor", domain: "Love", importance: 0.65, description: "Goddess of love, beauty, and music"},
        {name: "Set", domain: "Chaos", importance: 0.6, description: "God of chaos, storms, and the desert"},
        {name: "Bastet", domain: "Protection", importance: 0.55, description: "Goddess of protection, cats, and joy"}
      ],
      religiousImportance: 0.95,
      religiousSites: ["Temple", "Pyramid Complex", "Mortuary Temple", "Sacred Lake"],
      form: "Polytheism"
    },
    
    sumerian: {
      deities: [
        {name: "An", domain: "Heaven", importance: 1.0, description: "God of heaven, king of gods"},
        {name: "Enlil", domain: "Air", importance: 0.95, description: "Lord of wind and storms"},
        {name: "Enki", domain: "Water", importance: 0.9, description: "God of water, knowledge, and creation"},
        {name: "Inanna", domain: "Love/War", importance: 0.85, description: "Goddess of love, war, and fertility"},
        {name: "Nanna", domain: "Moon", importance: 0.8, description: "God of the moon"},
        {name: "Utu", domain: "Sun", importance: 0.75, description: "God of the sun and justice"},
        {name: "Ninhursag", domain: "Earth", importance: 0.7, description: "Mother goddess, lady of the mountain"},
        {name: "Nergal", domain: "Death", importance: 0.65, description: "God of death and plague"},
        {name: "Dumuzi", domain: "Shepherds", importance: 0.6, description: "God of shepherds and fertility"},
        {name: "Ereshkigal", domain: "Underworld", importance: 0.55, description: "Queen of the underworld"}
      ],
      religiousImportance: 0.9,
      religiousSites: ["Ziggurat", "Temple Complex", "Sacred Precinct", "E-temple"],
      form: "Polytheism"
    },
    
    minoan: {
      deities: [
        {name: "Potnia", domain: "Nature", importance: 1.0, description: "Great mother goddess"},
        {name: "Snake Goddess", domain: "Household", importance: 0.9, description: "Protector of households"},
        {name: "Bull God", domain: "Power", importance: 0.85, description: "Symbol of power and fertility"},
        {name: "Britomartis", domain: "Hunting", importance: 0.8, description: "Goddess of hunting and mountains"},
        {name: "Velchanos", domain: "Vegetation", importance: 0.75, description: "God of vegetation and renewal"},
        {name: "Diktynna", domain: "Mountains", importance: 0.7, description: "Mountain goddess"}
      ],
      religiousImportance: 0.85,
      religiousSites: ["Palace Shrine", "Peak Sanctuary", "Cave Sanctuary", "Sacred Grove"],
      form: "Polytheism"
    },
    
    hittite: {
      deities: [
        {name: "Tarhunt", domain: "Storm", importance: 1.0, description: "Storm god, king of gods"},
        {name: "Arinniti", domain: "Sun", importance: 0.95, description: "Sun goddess of Arinna"},
        {name: "Hepat", domain: "Queen", importance: 0.85, description: "Queen of the gods"},
        {name: "Telepinu", domain: "Fertility", importance: 0.8, description: "God of agriculture"},
        {name: "Kumarbi", domain: "Father of Gods", importance: 0.75, description: "Father of the gods"},
        {name: "Shaushka", domain: "War/Love", importance: 0.7, description: "Goddess of war and love"},
        {name: "Lelwani", domain: "Underworld", importance: 0.65, description: "Goddess of the underworld"}
      ],
      religiousImportance: 0.85,
      religiousSites: ["Rock Sanctuary", "Temple", "Storm God Shrine", "Yazılıkaya"],
      form: "Polytheism"
    },
    
    mycenaean: {
      deities: [
        {name: "Zeus", domain: "Sky", importance: 1.0, description: "Sky god, king of gods"},
        {name: "Poseidon", domain: "Sea", importance: 0.95, description: "God of the sea and earthquakes"},
        {name: "Hera", domain: "Marriage", importance: 0.85, description: "Goddess of marriage"},
        {name: "Athena", domain: "Wisdom", importance: 0.8, description: "Goddess of wisdom and war"},
        {name: "Ares", domain: "War", importance: 0.75, description: "God of war"},
        {name: "Dionysus", domain: "Wine", importance: 0.7, description: "God of wine and ecstasy"},
        {name: "Potnia", domain: "Mistress", importance: 0.65, description: "The mistress, great goddess"}
      ],
      religiousImportance: 0.75,
      religiousSites: ["Megaron", "Tholos Tomb", "Cult Center", "Sacred Spring"],
      form: "Polytheism"
    },
    
    greek: {
      deities: [
        {name: "Zeus", domain: "Sky/King", importance: 1.0, description: "King of the gods, sky and thunder"},
        {name: "Athena", domain: "Wisdom", importance: 0.95, description: "Goddess of wisdom, warfare, and crafts"},
        {name: "Apollo", domain: "Sun/Arts", importance: 0.9, description: "God of sun, music, prophecy, and healing"},
        {name: "Poseidon", domain: "Sea", importance: 0.85, description: "God of the sea and earthquakes"},
        {name: "Hera", domain: "Marriage", importance: 0.8, description: "Queen of the gods, goddess of marriage"},
        {name: "Ares", domain: "War", importance: 0.75, description: "God of war and courage"},
        {name: "Artemis", domain: "Hunt", importance: 0.7, description: "Goddess of the hunt and wilderness"},
        {name: "Aphrodite", domain: "Love", importance: 0.65, description: "Goddess of love and beauty"},
        {name: "Hermes", domain: "Trade", importance: 0.6, description: "Messenger god, god of trade and travelers"},
        {name: "Hephaestus", domain: "Forge", importance: 0.55, description: "God of fire and metalworking"},
        {name: "Demeter", domain: "Harvest", importance: 0.5, description: "Goddess of agriculture and harvest"},
        {name: "Dionysus", domain: "Wine", importance: 0.45, description: "God of wine, theater, and ecstasy"}
      ],
      religiousImportance: 0.8,
      religiousSites: ["Temple", "Oracle", "Agora Shrine", "Mystery Sanctuary", "Panhellenic Sanctuary"],
      form: "Polytheism"
    },
    
    roman: {
      deities: [
        {name: "Jupiter", domain: "Sky/King", importance: 1.0, description: "King of the gods, sky and thunder"},
        {name: "Mars", domain: "War", importance: 0.95, description: "God of war and agriculture"},
        {name: "Minerva", domain: "Wisdom", importance: 0.9, description: "Goddess of wisdom and strategic warfare"},
        {name: "Juno", domain: "Marriage", importance: 0.85, description: "Queen of the gods, protector of Rome"},
        {name: "Neptune", domain: "Sea", importance: 0.8, description: "God of the sea and freshwater"},
        {name: "Venus", domain: "Love", importance: 0.75, description: "Goddess of love and beauty"},
        {name: "Apollo", domain: "Sun", importance: 0.7, description: "God of sun, prophecy, and healing"},
        {name: "Diana", domain: "Hunt", importance: 0.65, description: "Goddess of the hunt and moon"},
        {name: "Mercury", domain: "Trade", importance: 0.6, description: "God of trade and travelers"},
        {name: "Vulcan", domain: "Forge", importance: 0.55, description: "God of fire and metalworking"},
        {name: "Ceres", domain: "Harvest", importance: 0.5, description: "Goddess of agriculture"},
        {name: "Bacchus", domain: "Wine", importance: 0.45, description: "God of wine and revelry"}
      ],
      religiousImportance: 0.7,
      religiousSites: ["Temple", "Capitol", "Shrine", "Sacred Grove", "Vestal Temple"],
      form: "Polytheism"
    },
    
    persian: {
      deities: [
        {name: "Ahura Mazda", domain: "Wisdom/Light", importance: 1.0, description: "Lord of wisdom and light, supreme deity"},
        {name: "Mithra", domain: "Sun/Contracts", importance: 0.85, description: "God of the sun and covenant"},
        {name: "Anahita", domain: "Water/Fertility", importance: 0.8, description: "Goddess of waters and fertility"},
        {name: "Verethragna", domain: "Victory", importance: 0.7, description: "God of victory and warrior deity"},
        {name: "Atar", domain: "Fire", importance: 0.65, description: "Spirit of fire"},
        {name: "Tishtrya", domain: "Rain", importance: 0.6, description: "God of rain and fertility"}
      ],
      religiousImportance: 0.85,
      religiousSites: ["Fire Temple", "Royal Palace", "Apadana", "Paradise Garden"],
      form: "Zoroastrianism"
    },
    
    carthaginian: {
      deities: [
        {name: "Baal Hammon", domain: "Sky/Fertility", importance: 1.0, description: "Chief god, lord of the brazier"},
        {name: "Tanit", domain: "Moon/War", importance: 0.95, description: "Chief goddess, face of Baal"},
        {name: "Melqart", domain: "City/Sea", importance: 0.85, description: "God of the city and maritime trade"},
        {name: "Eshmun", domain: "Healing", importance: 0.75, description: "God of healing"},
        {name: "Astarte", domain: "Love/War", importance: 0.7, description: "Goddess of love and war"},
        {name: "Resheph", domain: "Plague/War", importance: 0.6, description: "God of plague and war"}
      ],
      religiousImportance: 0.85,
      religiousSites: ["Tophet", "Temple of Tanit", "Harbor Temple", "Sacred Precinct"],
      form: "Polytheism"
    },
    
    celtic: {
      deities: [
        {name: "Lugus", domain: "Light/Crafts", importance: 1.0, description: "God of light and all crafts"},
        {name: "Taranis", domain: "Thunder", importance: 0.9, description: "God of thunder and the wheel"},
        {name: "Teutatis", domain: "Tribe", importance: 0.85, description: "God of the tribe and people"},
        {name: "Esus", domain: "Trees", importance: 0.8, description: "God of trees and woodlands"},
        {name: "Cernunnos", domain: "Animals", importance: 0.75, description: "Horned god of animals and nature"},
        {name: "Brigantia", domain: "Victory", importance: 0.7, description: "Goddess of victory and sovereignty"},
        {name: "Epona", domain: "Horses", importance: 0.65, description: "Goddess of horses and fertility"},
        {name: "Belenos", domain: "Sun", importance: 0.6, description: "God of the sun and healing"}
      ],
      religiousImportance: 0.85,
      religiousSites: ["Sacred Grove", "Nemeton", "Spring Sanctuary", "Hilltop Shrine"],
      form: "Polytheism"
    }
  };
  
  // Get pantheon data for a civilization
  function getPantheon(civilizationId) {
    return pantheons[civilizationId];
  }
  
  // Get all deities for a civilization
  function getDeities(civilizationId) {
    const pantheon = pantheons[civilizationId];
    return pantheon ? pantheon.deities : [];
  }
  
  // Get a specific deity by name
  function getDeity(civilizationId, deityName) {
    const deities = getDeities(civilizationId);
    return deities.find(d => d.name === deityName);
  }
  
  // Get top N most important deities
  function getTopDeities(civilizationId, count = 3) {
    const deities = getDeities(civilizationId);
    return deities
      .sort((a, b) => b.importance - a.importance)
      .slice(0, count);
  }
  
  // Get deity by domain
  function getDeityByDomain(civilizationId, domain) {
    const deities = getDeities(civilizationId);
    return deities.find(d => d.domain.toLowerCase().includes(domain.toLowerCase()));
  }
  
  // Get religious site types for civilization
  function getReligiousSites(civilizationId) {
    const pantheon = pantheons[civilizationId];
    return pantheon ? pantheon.religiousSites : [];
  }
  
  // Get religious importance for civilization
  function getReligiousImportance(civilizationId) {
    const pantheon = pantheons[civilizationId];
    return pantheon ? pantheon.religiousImportance : 0.5;
  }
  
  // Get religious form (Polytheism, Zoroastrianism, etc.)
  function getReligiousForm(civilizationId) {
    const pantheon = pantheons[civilizationId];
    return pantheon ? pantheon.form : "Polytheism";
  }
  
  // Get a random deity from pantheon
  function getRandomDeity(civilizationId) {
    const deities = getDeities(civilizationId);
    if (deities.length === 0) return null;
    
    // Weight selection by importance
    const totalImportance = deities.reduce((sum, d) => sum + d.importance, 0);
    let random = Math.random() * totalImportance;
    
    for (const deity of deities) {
      random -= deity.importance;
      if (random <= 0) return deity;
    }
    
    return deities[0];
  }
  
  // Get multiple random deities (for state religion)
  function getRandomDeities(civilizationId, count = 3) {
    const deities = getDeities(civilizationId);
    if (deities.length === 0) return [];
    
    // Weighted random selection without replacement
    const selected = [];
    const available = [...deities];
    
    for (let i = 0; i < Math.min(count, available.length); i++) {
      const totalImportance = available.reduce((sum, d) => sum + d.importance, 0);
      let random = Math.random() * totalImportance;
      
      for (let j = 0; j < available.length; j++) {
        random -= available[j].importance;
        if (random <= 0) {
          selected.push(available[j]);
          available.splice(j, 1);
          break;
        }
      }
    }
    
    return selected;
  }
  
  // Get all civilization IDs with pantheons
  function getCivilizations() {
    return Object.keys(pantheons);
  }
  
  // Public API
  return {
    getPantheon,
    getDeities,
    getDeity,
    getTopDeities,
    getDeityByDomain,
    getReligiousSites,
    getReligiousImportance,
    getReligiousForm,
    getRandomDeity,
    getRandomDeities,
    getCivilizations
  };
})();
