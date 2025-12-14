"use strict";
// Historical Events Module
// Generates and manages historical events (wars, migrations, conquests, plagues, famines)

window.HistoricalEvents = (function() {
  
  // Store event history
  let events = [];
  let eventCounter = 0;
  
  // Event type definitions with frequencies and effects
  const eventTypes = {
    war: {
      name: "War",
      frequency: 0.3,
      effects: ["borderChange", "populationLoss", "militaryChange"],
      description: "Armed conflict between states",
      icon: "⚔️"
    },
    migration: {
      name: "Migration",
      frequency: 0.1,
      effects: ["cultureSpread", "populationShift", "newSettlement"],
      description: "Mass movement of peoples",
      icon: "👥"
    },
    conquest: {
      name: "Conquest",
      frequency: 0.2,
      effects: ["stateAbsorption", "borderChange", "cultureChange"],
      description: "Territorial expansion through force",
      icon: "🏴"
    },
    plague: {
      name: "Plague",
      frequency: 0.05,
      effects: ["populationDecline", "economicDecline", "tradeDisruption"],
      description: "Epidemic disease outbreak",
      icon: "☠️"
    },
    famine: {
      name: "Famine",
      frequency: 0.08,
      effects: ["populationDecline", "economicDecline", "migration"],
      description: "Widespread food shortage",
      icon: "🌾"
    },
    rebellion: {
      name: "Rebellion",
      frequency: 0.12,
      effects: ["dynastyChange", "borderChange", "newState"],
      description: "Uprising against ruling authority",
      icon: "✊"
    },
    naturalDisaster: {
      name: "Natural Disaster",
      frequency: 0.06,
      effects: ["populationLoss", "economicDecline", "cityDestruction"],
      description: "Earthquake, flood, or volcanic eruption",
      icon: "🌋"
    },
    foundation: {
      name: "City Foundation",
      frequency: 0.15,
      effects: ["newSettlement", "economicGrowth", "expansion"],
      description: "Establishment of a new city",
      icon: "🏛️"
    },
    alliance: {
      name: "Alliance",
      frequency: 0.18,
      effects: ["diplomaticChange", "tradeIncrease", "militaryCooperation"],
      description: "Diplomatic agreement between states",
      icon: "🤝"
    },
    dynasty: {
      name: "Dynasty Change",
      frequency: 0.14,
      effects: ["dynastyChange", "politicalChange"],
      description: "Change of ruling dynasty",
      icon: "👑"
    }
  };
  
  /**
   * Generate a random number between min and max
   */
  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Select random item from array
   */
  function randomFromArray(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  /**
   * Calculate event probability based on various factors
   */
  function calculateEventProbability(eventType, state, year) {
    let probability = eventTypes[eventType].frequency;
    
    // Adjust based on state conditions
    if (state) {
      // More populous states have more events
      if (state.cells && state.cells > 50) probability *= 1.2;
      
      // States with neighbors have more wars
      if (eventType === 'war' && state.diplomacy) {
        const enemies = state.diplomacy.filter(d => d === "Enemy").length;
        probability *= (1 + enemies * 0.1);
      }
    }
    
    // Adjust based on historical period
    if (window.HistoricalMode && window.HistoricalMode.isEnabled()) {
      const period = window.HistoricalMode.getCurrentPeriod();
      
      // Bronze Age: more migrations, fewer large wars
      if (period === "bronzeAge") {
        if (eventType === "migration") probability *= 1.5;
        if (eventType === "war") probability *= 0.7;
      }
      
      // Classical Age: more wars and conquests
      if (period === "classicalAge") {
        if (eventType === "war") probability *= 1.3;
        if (eventType === "conquest") probability *= 1.4;
      }
    }
    
    return probability;
  }
  
  // Public API
  return {
    
    /**
     * Initialize the events system
     */
    initialize: function() {
      events = [];
      eventCounter = 0;
      INFO && console.log("Historical Events system initialized");
    },
    
    /**
     * Generate a random historical event
     * @param {number} year - Current year
     * @param {object} options - Generation options
     * @returns {object|null} Generated event or null
     */
    generateEvent: function(year, options = {}) {
      if (!pack || !pack.states || pack.states.length === 0) return null;
      
      // Select random event type based on frequency
      const typeNames = Object.keys(eventTypes);
      const probabilities = typeNames.map(type => eventTypes[type].frequency);
      
      let randomValue = Math.random() * probabilities.reduce((a, b) => a + b, 0);
      let selectedType = typeNames[0];
      
      for (let i = 0; i < typeNames.length; i++) {
        randomValue -= probabilities[i];
        if (randomValue <= 0) {
          selectedType = typeNames[i];
          break;
        }
      }
      
      // Get random state for event
      const validStates = pack.states.filter(s => s.i && !s.removed);
      if (validStates.length === 0) return null;
      
      const state = randomFromArray(validStates);
      const eventDef = eventTypes[selectedType];
      
      // Create event object
      const event = {
        id: eventCounter++,
        type: selectedType,
        year: year,
        stateId: state.i,
        stateName: state.name,
        name: eventDef.name,
        description: this.generateEventDescription(selectedType, state, year),
        effects: eventDef.effects,
        icon: eventDef.icon,
        severity: randomRange(1, 5)
      };
      
      // Add type-specific details
      if (selectedType === "war" || selectedType === "conquest") {
        const neighbors = this.getNeighborStates(state.i);
        if (neighbors.length > 0) {
          const opponent = randomFromArray(neighbors);
          event.opponentId = opponent.i;
          event.opponentName = opponent.name;
        }
      }
      
      events.push(event);
      INFO && console.log(`Generated event: ${event.name} in ${state.name} (${year})`);
      
      return event;
    },
    
    /**
     * Generate descriptive text for an event
     */
    generateEventDescription: function(eventType, state, year) {
      const stateName = state.name || "Unknown State";
      
      const descriptions = {
        war: [
          `${stateName} engages in armed conflict`,
          `War breaks out in ${stateName}`,
          `${stateName} mobilizes for war`
        ],
        migration: [
          `Mass migration affects ${stateName}`,
          `Peoples move into ${stateName} territory`,
          `${stateName} experiences population influx`
        ],
        conquest: [
          `${stateName} expands through conquest`,
          `${stateName} conquers neighboring territories`,
          `Military expansion of ${stateName}`
        ],
        plague: [
          `Plague strikes ${stateName}`,
          `Epidemic devastates ${stateName}`,
          `Disease spreads through ${stateName}`
        ],
        famine: [
          `Famine afflicts ${stateName}`,
          `Food shortage in ${stateName}`,
          `Crop failure in ${stateName}`
        ],
        rebellion: [
          `Rebellion erupts in ${stateName}`,
          `${stateName} faces internal uprising`,
          `Revolt against rulers of ${stateName}`
        ],
        naturalDisaster: [
          `Natural disaster strikes ${stateName}`,
          `${stateName} suffers catastrophic event`,
          `Disaster devastates ${stateName}`
        ],
        foundation: [
          `New city founded in ${stateName}`,
          `${stateName} establishes new settlement`,
          `Settlement expansion in ${stateName}`
        ],
        alliance: [
          `${stateName} forms diplomatic alliance`,
          `${stateName} enters into treaty`,
          `Diplomatic agreement involving ${stateName}`
        ],
        dynasty: [
          `Dynasty change in ${stateName}`,
          `New ruling family in ${stateName}`,
          `${stateName} experiences succession`
        ]
      };
      
      const options = descriptions[eventType] || [`Event in ${stateName}`];
      return randomFromArray(options);
    },
    
    /**
     * Get neighboring states
     */
    getNeighborStates: function(stateId) {
      if (!pack || !pack.states) return [];
      
      const state = pack.states[stateId];
      if (!state || !state.neighbors) return [];
      
      return state.neighbors
        .map(id => pack.states[id])
        .filter(s => s && s.i && !s.removed);
    },
    
    /**
     * Generate events for a time period
     * @param {number} startYear - Starting year
     * @param {number} endYear - Ending year
     * @param {number} eventsPerYear - Average events per year
     * @returns {Array} Generated events
     */
    generateEventsForPeriod: function(startYear, endYear, eventsPerYear = 2) {
      const generatedEvents = [];
      
      for (let year = startYear; year <= endYear; year++) {
        const numEvents = Math.random() < 0.5 ? eventsPerYear : eventsPerYear + 1;
        
        for (let i = 0; i < numEvents; i++) {
          const event = this.generateEvent(year);
          if (event) generatedEvents.push(event);
        }
      }
      
      INFO && console.log(`Generated ${generatedEvents.length} events for period ${startYear}-${endYear}`);
      return generatedEvents;
    },
    
    /**
     * Get all events
     */
    getAllEvents: function() {
      return events;
    },
    
    /**
     * Get events for a specific year
     */
    getEventsForYear: function(year) {
      return events.filter(e => e.year === year);
    },
    
    /**
     * Get events for a specific state
     */
    getEventsForState: function(stateId) {
      return events.filter(e => e.stateId === stateId);
    },
    
    /**
     * Get events by type
     */
    getEventsByType: function(eventType) {
      return events.filter(e => e.type === eventType);
    },
    
    /**
     * Get event types
     */
    getEventTypes: function() {
      return eventTypes;
    },
    
    /**
     * Apply event effects (for future implementation)
     * @param {object} event - Event to apply
     * @returns {object} Effect results
     */
    applyEventEffects: function(event) {
      const results = {
        applied: false,
        changes: []
      };
      
      // This is a placeholder for future implementation
      // Effects would modify pack.states, pack.burgs, etc.
      
      INFO && console.log(`Applying effects for event: ${event.name}`);
      
      results.applied = true;
      return results;
    },
    
    /**
     * Clear all events
     */
    clear: function() {
      events = [];
      eventCounter = 0;
      INFO && console.log("Historical Events cleared");
    },
    
    /**
     * Export events data
     */
    exportData: function() {
      return {
        events: events,
        eventCounter: eventCounter
      };
    },
    
    /**
     * Import events data
     */
    importData: function(data) {
      if (data) {
        events = data.events || [];
        eventCounter = data.eventCounter || 0;
        INFO && console.log(`Imported ${events.length} historical events`);
      }
    },
    
    /**
     * Get event statistics
     */
    getStatistics: function() {
      const stats = {
        totalEvents: events.length,
        byType: {},
        byState: {},
        yearRange: {min: Infinity, max: -Infinity}
      };
      
      events.forEach(event => {
        // Count by type
        stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;
        
        // Count by state
        const stateName = event.stateName || "Unknown";
        stats.byState[stateName] = (stats.byState[stateName] || 0) + 1;
        
        // Track year range
        if (event.year < stats.yearRange.min) stats.yearRange.min = event.year;
        if (event.year > stats.yearRange.max) stats.yearRange.max = event.year;
      });
      
      return stats;
    }
  };
})();
