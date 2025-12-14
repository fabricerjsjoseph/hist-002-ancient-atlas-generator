"use strict";

/**
 * Ancient Military Units Database
 * Phase 6: Military & Warfare
 * 
 * Defines historical military unit types for Bronze Age and Classical Age civilizations.
 * Each unit has: icon, name, type, crew size, power, deployment, and civilization restrictions.
 */

window.AncientMilitaryUnits = {
  
  /**
   * Bronze Age Units (3300-1200 BCE)
   */
  bronzeAge: [
    {
      icon: "🏺",
      name: "spearmen",
      type: "melee",
      rural: 0.3,
      urban: 0.25,
      crew: 1,
      power: 1,
      separate: 0,
      civilizations: ["egyptian", "sumerian", "minoan", "hittite", "mycenaean"],
      description: "Bronze-equipped infantry with spears and shields"
    },
    {
      icon: "🏹",
      name: "archers",
      type: "ranged",
      rural: 0.15,
      urban: 0.2,
      crew: 1,
      power: 1,
      separate: 0,
      civilizations: ["egyptian", "sumerian", "minoan", "hittite", "mycenaean"],
      description: "Composite bow archers"
    },
    {
      icon: "🐎",
      name: "chariots",
      type: "mounted",
      rural: 0.08,
      urban: 0.12,
      crew: 3,
      power: 4,
      separate: 0,
      civilizations: ["egyptian", "sumerian", "hittite", "mycenaean"],
      biomes: [1, 2, 3, 4, 5, 6], // Open terrain only
      description: "Two-wheeled war chariots with driver, archer, and shield-bearer"
    },
    {
      icon: "⚓",
      name: "war galleys",
      type: "naval",
      rural: 0,
      urban: 0.02,
      crew: 30,
      power: 15,
      separate: 1,
      civilizations: ["minoan", "mycenaean", "egyptian"],
      description: "Oared warships for ramming and boarding"
    },
    {
      icon: "🗡️",
      name: "palace guard",
      type: "melee",
      rural: 0,
      urban: 0.08,
      crew: 1,
      power: 2,
      separate: 0,
      civilizations: ["minoan", "mycenaean", "sumerian"],
      description: "Elite royal bodyguards"
    },
    {
      icon: "🪓",
      name: "axe warriors",
      type: "melee",
      rural: 0.1,
      urban: 0.1,
      crew: 1,
      power: 1.5,
      separate: 0,
      civilizations: ["hittite"],
      description: "Iron-equipped axe infantry (Hittite specialty)"
    }
  ],

  /**
   * Classical Age Units (800 BCE - 500 CE)
   */
  classical: [
    {
      icon: "🛡️",
      name: "hoplites",
      type: "melee",
      rural: 0.2,
      urban: 0.3,
      crew: 1,
      power: 2,
      separate: 0,
      civilizations: ["greek", "mycenaean"],
      description: "Heavy infantry fighting in phalanx formation"
    },
    {
      icon: "⚔️",
      name: "legionnaires",
      type: "melee",
      rural: 0.25,
      urban: 0.35,
      crew: 1,
      power: 2.5,
      separate: 0,
      civilizations: ["roman"],
      description: "Roman heavy infantry organized in legions"
    },
    {
      icon: "🏹",
      name: "bowmen",
      type: "ranged",
      rural: 0.15,
      urban: 0.15,
      crew: 1,
      power: 1,
      separate: 0,
      civilizations: ["greek", "roman", "persian", "carthaginian"],
      description: "Standard archers and skirmishers"
    },
    {
      icon: "🐴",
      name: "cavalry",
      type: "mounted",
      rural: 0.12,
      urban: 0.08,
      crew: 2,
      power: 2.5,
      separate: 0,
      civilizations: ["roman", "persian", "celtic", "carthaginian"],
      description: "Mounted warriors for flanking and pursuit"
    },
    {
      icon: "🗡️",
      name: "immortals",
      type: "melee",
      rural: 0.1,
      urban: 0.15,
      crew: 1,
      power: 2.2,
      separate: 0,
      civilizations: ["persian"],
      description: "Persian elite heavy infantry"
    },
    {
      icon: "🐘",
      name: "war elephants",
      type: "mounted",
      rural: 0.02,
      urban: 0.04,
      crew: 5,
      power: 8,
      separate: 0,
      civilizations: ["carthaginian", "persian"],
      description: "Armored elephants for shock tactics"
    },
    {
      icon: "⚔️",
      name: "celtic warriors",
      type: "melee",
      rural: 0.3,
      urban: 0.25,
      crew: 1,
      power: 1.8,
      separate: 0,
      civilizations: ["celtic"],
      description: "Fierce tribal warriors with longswords"
    },
    {
      icon: "🪖",
      name: "auxiliaries",
      type: "melee",
      rural: 0.15,
      urban: 0.1,
      crew: 1,
      power: 1.5,
      separate: 0,
      civilizations: ["roman"],
      description: "Non-citizen support troops"
    },
    {
      icon: "⚓",
      name: "triremes",
      type: "naval",
      rural: 0,
      urban: 0.02,
      crew: 170,
      power: 50,
      separate: 1,
      civilizations: ["greek", "roman", "persian", "carthaginian"],
      description: "Three-banked oared warships"
    },
    {
      icon: "🛶",
      name: "quinqueremes",
      type: "naval",
      rural: 0,
      urban: 0.015,
      crew: 300,
      power: 80,
      separate: 1,
      civilizations: ["roman", "carthaginian"],
      description: "Large five-banked warships"
    },
    {
      icon: "💣",
      name: "siege engines",
      type: "machinery",
      rural: 0,
      urban: 0.05,
      crew: 10,
      power: 15,
      separate: 0,
      civilizations: ["roman", "greek", "persian", "carthaginian"],
      description: "Catapults, ballistae, and siege towers"
    },
    {
      icon: "🐎",
      name: "cataphracts",
      type: "mounted",
      rural: 0.08,
      urban: 0.1,
      crew: 2,
      power: 3.5,
      separate: 0,
      civilizations: ["persian"],
      description: "Heavily armored cavalry"
    },
    {
      icon: "🏇",
      name: "light cavalry",
      type: "mounted",
      rural: 0.15,
      urban: 0.05,
      crew: 1,
      power: 1.8,
      separate: 0,
      civilizations: ["celtic", "persian"],
      description: "Fast scouts and raiders"
    },
    {
      icon: "👑",
      name: "praetorians",
      type: "melee",
      rural: 0,
      urban: 0.05,
      crew: 1,
      power: 3,
      separate: 0,
      civilizations: ["roman"],
      description: "Elite imperial guard"
    }
  ],

  /**
   * Get units for a specific period
   */
  getUnitsForPeriod: function(period) {
    if (period === "bronzeAge") return this.bronzeAge;
    if (period === "classical") return this.classical;
    return [];
  },

  /**
   * Get units for a specific civilization
   */
  getUnitsForCivilization: function(civilization, period) {
    const units = this.getUnitsForPeriod(period);
    return units.filter(u => !u.civilizations || u.civilizations.includes(civilization));
  },

  /**
   * Get all civilization-specific units
   */
  getUnitsForCivilizations: function(civilizations, period) {
    const units = this.getUnitsForPeriod(period);
    return units.filter(u => {
      if (!u.civilizations) return true;
      return u.civilizations.some(c => civilizations.includes(c));
    });
  },

  /**
   * Apply civilization-specific composition overrides
   */
  applyCompositionOverrides: function(units, civilization) {
    // Get civilization data
    const civData = window[`Civilization${civilization.charAt(0).toUpperCase() + civilization.slice(1)}`];
    if (!civData || !civData.militaryComposition) return units;

    // Create modified unit list based on composition
    const composition = civData.militaryComposition;
    const modifiedUnits = units.map(unit => {
      const unitCopy = {...unit};
      
      // Adjust deployment rates based on composition
      for (const [compKey, compValue] of Object.entries(composition)) {
        const normalizedKey = compKey.toLowerCase().replace(/s$/, ''); // Remove plural 's'
        const normalizedUnitName = unit.name.toLowerCase().replace(/s$/, '');
        
        if (normalizedKey.includes(normalizedUnitName) || normalizedUnitName.includes(normalizedKey)) {
          // Scale the unit deployment by composition value
          unitCopy.rural = unit.rural * (compValue / 0.2); // 0.2 is baseline
          unitCopy.urban = unit.urban * (compValue / 0.2);
        }
      }
      
      return unitCopy;
    });

    return modifiedUnits;
  },

  /**
   * Get historical unit options for military generator
   */
  getHistoricalUnitOptions: function(selectedCivilizations, period) {
    if (!selectedCivilizations || selectedCivilizations.length === 0) {
      return this.getUnitsForPeriod(period);
    }

    // Get units available to selected civilizations
    let availableUnits = this.getUnitsForCivilizations(selectedCivilizations, period);
    
    // Apply civilization-specific composition if only one civilization is selected
    if (selectedCivilizations.length === 1) {
      availableUnits = this.applyCompositionOverrides(availableUnits, selectedCivilizations[0]);
    }

    return availableUnits;
  }
};

// Expose for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.AncientMilitaryUnits;
}
