"use strict";
// Ancient Landmarks Module
// Places civilization-specific landmarks (pyramids, ziggurats, temples, forums, etc.)

window.AncientLandmarks = (function() {
  
  // Store landmark data
  let landmarks = [];
  
  // Landmark type definitions with icons and placement rules
  const landmarkTypes = {
    pyramid: {
      icon: "🔺",
      name: "Pyramid",
      dx: 0,
      dy: 48,
      px: 14,
      requiresDesert: true,
      requiresRiver: true,
      nearCapital: 0.8,
      rarity: 0.05
    },
    ziggurat: {
      icon: "🏯",
      name: "Ziggurat",
      dx: 0,
      dy: 0,
      px: 14,
      requiresRiver: true,
      nearCapital: 0.9,
      rarity: 0.08
    },
    temple: {
      icon: "🏛️",
      name: "Temple",
      dx: 0,
      dy: 0,
      px: 14,
      nearCapital: 0.5,
      rarity: 0.15
    },
    obelisk: {
      icon: "🗼",
      name: "Obelisk",
      dx: 0,
      dy: 0,
      px: 12,
      nearCapital: 0.7,
      rarity: 0.12
    },
    sphinx: {
      icon: "🦁",
      name: "Sphinx",
      dx: 0,
      dy: 48,
      px: 14,
      requiresDesert: true,
      nearCapital: 0.9,
      rarity: 0.03
    },
    mastaba: {
      icon: "⬜",
      name: "Mastaba",
      dx: 0,
      dy: 0,
      px: 12,
      requiresDesert: true,
      nearCapital: 0.6,
      rarity: 0.1
    },
    forum: {
      icon: "🏟️",
      name: "Forum",
      dx: 0,
      dy: 0,
      px: 14,
      nearCapital: 0.8,
      rarity: 0.2
    },
    colosseum: {
      icon: "🏟️",
      name: "Colosseum",
      dx: 0,
      dy: 0,
      px: 14,
      nearCapital: 0.7,
      rarity: 0.05
    },
    aqueduct: {
      icon: "🌉",
      name: "Aqueduct",
      dx: 0,
      dy: 0,
      px: 14,
      nearWater: true,
      nearCapital: 0.4,
      rarity: 0.12
    },
    triumphal_arch: {
      icon: "🏛️",
      name: "Triumphal Arch",
      dx: 0,
      dy: 0,
      px: 13,
      nearCapital: 0.6,
      rarity: 0.08
    },
    basilica: {
      icon: "⛪",
      name: "Basilica",
      dx: 0,
      dy: 0,
      px: 13,
      nearCapital: 0.5,
      rarity: 0.1
    },
    thermae: {
      icon: "♨️",
      name: "Thermae",
      dx: 0,
      dy: 52,
      px: 13,
      nearWater: true,
      nearCapital: 0.5,
      rarity: 0.15
    },
    circus: {
      icon: "🏇",
      name: "Circus",
      dx: 0,
      dy: 0,
      px: 14,
      nearCapital: 0.7,
      rarity: 0.06
    },
    agora: {
      icon: "🏛️",
      name: "Agora",
      dx: 0,
      dy: 0,
      px: 14,
      nearCapital: 0.9,
      rarity: 0.25
    },
    theater: {
      icon: "🎭",
      name: "Theater",
      dx: 0,
      dy: 0,
      px: 14,
      nearCapital: 0.6,
      rarity: 0.2
    },
    gymnasium: {
      icon: "🏃",
      name: "Gymnasium",
      dx: 0,
      dy: 0,
      px: 13,
      nearCapital: 0.5,
      rarity: 0.15
    },
    stoa: {
      icon: "🏛️",
      name: "Stoa",
      dx: 0,
      dy: 0,
      px: 13,
      nearCapital: 0.7,
      rarity: 0.18
    },
    acropolis: {
      icon: "🏔️",
      name: "Acropolis",
      dx: 0,
      dy: 0,
      px: 14,
      requiresHills: true,
      nearCapital: 0.9,
      rarity: 0.08
    },
    palace: {
      icon: "👑",
      name: "Palace",
      dx: 0,
      dy: 0,
      px: 13,
      nearCapital: 0.95,
      rarity: 0.1
    },
    city_wall: {
      icon: "🧱",
      name: "City Wall",
      dx: 0,
      dy: 0,
      px: 13,
      nearCapital: 0.6,
      rarity: 0.2
    },
    irrigation_canal: {
      icon: "〰️",
      name: "Irrigation Canal",
      dx: 0,
      dy: 0,
      px: 14,
      requiresRiver: true,
      nearCapital: 0.3,
      rarity: 0.15
    }
  };
  
  /**
   * Initialize landmarks system
   */
  function initialize() {
    landmarks = [];
    INFO && console.log("Ancient landmarks system initialized");
  }
  
  /**
   * Generate landmarks for historical civilizations
   */
  function generate() {
    TIME && console.time("generateAncientLandmarks");
    landmarks = [];
    
    // Only generate in historical mode
    if (!window.HistoricalMode || !window.HistoricalMode.isEnabled()) {
      TIME && console.timeEnd("generateAncientLandmarks");
      return;
    }
    
    const selectedCivs = window.HistoricalMode.getSelectedCivilizations();
    if (!selectedCivs || selectedCivs.length === 0) {
      TIME && console.timeEnd("generateAncientLandmarks");
      return;
    }
    
    INFO && console.log("Generating ancient landmarks for", selectedCivs.length, "civilizations");
    
    // Generate landmarks for each civilization
    for (const civId of selectedCivs) {
      const civData = getCivilizationData(civId);
      if (civData && civData.landmarks) {
        generateLandmarksForCivilization(civId, civData);
      }
    }
    
    INFO && console.log("Generated", landmarks.length, "ancient landmarks");
    TIME && console.timeEnd("generateAncientLandmarks");
  }
  
  /**
   * Generate landmarks for a specific civilization
   * @param {string} civId - Civilization ID
   * @param {Object} civData - Civilization data
   */
  function generateLandmarksForCivilization(civId, civData) {
    if (!pack.burgs || !pack.cells) return;
    
    const landmarkTypesForCiv = civData.landmarks || [];
    const cells = pack.cells;
    
    // Find cities belonging to this civilization's culture
    const civCities = pack.burgs.filter(b => {
      if (!b.i || b.removed) return false;
      
      // Match by culture/civilization (this is a simplified check)
      // In a full implementation, you'd want to track which civilization each state belongs to
      return b.population > 0;
    });
    
    if (civCities.length === 0) return;
    
    // Generate landmarks for each type
    for (const landmarkType of landmarkTypesForCiv) {
      const typeConfig = landmarkTypes[landmarkType];
      if (!typeConfig) continue;
      
      // Calculate how many landmarks of this type to place
      const count = Math.floor(civCities.length * typeConfig.rarity);
      
      for (let i = 0; i < count; i++) {
        // Try to find a suitable location
        const location = findLandmarkLocation(civCities, typeConfig, cells);
        
        if (location) {
          landmarks.push({
            type: landmarkType,
            civilization: civId,
            cell: location.cell,
            x: location.x,
            y: location.y,
            name: generateLandmarkName(landmarkType, typeConfig, civData),
            icon: typeConfig.icon,
            dx: typeConfig.dx || 0,
            dy: typeConfig.dy || 0,
            px: typeConfig.px || 14
          });
        }
      }
    }
  }
  
  /**
   * Find a suitable location for a landmark
   * @param {Array} cities - Available cities
   * @param {Object} typeConfig - Landmark type configuration
   * @param {Object} cells - Map cells
   * @returns {Object} Location with cell, x, y
   */
  function findLandmarkLocation(cities, typeConfig, cells) {
    if (cities.length === 0) return null;
    
    // Filter cities based on placement requirements
    let candidates = cities.slice();
    
    // Near capital preference
    if (typeConfig.nearCapital && Math.random() < typeConfig.nearCapital) {
      const capitals = candidates.filter(c => c.capital);
      if (capitals.length > 0) {
        candidates = capitals;
      }
    }
    
    // Filter by terrain requirements
    candidates = candidates.filter(city => {
      const cell = city.cell;
      const height = cells.h[cell];
      const biome = cells.biome[cell];
      const temp = cells.temp[cell];
      
      // Desert requirement
      if (typeConfig.requiresDesert) {
        // Biome IDs: 1=Hot desert, 2=Cold desert
        if (biome !== 1 && biome !== 2) {
          // Check nearby cells for desert
          const neighbors = cells.c[cell];
          if (!neighbors) return false;
          const hasNearbyDesert = neighbors.some(n => cells.biome[n] === 1 || cells.biome[n] === 2);
          if (!hasNearbyDesert) return false;
        }
      }
      
      // River requirement
      if (typeConfig.requiresRiver) {
        if (!cells.r || !cells.r[cell] || cells.r[cell] === 0) {
          // Check nearby cells for river
          const neighbors = cells.c[cell];
          if (!neighbors) return false;
          const hasNearbyRiver = neighbors.some(n => cells.r && cells.r[n] && cells.r[n] > 0);
          if (!hasNearbyRiver) return false;
        }
      }
      
      // Hills requirement
      if (typeConfig.requiresHills) {
        if (height < 50 || height > 85) {
          // Check nearby cells
          const neighbors = cells.c[cell];
          if (!neighbors) return false;
          const hasNearbyHills = neighbors.some(n => {
            const h = cells.h[n];
            return h >= 50 && h <= 85;
          });
          if (!hasNearbyHills) return false;
        }
      }
      
      // Water requirement
      if (typeConfig.nearWater) {
        const neighbors = cells.c[cell];
        if (!neighbors) return false;
        const hasNearbyWater = neighbors.some(n => cells.h[n] < 20);
        if (!hasNearbyWater && height >= 20) return false;
      }
      
      return true;
    });
    
    if (candidates.length === 0) return null;
    
    // Select a random candidate
    const city = candidates[Math.floor(Math.random() * candidates.length)];
    
    // Place near the city but not exactly on it
    const angle = Math.random() * 2 * Math.PI;
    const distance = 2 + Math.random() * 3;
    
    return {
      cell: city.cell,
      x: city.x + Math.cos(angle) * distance,
      y: city.y + Math.sin(angle) * distance
    };
  }
  
  /**
   * Generate a name for a landmark
   * @param {string} landmarkType - Type of landmark
   * @param {Object} typeConfig - Landmark type configuration
   * @param {Object} civData - Civilization data
   * @returns {string} Landmark name
   */
  function generateLandmarkName(landmarkType, typeConfig, civData) {
    const baseName = typeConfig.name;
    
    // Use civilization-specific naming where appropriate
    if (civData.cityPrefix && civData.cityPrefix.length > 0) {
      const prefix = civData.cityPrefix[Math.floor(Math.random() * civData.cityPrefix.length)];
      return `${baseName} of ${prefix}`;
    }
    
    // Use deity names for religious structures
    if (["temple", "ziggurat", "shrine"].includes(landmarkType)) {
      if (civData.pantheon && civData.pantheon.length > 0) {
        const deity = civData.pantheon[Math.floor(Math.random() * Math.min(5, civData.pantheon.length))];
        return `${baseName} of ${deity.name}`;
      }
    }
    
    // Use generic name
    return baseName;
  }
  
  /**
   * Get civilization data object
   * @param {string} civId - Civilization ID
   * @returns {Object} Civilization data
   */
  function getCivilizationData(civId) {
    const civMap = {
      "egyptian": window.CivilizationEgyptian,
      "sumerian": window.CivilizationSumerian,
      "minoan": window.CivilizationMinoan,
      "hittite": window.CivilizationHittite,
      "mycenaean": window.CivilizationMycenaean,
      "greek": window.CivilizationGreek,
      "roman": window.CivilizationRoman,
      "persian": window.CivilizationPersian,
      "carthaginian": window.CivilizationCarthaginian,
      "celtic": window.CivilizationCeltic
    };
    
    return civMap[civId];
  }
  
  /**
   * Get all landmarks
   * @returns {Array} Landmarks
   */
  function getLandmarks() {
    return landmarks;
  }
  
  /**
   * Get landmarks for a specific civilization
   * @param {string} civId - Civilization ID
   * @returns {Array} Landmarks for this civilization
   */
  function getLandmarksForCivilization(civId) {
    return landmarks.filter(l => l.civilization === civId);
  }
  
  /**
   * Add landmark to the map's marker system
   */
  function addToMarkers() {
    if (!pack.markers) pack.markers = [];
    
    landmarks.forEach((landmark, index) => {
      // Find next available marker ID
      const maxId = pack.markers.reduce((max, m) => Math.max(max, m.i || 0), 0);
      
      pack.markers.push({
        i: maxId + index + 1,
        icon: landmark.icon,
        type: `landmark-${landmark.type}`,
        dx: landmark.dx,
        dy: landmark.dy,
        px: landmark.px,
        x: landmark.x,
        y: landmark.y,
        cell: landmark.cell,
        legend: landmark.name,
        lock: false
      });
    });
  }
  
  // Public API
  return {
    initialize: initialize,
    generate: generate,
    getLandmarks: getLandmarks,
    getLandmarksForCivilization: getLandmarksForCivilization,
    addToMarkers: addToMarkers
  };
  
})();
