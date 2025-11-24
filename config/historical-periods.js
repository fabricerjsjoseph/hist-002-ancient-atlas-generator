"use strict";
// Historical Periods Configuration

window.HistoricalPeriods = {
  bronzeAge: {
    id: "bronzeAge",
    name: "Bronze Age",
    displayName: "Bronze Age (3300-1200 BCE)",
    years: {start: -3300, end: -1200},
    civilizations: ["sumerian", "egyptian", "minoan", "hittite", "mycenaean"],
    technology: ["bronze", "chariot", "irrigation", "cuneiform", "hieroglyphics"],
    governmentTypes: ["cityState", "kingdom", "theocracy", "palace_economy", "thalassocracy"],
    maxStateSize: 50,
    description: "The age of early civilizations, characterized by bronze tools and weapons, the rise of city-states, and the development of writing."
  },
  
  classical: {
    id: "classical",
    name: "Classical Age",
    displayName: "Classical Age (800 BCE - 500 CE)",
    years: {start: -800, end: 500},
    civilizations: ["greek", "roman", "persian", "carthaginian", "celtic"],
    technology: ["iron", "phalanx", "trireme", "roads", "aqueducts", "concrete"],
    governmentTypes: ["cityState", "republic", "empire", "monarchy", "democracy", "oligarchy"],
    maxStateSize: 200,
    description: "The era of great empires, philosophical advancement, and classical arts. Marked by the rise of Greece and Rome."
  }
};

// Helper functions for historical periods
window.HistoricalPeriodsUtils = {
  // Get all available periods
  getAllPeriods: function() {
    return Object.keys(HistoricalPeriods);
  },
  
  // Get period by ID
  getPeriod: function(periodId) {
    return HistoricalPeriods[periodId] || null;
  },
  
  // Get civilizations for a period
  getCivilizationsForPeriod: function(periodId) {
    const period = HistoricalPeriods[periodId];
    return period ? period.civilizations : [];
  },
  
  // Check if a year falls within a period
  isYearInPeriod: function(year, periodId) {
    const period = HistoricalPeriods[periodId];
    if (!period) return false;
    return year >= period.years.start && year <= period.years.end;
  },
  
  // Get the period for a given year
  getPeriodForYear: function(year) {
    for (const [periodId, period] of Object.entries(HistoricalPeriods)) {
      if (year >= period.years.start && year <= period.years.end) {
        return periodId;
      }
    }
    return null;
  },
  
  // Format a year for display (handles BCE/CE)
  formatYear: function(year) {
    if (year < 0) {
      return `${Math.abs(year)} BCE`;
    } else if (year === 0) {
      return "1 BCE/CE";
    } else {
      return `${year} CE`;
    }
  }
};
