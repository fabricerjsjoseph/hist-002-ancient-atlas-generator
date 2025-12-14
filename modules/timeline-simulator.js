"use strict";
// Timeline Simulator Module
// Manages dynamic borders over time with a timeline slider

window.TimelineSimulator = (function() {
  
  // Timeline state
  let currentYear = 0;
  let startYear = -3000;
  let endYear = 500;
  let isPlaying = false;
  let playbackSpeed = 1; // Years per second
  let playbackInterval = null;
  
  // Store state snapshots over time
  let stateSnapshots = new Map(); // year -> state data
  let borderHistory = new Map(); // stateId -> [year -> borders]
  
  /**
   * Create a snapshot of current state borders
   */
  function captureStateSnapshot(year) {
    if (!pack || !pack.states) return null;
    
    const snapshot = {
      year: year,
      states: []
    };
    
    pack.states.forEach((state, i) => {
      if (!state.i || state.removed) return;
      
      snapshot.states.push({
        id: state.i,
        name: state.name,
        color: state.color,
        cells: state.cells ? [...state.cells] : [],
        area: state.area,
        neighbors: state.neighbors ? [...state.neighbors] : []
      });
    });
    
    return snapshot;
  }
  
  /**
   * Apply a state snapshot to the map
   */
  function applyStateSnapshot(snapshot) {
    if (!snapshot || !pack || !pack.states) return false;
    
    // Store current states that exist in snapshot
    const snapshotStateIds = new Set(snapshot.states.map(s => s.id));
    
    // Mark states that don't exist in snapshot as removed
    pack.states.forEach((state, i) => {
      if (state.i && !snapshotStateIds.has(state.i)) {
        state.removed = true;
      }
    });
    
    // Update or restore states from snapshot
    snapshot.states.forEach(snapState => {
      const state = pack.states[snapState.id];
      if (!state) return;
      
      state.removed = false;
      state.name = snapState.name;
      state.color = snapState.color;
      state.cells = snapState.cells;
      state.area = snapState.area;
      state.neighbors = snapState.neighbors;
    });
    
    return true;
  }
  
  /**
   * Interpolate between two snapshots for smooth transitions
   */
  function interpolateSnapshots(snapshot1, snapshot2, progress) {
    // For now, just use the nearest snapshot
    // Future enhancement: actual interpolation
    return progress < 0.5 ? snapshot1 : snapshot2;
  }
  
  // Public API
  return {
    
    /**
     * Initialize the timeline simulator
     */
    initialize: function(options = {}) {
      startYear = options.startYear || -3000;
      endYear = options.endYear || 500;
      currentYear = startYear;
      isPlaying = false;
      stateSnapshots.clear();
      borderHistory.clear();
      
      // Capture initial state
      const initialSnapshot = captureStateSnapshot(currentYear);
      if (initialSnapshot) {
        stateSnapshots.set(currentYear, initialSnapshot);
      }
      
      INFO && console.log(`Timeline Simulator initialized: ${startYear} to ${endYear}`);
    },
    
    /**
     * Get current year
     */
    getCurrentYear: function() {
      return currentYear;
    },
    
    /**
     * Set current year
     */
    setCurrentYear: function(year) {
      if (year < startYear || year > endYear) {
        WARN && console.warn(`Year ${year} is outside timeline range`);
        return false;
      }
      
      currentYear = year;
      
      // Apply snapshot if available
      const snapshot = this.getSnapshotForYear(year);
      if (snapshot) {
        applyStateSnapshot(snapshot);
      }
      
      // Update pack.time if it exists
      if (typeof pack !== 'undefined' && pack) {
        pack.time = year;
      }
      
      return true;
    },
    
    /**
     * Get year range
     */
    getYearRange: function() {
      return {
        start: startYear,
        end: endYear,
        current: currentYear
      };
    },
    
    /**
     * Capture a snapshot at specific year
     */
    captureSnapshot: function(year) {
      const snapshot = captureStateSnapshot(year || currentYear);
      if (snapshot) {
        stateSnapshots.set(snapshot.year, snapshot);
        INFO && console.log(`Captured state snapshot for year ${snapshot.year}`);
        return true;
      }
      return false;
    },
    
    /**
     * Get snapshot for a specific year (with interpolation)
     */
    getSnapshotForYear: function(year) {
      // Check if exact snapshot exists
      if (stateSnapshots.has(year)) {
        return stateSnapshots.get(year);
      }
      
      // Find nearest snapshots for interpolation
      const years = Array.from(stateSnapshots.keys()).sort((a, b) => a - b);
      
      if (years.length === 0) return null;
      if (years.length === 1) return stateSnapshots.get(years[0]);
      
      // Find surrounding snapshots
      let beforeYear = years[0];
      let afterYear = years[years.length - 1];
      
      for (let i = 0; i < years.length; i++) {
        if (years[i] <= year) beforeYear = years[i];
        if (years[i] >= year) {
          afterYear = years[i];
          break;
        }
      }
      
      // Return nearest snapshot
      const distBefore = Math.abs(year - beforeYear);
      const distAfter = Math.abs(year - afterYear);
      
      return stateSnapshots.get(distBefore <= distAfter ? beforeYear : afterYear);
    },
    
    /**
     * Record territorial change
     */
    recordTerritorialChange: function(stateId, year, territories) {
      if (!borderHistory.has(stateId)) {
        borderHistory.set(stateId, new Map());
      }
      
      borderHistory.get(stateId).set(year, {
        year: year,
        cells: territories.cells || [],
        area: territories.area || 0
      });
    },
    
    /**
     * Get territorial changes for a state
     */
    getTerritorialHistory: function(stateId) {
      if (!borderHistory.has(stateId)) return [];
      
      const history = borderHistory.get(stateId);
      return Array.from(history.values()).sort((a, b) => a.year - b.year);
    },
    
    /**
     * Advance timeline by years
     */
    advance: function(years = 1) {
      const newYear = currentYear + years;
      return this.setCurrentYear(Math.min(newYear, endYear));
    },
    
    /**
     * Go back in timeline
     */
    reverse: function(years = 1) {
      const newYear = currentYear - years;
      return this.setCurrentYear(Math.max(newYear, startYear));
    },
    
    /**
     * Start timeline playback
     */
    play: function(speed = 1) {
      if (isPlaying) return;
      
      playbackSpeed = speed;
      isPlaying = true;
      
      playbackInterval = setInterval(() => {
        const advanced = this.advance(playbackSpeed * 10); // 10 years per interval
        
        if (!advanced) {
          this.stop(); // Stop when reaching end
        }
        
        // Trigger redraw if function exists
        if (typeof drawStates === 'function') {
          drawStates();
        }
      }, 1000); // Update every second
      
      INFO && console.log(`Timeline playback started at speed ${speed}x`);
    },
    
    /**
     * Stop timeline playback
     */
    stop: function() {
      if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
      }
      isPlaying = false;
      INFO && console.log("Timeline playback stopped");
    },
    
    /**
     * Check if timeline is playing
     */
    isPlaying: function() {
      return isPlaying;
    },
    
    /**
     * Reset timeline to start
     */
    reset: function() {
      this.stop();
      this.setCurrentYear(startYear);
    },
    
    /**
     * Generate intermediate snapshots between two years
     */
    generateIntermediateSnapshots: function(year1, year2, steps = 10) {
      const snapshot1 = stateSnapshots.get(year1);
      const snapshot2 = stateSnapshots.get(year2);
      
      if (!snapshot1 || !snapshot2) {
        WARN && console.warn("Cannot generate intermediate snapshots: missing base snapshots");
        return false;
      }
      
      const yearStep = (year2 - year1) / (steps + 1);
      
      for (let i = 1; i <= steps; i++) {
        const intermediateYear = Math.round(year1 + yearStep * i);
        const progress = i / (steps + 1);
        
        // For now, just copy the nearest snapshot
        // Future: implement actual interpolation
        const nearestSnapshot = progress < 0.5 ? snapshot1 : snapshot2;
        stateSnapshots.set(intermediateYear, nearestSnapshot);
      }
      
      INFO && console.log(`Generated ${steps} intermediate snapshots between ${year1} and ${year2}`);
      return true;
    },
    
    /**
     * Simulate territorial expansion/contraction
     */
    simulateTerritorialChange: function(stateId, changePercent, year) {
      if (!pack || !pack.states || !pack.states[stateId]) return false;
      
      const state = pack.states[stateId];
      const currentCells = state.cells || 0;
      const newCells = Math.round(currentCells * (1 + changePercent / 100));
      
      this.recordTerritorialChange(stateId, year, {
        cells: newCells,
        area: state.area * (1 + changePercent / 100)
      });
      
      INFO && console.log(`State ${state.name} territory changed by ${changePercent}% in year ${year}`);
      return true;
    },
    
    /**
     * Clear all timeline data
     */
    clear: function() {
      this.stop();
      stateSnapshots.clear();
      borderHistory.clear();
      currentYear = startYear;
      INFO && console.log("Timeline Simulator cleared");
    },
    
    /**
     * Export timeline data
     */
    exportData: function() {
      return {
        currentYear: currentYear,
        startYear: startYear,
        endYear: endYear,
        snapshots: Array.from(stateSnapshots.entries()),
        borderHistory: Array.from(borderHistory.entries()).map(([stateId, history]) => ({
          stateId: stateId,
          history: Array.from(history.entries())
        }))
      };
    },
    
    /**
     * Import timeline data
     */
    importData: function(data) {
      if (data) {
        currentYear = data.currentYear || startYear;
        startYear = data.startYear || -3000;
        endYear = data.endYear || 500;
        
        stateSnapshots.clear();
        if (data.snapshots) {
          data.snapshots.forEach(([year, snapshot]) => {
            stateSnapshots.set(year, snapshot);
          });
        }
        
        borderHistory.clear();
        if (data.borderHistory) {
          data.borderHistory.forEach(({stateId, history}) => {
            const historyMap = new Map();
            history.forEach(([year, data]) => {
              historyMap.set(year, data);
            });
            borderHistory.set(stateId, historyMap);
          });
        }
        
        INFO && console.log(`Imported timeline data with ${stateSnapshots.size} snapshots`);
      }
    },
    
    /**
     * Get statistics about timeline
     */
    getStatistics: function() {
      return {
        snapshots: stateSnapshots.size,
        trackedStates: borderHistory.size,
        yearRange: endYear - startYear,
        currentYear: currentYear,
        isPlaying: isPlaying
      };
    }
  };
})();
