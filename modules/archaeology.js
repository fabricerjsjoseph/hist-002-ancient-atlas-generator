"use strict";
// Archaeology Module
// Generates archaeological sites, ruins, lost cities, and ancient monuments

window.Archaeology = (function() {
  
  // Store archaeological sites
  let sites = [];
  let siteCounter = 0;
  
  // Archaeological site type definitions
  const siteTypes = {
    ancientRuins: {
      name: "Ancient Ruins",
      icon: "🏚️",
      description: "Remnants of an ancient settlement",
      minAge: 500,
      rarity: 0.15,
      requiresOldCity: true
    },
    lostCity: {
      name: "Lost City",
      icon: "🏛️",
      description: "A once-great city now abandoned",
      minAge: 800,
      rarity: 0.05,
      requiresOldCity: true,
      majorSite: true
    },
    pyramid: {
      name: "Ancient Pyramid",
      icon: "🔺",
      description: "Monumental tomb structure",
      minAge: 1000,
      rarity: 0.08,
      requiresDesert: true
    },
    ziggurat: {
      name: "Ruined Ziggurat",
      icon: "🏯",
      description: "Temple tower of an ancient civilization",
      minAge: 1200,
      rarity: 0.06,
      requiresRiver: true
    },
    templeComplex: {
      name: "Temple Complex",
      icon: "⛩️",
      description: "Ancient religious site",
      minAge: 600,
      rarity: 0.12,
      religious: true
    },
    ancientFortress: {
      name: "Ancient Fortress",
      icon: "🏰",
      description: "Ruined military fortification",
      minAge: 700,
      rarity: 0.10,
      requiresHighland: true
    },
    necropolis: {
      name: "Necropolis",
      icon: "⚰️",
      description: "Ancient burial ground",
      minAge: 500,
      rarity: 0.13,
      nearCity: true
    },
    ancientPalace: {
      name: "Ancient Palace",
      icon: "🏰",
      description: "Ruins of royal residence",
      minAge: 900,
      rarity: 0.07,
      requiresOldCapital: true
    },
    sacredSite: {
      name: "Sacred Site",
      icon: "🕉️",
      description: "Ancient place of worship",
      minAge: 400,
      rarity: 0.14,
      religious: true
    },
    amphitheater: {
      name: "Ancient Amphitheater",
      icon: "🏟️",
      description: "Public entertainment venue",
      minAge: 600,
      rarity: 0.09,
      requiresOldCity: true
    },
    aqueduct: {
      name: "Ancient Aqueduct",
      icon: "🌉",
      description: "Water supply infrastructure",
      minAge: 500,
      rarity: 0.11,
      requiresRiver: true
    },
    stonehenge: {
      name: "Stone Circle",
      icon: "🗿",
      description: "Megalithic monument",
      minAge: 1500,
      rarity: 0.04,
      prehistoric: true
    },
    burialMound: {
      name: "Burial Mound",
      icon: "⛰️",
      description: "Ancient earthwork tomb",
      minAge: 800,
      rarity: 0.16,
      requiresHighland: false
    },
    ancientMine: {
      name: "Ancient Mine",
      icon: "⛏️",
      description: "Abandoned mining site",
      minAge: 600,
      rarity: 0.10,
      requiresHighland: true
    },
    petroglyphs: {
      name: "Petroglyphs",
      icon: "🖼️",
      description: "Ancient rock carvings",
      minAge: 1000,
      rarity: 0.12,
      requiresHighland: true,
      prehistoric: true
    }
  };
  
  /**
   * Random selection helper
   */
  function randomFromArray(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  /**
   * Generate random number in range
   */
  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Check if a cell meets terrain requirements
   */
  function meetsTerrainRequirements(cell, siteType) {
    if (!cell || !pack) return false;
    
    const type = siteTypes[siteType];
    
    // Check desert requirement
    if (type.requiresDesert) {
      const biome = pack.cells.biome[cell];
      if (biome !== 1 && biome !== 2) return false; // Not hot or cold desert
    }
    
    // Check river requirement
    if (type.requiresRiver) {
      const river = pack.cells.r[cell];
      if (!river) return false;
    }
    
    // Check highland requirement
    if (type.requiresHighland) {
      const height = pack.cells.h[cell];
      if (height < 50) return false; // Not in highlands
    }
    
    return true;
  }
  
  /**
   * Find suitable location for archaeological site
   */
  function findSuitableLocation(siteType, options = {}) {
    if (!pack || !pack.cells) return null;
    
    const type = siteTypes[siteType];
    const candidates = [];
    
    // Get valid cells
    for (let i = 0; i < pack.cells.i.length; i++) {
      if (pack.cells.h[i] < 20) continue; // Skip water
      
      // Check terrain requirements
      if (!meetsTerrainRequirements(i, siteType)) continue;
      
      // Check for nearby city if required
      if (type.requiresOldCity || type.nearCity) {
        const burg = pack.cells.burg[i];
        if (!burg) continue;
      }
      
      candidates.push(i);
    }
    
    if (candidates.length === 0) return null;
    
    return randomFromArray(candidates);
  }
  
  // Public API
  return {
    
    /**
     * Initialize archaeology system
     */
    initialize: function() {
      sites = [];
      siteCounter = 0;
      INFO && console.log("Archaeology system initialized");
    },
    
    /**
     * Generate an archaeological site
     * @param {string} siteType - Type of site to generate
     * @param {object} options - Generation options
     * @returns {object|null} Generated site or null
     */
    generateSite: function(siteType, options = {}) {
      if (!siteTypes[siteType]) {
        WARN && console.warn(`Unknown archaeological site type: ${siteType}`);
        return null;
      }
      
      const type = siteTypes[siteType];
      
      // Find suitable location
      const cellId = options.cellId || findSuitableLocation(siteType, options);
      if (!cellId && cellId !== 0) return null;
      
      // Calculate age
      const currentYear = (typeof pack !== 'undefined' && pack && pack.time) ? pack.time : 0;
      const age = options.age || randomRange(type.minAge, type.minAge * 2);
      const foundedYear = currentYear - age;
      
      // Get civilization if in historical mode
      let civilization = null;
      if (window.HistoricalMode && window.HistoricalMode.isEnabled()) {
        const civs = window.HistoricalMode.getSelectedCivilizations();
        if (civs && civs.length > 0) {
          civilization = randomFromArray(civs);
        }
      }
      
      // Create site object
      const site = {
        id: siteCounter++,
        type: siteType,
        name: this.generateSiteName(siteType, civilization),
        cellId: cellId,
        icon: type.icon,
        description: type.description,
        age: age,
        foundedYear: foundedYear,
        civilization: civilization,
        discovered: options.discovered || false,
        condition: options.condition || this.calculateCondition(age),
        artifacts: options.artifacts || randomRange(1, 10),
        importance: type.majorSite ? "major" : "minor"
      };
      
      sites.push(site);
      INFO && console.log(`Generated archaeological site: ${site.name} (${siteType})`);
      
      return site;
    },
    
    /**
     * Generate name for archaeological site
     */
    generateSiteName: function(siteType, civilization) {
      const type = siteTypes[siteType];
      
      if (civilization && civilization.id) {
        // Use civilization-specific naming
        if (window.HistoricalNames && typeof window.HistoricalNames.getCity === 'function') {
          const cityName = window.HistoricalNames.getCity(civilization.id);
          return `${cityName} ${type.name}`;
        }
      }
      
      // Generic names
      const prefixes = ["Ancient", "Lost", "Forgotten", "Hidden", "Sacred", "Ruined"];
      const suffixes = ["of the Ancients", "of Old", "of the Lost", "of the Forgotten"];
      
      const hasPrefix = Math.random() < 0.7;
      const hasSuffix = Math.random() < 0.3;
      
      let name = type.name;
      if (hasPrefix) name = `${randomFromArray(prefixes)} ${name}`;
      if (hasSuffix) name = `${name} ${randomFromArray(suffixes)}`;
      
      return name;
    },
    
    /**
     * Calculate site condition based on age
     */
    calculateCondition: function(age) {
      if (age < 500) return "well-preserved";
      if (age < 1000) return "damaged";
      if (age < 1500) return "ruined";
      return "barely visible";
    },
    
    /**
     * Generate multiple archaeological sites
     */
    generateSites: function(count = 10, options = {}) {
      const generated = [];
      const typeNames = Object.keys(siteTypes);
      
      for (let i = 0; i < count; i++) {
        // Select random type based on rarity
        const probabilities = typeNames.map(t => siteTypes[t].rarity);
        let randomValue = Math.random() * probabilities.reduce((a, b) => a + b, 0);
        let selectedType = typeNames[0];
        
        for (let j = 0; j < typeNames.length; j++) {
          randomValue -= probabilities[j];
          if (randomValue <= 0) {
            selectedType = typeNames[j];
            break;
          }
        }
        
        const site = this.generateSite(selectedType, options);
        if (site) generated.push(site);
      }
      
      INFO && console.log(`Generated ${generated.length} archaeological sites`);
      return generated;
    },
    
    /**
     * Place archaeological sites as map markers
     */
    placeAsMarkers: function() {
      if (!pack || !pack.markers) return false;
      
      let placed = 0;
      
      sites.forEach(site => {
        if (!site.cellId && site.cellId !== 0) return;
        
        // Get cell coordinates
        const cell = pack.cells;
        const x = cell.p[site.cellId][0];
        const y = cell.p[site.cellId][1];
        
        // Create marker
        const marker = {
          i: last(pack.markers)?.i + 1 || 0,
          icon: site.icon,
          type: "archaeology",
          dx: 0,
          dy: 0,
          px: 14,
          x: x,
          y: y,
          cell: site.cellId,
          note: `${site.name}\n${site.description}\nAge: ${site.age} years\nCondition: ${site.condition}`
        };
        
        pack.markers.push(marker);
        placed++;
      });
      
      INFO && console.log(`Placed ${placed} archaeological sites as markers`);
      return true;
    },
    
    /**
     * Get all archaeological sites
     */
    getAllSites: function() {
      return sites;
    },
    
    /**
     * Get sites by type
     */
    getSitesByType: function(siteType) {
      return sites.filter(s => s.type === siteType);
    },
    
    /**
     * Get sites by civilization
     */
    getSitesByCivilization: function(civilizationId) {
      return sites.filter(s => s.civilization && s.civilization.id === civilizationId);
    },
    
    /**
     * Get major archaeological sites
     */
    getMajorSites: function() {
      return sites.filter(s => s.importance === "major");
    },
    
    /**
     * Get site types
     */
    getSiteTypes: function() {
      return siteTypes;
    },
    
    /**
     * Discover a site (mark as discovered)
     */
    discoverSite: function(siteId) {
      const site = sites.find(s => s.id === siteId);
      if (site) {
        site.discovered = true;
        INFO && console.log(`Archaeological site discovered: ${site.name}`);
        return true;
      }
      return false;
    },
    
    /**
     * Generate sites from fallen civilizations
     */
    generateFromFallenCivilizations: function() {
      if (!window.HistoricalMode || !window.HistoricalMode.isEnabled()) return [];
      
      const civilizations = window.HistoricalMode.getSelectedCivilizations();
      const generated = [];
      
      civilizations.forEach(civ => {
        // Each civilization gets 2-5 archaeological sites
        const numSites = randomRange(2, 5);
        
        for (let i = 0; i < numSites; i++) {
          // Prefer civilization-appropriate site types
          let siteType = "ancientRuins";
          
          if (civ.id === "egyptian") {
            siteType = Math.random() < 0.5 ? "pyramid" : "necropolis";
          } else if (civ.id === "sumerian") {
            siteType = "ziggurat";
          } else if (civ.id === "greek" || civ.id === "roman") {
            siteType = randomFromArray(["templeComplex", "amphitheater", "ancientPalace"]);
          }
          
          const site = this.generateSite(siteType, {
            civilization: civ
          });
          
          if (site) generated.push(site);
        }
      });
      
      INFO && console.log(`Generated ${generated.length} sites from fallen civilizations`);
      return generated;
    },
    
    /**
     * Clear all archaeological sites
     */
    clear: function() {
      sites = [];
      siteCounter = 0;
      INFO && console.log("Archaeological sites cleared");
    },
    
    /**
     * Export archaeology data
     */
    exportData: function() {
      return {
        sites: sites,
        siteCounter: siteCounter
      };
    },
    
    /**
     * Import archaeology data
     */
    importData: function(data) {
      if (data) {
        sites = data.sites || [];
        siteCounter = data.siteCounter || 0;
        INFO && console.log(`Imported ${sites.length} archaeological sites`);
      }
    },
    
    /**
     * Get statistics about archaeological sites
     */
    getStatistics: function() {
      const stats = {
        totalSites: sites.length,
        byType: {},
        byCivilization: {},
        discovered: 0,
        major: 0,
        minor: 0,
        averageAge: 0
      };
      
      let totalAge = 0;
      
      sites.forEach(site => {
        // Count by type
        stats.byType[site.type] = (stats.byType[site.type] || 0) + 1;
        
        // Count by civilization
        if (site.civilization) {
          const civName = site.civilization.name || "Unknown";
          stats.byCivilization[civName] = (stats.byCivilization[civName] || 0) + 1;
        }
        
        // Count discovered
        if (site.discovered) stats.discovered++;
        
        // Count importance
        if (site.importance === "major") stats.major++;
        else stats.minor++;
        
        // Sum age
        totalAge += site.age;
      });
      
      if (sites.length > 0) {
        stats.averageAge = Math.round(totalAge / sites.length);
      }
      
      return stats;
    }
  };
})();
