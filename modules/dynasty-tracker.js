"use strict";
// Dynasty Tracker Module
// Manages ruling families and dynasties for historical states

window.DynastyTracker = (function() {
  
  // Store dynasty information for each state
  let dynasties = {};
  
  // Private helper functions
  
  /**
   * Generate a random year offset for dynasty changes
   * @returns {number} Years until next dynasty change
   */
  function getSuccessionInterval() {
    // Dynasties typically last 50-300 years
    return Math.floor(50 + Math.random() * 250);
  }
  
  /**
   * Select a random item from an array
   * @param {Array} arr - Array to select from
   * @returns {*} Random element or null if empty
   */
  function randomFromArray(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // Public API
  return {
    
    /**
     * Initialize dynasty tracking system
     */
    initialize: function() {
      dynasties = {};
      INFO && console.log("Dynasty tracking initialized");
    },
    
    /**
     * Create a new dynasty for a state
     * @param {number} stateId - State identifier
     * @param {object} civilization - Civilization profile
     * @param {number} foundingYear - Year the dynasty was founded (optional)
     * @returns {object} Dynasty information
     */
    createDynasty: function(stateId, civilization, foundingYear) {
      if (!civilization) {
        WARN && console.warn(`Cannot create dynasty for state ${stateId}: no civilization provided`);
        return null;
      }
      
      // Get dynasty name from civilization or generate one
      let dynastyName;
      if (window.HistoricalNames && typeof window.HistoricalNames.getDynasty === 'function') {
        dynastyName = window.HistoricalNames.getDynasty(civilization.id);
      } else if (civilization.dynastyNames && civilization.dynastyNames.length > 0) {
        dynastyName = randomFromArray(civilization.dynastyNames);
      } else {
        dynastyName = "Unknown Dynasty";
      }
      
      // Get founding ruler name
      let founderName;
      if (window.HistoricalNames && typeof window.HistoricalNames.getLeaderName === 'function') {
        founderName = window.HistoricalNames.getLeaderName(civilization.id);
      } else if (civilization.leaderNames && civilization.leaderNames.male) {
        founderName = randomFromArray(civilization.leaderNames.male);
      } else {
        founderName = "Unknown";
      }
      
      const dynasty = {
        id: stateId,
        name: dynastyName,
        founder: founderName,
        foundingYear: foundingYear || 0,
        civilizationId: civilization.id,
        rulers: [{
          name: founderName,
          startYear: foundingYear || 0,
          endYear: null, // Current ruler
          title: this.getRulerTitle(civilization)
        }],
        isActive: true
      };
      
      dynasties[stateId] = dynasty;
      return dynasty;
    },
    
    /**
     * Get dynasty information for a state
     * @param {number} stateId - State identifier
     * @returns {object|null} Dynasty information or null
     */
    getDynasty: function(stateId) {
      return dynasties[stateId] || null;
    },
    
    /**
     * Get all dynasties
     * @returns {object} All dynasty information
     */
    getAllDynasties: function() {
      return dynasties;
    },
    
    /**
     * Get dynasty name for a state
     * @param {number} stateId - State identifier
     * @returns {string} Dynasty name or empty string
     */
    getDynastyName: function(stateId) {
      const dynasty = dynasties[stateId];
      return dynasty ? dynasty.name : "";
    },
    
    /**
     * Get current ruler for a state
     * @param {number} stateId - State identifier
     * @returns {object|null} Current ruler information
     */
    getCurrentRuler: function(stateId) {
      const dynasty = dynasties[stateId];
      if (!dynasty || !dynasty.rulers || dynasty.rulers.length === 0) {
        return null;
      }
      
      // Current ruler is the last one in the array with no end year
      const currentRuler = dynasty.rulers.find(r => r.endYear === null);
      return currentRuler || dynasty.rulers[dynasty.rulers.length - 1];
    },
    
    /**
     * Get ruler title from civilization
     * @param {object} civilization - Civilization profile
     * @returns {string} Ruler title
     */
    getRulerTitle: function(civilization) {
      if (!civilization || !civilization.ruleTitles || civilization.ruleTitles.length === 0) {
        return "Ruler";
      }
      return randomFromArray(civilization.ruleTitles);
    },
    
    /**
     * Get full ruler name with title for a state
     * @param {number} stateId - State identifier
     * @returns {string} Full ruler name with title
     */
    getFullRulerName: function(stateId) {
      const ruler = this.getCurrentRuler(stateId);
      if (!ruler) return "";
      
      return `${ruler.title} ${ruler.name}`;
    },
    
    /**
     * Get formatted dynasty display name
     * @param {number} stateId - State identifier
     * @returns {string} Formatted dynasty name
     */
    getFormattedDynastyName: function(stateId) {
      const dynasty = dynasties[stateId];
      if (!dynasty) return "";
      
      return `${dynasty.name} Dynasty`;
    },
    
    /**
     * Add a new ruler to a dynasty (succession)
     * @param {number} stateId - State identifier
     * @param {string} rulerName - New ruler's name
     * @param {number} year - Year of succession
     * @returns {boolean} Success status
     */
    addRuler: function(stateId, rulerName, year) {
      const dynasty = dynasties[stateId];
      if (!dynasty) {
        WARN && console.warn(`Cannot add ruler to state ${stateId}: no dynasty found`);
        return false;
      }
      
      // End the previous ruler's reign
      const currentRuler = dynasty.rulers.find(r => r.endYear === null);
      if (currentRuler) {
        currentRuler.endYear = year;
      }
      
      // Add new ruler
      dynasty.rulers.push({
        name: rulerName,
        startYear: year,
        endYear: null, // Current ruler
        title: currentRuler ? currentRuler.title : "Ruler"
      });
      
      return true;
    },
    
    /**
     * Generate succession event (for future event system)
     * @param {number} stateId - State identifier
     * @param {object} civilization - Civilization profile
     * @param {number} currentYear - Current game year
     * @returns {object|null} Succession event data
     */
    generateSuccession: function(stateId, civilization, currentYear) {
      const dynasty = dynasties[stateId];
      if (!dynasty) return null;
      
      const currentRuler = this.getCurrentRuler(stateId);
      if (!currentRuler) return null;
      
      // Generate new ruler name
      let newRulerName;
      if (window.HistoricalNames && typeof window.HistoricalNames.getLeaderName === 'function') {
        newRulerName = window.HistoricalNames.getLeaderName(civilization.id);
      } else if (civilization.leaderNames && civilization.leaderNames.male) {
        newRulerName = randomFromArray(civilization.leaderNames.male);
      } else {
        newRulerName = "Unknown";
      }
      
      return {
        type: "succession",
        stateId: stateId,
        dynasty: dynasty.name,
        oldRuler: currentRuler.name,
        newRuler: newRulerName,
        year: currentYear,
        description: `${newRulerName} succeeds ${currentRuler.name} as ${currentRuler.title}`
      };
    },
    
    /**
     * End a dynasty (state conquered or dissolved)
     * @param {number} stateId - State identifier
     * @param {number} endYear - Year the dynasty ended
     */
    endDynasty: function(stateId, endYear) {
      const dynasty = dynasties[stateId];
      if (!dynasty) return;
      
      dynasty.isActive = false;
      
      // End current ruler's reign
      const currentRuler = dynasty.rulers.find(r => r.endYear === null);
      if (currentRuler) {
        currentRuler.endYear = endYear;
      }
      
      INFO && console.log(`Dynasty ${dynasty.name} ended in year ${endYear}`);
    },
    
    /**
     * Check if a state has an active dynasty
     * @param {number} stateId - State identifier
     * @returns {boolean} True if dynasty is active
     */
    hasActiveDynasty: function(stateId) {
      const dynasty = dynasties[stateId];
      return dynasty ? dynasty.isActive : false;
    },
    
    /**
     * Get dynasty statistics for a state
     * @param {number} stateId - State identifier
     * @returns {object|null} Dynasty statistics
     */
    getDynastyStats: function(stateId) {
      const dynasty = dynasties[stateId];
      if (!dynasty) return null;
      
      const currentYear = pack && pack.time ? pack.time : 0;
      const age = currentYear - dynasty.foundingYear;
      
      return {
        name: dynasty.name,
        founder: dynasty.founder,
        age: age,
        rulerCount: dynasty.rulers.length,
        isActive: dynasty.isActive,
        currentRuler: this.getCurrentRuler(stateId)
      };
    },
    
    /**
     * Clear all dynasty data
     */
    clear: function() {
      dynasties = {};
      INFO && console.log("Dynasty tracking cleared");
    },
    
    /**
     * Export dynasty data for saving
     * @returns {object} Dynasty data for serialization
     */
    exportData: function() {
      return {
        dynasties: dynasties
      };
    },
    
    /**
     * Import dynasty data from save
     * @param {object} data - Saved dynasty data
     */
    importData: function(data) {
      if (data && data.dynasties) {
        dynasties = data.dynasties;
        INFO && console.log(`Imported ${Object.keys(dynasties).length} dynasties`);
      }
    }
  };
})();
