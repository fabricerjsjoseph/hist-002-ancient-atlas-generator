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
    
    if (toggleCivInfo) {
      toggleCivInfo.addEventListener("click", toggleCivilizationPanel);
    }
    
    if (toggleTimeline) {
      toggleTimeline.addEventListener("click", toggleTimelinePanel);
    }
    
    if (toggleDynasty) {
      toggleDynasty.addEventListener("click", toggleDynastyPanel);
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
    const panels = ["civilizationInfoPanel", "timelinePanel", "dynastyInfoPanel"];
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
    updateCivilizationPanel,
    updateTimelinePanel,
    updateDynastyPanel,
    showHistoricalControls,
    hideHistoricalControls,
    applyHistoricalStyle
  };
})();
