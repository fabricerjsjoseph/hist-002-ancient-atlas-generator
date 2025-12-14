"use strict";
// Religious Sites Module
// Places civilization-specific temples, shrines, and sacred sites

window.ReligiousSites = (function() {
  
  // Store religious sites data
  let sites = [];
  
  // Initialize module
  function initialize() {
    INFO && console.log("ReligiousSites module initialized");
    sites = [];
  }
  
  // Generate religious sites for historical mode
  function generate() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) {
      INFO && console.log("ReligiousSites: Historical mode not enabled, skipping");
      return;
    }
    
    TIME && console.time("generateReligiousSites");
    sites = [];
    
    const selectedCivs = HistoricalMode.getSelectedCivilizations();
    if (!selectedCivs || selectedCivs.length === 0) {
      WARN && console.warn("ReligiousSites: No civilizations selected");
      TIME && console.timeEnd("generateReligiousSites");
      return;
    }
    
    INFO && console.log(`ReligiousSites: Generating sites for ${selectedCivs.length} civilizations`);
    
    // Get civilization data
    const civilizationData = {};
    selectedCivs.forEach(civId => {
      const civData = HistoricalMode.getCivilization(civId);
      if (civData) {
        civilizationData[civId] = civData;
      }
    });
    
    // Generate sites for each state
    pack.states.forEach((state, stateId) => {
      if (!stateId || state.removed) return;
      
      // Determine which civilization this state belongs to
      const stateCulture = pack.cultures[state.culture];
      if (!stateCulture) return;
      
      // Try to match state to a civilization based on name base or culture
      const civId = findCivilizationForState(state, stateCulture, selectedCivs);
      if (!civId || !civilizationData[civId]) return;
      
      const civData = civilizationData[civId];
      const pantheon = window.HistoricalPantheons?.getPantheon(civId);
      if (!pantheon) return;
      
      generateSitesForState(stateId, state, civId, civData, pantheon);
    });
    
    INFO && console.log(`ReligiousSites: Generated ${sites.length} religious sites`);
    TIME && console.timeEnd("generateReligiousSites");
  }
  
  // Find which civilization a state belongs to
  function findCivilizationForState(state, culture, selectedCivs) {
    // Simple heuristic: match culture name base to civilization
    const nameBase = culture.base;
    
    // Mapping of name bases to civilizations
    const nameBaseMap = {
      8: "roman",      // Roman
      7: "greek",      // Greek
      42: "egyptian",  // Levantine (used by Egyptian)
      18: "persian",   // Arabic (used by Persian)
      11: "sumerian",  // Chinese (used by Sumerian as fallback)
      // Add more mappings as needed
    };
    
    let civId = nameBaseMap[nameBase];
    
    // If no mapping found, try to match by culture name
    if (!civId) {
      const cultureName = culture.name?.toLowerCase() || "";
      for (const civ of selectedCivs) {
        if (cultureName.includes(civ)) {
          civId = civ;
          break;
        }
      }
    }
    
    // If still no match, randomly assign from selected civs
    if (!civId && selectedCivs.length > 0) {
      civId = selectedCivs[Math.floor(Math.random() * selectedCivs.length)];
    }
    
    return civId;
  }
  
  // Generate religious sites for a specific state
  function generateSitesForState(stateId, state, civId, civData, pantheon) {
    const religiousImportance = pantheon.religiousImportance || 0.7;
    const siteTypes = pantheon.religiousSites || ["Temple"];
    
    // Calculate number of sites based on state size and religious importance
    const stateBurgs = pack.burgs.filter(b => b.state === stateId && !b.removed);
    const numSites = Math.max(1, Math.floor(stateBurgs.length * religiousImportance * 0.3));
    
    // Select top cities by population for site placement
    const candidateBurgs = stateBurgs
      .sort((a, b) => b.population - a.population)
      .slice(0, Math.max(numSites, 3));
    
    if (candidateBurgs.length === 0) return;
    
    // Place religious sites
    for (let i = 0; i < numSites && i < candidateBurgs.length; i++) {
      const burg = candidateBurgs[i];
      const isCapital = burg.capital === 1;
      
      // Select site type
      const siteType = selectSiteType(siteTypes, isCapital, i);
      
      // Select deity for this site
      const deity = selectDeityForSite(civId, pantheon, siteType, isCapital);
      if (!deity) continue;
      
      // Create site
      const site = {
        id: sites.length,
        stateId: stateId,
        burgId: burg.i,
        civilizationId: civId,
        type: siteType,
        deity: deity,
        name: generateSiteName(siteType, deity, burg, civId),
        cell: burg.cell,
        importance: calculateSiteImportance(isCapital, deity.importance, i, numSites)
      };
      
      sites.push(site);
    }
  }
  
  // Select appropriate site type
  function selectSiteType(siteTypes, isCapital, index) {
    if (isCapital && index === 0) {
      // Capital gets first/most important site type
      return siteTypes[0];
    }
    
    // Random selection from available types
    return siteTypes[Math.floor(Math.random() * siteTypes.length)];
  }
  
  // Select deity for site
  function selectDeityForSite(civId, pantheon, siteType, isCapital) {
    // Capital sites prefer most important deities
    if (isCapital) {
      const topDeities = window.HistoricalPantheons?.getTopDeities(civId, 3);
      if (topDeities && topDeities.length > 0) {
        return topDeities[Math.floor(Math.random() * topDeities.length)];
      }
    }
    
    // Other sites use weighted random selection
    return window.HistoricalPantheons?.getRandomDeity(civId);
  }
  
  // Generate name for religious site
  function generateSiteName(siteType, deity, burg, civId) {
    const patterns = [
      `${siteType} of ${deity.name}`,
      `${deity.name}'s ${siteType}`,
      `Great ${siteType} of ${deity.name}`,
      `${siteType} of ${deity.name} at ${burg.name}`,
      `Sacred ${siteType} of ${deity.name}`
    ];
    
    // Civilization-specific naming patterns
    if (civId === "roman") {
      patterns.push(`Temple of ${deity.name}`);
      patterns.push(`Aedes ${deity.name}`);
    } else if (civId === "greek") {
      patterns.push(`Sanctuary of ${deity.name}`);
      patterns.push(`${deity.name}'s Oracle`);
    } else if (civId === "egyptian") {
      patterns.push(`House of ${deity.name}`);
      patterns.push(`Temple-Complex of ${deity.name}`);
    }
    
    return patterns[Math.floor(Math.random() * patterns.length)];
  }
  
  // Calculate site importance
  function calculateSiteImportance(isCapital, deityImportance, index, totalSites) {
    let importance = deityImportance * 0.7;
    
    if (isCapital) importance += 0.2;
    if (index === 0) importance += 0.1;
    
    // Decrease importance for later sites
    importance *= (1 - (index / (totalSites * 2)));
    
    return Math.max(0.1, Math.min(1.0, importance));
  }
  
  // Add religious sites to markers
  function addToMarkers() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) {
      return;
    }
    
    if (sites.length === 0) {
      return;
    }
    
    TIME && console.time("addReligiousSitesToMarkers");
    
    // Get markers array from pack
    if (!pack.markers) pack.markers = [];
    
    sites.forEach(site => {
      // Find cell position
      const cell = pack.cells;
      if (!cell || !cell.p || !cell.p[site.cell]) return;
      
      const [x, y] = cell.p[site.cell];
      
      // Determine icon based on site type and civilization
      const icon = getIconForSite(site.type, site.civilizationId);
      
      // Create marker
      const marker = {
        icon: icon,
        type: site.type,
        dx: 0,
        dy: 0,
        px: 14,
        x: x,
        y: y,
        cell: site.cell,
        i: pack.markers.length,
        note: `${site.name}\nDedicated to ${site.deity.name}, ${site.deity.domain}`,
        religionSite: true
      };
      
      pack.markers.push(marker);
    });
    
    INFO && console.log(`ReligiousSites: Added ${sites.length} markers`);
    TIME && console.timeEnd("addReligiousSitesToMarkers");
  }
  
  // Get appropriate icon for site type
  function getIconForSite(siteType, civId) {
    const iconMap = {
      "Temple": "🏛️",
      "Ziggurat": "🏯",
      "Pyramid Complex": "🔺",
      "Mortuary Temple": "⛩️",
      "Sacred Lake": "🌊",
      "Oracle": "🔮",
      "Agora Shrine": "🏛️",
      "Mystery Sanctuary": "🌙",
      "Panhellenic Sanctuary": "🏛️",
      "Capitol": "🏛️",
      "Shrine": "⛩️",
      "Sacred Grove": "🌳",
      "Vestal Temple": "🔥",
      "Fire Temple": "🔥",
      "Royal Palace": "👑",
      "Apadana": "🏛️",
      "Paradise Garden": "🌺",
      "Tophet": "🔥",
      "Temple of Tanit": "🏛️",
      "Harbor Temple": "⚓",
      "Sacred Precinct": "🏛️",
      "Nemeton": "🌳",
      "Spring Sanctuary": "💧",
      "Hilltop Shrine": "⛰️",
      "Rock Sanctuary": "🪨",
      "Storm God Shrine": "⚡",
      "Yazılıkaya": "🪨",
      "Palace Shrine": "👑",
      "Peak Sanctuary": "⛰️",
      "Cave Sanctuary": "🕳️",
      "Megaron": "🏛️",
      "Tholos Tomb": "⚱️",
      "Cult Center": "🏛️",
      "Sacred Spring": "💧",
      "E-temple": "🏯",
      "Temple Complex": "🏛️"
    };
    
    return iconMap[siteType] || "🏛️";
  }
  
  // Get all sites
  function getSites() {
    return sites;
  }
  
  // Get sites for a specific state
  function getSitesForState(stateId) {
    return sites.filter(s => s.stateId === stateId);
  }
  
  // Get sites for a specific civilization
  function getSitesForCivilization(civId) {
    return sites.filter(s => s.civilizationId === civId);
  }
  
  // Public API
  return {
    initialize,
    generate,
    addToMarkers,
    getSites,
    getSitesForState,
    getSitesForCivilization
  };
})();
