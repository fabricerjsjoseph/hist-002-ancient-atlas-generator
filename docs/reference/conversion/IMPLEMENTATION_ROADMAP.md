# Ancient Atlas Generator - Quick Implementation Roadmap

## Overview
Transform Fantasy Map Generator into Ancient Atlas Generator across 20 agent sessions (10 phases).

## Current State ✅
- **Codebase**: 15,968 lines, modular architecture
- **Generation Pipeline**: Heightmap → Biomes → Cultures → States → Names → Rendering (~1s)
- **43 Name Bases**: Including Roman, Greek, Arabic, Chinese, Egyptian patterns
- **Status**: Analysis complete, ready for Phase 1

## Phase Overview (20 Sessions)

| Phase | Sessions | Goal | Key Deliverables |
|-------|----------|------|------------------|
| **1** | 1-2 | Historical Data Foundation | Civilization database, time period selector, historical mode toggle |
| **2** | 3-4 | Cultural & Naming | Historical cultures, authentic naming (Greek polis, Roman cities, etc.) |
| **3** | 5-6 | Political Systems | City-states, empires, dynasties, vassal relationships |
| **4** | 7-8 | Historical Geography | Ancient biomes, trade routes, landmarks (pyramids, ziggurats) |
| **5** | 9-10 | Religion & Society | Historical pantheons, temples, religious spread |
| **6** | 11-12 | Military & Warfare | Ancient units (chariots, phalanx, legions), fortifications |
| **7** | 13-14 | UI & Visualization | Historical mode UI, ancient cartography aesthetics |
| **8** | 15-16 | Specialized Features | Events, dynamic borders, dynasties, archaeology |
| **9** | 17-18 | Presets & Templates | Quick-start historical maps, documentation |
| **10** | 19-20 | Testing & Polish | Accuracy review, optimization, community feedback |

## Civilizations to Implement

### Bronze Age (3300-1200 BCE)
- **Sumerian** - City-states, ziggurats, cuneiform
- **Egyptian** - Pharaonic kingdoms, pyramids, Nile-dependent
- **Minoan** - Maritime thalassocracy, palace complexes
- **Hittite** - Iron-using empire, chariot warfare
- **Mycenaean** - Fortified citadels, Linear B

### Classical Age (800 BCE - 500 CE)
- **Greek** - Independent poleis, hoplite warfare, democratic/oligarchic
- **Roman** - Republican/Imperial, legions, provinces, roads
- **Persian** - Satrapies, Immortals, vast empire
- **Carthaginian** - Maritime republic, Punic colonies
- **Celtic** - Tribal confederations, oppida, warrior culture

## Key Files to Modify

| File | Purpose | Changes |
|------|---------|---------|
| `main.js` | Entry point | Add historical mode initialization |
| `modules/cultures-generator.js` | Culture generation | Historical culture sets, constraints |
| `modules/burgs-and-states.js` | Political entities | City-states, empires, dynasties |
| `modules/names-generator.js` | Naming | Historical patterns (polis, municipia) |
| `modules/religions-generator.js` | Religion | Historical pantheons |
| `modules/military-generator.js` | Military | Ancient unit types |
| `modules/heightmap-generator.js` | Terrain | Ancient world geography templates |
| `index.html` | UI | Historical mode controls |

## New Files to Create

### Data Files
- `data/civilizations/sumerian.js`
- `data/civilizations/egyptian.js`
- `data/civilizations/greek.js`
- `data/civilizations/roman.js`
- `data/civilizations/persian.js`
- `data/historical-pantheons.js`
- `data/ancient-military-units.js`
- `data/historical-name-patterns.js`

### Module Files
- `modules/historical-mode.js` - Core historical mode logic
- `modules/historical-names.js` - Leader/dynasty naming
- `modules/political-systems.js` - Government types
- `modules/dynasty-tracker.js` - Royal families
- `modules/trade-routes.js` - Historical trade networks
- `modules/ancient-landmarks.js` - Pyramids, ziggurats, etc.
- `modules/religious-sites.js` - Temples, oracles
- `modules/fortifications.js` - Ancient defensive structures
- `modules/historical-events.js` - Wars, migrations, etc.
- `modules/timeline-simulator.js` - Dynamic borders over time
- `modules/archaeology.js` - Ruins and lost cities

### Config Files
- `config/historical-periods.js` - Time period definitions
- `config/historical-presets.js` - Quick-start maps

### Style Files
- `styles/historical-bronze.json` - Bronze Age aesthetic
- `styles/historical-classical.json` - Classical aesthetic

### UI Files
- `modules/ui/historical-controls.js` - Historical mode UI

### Documentation
- `docs/HISTORICAL_MODE_GUIDE.md` - User guide
- `docs/CIVILIZATION_REFERENCE.md` - Civilization details
- `docs/DEVELOPER_GUIDE.md` - Technical documentation

## Quick Start (Phase 1, Session 1)

### Step 1: Create Directory Structure
```bash
mkdir -p data/civilizations
mkdir -p config
mkdir -p docs
```

### Step 2: Create First Civilization Profile
```javascript
// data/civilizations/egyptian.js
export const egyptianCivilization = {
  id: "egyptian",
  name: "Ancient Egyptian",
  period: "bronzeAge",
  
  // Name generation
  nameBase: 42, // Levantine (closest to Egyptian)
  cityPrefix: ["Akh", "Men", "Theb", "Mem", "Heli"],
  citySuffix: ["phis", "is", "opolis"],
  
  // Geography requirements
  geography: {
    requiresRiver: true,
    preferredBiome: "desert",
    riverValleyDependent: 0.9
  },
  
  // Government
  governmentTypes: ["theocracy", "kingdom"],
  ruleTitles: ["Pharaoh", "Divine Ruler"],
  
  // Military
  militaryComposition: {
    chariotArchers: 0.3,
    infantry: 0.4,
    archers: 0.2,
    naval: 0.1
  },
  
  // Culture
  culturalTraits: {
    monumentBuilding: 0.95,
    urbanization: 0.7,
    fortification: 0.6,
    expansion: 0.5
  },
  
  // Religion
  pantheon: ["Ra", "Osiris", "Isis", "Horus", "Anubis", "Thoth"],
  religiousImportance: 0.95,
  
  // Landmarks
  landmarks: ["pyramid", "temple", "obelisk", "sphinx"]
};
```

### Step 3: Create Historical Periods Config
```javascript
// config/historical-periods.js
export const historicalPeriods = {
  bronzeAge: {
    name: "Bronze Age",
    years: { start: -3300, end: -1200 },
    civilizations: ["sumerian", "egyptian", "minoan", "hittite", "mycenaean"],
    technology: ["bronze", "chariot", "irrigation", "writing"],
    governmentTypes: ["cityState", "kingdom", "theocracy"],
    maxStateSize: 50
  },
  
  classical: {
    name: "Classical Age",
    years: { start: -800, end: 500 },
    civilizations: ["greek", "roman", "persian", "carthaginian", "celtic"],
    technology: ["iron", "phalanx", "trireme", "roads"],
    governmentTypes: ["cityState", "republic", "empire", "monarchy"],
    maxStateSize: 200
  }
};
```

### Step 4: Create Historical Mode Module
```javascript
// modules/historical-mode.js
export class HistoricalMode {
  constructor() {
    this.enabled = false;
    this.period = null;
    this.civilizations = [];
  }
  
  enable(period) {
    this.enabled = true;
    this.period = period;
    this.loadCivilizations(period);
  }
  
  disable() {
    this.enabled = false;
    this.period = null;
    this.civilizations = [];
  }
  
  loadCivilizations(period) {
    // Load civilization data based on period
    const periodConfig = historicalPeriods[period];
    this.civilizations = periodConfig.civilizations.map(
      id => import(`../data/civilizations/${id}.js`)
    );
  }
  
  applyConstraints(generation) {
    if (!this.enabled) return generation;
    
    // Apply historical constraints to generation
    const periodConfig = historicalPeriods[this.period];
    generation.maxStates = periodConfig.maxStateSize;
    generation.governmentTypes = periodConfig.governmentTypes;
    generation.technology = periodConfig.technology;
    
    return generation;
  }
}
```

### Step 5: Add UI Controls (index.html)
```html
<div id="historicalControls" style="display:none;">
  <label>
    <input type="checkbox" id="enableHistoricalMode"> Historical Mode
  </label>
  
  <select id="historicalPeriod">
    <option value="">Select Period</option>
    <option value="bronzeAge">Bronze Age (3300-1200 BCE)</option>
    <option value="classical">Classical Age (800 BCE - 500 CE)</option>
  </select>
  
  <select id="historicalCivilization">
    <option value="">All Civilizations</option>
    <option value="egyptian">Ancient Egyptian</option>
    <option value="greek">Greek</option>
    <option value="roman">Roman</option>
  </select>
</div>
```

## Testing Checklist

### After Each Phase
- [ ] Fantasy mode still works (no regressions)
- [ ] Historical mode generates correctly
- [ ] Performance remains <2 seconds
- [ ] UI is intuitive
- [ ] Documentation is updated

### Final Testing (Phase 10)
- [ ] All civilizations generate accurately
- [ ] Historical names are authentic
- [ ] Political systems reflect history
- [ ] Military compositions are period-appropriate
- [ ] Visual styles are historically themed
- [ ] Presets work correctly
- [ ] User guide is complete

## Success Criteria

1. ✅ Users can toggle between fantasy and historical modes
2. ✅ Historical maps reflect accurate ancient world patterns
3. ✅ 5+ civilizations fully implemented per time period
4. ✅ Generation time stays under 2 seconds
5. ✅ No breaking changes to fantasy mode
6. ✅ Complete documentation for users and developers

## Resources

- **Main Analysis**: `ANCIENT_ATLAS_ANALYSIS.md` (18KB detailed technical guide)
- **Current Codebase**: Fantasy Map Generator v1.108.12
- **Generation Pipeline**: ~1 second for complex maps
- **Name Bases**: 43 existing (Roman=8, Greek=7, Levantine=42, Arabic=18, Chinese=11)

## Timeline Estimate

- **Total Sessions**: 20
- **Estimated Time**: 10 weeks (2 sessions/week) or 5 weeks (4 sessions/week)
- **Complexity**: Medium (leveraging existing systems)
- **Risk**: Low (phased, backwards-compatible approach)

---

**Ready to Start?** → Begin with Phase 1, Session 1: Create Egyptian civilization profile

*For detailed implementation, see ANCIENT_ATLAS_ANALYSIS.md*
