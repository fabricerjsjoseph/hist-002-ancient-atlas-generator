"use strict";
// Historical Mode Module
// Core logic for switching between Fantasy and Historical map generation

window.HistoricalMode = (function() {
  // Private state
  let enabled = false;
  let currentPeriod = null;
  let selectedCivilizations = [];
  let loadedCivilizations = {};
  
  // Available civilization data files
  const civilizationFiles = {
    // Bronze Age
    egyptian: "data/civilizations/egyptian.js",
    sumerian: "data/civilizations/sumerian.js",
    minoan: "data/civilizations/minoan.js",
    hittite: "data/civilizations/hittite.js",
    mycenaean: "data/civilizations/mycenaean.js",
    // Classical Age
    greek: "data/civilizations/greek.js",
    roman: "data/civilizations/roman.js",
    persian: "data/civilizations/persian.js",
    carthaginian: "data/civilizations/carthaginian.js",
    celtic: "data/civilizations/celtic.js"
  };
  
  // Civilization data lookup by ID
  const civilizationDataMap = {
    egyptian: () => window.CivilizationEgyptian,
    sumerian: () => window.CivilizationSumerian,
    minoan: () => window.CivilizationMinoan,
    hittite: () => window.CivilizationHittite,
    mycenaean: () => window.CivilizationMycenaean,
    greek: () => window.CivilizationGreek,
    roman: () => window.CivilizationRoman,
    persian: () => window.CivilizationPersian,
    carthaginian: () => window.CivilizationCarthaginian,
    celtic: () => window.CivilizationCeltic
  };
  
  // Public API
  return {
    // Check if historical mode is enabled
    isEnabled: function() {
      return enabled;
    },
    
    // Get current period
    getCurrentPeriod: function() {
      return currentPeriod;
    },
    
    // Get selected civilizations
    getSelectedCivilizations: function() {
      return selectedCivilizations;
    },
    
    // Enable historical mode with a specific period
    enable: function(periodId) {
      if (!window.HistoricalPeriods || !window.HistoricalPeriods[periodId]) {
        console.warn(`Historical period '${periodId}' not found`);
        return false;
      }
      
      enabled = true;
      currentPeriod = periodId;
      selectedCivilizations = [];
      
      // Load civilizations for this period
      this.loadPeriodCivilizations(periodId);
      
      INFO && console.log(`Historical Mode enabled: ${window.HistoricalPeriods[periodId].displayName}`);
      return true;
    },
    
    // Disable historical mode (return to fantasy mode)
    disable: function() {
      enabled = false;
      currentPeriod = null;
      selectedCivilizations = [];
      
      INFO && console.log("Historical Mode disabled, returning to Fantasy Mode");
      return true;
    },
    
    // Toggle historical mode
    toggle: function(periodId) {
      if (enabled) {
        return this.disable();
      } else {
        return this.enable(periodId || "bronzeAge");
      }
    },
    
    // Load civilization data for a period
    loadPeriodCivilizations: function(periodId) {
      const period = window.HistoricalPeriods[periodId];
      if (!period) {
        WARN && console.warn(`Historical period '${periodId}' not found for loading civilizations`);
        return;
      }
      
      period.civilizations.forEach(civId => {
        try {
          if (civilizationDataMap[civId]) {
            const civData = civilizationDataMap[civId]();
            if (civData) {
              loadedCivilizations[civId] = civData;
              INFO && console.log(`Loaded civilization: ${civData.name}`);
            } else {
              WARN && console.warn(`Civilization data for '${civId}' is null or undefined`);
            }
          } else {
            WARN && console.warn(`No data map entry for civilization '${civId}'`);
          }
        } catch (error) {
          ERROR && console.error(`Failed to load civilization '${civId}':`, error);
        }
      });
      
      // Default to all civilizations in the period
      selectedCivilizations = [...period.civilizations];
    },
    
    // Select specific civilizations (subset of period)
    selectCivilizations: function(civIds) {
      if (!Array.isArray(civIds)) civIds = [civIds];
      
      const period = window.HistoricalPeriods[currentPeriod];
      if (!period) {
        WARN && console.warn(`Cannot select civilizations: current period '${currentPeriod}' not found`);
        return;
      }
      
      // Filter to only valid civilizations for the current period
      selectedCivilizations = civIds.filter(id => period.civilizations.includes(id));
      INFO && console.log(`Selected civilizations: ${selectedCivilizations.join(", ")}`);
    },
    
    // Get civilization data by ID
    getCivilization: function(civId) {
      return loadedCivilizations[civId] || null;
    },
    
    // Get all loaded civilizations
    getLoadedCivilizations: function() {
      return loadedCivilizations;
    },
    
    // Apply historical constraints to generation parameters
    applyConstraints: function(generation) {
      if (!enabled || !currentPeriod) return generation;
      
      const period = window.HistoricalPeriods[currentPeriod];
      if (!period) return generation;
      
      // Apply period-specific constraints
      generation.maxStates = Math.min(generation.maxStates || 100, period.maxStateSize);
      generation.governmentTypes = period.governmentTypes;
      generation.technology = period.technology;
      generation.historicalPeriod = currentPeriod;
      generation.civilizations = selectedCivilizations;
      
      INFO && console.log(`Applied historical constraints for ${period.name}`);
      return generation;
    },
    
    // Get recommended generation settings for historical mode
    getRecommendedSettings: function() {
      if (!enabled || !currentPeriod) {
        return null;
      }
      
      const period = window.HistoricalPeriods[currentPeriod];
      
      return {
        statesNumber: Math.min(period.maxStateSize, 30),
        culturesSet: "antique",
        year: Math.floor((period.years.start + period.years.end) / 2),
        era: period.name
      };
    },
    
    // Get display name for current mode
    getModeDisplayName: function() {
      if (!enabled) return "Fantasy Mode";
      if (!currentPeriod) return "Historical Mode";
      
      const period = window.HistoricalPeriods[currentPeriod];
      return period ? period.displayName : "Historical Mode";
    }
  };
})();
