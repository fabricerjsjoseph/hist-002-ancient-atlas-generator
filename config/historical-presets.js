"use strict";

/**
 * Historical Presets Module
 * Quick-start configurations for generating Ancient Atlas maps
 * Phase 9: Presets & Templates
 */

window.HistoricalPresets = (function () {
  "use strict";

  // Bronze Age Presets (3300-1200 BCE)
  const bronzeAgePresets = {
    egyptian: {
      id: "egyptian",
      name: "Ancient Egypt (Bronze Age)",
      description: "Nile-dependent civilization with pyramids and pharaonic dynasties",
      period: "bronzeAge",
      civilizations: ["egyptian"],
      settings: {
        template: "River Valley",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 2,
        provincesRatio: 50,
        sizeVariety: 2,
        growthRate: 1.2,
        manors: 300,
        religions: 2,
        year: -2500,
        era: "Old Kingdom"
      },
      heightmapTemplate: "riverValley",
      stylePreset: "historical-bronze"
    },

    sumerian: {
      id: "sumerian",
      name: "Sumerian City-States (Bronze Age)",
      description: "Mesopotamian city-states with ziggurats and cuneiform writing",
      period: "bronzeAge",
      civilizations: ["sumerian"],
      settings: {
        template: "Fertile Crescent",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 8,
        provincesRatio: 30,
        sizeVariety: 1,
        growthRate: 0.8,
        manors: 400,
        religions: 3,
        year: -2800,
        era: "Early Dynastic Period"
      },
      heightmapTemplate: "fertileCrescent",
      stylePreset: "historical-bronze"
    },

    minoan: {
      id: "minoan",
      name: "Minoan Thalassocracy (Bronze Age)",
      description: "Maritime civilization with palace complexes and naval dominance",
      period: "bronzeAge",
      civilizations: ["minoan"],
      settings: {
        template: "Archipelago",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 3,
        provincesRatio: 40,
        sizeVariety: 2,
        growthRate: 1.0,
        manors: 250,
        religions: 2,
        year: -1800,
        era: "Neopalatial Period"
      },
      heightmapTemplate: "archipelago",
      stylePreset: "historical-bronze"
    },

    hittite: {
      id: "hittite",
      name: "Hittite Empire (Bronze Age)",
      description: "Iron-using empire with chariot warfare and mountainous heartland",
      period: "bronzeAge",
      civilizations: ["hittite"],
      settings: {
        template: "Continents",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 4,
        provincesRatio: 45,
        sizeVariety: 3,
        growthRate: 1.1,
        manors: 350,
        religions: 2,
        year: -1400,
        era: "New Kingdom"
      },
      heightmapTemplate: "continents",
      stylePreset: "historical-bronze"
    },

    mycenaean: {
      id: "mycenaean",
      name: "Mycenaean Greece (Bronze Age)",
      description: "Fortified citadels with Linear B writing and warrior culture",
      period: "bronzeAge",
      civilizations: ["mycenaean"],
      settings: {
        template: "Peninsula",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 6,
        provincesRatio: 35,
        sizeVariety: 1.5,
        growthRate: 0.9,
        manors: 300,
        religions: 2,
        year: -1300,
        era: "Palatial Period"
      },
      heightmapTemplate: "peninsula",
      stylePreset: "historical-bronze"
    },

    bronzeAgeMixed: {
      id: "bronzeAgeMixed",
      name: "Bronze Age World",
      description: "Multiple Bronze Age civilizations in a shared world",
      period: "bronzeAge",
      civilizations: ["egyptian", "sumerian", "minoan", "hittite", "mycenaean"],
      settings: {
        template: "Mediterranean",
        cultures: 5,
        culturesSet: "antique",
        statesNumber: 15,
        provincesRatio: 40,
        sizeVariety: 3,
        growthRate: 1.0,
        manors: 600,
        religions: 5,
        year: -1500,
        era: "Late Bronze Age"
      },
      heightmapTemplate: "mediterranean",
      stylePreset: "historical-bronze"
    }
  };

  // Classical Age Presets (800 BCE - 500 CE)
  const classicalAgePresets = {
    greek: {
      id: "greek",
      name: "Ancient Greece (Classical Age)",
      description: "Independent city-states with hoplite warfare and democratic governance",
      period: "classical",
      civilizations: ["greek"],
      settings: {
        template: "Peninsula",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 20,
        provincesRatio: 25,
        sizeVariety: 1,
        growthRate: 0.7,
        manors: 400,
        religions: 3,
        year: -450,
        era: "Classical Period"
      },
      heightmapTemplate: "peninsula",
      stylePreset: "historical-classical"
    },

    roman: {
      id: "roman",
      name: "Roman Empire (Classical Age)",
      description: "Vast empire with legions, roads, and provincial administration",
      period: "classical",
      civilizations: ["roman"],
      settings: {
        template: "Mediterranean",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 3,
        provincesRatio: 70,
        sizeVariety: 5,
        growthRate: 1.5,
        manors: 800,
        religions: 4,
        year: 100,
        era: "Pax Romana"
      },
      heightmapTemplate: "mediterranean",
      stylePreset: "historical-classical"
    },

    persian: {
      id: "persian",
      name: "Persian Empire (Classical Age)",
      description: "Satrapy system with Immortals and vast territorial extent",
      period: "classical",
      civilizations: ["persian"],
      settings: {
        template: "Continents",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 2,
        provincesRatio: 80,
        sizeVariety: 5,
        growthRate: 1.4,
        manors: 700,
        religions: 3,
        year: -480,
        era: "Achaemenid Period"
      },
      heightmapTemplate: "continents",
      stylePreset: "historical-classical"
    },

    carthaginian: {
      id: "carthaginian",
      name: "Carthaginian Empire (Classical Age)",
      description: "Maritime republic with Punic colonies and naval supremacy",
      period: "classical",
      civilizations: ["carthaginian"],
      settings: {
        template: "Mediterranean",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 4,
        provincesRatio: 50,
        sizeVariety: 3,
        growthRate: 1.2,
        manors: 400,
        religions: 3,
        year: -250,
        era: "Punic Wars Era"
      },
      heightmapTemplate: "mediterranean",
      stylePreset: "historical-classical"
    },

    celtic: {
      id: "celtic",
      name: "Celtic Tribes (Classical Age)",
      description: "Tribal confederations with oppida and warrior culture",
      period: "classical",
      civilizations: ["celtic"],
      settings: {
        template: "Continents",
        cultures: 1,
        culturesSet: "antique",
        statesNumber: 12,
        provincesRatio: 30,
        sizeVariety: 2,
        growthRate: 0.9,
        manors: 500,
        religions: 2,
        year: -200,
        era: "La Tène Period"
      },
      heightmapTemplate: "continents",
      stylePreset: "historical-classical"
    },

    classicalMixed: {
      id: "classicalMixed",
      name: "Classical Age World",
      description: "Multiple Classical civilizations competing for dominance",
      period: "classical",
      civilizations: ["greek", "roman", "persian", "carthaginian", "celtic"],
      settings: {
        template: "Old World",
        cultures: 5,
        culturesSet: "antique",
        statesNumber: 25,
        provincesRatio: 45,
        sizeVariety: 4,
        growthRate: 1.1,
        manors: 900,
        religions: 6,
        year: -200,
        era: "Hellenistic Period"
      },
      heightmapTemplate: "oldWorld",
      stylePreset: "historical-classical"
    }
  };

  // Specialized Scenario Presets
  const scenarioPresets = {
    mediterraneanConflict: {
      id: "mediterraneanConflict",
      name: "Mediterranean Conflict",
      description: "Rome vs Carthage - Punic Wars scenario",
      period: "classical",
      civilizations: ["roman", "carthaginian"],
      settings: {
        template: "Mediterranean",
        cultures: 2,
        culturesSet: "antique",
        statesNumber: 6,
        provincesRatio: 55,
        sizeVariety: 4,
        growthRate: 1.3,
        manors: 600,
        religions: 4,
        year: -218,
        era: "Second Punic War"
      },
      heightmapTemplate: "mediterranean",
      stylePreset: "historical-classical"
    },

    persianGreekWars: {
      id: "persianGreekWars",
      name: "Greco-Persian Wars",
      description: "Persian Empire vs Greek city-states",
      period: "classical",
      civilizations: ["persian", "greek"],
      settings: {
        template: "Peninsula",
        cultures: 2,
        culturesSet: "antique",
        statesNumber: 15,
        provincesRatio: 50,
        sizeVariety: 4,
        growthRate: 1.1,
        manors: 500,
        religions: 4,
        year: -480,
        era: "Persian Wars"
      },
      heightmapTemplate: "peninsula",
      stylePreset: "historical-classical"
    },

    aegeanBronzeAge: {
      id: "aegeanBronzeAge",
      name: "Aegean Bronze Age",
      description: "Minoan and Mycenaean civilizations in the Aegean",
      period: "bronzeAge",
      civilizations: ["minoan", "mycenaean"],
      settings: {
        template: "Archipelago",
        cultures: 2,
        culturesSet: "antique",
        statesNumber: 10,
        provincesRatio: 35,
        sizeVariety: 2,
        growthRate: 0.9,
        manors: 350,
        religions: 3,
        year: -1450,
        era: "Late Bronze Age"
      },
      heightmapTemplate: "archipelago",
      stylePreset: "historical-bronze"
    }
  };

  // Combine all presets
  const allPresets = {
    ...bronzeAgePresets,
    ...classicalAgePresets,
    ...scenarioPresets
  };

  /**
   * Get all available presets
   */
  function getAllPresets() {
    return allPresets;
  }

  /**
   * Get presets for a specific period
   * @param {string} period - "bronzeAge" or "classical"
   */
  function getPresetsForPeriod(period) {
    const presets = {};
    for (const [key, preset] of Object.entries(allPresets)) {
      if (preset.period === period) {
        presets[key] = preset;
      }
    }
    return presets;
  }

  /**
   * Get a specific preset by ID
   * @param {string} presetId - The preset identifier
   */
  function getPreset(presetId) {
    return allPresets[presetId] || null;
  }

  /**
   * Apply a preset to the current map options
   * @param {string} presetId - The preset identifier
   */
  function applyPreset(presetId) {
    const preset = getPreset(presetId);
    if (!preset) {
      ERROR && console.error(`Historical preset ${presetId} not found`);
      return false;
    }

    INFO && console.log(`Applying historical preset: ${preset.name}`);

    try {
      // Set map mode to historical
      const mapModeSelect = document.getElementById("mapModeSelect");
      if (mapModeSelect) {
        mapModeSelect.value = "historical";
        handleMapModeChange("historical");
      }

      // Set historical period
      const periodSelect = document.getElementById("historicalPeriodSelect");
      if (periodSelect) {
        periodSelect.value = preset.period;
        handleHistoricalPeriodChange(preset.period);
      }

      // Set selected civilizations
      const civilizationSelect = document.getElementById("historicalCivSelect");
      if (civilizationSelect && preset.civilizations) {
        // Clear current selections
        Array.from(civilizationSelect.options).forEach(option => {
          option.selected = false;
        });
        // Select preset civilizations
        preset.civilizations.forEach(civId => {
          const option = civilizationSelect.querySelector(`option[value="${civId}"]`);
          if (option) option.selected = true;
        });
        handleCivilizationSelectionChange();
      }

      // Apply settings
      const settings = preset.settings;
      
      // Template/Heightmap
      if (settings.template) {
        const templateInput = document.getElementById("templateInput");
        if (templateInput) {
          // Find matching option (case-insensitive)
          const options = Array.from(templateInput.options);
          const matchingOption = options.find(opt => 
            opt.text.toLowerCase() === settings.template.toLowerCase()
          );
          if (matchingOption) {
            templateInput.value = matchingOption.value;
          }
        }
      }

      // Cultures
      if (settings.cultures !== undefined) {
        const culturesInput = document.getElementById("culturesInput");
        const culturesOutput = document.getElementById("culturesOutput");
        if (culturesInput) culturesInput.value = settings.cultures;
        if (culturesOutput) culturesOutput.value = settings.cultures;
      }

      // Cultures set
      if (settings.culturesSet) {
        const culturesSet = document.getElementById("culturesSet");
        if (culturesSet) culturesSet.value = settings.culturesSet;
      }

      // States number
      if (settings.statesNumber !== undefined) {
        const statesNumber = document.getElementById("statesNumber");
        if (statesNumber) statesNumber.value = settings.statesNumber;
      }

      // Provinces ratio
      if (settings.provincesRatio !== undefined) {
        const provincesRatio = document.getElementById("provincesRatio");
        if (provincesRatio) provincesRatio.value = settings.provincesRatio;
      }

      // Size variety
      if (settings.sizeVariety !== undefined) {
        const sizeVariety = document.getElementById("sizeVariety");
        if (sizeVariety) sizeVariety.value = settings.sizeVariety;
      }

      // Growth rate
      if (settings.growthRate !== undefined) {
        const growthRate = document.getElementById("growthRate");
        if (growthRate) growthRate.value = settings.growthRate;
      }

      // Manors/Towns
      if (settings.manors !== undefined) {
        const manorsInput = document.getElementById("manorsInput");
        const manorsOutput = document.getElementById("manorsOutput");
        if (manorsInput) manorsInput.value = settings.manors;
        if (manorsOutput) manorsOutput.value = settings.manors;
      }

      // Religions
      if (settings.religions !== undefined) {
        const religionsInput = document.getElementById("religionsInput");
        const religionsOutput = document.getElementById("religionsOutput");
        if (religionsInput) religionsInput.value = settings.religions;
        if (religionsOutput) religionsOutput.value = settings.religions;
      }

      // Year and era
      if (settings.year !== undefined) {
        const yearInput = document.getElementById("yearInput");
        if (yearInput) yearInput.value = settings.year;
      }
      if (settings.era) {
        const eraInput = document.getElementById("eraInput");
        if (eraInput) eraInput.value = settings.era;
      }

      // Apply style preset
      if (preset.stylePreset) {
        const stylePreset = document.getElementById("stylePreset");
        if (stylePreset && window.requestStylePresetChange) {
          stylePreset.value = preset.stylePreset;
          // Note: Style change will be applied, but we don't force it here
          // User can choose to keep their current style
        }
      }

      INFO && console.log(`Historical preset ${preset.name} applied successfully`);
      return true;

    } catch (error) {
      ERROR && console.error("Error applying historical preset:", error);
      return false;
    }
  }

  /**
   * Get preset categories for UI organization
   */
  function getPresetCategories() {
    return {
      bronzeAge: {
        name: "Bronze Age Civilizations",
        presets: Object.keys(bronzeAgePresets)
      },
      classical: {
        name: "Classical Age Civilizations",
        presets: Object.keys(classicalAgePresets)
      },
      scenarios: {
        name: "Historical Scenarios",
        presets: Object.keys(scenarioPresets)
      }
    };
  }

  // Public API
  return {
    getAllPresets,
    getPresetsForPeriod,
    getPreset,
    applyPreset,
    getPresetCategories
  };
})();

if (INFO) console.log("HistoricalPresets module loaded");
