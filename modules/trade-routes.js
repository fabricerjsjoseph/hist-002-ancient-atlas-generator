"use strict";
// Trade Routes Module
// Generates historically-plausible trade networks for ancient civilizations

window.TradeRoutes = (function() {
  
  // Store trade route data
  let tradeRoutes = [];
  
  /**
   * Initialize trade routes system
   */
  function initialize() {
    tradeRoutes = [];
    INFO && console.log("Trade routes system initialized");
  }
  
  /**
   * Generate historical trade routes based on civilizations and geography
   */
  function generate() {
    TIME && console.time("generateTradeRoutes");
    tradeRoutes = [];
    
    // Only generate in historical mode
    if (!window.HistoricalMode || !window.HistoricalMode.isEnabled()) {
      TIME && console.timeEnd("generateTradeRoutes");
      return;
    }
    
    const selectedCivs = window.HistoricalMode.getSelectedCivilizations();
    if (!selectedCivs || selectedCivs.length === 0) {
      TIME && console.timeEnd("generateTradeRoutes");
      return;
    }
    
    INFO && console.log("Generating historical trade routes for", selectedCivs.length, "civilizations");
    
    // Generate sea trade routes for coastal/maritime civilizations
    generateSeaTradeRoutes(selectedCivs);
    
    // Generate overland caravan routes
    generateOverlandRoutes(selectedCivs);
    
    // Generate river trade routes
    generateRiverRoutes(selectedCivs);
    
    INFO && console.log("Generated", tradeRoutes.length, "trade routes");
    TIME && console.timeEnd("generateTradeRoutes");
  }
  
  /**
   * Generate sea trade routes connecting coastal cities
   * @param {Array} civilizations - Selected civilizations
   */
  function generateSeaTradeRoutes(civilizations) {
    if (!pack.burgs) return;
    
    // Find all port cities
    const ports = pack.burgs.filter(b => b.i && !b.removed && b.port);
    if (ports.length < 2) return;
    
    // Maritime civilizations have higher priority for sea routes
    const maritimeCivs = civilizations.filter(civ => {
      const civData = getCivilizationData(civ);
      return civData && civData.geography && civData.geography.coastalPreference > 0.6;
    });
    
    // Connect major ports
    const majorPorts = ports.filter(p => p.capital || p.population > 5);
    
    for (let i = 0; i < majorPorts.length; i++) {
      for (let j = i + 1; j < majorPorts.length; j++) {
        const port1 = majorPorts[i];
        const port2 = majorPorts[j];
        
        // Calculate distance
        const dx = port1.x - port2.x;
        const dy = port1.y - port2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only connect ports within reasonable distance
        if (distance < 200 && distance > 10) {
          const importance = calculateTradeImportance(port1, port2, maritimeCivs);
          
          if (importance > 0.3) {
            tradeRoutes.push({
              type: "sea",
              from: port1.i,
              to: port2.i,
              importance: importance,
              fromCell: port1.cell,
              toCell: port2.cell,
              distance: distance
            });
          }
        }
      }
    }
  }
  
  /**
   * Generate overland caravan routes
   * @param {Array} civilizations - Selected civilizations
   */
  function generateOverlandRoutes(civilizations) {
    if (!pack.burgs) return;
    
    const cities = pack.burgs.filter(b => b.i && !b.removed && b.population > 3);
    if (cities.length < 2) return;
    
    // Connect cities that are on different landmasses or far apart
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        const city1 = cities[i];
        const city2 = cities[j];
        
        // Calculate distance
        const dx = city1.x - city2.x;
        const dy = city1.y - city2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Overland routes for medium distances
        if (distance < 150 && distance > 15) {
          const importance = calculateTradeImportance(city1, city2, civilizations);
          
          // Add some randomness to route generation
          if (importance > 0.4 && Math.random() < 0.4) {
            tradeRoutes.push({
              type: "overland",
              from: city1.i,
              to: city2.i,
              importance: importance,
              fromCell: city1.cell,
              toCell: city2.cell,
              distance: distance
            });
          }
        }
      }
    }
  }
  
  /**
   * Generate river trade routes
   * @param {Array} civilizations - Selected civilizations
   */
  function generateRiverRoutes(civilizations) {
    if (!pack.burgs || !pack.rivers) return;
    
    // Find cities along major rivers
    const riverCities = pack.burgs.filter(b => {
      if (!b.i || b.removed) return false;
      
      const cell = pack.cells;
      const burgCell = b.cell;
      
      // Check if near a river
      return cell.r && cell.r[burgCell] && cell.r[burgCell] > 0;
    });
    
    if (riverCities.length < 2) return;
    
    // River-dependent civilizations
    const riverCivs = civilizations.filter(civ => {
      const civData = getCivilizationData(civ);
      return civData && civData.geography && civData.geography.riverValleyDependent > 0.5;
    });
    
    // Connect cities on the same river system
    for (let i = 0; i < riverCities.length; i++) {
      for (let j = i + 1; j < riverCities.length; j++) {
        const city1 = riverCities[i];
        const city2 = riverCities[j];
        
        const dx = city1.x - city2.x;
        const dy = city1.y - city2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100 && distance > 5) {
          const importance = calculateTradeImportance(city1, city2, riverCivs);
          
          if (importance > 0.35) {
            tradeRoutes.push({
              type: "river",
              from: city1.i,
              to: city2.i,
              importance: importance,
              fromCell: city1.cell,
              toCell: city2.cell,
              distance: distance
            });
          }
        }
      }
    }
  }
  
  /**
   * Calculate trade importance between two cities
   * @param {Object} city1 - First city
   * @param {Object} city2 - Second city
   * @param {Array} relevantCivs - Civilizations that boost this route
   * @returns {number} Importance value 0-1
   */
  function calculateTradeImportance(city1, city2, relevantCivs) {
    let importance = 0;
    
    // Base importance from population
    const popFactor = Math.min(1, (city1.population + city2.population) / 20);
    importance += popFactor * 0.4;
    
    // Capital cities increase importance
    if (city1.capital) importance += 0.2;
    if (city2.capital) importance += 0.2;
    
    // Different states increase importance (international trade)
    if (city1.state !== city2.state) {
      importance += 0.3;
    }
    
    // Civilization trade trait
    for (const civ of relevantCivs) {
      const civData = getCivilizationData(civ);
      if (civData && civData.culturalTraits && civData.culturalTraits.trade) {
        importance += civData.culturalTraits.trade * 0.2;
        break; // Only apply once
      }
    }
    
    return Math.min(1, importance);
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
   * Get all trade routes
   * @returns {Array} Trade routes
   */
  function getRoutes() {
    return tradeRoutes;
  }
  
  /**
   * Get trade routes for a specific city
   * @param {number} burgId - Burg ID
   * @returns {Array} Trade routes connected to this city
   */
  function getRoutesForCity(burgId) {
    return tradeRoutes.filter(r => r.from === burgId || r.to === burgId);
  }
  
  // Public API
  return {
    initialize: initialize,
    generate: generate,
    getRoutes: getRoutes,
    getRoutesForCity: getRoutesForCity
  };
  
})();
