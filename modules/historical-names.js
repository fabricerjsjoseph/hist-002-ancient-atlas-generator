"use strict";
// Historical Names Module
// Provides specialized name generation for historical mode

window.HistoricalNames = (function() {
  
  // Get civilization-specific leader name with title
  function getLeader(civilizationId, gender = "male") {
    const patterns = window.HistoricalNamePatterns;
    if (!patterns || !patterns[civilizationId]) {
      // Fallback to generic name generation
      return Names.getBaseShort(8); // Roman base as fallback
    }

    const civPatterns = patterns[civilizationId];
    const name = patterns.utils.getRandomLeaderName(civilizationId, gender);
    const title = patterns.utils.getRandomTitle(civilizationId);

    if (!name) return Names.getBaseShort(8);

    return title ? `${title} ${name}` : name;
  }

  // Get leader name without title
  function getLeaderName(civilizationId, gender = "male") {
    const patterns = window.HistoricalNamePatterns;
    if (!patterns || !patterns[civilizationId]) {
      return Names.getBaseShort(8);
    }

    return patterns.utils.getRandomLeaderName(civilizationId, gender) || Names.getBaseShort(8);
  }

  // Get dynasty name for a civilization
  function getDynasty(civilizationId) {
    const patterns = window.HistoricalNamePatterns;
    if (!patterns || !patterns[civilizationId]) {
      return "Royal";
    }

    return patterns.utils.getRandomDynasty(civilizationId) || "Royal";
  }

  // Generate a historically-appropriate city name
  function getCity(civilizationId) {
    const patterns = window.HistoricalNamePatterns;
    if (!patterns || !patterns[civilizationId]) {
      return Names.getBaseShort(8);
    }

    const generated = patterns.utils.generateCityName(civilizationId);
    return generated || Names.getBaseShort(8);
  }

  // Get a full Roman name (tria nomina)
  function getRomanFullName() {
    const patterns = window.HistoricalNamePatterns;
    if (!patterns || !patterns.roman) {
      return Names.getBaseShort(8);
    }

    return patterns.utils.generateRomanName();
  }

  // Get ruler title for a civilization
  function getTitle(civilizationId) {
    const patterns = window.HistoricalNamePatterns;
    if (!patterns || !patterns[civilizationId]) {
      return "Ruler";
    }

    return patterns.utils.getRandomTitle(civilizationId) || "Ruler";
  }

  // Map civilization IDs to their corresponding name bases in names-generator.js
  const civilizationNameBases = {
    greek: 7,       // Greek base
    roman: 8,       // Roman base
    egyptian: 23,   // Mesopotamian (closest to Egyptian)
    sumerian: 23,   // Mesopotamian
    persian: 24,    // Iranian
    carthaginian: 42, // Levantine
    celtic: 22,     // Celtic
    minoan: 7,      // Greek (closest)
    hittite: 16,    // Turkish (geographic proximity)
    mycenaean: 7    // Greek
  };

  // Get the name base index for a civilization
  function getNameBase(civilizationId) {
    return civilizationNameBases[civilizationId] || 8; // Default to Roman
  }

  // Generate a state name for historical mode
  function getStateName(civilizationId, stateType) {
    const patterns = window.HistoricalNamePatterns;
    if (!patterns || !patterns[civilizationId]) {
      return Names.getState(8);
    }

    const cityPatterns = patterns[civilizationId].cityPatterns;
    if (!cityPatterns) return Names.getState(getNameBase(civilizationId));

    // Generate based on state type
    switch (civilizationId) {
      case "greek":
        // Greek poleis typically named after their main city
        return patterns.utils.generateCityName("greek") || Names.getState(7);
      
      case "roman":
        // Roman provinces often named after regions or tribes
        if (stateType === "province") {
          const suffixes = ["ia", "ica", "ana"];
          const base = Names.getBaseShort(8);
          return base + suffixes[Math.floor(Math.random() * suffixes.length)];
        }
        return patterns.utils.generateCityName("roman") || Names.getState(8);
      
      case "egyptian":
        // Egyptian nomes
        if (cityPatterns.nomes) {
          return cityPatterns.nomes[Math.floor(Math.random() * cityPatterns.nomes.length)];
        }
        return Names.getState(23);
      
      case "persian":
        // Persian satrapies
        const persianBase = Names.getBaseShort(24);
        return persianBase + "stan";
      
      default:
        return Names.getState(getNameBase(civilizationId));
    }
  }

  // Generate region name for historical maps
  function getRegionName(civilizationId) {
    const base = getNameBase(civilizationId);
    return Names.getState(base);
  }

  // Get a random epithet for a leader
  function getLeaderEpithet(civilizationId) {
    const epithets = {
      greek: ["the Great", "the Magnificent", "the Wise", "the Just", "the Liberator"],
      roman: ["Africanus", "Germanicus", "Britannicus", "Augustus", "Pius", "Felix"],
      egyptian: ["the Great", "Son of Amun", "Beloved of Ra", "Lord of Strength"],
      sumerian: ["the Mighty", "Builder of Cities", "King of Kings", "Lord of the Four Quarters"],
      persian: ["King of Kings", "the Great King", "Lord of the Lands", "Shah of Shahs"],
      carthaginian: ["the Navigator", "the Strategist", "Baal's Chosen"],
      celtic: ["the Brave", "the Bold", "Champion of the Tribe"],
      minoan: ["Lord of the Labyrinth", "Master of the Seas"],
      hittite: ["Great King", "My Sun", "Hero"],
      mycenaean: ["of the Golden Mask", "Shepherd of the People", "Tamer of Horses"]
    };

    const civEpithets = epithets[civilizationId] || epithets.greek;
    return civEpithets[Math.floor(Math.random() * civEpithets.length)];
  }

  // Generate a full ruler name with title and epithet
  function getFullRulerName(civilizationId, gender = "male") {
    const name = getLeaderName(civilizationId, gender);
    const title = getTitle(civilizationId);
    const epithet = Math.random() > 0.5 ? getLeaderEpithet(civilizationId) : "";

    if (epithet) {
      return `${title} ${name} ${epithet}`;
    }
    return `${title} ${name}`;
  }

  // Public API
  return {
    getLeader,
    getLeaderName,
    getDynasty,
    getCity,
    getRomanFullName,
    getTitle,
    getNameBase,
    getStateName,
    getRegionName,
    getLeaderEpithet,
    getFullRulerName,
    civilizationNameBases
  };
})();
