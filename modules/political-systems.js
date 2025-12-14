"use strict";
// Political Systems Module
// Defines government type behaviors for historical civilizations

window.PoliticalSystems = (function() {
  
  // Government type definitions with their characteristics
  const governmentTypes = {
    cityState: {
      name: "City-State",
      description: "Independent polis with limited territory",
      maxTerritorySize: 25,
      capitalFocus: 0.9, // Power concentrated in capital city
      expansionRate: 0.5, // Low expansion tendency
      provinceSystem: false,
      vassalTendency: 0.2, // Low tendency to have vassals
      tributeTendency: 0.3 // Low tendency to extract tribute
    },
    
    empire: {
      name: "Empire",
      description: "Large centralized state with provinces",
      maxTerritorySize: 250,
      capitalFocus: 0.6, // Power distributed across provinces
      expansionRate: 0.95, // Very high expansion
      provinceSystem: true,
      vassalTendency: 0.8, // High tendency to have vassals
      tributeTendency: 0.9 // High tendency to extract tribute
    },
    
    republic: {
      name: "Republic",
      description: "Representative government with senate/council",
      maxTerritorySize: 150,
      capitalFocus: 0.7,
      expansionRate: 0.8, // High expansion
      provinceSystem: true,
      vassalTendency: 0.6,
      tributeTendency: 0.7
    },
    
    oligarchy: {
      name: "Oligarchy",
      description: "Rule by wealthy elite class",
      maxTerritorySize: 60,
      capitalFocus: 0.75,
      expansionRate: 0.6, // Moderate expansion
      provinceSystem: false,
      vassalTendency: 0.4,
      tributeTendency: 0.5
    },
    
    democracy: {
      name: "Democracy",
      description: "Direct or representative democracy",
      maxTerritorySize: 40,
      capitalFocus: 0.8,
      expansionRate: 0.5, // Lower expansion (defensive)
      provinceSystem: false,
      vassalTendency: 0.2,
      tributeTendency: 0.3
    },
    
    tyranny: {
      name: "Tyranny",
      description: "Autocratic rule by single tyrant",
      maxTerritorySize: 50,
      capitalFocus: 0.85,
      expansionRate: 0.7, // Varies by ruler
      provinceSystem: false,
      vassalTendency: 0.3,
      tributeTendency: 0.6
    },
    
    theocracy: {
      name: "Theocracy",
      description: "Religious leadership controls state",
      maxTerritorySize: 80,
      capitalFocus: 0.8, // Focus on holy city
      expansionRate: 0.6,
      provinceSystem: false,
      vassalTendency: 0.5,
      tributeTendency: 0.7 // Tribute for religious support
    },
    
    principate: {
      name: "Principate",
      description: "First citizen model (Roman-style)",
      maxTerritorySize: 200,
      capitalFocus: 0.65,
      expansionRate: 0.9,
      provinceSystem: true,
      vassalTendency: 0.7,
      tributeTendency: 0.8
    },
    
    monarchy: {
      name: "Monarchy",
      description: "Traditional hereditary kingship",
      maxTerritorySize: 100,
      capitalFocus: 0.7,
      expansionRate: 0.7,
      provinceSystem: true,
      vassalTendency: 0.6,
      tributeTendency: 0.6
    }
  };
  
  // Public API
  return {
    
    /**
     * Get government type configuration
     * @param {string} typeName - Government type identifier
     * @returns {object|null} Government type configuration or null if not found
     */
    getGovernmentType: function(typeName) {
      return governmentTypes[typeName] || null;
    },
    
    /**
     * Get all available government types
     * @returns {object} All government type configurations
     */
    getAllGovernmentTypes: function() {
      return governmentTypes;
    },
    
    /**
     * Select appropriate government type for a civilization
     * @param {object} civilization - Civilization profile data
     * @returns {string} Selected government type identifier
     */
    selectGovernmentType: function(civilization) {
      if (!civilization || !civilization.governmentTypes) {
        return "monarchy"; // Default fallback
      }
      
      // Use default government if specified
      if (civilization.defaultGovernment && 
          civilization.governmentTypes.includes(civilization.defaultGovernment)) {
        return civilization.defaultGovernment;
      }
      
      // Otherwise pick randomly from available government types
      const types = civilization.governmentTypes;
      if (types.length === 0) return "monarchy";
      
      // Random selection from civilization's valid government types
      return types[Math.floor(Math.random() * types.length)];
    },
    
    /**
     * Calculate state size constraint based on government and civilization
     * @param {string} governmentType - Government type identifier
     * @param {object} civilization - Civilization profile (optional)
     * @returns {number} Maximum state size (in cells)
     */
    getStateSizeConstraint: function(governmentType, civilization) {
      const govt = governmentTypes[governmentType];
      if (!govt) return 100; // Default
      
      let maxSize = govt.maxTerritorySize;
      
      // Apply civilization-specific constraints if provided
      if (civilization && civilization.constraints && civilization.constraints.maxStateSize) {
        maxSize = Math.min(maxSize, civilization.constraints.maxStateSize);
      }
      
      return maxSize;
    },
    
    /**
     * Calculate expansionism modifier based on government type
     * @param {string} governmentType - Government type identifier
     * @param {number} baseExpansionism - Base expansionism value
     * @returns {number} Modified expansionism value
     */
    getExpansionismModifier: function(governmentType, baseExpansionism) {
      const govt = governmentTypes[governmentType];
      if (!govt) return baseExpansionism;
      
      // Blend base expansionism with government tendency
      return (baseExpansionism * 0.5) + (govt.expansionRate * 0.5);
    },
    
    /**
     * Determine if state should have a province system
     * @param {string} governmentType - Government type identifier
     * @returns {boolean} True if state should have provinces
     */
    shouldHaveProvinces: function(governmentType) {
      const govt = governmentTypes[governmentType];
      return govt ? govt.provinceSystem : false;
    },
    
    /**
     * Calculate vassal probability for a state
     * @param {string} governmentType - Government type identifier
     * @param {number} stateSize - Current state size
     * @returns {number} Probability (0-1) of having vassals
     */
    getVassalProbability: function(governmentType, stateSize) {
      const govt = governmentTypes[governmentType];
      if (!govt) return 0.3; // Default
      
      // Larger states more likely to have vassals
      const sizeFactor = Math.min(stateSize / 100, 1.0);
      return govt.vassalTendency * sizeFactor;
    },
    
    /**
     * Calculate tribute probability for a state
     * @param {string} governmentType - Government type identifier
     * @returns {number} Probability (0-1) of extracting tribute
     */
    getTributeProbability: function(governmentType) {
      const govt = governmentTypes[governmentType];
      return govt ? govt.tributeTendency : 0.5;
    },
    
    /**
     * Get capital focus factor (how much power is concentrated in capital)
     * @param {string} governmentType - Government type identifier
     * @returns {number} Capital focus factor (0-1)
     */
    getCapitalFocus: function(governmentType) {
      const govt = governmentTypes[governmentType];
      return govt ? govt.capitalFocus : 0.7;
    },
    
    /**
     * Generate state configuration based on civilization and government
     * @param {object} civilization - Civilization profile
     * @param {string} governmentType - Government type (optional, will auto-select)
     * @returns {object} State configuration object
     */
    generateStateConfig: function(civilization, governmentType) {
      // Select government type if not provided
      if (!governmentType) {
        governmentType = this.selectGovernmentType(civilization);
      }
      
      const govt = governmentTypes[governmentType];
      if (!govt) {
        // Fallback configuration
        return {
          governmentType: "monarchy",
          maxSize: 100,
          expansionism: 0.7,
          hasProvinces: false,
          capitalFocus: 0.7
        };
      }
      
      return {
        governmentType: governmentType,
        governmentName: govt.name,
        maxSize: this.getStateSizeConstraint(governmentType, civilization),
        expansionism: govt.expansionRate,
        hasProvinces: govt.provinceSystem,
        capitalFocus: govt.capitalFocus,
        vassalTendency: govt.vassalTendency,
        tributeTendency: govt.tributeTendency
      };
    },
    
    /**
     * Check if a government type is valid for a civilization
     * @param {string} governmentType - Government type to check
     * @param {object} civilization - Civilization profile
     * @returns {boolean} True if valid for this civilization
     */
    isValidForCivilization: function(governmentType, civilization) {
      if (!civilization || !civilization.governmentTypes) return true;
      return civilization.governmentTypes.includes(governmentType);
    }
  };
})();
