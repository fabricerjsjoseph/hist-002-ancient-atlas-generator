"use strict";

/**
 * Fortifications Module
 * Phase 6: Military & Warfare
 * 
 * Generates historical fortifications including city walls, border forts, and naval bases.
 * Integrated with the markers/landmarks system.
 */

window.Fortifications = (function() {
  
  /**
   * Fortification type definitions
   */
  const fortificationTypes = {
    // City fortifications
    cityWalls: {
      icon: "🏰",
      type: "city_walls",
      minPopulation: 500,
      civPreference: {
        roman: 0.9,
        greek: 0.8,
        mycenaean: 0.9,
        hittite: 0.8,
        egyptian: 0.6,
        sumerian: 0.7,
        persian: 0.7,
        celtic: 0.6,
        carthaginian: 0.7,
        minoan: 0.5
      },
      terrainPreference: ["any"]
    },
    
    // Border fortifications
    borderFort: {
      icon: "🏯",
      type: "border_fort",
      civPreference: {
        roman: 1.0,
        greek: 0.7,
        persian: 0.8,
        mycenaean: 0.8,
        hittite: 0.9,
        egyptian: 0.7,
        sumerian: 0.6,
        celtic: 0.5,
        carthaginian: 0.6,
        minoan: 0.4
      },
      terrainPreference: ["highland", "hills"]
    },
    
    // Coastal fortifications
    navalBase: {
      icon: "⚓",
      type: "naval_base",
      requiresPort: true,
      civPreference: {
        minoan: 1.0,
        carthaginian: 0.9,
        greek: 0.8,
        roman: 0.8,
        persian: 0.6,
        mycenaean: 0.7,
        egyptian: 0.5,
        sumerian: 0.4,
        hittite: 0.3,
        celtic: 0.4
      }
    },
    
    // Watch towers
    watchTower: {
      icon: "🗼",
      type: "watch_tower",
      civPreference: {
        roman: 0.8,
        greek: 0.7,
        persian: 0.7,
        egyptian: 0.6,
        mycenaean: 0.7,
        hittite: 0.7,
        sumerian: 0.6,
        celtic: 0.5,
        carthaginian: 0.6,
        minoan: 0.4
      },
      terrainPreference: ["highland", "hills", "coast"]
    }
  };

  /**
   * Civilization-specific fortification styles
   */
  const civilizationStyles = {
    roman: {
      cityWalls: "Roman stone walls with towers",
      borderFort: "Castrum (rectangular fort)",
      navalBase: "Naval port with breakwater",
      watchTower: "Stone watchtower"
    },
    greek: {
      cityWalls: "Cyclopean walls",
      borderFort: "Hilltop fortress",
      navalBase: "Naval base",
      watchTower: "Signal tower"
    },
    egyptian: {
      cityWalls: "Mudbrick walls",
      borderFort: "Desert fort",
      navalBase: "River port",
      watchTower: "Watch post"
    },
    persian: {
      cityWalls: "Brick walls with gates",
      borderFort: "Mountain fortress",
      navalBase: "Harbor fortress",
      watchTower: "Border outpost"
    },
    celtic: {
      cityWalls: "Timber and earth ramparts",
      borderFort: "Hillfort",
      navalBase: "Coastal stronghold",
      watchTower: "Signal hill"
    },
    carthaginian: {
      cityWalls: "Triple walls",
      borderFort: "Garrison fort",
      navalBase: "Cothon (naval harbor)",
      watchTower: "Coastal tower"
    },
    sumerian: {
      cityWalls: "Mudbrick walls",
      borderFort: "City outpost",
      navalBase: "River dock",
      watchTower: "Guard post"
    },
    minoan: {
      cityWalls: "Palace walls",
      borderFort: "Coastal watchtower",
      navalBase: "Harbor complex",
      watchTower: "Beacon tower"
    },
    mycenaean: {
      cityWalls: "Cyclopean citadel walls",
      borderFort: "Hilltop stronghold",
      navalBase: "Naval garrison",
      watchTower: "Acropolis tower"
    },
    hittite: {
      cityWalls: "Stone walls with postern gates",
      borderFort: "Mountain fortress",
      navalBase: "Fortified port",
      watchTower: "Border watchtower"
    }
  };

  /**
   * Generate fortifications for historical mode
   */
  function generate() {
    if (!window.HistoricalMode || !window.HistoricalMode.isActive()) {
      INFO && console.log("Fortifications: Historical mode not active, skipping");
      return;
    }

    TIME && console.time("generateFortifications");
    
    const selectedCivs = window.HistoricalMode.getSelectedCivilizations();
    const period = window.HistoricalMode.getCurrentPeriod();
    
    if (!selectedCivs || selectedCivs.length === 0) {
      INFO && console.log("Fortifications: No civilizations selected");
      TIME && console.timeEnd("generateFortifications");
      return;
    }

    INFO && console.log(`Fortifications: Generating for ${selectedCivs.length} civilization(s) in ${period} period`);

    // Generate different types of fortifications
    generateCityWalls(selectedCivs);
    generateBorderForts(selectedCivs);
    generateNavalBases(selectedCivs);
    generateWatchTowers(selectedCivs);

    TIME && console.timeEnd("generateFortifications");
  }

  /**
   * Generate city walls for major settlements
   */
  function generateCityWalls(civilizations) {
    const {cells, burgs, states} = pack;
    if (!burgs || burgs.length === 0) return;

    let wallCount = 0;
    
    for (const burg of burgs) {
      if (!burg.i || burg.removed || !burg.state) continue;
      
      const state = states[burg.state];
      if (!state || state.removed) continue;
      
      // Check if state's culture corresponds to selected civilization
      const civMatch = getCivilizationForState(state, civilizations);
      if (!civMatch) continue;

      // Check population threshold
      if (burg.population < fortificationTypes.cityWalls.minPopulation) continue;

      // Apply civilization preference
      const preference = fortificationTypes.cityWalls.civPreference[civMatch] || 0.5;
      
      // Check fortification cultural trait
      const civData = getCivilizationData(civMatch);
      const fortificationTrait = civData?.culturalTraits?.fortification || 0.5;
      
      // Probability based on preference, trait, and capital status
      const capitalBonus = burg.capital ? 0.3 : 0;
      const probability = preference * fortificationTrait + capitalBonus;
      
      if (Math.random() > probability) continue;

      // Add fortification marker
      addFortificationMarker(
        burg.cell,
        "cityWalls",
        civMatch,
        `${burg.name} Walls`,
        state.i
      );
      
      wallCount++;
    }

    INFO && console.log(`Fortifications: Generated ${wallCount} city walls`);
  }

  /**
   * Generate border forts along state boundaries
   */
  function generateBorderForts(civilizations) {
    const {cells, states} = pack;
    if (!cells || !states) return;

    let fortCount = 0;
    const forts = new Set();

    for (const state of states) {
      if (!state.i || state.removed) continue;
      
      const civMatch = getCivilizationForState(state, civilizations);
      if (!civMatch) continue;

      const preference = fortificationTypes.borderFort.civPreference[civMatch] || 0.5;
      const civData = getCivilizationData(civMatch);
      const fortificationTrait = civData?.culturalTraits?.fortification || 0.5;
      
      // Find border cells
      const borderCells = cells.i.filter(i => {
        if (cells.state[i] !== state.i) return false;
        
        // Check if cell is near a border (has neighbor with different state)
        const neighbors = cells.c[i];
        return neighbors.some(n => cells.state[n] !== state.i && cells.state[n] > 0);
      });

      // Place forts on suitable border cells
      const fortDensity = Math.max(1, Math.floor(borderCells.length / 50)); // One fort per ~50 border cells
      const numForts = Math.ceil(fortDensity * preference * fortificationTrait);

      for (let f = 0; f < numForts && borderCells.length > 0; f++) {
        // Prefer highland/hill cells
        let cell;
        const highCells = borderCells.filter(c => cells.h[c] >= 60);
        if (highCells.length > 0 && Math.random() > 0.3) {
          const idx = Math.floor(Math.random() * highCells.length);
          cell = highCells[idx];
          borderCells.splice(borderCells.indexOf(cell), 1);
        } else {
          const idx = Math.floor(Math.random() * borderCells.length);
          cell = borderCells.splice(idx, 1)[0];
        }

        if (forts.has(cell)) continue;
        forts.add(cell);

        const province = cells.province?.[cell] ? pack.provinces[cells.province[cell]]?.name : state.name;
        addFortificationMarker(
          cell,
          "borderFort",
          civMatch,
          `${province} Fort`,
          state.i
        );
        
        fortCount++;
      }
    }

    INFO && console.log(`Fortifications: Generated ${fortCount} border forts`);
  }

  /**
   * Generate naval bases at major ports
   */
  function generateNavalBases(civilizations) {
    const {cells, burgs, states} = pack;
    if (!burgs || burgs.length === 0) return;

    let baseCount = 0;
    
    for (const burg of burgs) {
      if (!burg.i || burg.removed || !burg.state || !burg.port) continue;
      
      const state = states[burg.state];
      if (!state || state.removed) continue;
      
      const civMatch = getCivilizationForState(state, civilizations);
      if (!civMatch) continue;

      const preference = fortificationTypes.navalBase.civPreference[civMatch] || 0.5;
      const civData = getCivilizationData(civMatch);
      
      // Check coastal preference
      const coastalPreference = civData?.geography?.coastal || 0.5;
      
      // Higher probability for capitals and large ports
      const capitalBonus = burg.capital ? 0.4 : 0;
      const sizeBonus = burg.population > 1000 ? 0.2 : 0;
      const probability = preference * coastalPreference + capitalBonus + sizeBonus;
      
      if (Math.random() > probability) continue;

      addFortificationMarker(
        burg.cell,
        "navalBase",
        civMatch,
        `${burg.name} Naval Base`,
        state.i
      );
      
      baseCount++;
    }

    INFO && console.log(`Fortifications: Generated ${baseCount} naval bases`);
  }

  /**
   * Generate watch towers for surveillance
   */
  function generateWatchTowers(civilizations) {
    const {cells, states} = pack;
    if (!cells || !states) return;

    let towerCount = 0;

    for (const state of states) {
      if (!state.i || state.removed) continue;
      
      const civMatch = getCivilizationForState(state, civilizations);
      if (!civMatch) continue;

      const preference = fortificationTypes.watchTower.civPreference[civMatch] || 0.5;
      const civData = getCivilizationData(civMatch);
      const fortificationTrait = civData?.culturalTraits?.fortification || 0.5;
      
      // Calculate number of towers based on state area
      const numTowers = Math.ceil((state.area / 100) * preference * fortificationTrait);
      
      // Get candidate cells (highlands, coasts, near roads)
      const stateCells = cells.i.filter(i => cells.state[i] === state.i);
      const candidates = stateCells.filter(i => {
        const isHighland = cells.h[i] >= 65;
        const isCoastal = cells.harbor?.[i] > 0;
        const hasRoad = cells.road?.[i] > 0;
        return isHighland || isCoastal || hasRoad;
      });

      if (candidates.length === 0) continue;

      for (let t = 0; t < numTowers && candidates.length > 0; t++) {
        const idx = Math.floor(Math.random() * candidates.length);
        const cell = candidates.splice(idx, 1)[0];

        const province = cells.province?.[cell] ? pack.provinces[cells.province[cell]]?.name : state.name;
        addFortificationMarker(
          cell,
          "watchTower",
          civMatch,
          `${province} Tower`,
          state.i
        );
        
        towerCount++;
      }
    }

    INFO && console.log(`Fortifications: Generated ${towerCount} watch towers`);
  }

  /**
   * Add a fortification marker to the map
   */
  function addFortificationMarker(cell, fortType, civilization, name, stateId) {
    if (!pack.markers) pack.markers = [];
    
    const fortDef = fortificationTypes[fortType];
    const style = civilizationStyles[civilization]?.[fortType] || fortDef.type.replace('_', ' ');
    
    const marker = {
      icon: fortDef.icon,
      type: fortDef.type,
      dx: 0,
      dy: 0,
      px: 0,
      cell,
      x: pack.cells.p[cell][0],
      y: pack.cells.p[cell][1],
      civilization,
      state: stateId,
      note: `${style}\n${name}`,
      legend: `A ${style} of the ${civilization} civilization.`
    };

    pack.markers.push(marker);
  }

  /**
   * Get civilization name for a state based on culture
   */
  function getCivilizationForState(state, selectedCivilizations) {
    if (!state || !state.culture) return null;
    
    const culture = pack.cultures[state.culture];
    if (!culture) return null;

    // Try to match culture name to civilization
    const cultureName = culture.name.toLowerCase();
    
    for (const civ of selectedCivilizations) {
      const civData = getCivilizationData(civ);
      if (!civData) continue;
      
      // Check if culture base matches civilization
      if (culture.base === civData.nameBase) return civ;
      
      // Check for name matches
      if (cultureName.includes(civ) || civ.includes(cultureName)) return civ;
    }

    // Return first civilization as fallback if culture matches any pattern
    return selectedCivilizations[0];
  }

  /**
   * Get civilization data object
   */
  function getCivilizationData(civilization) {
    const civName = `Civilization${civilization.charAt(0).toUpperCase() + civilization.slice(1)}`;
    return window[civName];
  }

  /**
   * Public API
   */
  return {
    generate,
    fortificationTypes,
    civilizationStyles
  };
})();
