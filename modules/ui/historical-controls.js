// UI module for historical mode controls and info panels
"use strict";

window.HistoricalControls = (function() {
  
  // Initialize historical UI elements
  function init() {
    if (INFO) console.log("INFO: Initializing Historical Controls UI");
    
    // Set up event listeners for info panel toggles
    setupEventListeners();
    
    // Initialize panels as hidden
    hideAllInfoPanels();
  }
  
  // Setup event listeners for UI interactions
  function setupEventListeners() {
    const toggleCivInfo = document.getElementById("toggleCivInfo");
    const toggleTimeline = document.getElementById("toggleTimeline");
    const toggleDynasty = document.getElementById("toggleDynasty");
    const toggleEvents = document.getElementById("toggleEvents");
    const toggleArchaeology = document.getElementById("toggleArchaeology");
    
    if (toggleCivInfo) {
      toggleCivInfo.addEventListener("click", toggleCivilizationPanel);
    }
    
    if (toggleTimeline) {
      toggleTimeline.addEventListener("click", toggleTimelineControlPanel);
    }
    
    if (toggleDynasty) {
      toggleDynasty.addEventListener("click", toggleDynastyPanel);
    }
    
    if (toggleEvents) {
      toggleEvents.addEventListener("click", toggleEventsPanel);
    }
    
    if (toggleArchaeology) {
      toggleArchaeology.addEventListener("click", toggleArchaeologyPanel);
    }
    
    // Timeline control event listeners
    setupTimelineControlListeners();
  }
  
  // Setup timeline control listeners
  function setupTimelineControlListeners() {
    const timelineSlider = document.getElementById("timelineSlider");
    const timelinePlay = document.getElementById("timelinePlay");
    const timelineStop = document.getElementById("timelineStop");
    const timelineReset = document.getElementById("timelineReset");
    
    if (timelineSlider) {
      timelineSlider.addEventListener("input", (e) => {
        const year = parseInt(e.target.value);
        if (window.TimelineSimulator) {
          TimelineSimulator.setCurrentYear(year);
          updateTimelineYearDisplay(year);
          
          // Redraw map to show changes
          if (typeof drawStates === 'function') {
            drawStates();
          }
        }
      });
    }
    
    if (timelinePlay) {
      timelinePlay.addEventListener("click", () => {
        if (window.TimelineSimulator) {
          TimelineSimulator.play();
        }
      });
    }
    
    if (timelineStop) {
      timelineStop.addEventListener("click", () => {
        if (window.TimelineSimulator) {
          TimelineSimulator.stop();
        }
      });
    }
    
    if (timelineReset) {
      timelineReset.addEventListener("click", () => {
        if (window.TimelineSimulator) {
          TimelineSimulator.reset();
          const yearRange = TimelineSimulator.getYearRange();
          updateTimelineYearDisplay(yearRange.start);
          
          const slider = document.getElementById("timelineSlider");
          if (slider) slider.value = yearRange.start;
          
          // Redraw map
          if (typeof drawStates === 'function') {
            drawStates();
          }
        }
      });
    }
  }
  
  // Update timeline year display
  function updateTimelineYearDisplay(year) {
    const display = document.getElementById("timelineYearDisplay");
    if (display) {
      display.textContent = year;
    }
  }
  
  // Toggle civilization info panel
  function toggleCivilizationPanel() {
    const panel = document.getElementById("civilizationInfoPanel");
    if (!panel) return;
    
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
    
    if (!isVisible) {
      updateCivilizationPanel();
    }
  }
  
  // Toggle timeline panel
  function toggleTimelinePanel() {
    const panel = document.getElementById("timelinePanel");
    if (!panel) return;
    
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
    
    if (!isVisible) {
      updateTimelinePanel();
    }
  }
  
  // Toggle dynasty info panel
  function toggleDynastyPanel() {
    const panel = document.getElementById("dynastyInfoPanel");
    if (!panel) return;
    
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
    
    if (!isVisible) {
      updateDynastyPanel();
    }
  }
  
  // Toggle events info panel
  function toggleEventsPanel() {
    const panel = document.getElementById("eventsInfoPanel");
    if (!panel) return;
    
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
    
    if (!isVisible) {
      updateEventsPanel();
    }
  }
  
  // Toggle archaeology info panel
  function toggleArchaeologyPanel() {
    const panel = document.getElementById("archaeologyInfoPanel");
    if (!panel) return;
    
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
    
    if (!isVisible) {
      updateArchaeologyPanel();
    }
  }
  
  // Toggle timeline control panel
  function toggleTimelineControlPanel() {
    const panel = document.getElementById("timelineControlPanel");
    if (!panel) return;
    
    const isVisible = panel.style.display !== "none";
    panel.style.display = isVisible ? "none" : "block";
    
    if (!isVisible && window.TimelineSimulator) {
      // Update slider with current timeline state
      const yearRange = TimelineSimulator.getYearRange();
      const slider = document.getElementById("timelineSlider");
      if (slider) {
        slider.min = yearRange.start;
        slider.max = yearRange.end;
        slider.value = yearRange.current;
      }
      updateTimelineYearDisplay(yearRange.current);
    }
  }
  
  // Update civilization info panel with current data
  function updateCivilizationPanel() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) return;
    
    const panel = document.getElementById("civilizationInfoPanel");
    if (!panel) return;
    
    const selectedCivs = HistoricalMode.getSelectedCivilizations();
    const period = HistoricalMode.getCurrentPeriod();
    
    let html = '<div class="historical-panel-header">Selected Civilizations</div>';
    html += `<div class="historical-panel-subheader">Period: ${getPeriodName(period)}</div>`;
    
    if (selectedCivs.length === 0) {
      html += '<div class="historical-panel-content">No civilizations selected</div>';
    } else {
      html += '<div class="historical-panel-content">';
      selectedCivs.forEach(civName => {
        const civData = getCivilizationData(civName);
        if (civData) {
          html += formatCivilizationInfo(civData);
        }
      });
      html += '</div>';
    }
    
    panel.innerHTML = html;
  }
  
  // Update timeline panel with historical events
  function updateTimelinePanel() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) return;
    
    const panel = document.getElementById("timelinePanel");
    if (!panel) return;
    
    const period = HistoricalMode.getCurrentPeriod();
    const periodData = window.HistoricalPeriods ? HistoricalPeriods.periods[period] : null;
    
    let html = '<div class="historical-panel-header">Historical Timeline</div>';
    
    if (periodData) {
      html += `<div class="historical-panel-subheader">${periodData.name}</div>`;
      html += `<div class="historical-panel-content">`;
      html += `<div class="timeline-period">${periodData.start} - ${periodData.end}</div>`;
      
      if (periodData.characteristics) {
        html += `<div class="timeline-characteristics">`;
        html += `<strong>Key Characteristics:</strong><ul>`;
        periodData.characteristics.forEach(char => {
          html += `<li>${char}</li>`;
        });
        html += `</ul></div>`;
      }
      
      html += `</div>`;
    } else {
      html += '<div class="historical-panel-content">No timeline data available</div>';
    }
    
    panel.innerHTML = html;
  }
  
  // Update events panel with historical events
  function updateEventsPanel() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) return;
    
    const panel = document.getElementById("eventsInfoPanel");
    if (!panel) return;
    
    let html = '<div class="historical-panel-header">Historical Events</div>';
    html += '<div class="historical-panel-content">';
    
    if (!window.HistoricalEvents) {
      html += '<div>Historical Events module not available.</div>';
    } else {
      const events = HistoricalEvents.getAllEvents();
      
      if (events.length === 0) {
        html += '<div>No historical events recorded yet.</div>';
      } else {
        // Get most recent events (last 10)
        const recentEvents = events.slice(-10).reverse();
        
        html += '<div class="events-list">';
        recentEvents.forEach(event => {
          html += `<div class="event-entry">`;
          html += `<div class="event-icon">${event.icon}</div>`;
          html += `<div class="event-details">`;
          html += `<div class="event-name"><strong>${event.name}</strong></div>`;
          html += `<div class="event-year">Year: ${event.year}</div>`;
          html += `<div class="event-description">${event.description}</div>`;
          html += `</div>`;
          html += `</div>`;
        });
        html += '</div>';
        
        // Show statistics
        const stats = HistoricalEvents.getStatistics();
        html += `<div style="margin-top: 10px; border-top: 1px solid #ccc; padding-top: 5px;">`;
        html += `<small>Total Events: ${stats.totalEvents}</small>`;
        html += `</div>`;
      }
    }
    
    html += '</div>';
    panel.innerHTML = html;
  }
  
  // Update archaeology panel with archaeological sites
  function updateArchaeologyPanel() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) return;
    
    const panel = document.getElementById("archaeologyInfoPanel");
    if (!panel) return;
    
    let html = '<div class="historical-panel-header">Archaeological Sites</div>';
    html += '<div class="historical-panel-content">';
    
    if (!window.Archaeology) {
      html += '<div>Archaeology module not available.</div>';
    } else {
      const sites = Archaeology.getAllSites();
      
      if (sites.length === 0) {
        html += '<div>No archaeological sites discovered yet.</div>';
      } else {
        // Group sites by importance
        const majorSites = sites.filter(s => s.importance === "major");
        const minorSites = sites.filter(s => s.importance === "minor");
        
        if (majorSites.length > 0) {
          html += '<div class="archaeology-section">';
          html += '<strong>Major Sites:</strong>';
          majorSites.forEach(site => {
            html += `<div class="site-entry">`;
            html += `<div class="site-icon">${site.icon}</div>`;
            html += `<div class="site-details">`;
            html += `<div class="site-name"><strong>${site.name}</strong></div>`;
            html += `<div class="site-age">Age: ${site.age} years</div>`;
            html += `<div class="site-condition">Condition: ${site.condition}</div>`;
            html += `</div>`;
            html += `</div>`;
          });
          html += '</div>';
        }
        
        html += `<div style="margin-top: 10px;">`;
        html += `<small>Total Sites: ${sites.length} (${majorSites.length} major, ${minorSites.length} minor)</small>`;
        html += `</div>`;
      }
    }
    
    html += '</div>';
    panel.innerHTML = html;
  }
  
  // Update dynasty info panel with current dynasties
  function updateDynastyPanel() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) return;
    
    const panel = document.getElementById("dynastyInfoPanel");
    if (!panel) return;
    
    let html = '<div class="historical-panel-header">Dynasties & Rulers</div>';
    html += '<div class="historical-panel-content">';
    
    if (!pack || !pack.states || !window.DynastyTracker) {
      html += '<div>No dynasty data available. Generate a map first.</div>';
    } else {
      const dynasties = DynastyTracker.getAllDynasties();
      
      if (Object.keys(dynasties).length === 0) {
        html += '<div>No dynasties have been established yet.</div>';
      } else {
        pack.states.forEach((state, stateId) => {
          if (stateId === 0 || state.removed) return;
          
          const dynasty = dynasties[stateId];
          if (dynasty) {
            html += `<div class="dynasty-entry">`;
            html += `<div class="dynasty-state"><strong>${state.fullName || state.name}</strong></div>`;
            html += `<div class="dynasty-name">Dynasty: ${dynasty.name}</div>`;
            html += `<div class="dynasty-ruler">Current Ruler: ${dynasty.currentRuler}</div>`;
            html += `<div class="dynasty-founded">Founded: Year ${dynasty.founded || 0}</div>`;
            html += `</div>`;
          }
        });
      }
    }
    
    html += '</div>';
    panel.innerHTML = html;
  }
  
  // Helper function to get period display name
  function getPeriodName(periodKey) {
    const periods = {
      bronzeAge: "Bronze Age (3300-1200 BCE)",
      classical: "Classical Age (800 BCE - 500 CE)"
    };
    return periods[periodKey] || periodKey;
  }
  
  // Helper function to get civilization data
  function getCivilizationData(civName) {
    const civGlobal = `Civilization${civName.charAt(0).toUpperCase() + civName.slice(1)}`;
    return window[civGlobal] || null;
  }
  
  // Helper function to format civilization info
  function formatCivilizationInfo(civ) {
    let html = `<div class="civ-entry">`;
    html += `<div class="civ-name"><strong>${civ.name}</strong></div>`;
    
    if (civ.government) {
      html += `<div class="civ-detail"><em>Government:</em> ${civ.government.type}</div>`;
    }
    
    if (civ.military && civ.military.composition) {
      const units = Object.entries(civ.military.composition).slice(0, 3);
      html += `<div class="civ-detail"><em>Military:</em> ${units.map(([u, p]) => u).join(", ")}</div>`;
    }
    
    if (civ.culture && civ.culture.traits) {
      html += `<div class="civ-detail"><em>Traits:</em> ${civ.culture.traits.join(", ")}</div>`;
    }
    
    html += `</div>`;
    return html;
  }
  
  // Hide all info panels
  function hideAllInfoPanels() {
    const panels = ["civilizationInfoPanel", "timelinePanel", "dynastyInfoPanel", 
                    "eventsInfoPanel", "archaeologyInfoPanel", "timelineControlPanel"];
    panels.forEach(panelId => {
      const panel = document.getElementById(panelId);
      if (panel) panel.style.display = "none";
    });
  }
  
  // Show historical controls when historical mode is enabled
  function showHistoricalControls() {
    const controls = document.getElementById("historicalControls");
    if (controls) {
      controls.style.display = "block";
    }
  }
  
  // Hide historical controls when historical mode is disabled
  function hideHistoricalControls() {
    const controls = document.getElementById("historicalControls");
    if (controls) {
      controls.style.display = "none";
    }
    hideAllInfoPanels();
  }
  
  // Auto-apply appropriate historical style based on period
  function applyHistoricalStyle() {
    if (!window.HistoricalMode || !HistoricalMode.isEnabled()) return;
    
    const period = HistoricalMode.getCurrentPeriod();
    const stylePresetSelect = document.getElementById("stylePreset");
    
    if (!stylePresetSelect) return;
    
    let targetStyle = "ancient";
    if (period === "bronzeAge") {
      targetStyle = "historical-bronze";
    } else if (period === "classical") {
      targetStyle = "historical-classical";
    }
    
    // Only auto-apply if not currently using a historical style
    const currentStyle = stylePresetSelect.value;
    if (!currentStyle.includes("historical") && !currentStyle.includes("ancient")) {
      if (INFO) console.log(`INFO: Auto-applying historical style: ${targetStyle}`);
      stylePresetSelect.value = targetStyle;
      if (window.applyStylePreset) {
        applyStylePreset();
      }
    }
  }
  
  // Public API
  return {
    init,
    toggleCivilizationPanel,
    toggleTimelinePanel,
    toggleDynastyPanel,
    toggleEventsPanel,
    toggleArchaeologyPanel,
    toggleTimelineControlPanel,
    updateCivilizationPanel,
    updateTimelinePanel,
    updateDynastyPanel,
    updateEventsPanel,
    updateArchaeologyPanel,
    showHistoricalControls,
    hideHistoricalControls,
    applyHistoricalStyle
  };
})();
