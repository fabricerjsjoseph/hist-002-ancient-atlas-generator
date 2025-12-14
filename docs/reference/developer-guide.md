# Developer Guide: Historical Mode

Technical documentation for developers working on the Ancient Atlas Generator's Historical Mode.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Module Structure](#module-structure)
3. [Data Files](#data-files)
4. [Key APIs](#key-apis)
5. [Integration Points](#integration-points)
6. [Adding New Features](#adding-new-features)
7. [Testing and Validation](#testing-and-validation)
8. [Code Conventions](#code-conventions)

## Architecture Overview

Historical Mode is built as a modular extension to the Fantasy Map Generator, preserving backward compatibility while adding historical civilization support.

### Design Principles

1. **Non-Breaking**: Fantasy mode remains fully functional
2. **Modular**: Historical features are self-contained modules
3. **Data-Driven**: Civilizations defined in JSON-like data structures
4. **Extensible**: Easy to add new civilizations or features
5. **Performance**: No significant impact on generation time

### File Organization

```
/
├── config/
│   ├── historical-periods.js      # Time period definitions
│   ├── historical-presets.js      # Quick-start configurations
│   └── heightmap-templates.js     # Geographic templates
├── data/
│   ├── civilizations/             # Civilization profiles
│   │   ├── egyptian.js
│   │   ├── sumerian.js
│   │   └── ... (10 total)
│   ├── historical-name-patterns.js
│   ├── historical-pantheons.js
│   └── ancient-military-units.js
├── modules/
│   ├── historical-mode.js         # Core mode management
│   ├── historical-names.js        # Naming utilities
│   ├── political-systems.js      # Government types
│   ├── dynasty-tracker.js        # Dynasty management
│   ├── trade-routes.js           # Trade network generation
│   ├── ancient-landmarks.js      # Landmark placement
│   ├── religious-sites.js        # Sacred site generation
│   ├── fortifications.js         # Defense structures
│   ├── historical-events.js      # Event system
│   ├── timeline-simulator.js     # Dynamic borders
│   ├── archaeology.js            # Ancient ruins
│   └── ui/
│       └── historical-controls.js # UI components
└── styles/
    ├── historical-bronze.json     # Bronze Age aesthetic
    └── historical-classical.json  # Classical Age aesthetic
```

## Module Structure

All historical modules follow the window namespace pattern:

```javascript
window.ModuleName = (function () {
  "use strict";

  // Private variables and functions
  let privateData = {};

  function privateFunction() {
    // Implementation
  }

  // Public API
  return {
    publicMethod: function() {
      // Implementation
    },
    anotherMethod: function() {
      // Implementation
    }
  };
})();
```

### Core Modules

#### HistoricalMode

**Purpose**: Central controller for historical mode state

**Location**: `modules/historical-mode.js`

**Key Functions**:
```javascript
HistoricalMode.enable(periodId)      // Enable historical mode
HistoricalMode.disable()             // Disable historical mode
HistoricalMode.isEnabled()           // Check if enabled
HistoricalMode.getCurrentPeriod()    // Get active period
HistoricalMode.selectCivilizations(civs) // Set active civilizations
HistoricalMode.getSelectedCivilizations() // Get active civilizations
HistoricalMode.getRecommendedSettings()   // Get period settings
```

**Usage Example**:
```javascript
// Enable historical mode for Classical Age
HistoricalMode.enable("classical");
HistoricalMode.selectCivilizations(["greek", "persian"]);

if (HistoricalMode.isEnabled()) {
  const settings = HistoricalMode.getRecommendedSettings();
  // Apply settings...
}
```

#### HistoricalNames

**Purpose**: Generate civilization-specific names

**Location**: `modules/historical-names.js`

**Key Functions**:
```javascript
HistoricalNames.getCity(civId)           // City name
HistoricalNames.getLeader(civId)         // Leader name with title
HistoricalNames.getDynasty(civId)        // Dynasty name
HistoricalNames.getStateName(civId)      // State/province name
HistoricalNames.getTitle(civId)          // Ruler title
```

**Usage Example**:
```javascript
const cityName = HistoricalNames.getCity("egyptian");
// Returns: "Memphis", "Thebes", etc.

const leader = HistoricalNames.getLeader("roman");
// Returns: "Caesar Augustus", "Trajan Optimus", etc.
```

#### PoliticalSystems

**Purpose**: Define and manage government types

**Location**: `modules/political-systems.js`

**Key Functions**:
```javascript
PoliticalSystems.getGovernmentType(civId)    // Get civilization's government
PoliticalSystems.applyPoliticalTraits(state) // Apply traits to state
PoliticalSystems.getSystemCharacteristics(type) // Get system details
```

**Government Types**:
- `cityState`: Independent cities (Greek, Sumerian)
- `empire`: Large unified territories (Roman, Persian)
- `republic`: Representative government (Rome, Carthage)
- `oligarchy`: Rule by elite (Carthage)
- `theocracy`: Religious government (Egyptian)
- `kingdom`: Monarchical rule (Mycenaean, Hittite)
- `confederation`: Loose alliance (Celtic)
- `despotism`: Autocratic rule (various)

#### DynastyTracker

**Purpose**: Track royal dynasties and succession

**Location**: `modules/dynasty-tracker.js`

**Key Functions**:
```javascript
DynastyTracker.createDynasty(stateId, civId)  // Create new dynasty
DynastyTracker.succeedRuler(dynastyId)       // Generate successor
DynastyTracker.getDynastiesForState(stateId) // Get state dynasties
DynastyTracker.getAllDynasties()             // Get all dynasties
```

**Dynasty Structure**:
```javascript
{
  id: 1,
  stateId: 5,
  civilizationId: "egyptian",
  name: "Ramessid Dynasty",
  founder: "Ramesses I",
  currentRuler: "Ramesses II the Great",
  foundingYear: -1292,
  endYear: null,
  rulers: [...]
}
```

## Data Files

### Civilization Profiles

**Location**: `data/civilizations/*.js`

**Structure**:
```javascript
window.CivilizationEgyptian = {
  id: "egyptian",
  name: "Egyptian",
  period: "bronzeAge",
  
  // Geography
  geography: {
    preferredTerrain: ["river"],
    avoidTerrain: ["mountains"],
    riverDependency: 95,
    coastalPreference: 40
  },
  
  // Government
  government: {
    type: "theocracy",
    rulerTitle: "Pharaoh",
    centralizedAuthority: 90,
    expansionism: 60
  },
  
  // Military
  military: {
    mainUnits: ["spearmen", "archers", "chariots"],
    eliteUnits: ["palaceGuard"],
    composition: {
      infantry: 40,
      ranged: 30,
      chariots: 20,
      naval: 10
    }
  },
  
  // Culture
  culture: {
    urbanization: 80,
    fortificationPreference: 70,
    tradeImportance: 60,
    nameBase: 42 // Levantine
  },
  
  // Religion
  religion: {
    pantheon: ["Ra", "Osiris", "Isis", "Horus", "Anubis"],
    religiousImportance: 95,
    religiousSites: ["pyramid", "temple", "sunTemple"]
  },
  
  // Landmarks
  landmarks: [
    {type: "pyramid", rarity: 0.3},
    {type: "temple", rarity: 0.6},
    {type: "obelisk", rarity: 0.5}
  ]
};
```

### Historical Name Patterns

**Location**: `data/historical-name-patterns.js`

**Structure**:
```javascript
window.HistoricalNamePatterns = {
  egyptian: {
    cities: {
      prefixes: ["Men", "Theo", "Heli", "Abyd"],
      suffixes: ["phis", "polis", "otep", "amun"],
      modifiers: ["Upper", "Lower", "Great"]
    },
    leaders: {
      male: ["Amenhotep", "Ramesses", "Thutmose"],
      female: ["Hatshepsut", "Nefertiti", "Cleopatra"],
      epithets: ["the Great", "the Builder", "the Warrior"]
    },
    dynasties: {
      patterns: ["Ramessid", "Ptolemaic", "Thutmosid"]
    }
  }
  // ... other civilizations
};
```

### Historical Presets

**Location**: `config/historical-presets.js`

**Structure**:
```javascript
const egyptianPreset = {
  id: "egyptian",
  name: "Ancient Egypt (Bronze Age)",
  description: "Nile-dependent civilization...",
  period: "bronzeAge",
  civilizations: ["egyptian"],
  settings: {
    template: "River Valley",
    cultures: 1,
    statesNumber: 2,
    year: -2500,
    era: "Old Kingdom"
    // ... more settings
  },
  heightmapTemplate: "riverValley",
  stylePreset: "historical-bronze"
};
```

## Key APIs

### Logging

Use logging guards for performance:

```javascript
if (INFO) console.log("Informational message");
if (WARN) console.warn("Warning message");
if (ERROR) console.error("Error message");
if (TIME) console.time("Operation");
if (TIME) console.timeEnd("Operation");
```

### Random Utilities

**Location**: `utils/probabilityUtils.js`

```javascript
// Random array selection
import { ra } from "./utils/probabilityUtils.js";
const item = ra(arrayOfItems);

// Random number in range
import { rand } from "./utils/probabilityUtils.js";
const value = rand(10, 50); // 10 to 50 inclusive
```

### Marker System

**Location**: Used in `modules/ancient-landmarks.js`, `modules/religious-sites.js`

```javascript
// Add a new marker
const marker = {
  id: last(pack.markers)?.i + 1 || 0,
  icon: "pyramid",
  type: "landmark",
  dx: x,
  dy: y,
  cell: cellId,
  i: burgId,
  name: "Great Pyramid of Giza",
  culture: cultureName,
  civ: "egyptian"
};

pack.markers.push(marker);
```

### Culture Generation

**Location**: `modules/cultures-generator.js`

Historical cultures integration:

```javascript
function generateHistoricalCultures() {
  if (!HistoricalMode.isEnabled()) return;
  
  const civs = HistoricalMode.getSelectedCivilizations();
  const period = HistoricalMode.getCurrentPeriod();
  
  civs.forEach((civId, index) => {
    const civData = getCivilizationData(civId);
    
    const culture = {
      name: civData.name,
      i: index,
      base: civData.culture.nameBase,
      shield: civData.culture.shield,
      color: generateColor(),
      expansionism: civData.government.expansionism / 100
    };
    
    pack.cultures[index] = culture;
  });
}
```

## Integration Points

### Map Generation Pipeline

Historical Mode integrates at multiple points:

```javascript
// main.js - Map generation sequence
async function generateMap() {
  // 1. Heightmap generation
  generateHeightmap();
  
  // 2. Check if historical mode
  if (HistoricalMode.isEnabled()) {
    // Apply historical geography templates if needed
  }
  
  // 3. Culture generation
  if (HistoricalMode.isEnabled()) {
    generateHistoricalCultures();
  } else {
    generateCultures();
  }
  
  // 4. State generation with political systems
  generateStates();
  if (HistoricalMode.isEnabled()) {
    PoliticalSystems.applyToAllStates();
    DynastyTracker.initializeDynasties();
  }
  
  // 5. Geography features
  generateRivers();
  generateLakes();
  
  // 6. Historical features
  if (HistoricalMode.isEnabled()) {
    TradeRoutes.generate();
    AncientLandmarks.generate();
    ReligiousSites.generate();
    Fortifications.generate();
  }
  
  // 7. Military
  generateMilitary(); // Uses historical units if enabled
  
  // 8. Render
  renderMap();
}
```

### Military Generator

**Location**: `modules/military-generator.js`

```javascript
function getHistoricalOrDefaultOptions() {
  if (!HistoricalMode.isEnabled()) {
    return getDefaultOptions();
  }
  
  const period = HistoricalMode.getCurrentPeriod();
  const civs = HistoricalMode.getSelectedCivilizations();
  
  return AncientMilitaryUnits.getHistoricalUnitOptions(civs, period);
}
```

### Religion Generator

**Location**: `modules/religions-generator.js`

```javascript
function generateHistoricalReligions() {
  const civs = HistoricalMode.getSelectedCivilizations();
  
  civs.forEach(civId => {
    const civData = getCivilizationData(civId);
    const pantheon = civData.religion.pantheon;
    
    // Create religion using historical pantheon
    const religion = {
      name: `${civData.name} Pantheon`,
      deities: pantheon,
      // ... other properties
    };
    
    pack.religions.push(religion);
  });
}
```

## Adding New Features

### Adding a New Civilization

1. **Create Civilization Data File**

```javascript
// data/civilizations/newciv.js
"use strict";

window.CivilizationNewciv = {
  id: "newciv",
  name: "New Civilization",
  period: "classical", // or "bronzeAge"
  
  geography: {
    preferredTerrain: ["plains"],
    riverDependency: 50,
    coastalPreference: 60
  },
  
  government: {
    type: "kingdom",
    rulerTitle: "King",
    centralizedAuthority: 70,
    expansionism: 65
  },
  
  military: {
    mainUnits: ["infantry", "cavalry"],
    composition: {
      infantry: 60,
      cavalry: 30,
      ranged: 10
    }
  },
  
  culture: {
    urbanization: 75,
    fortificationPreference: 70,
    nameBase: 8 // Existing name base or create new
  },
  
  religion: {
    pantheon: ["Deity1", "Deity2", "Deity3"],
    religiousImportance: 80,
    religiousSites: ["temple"]
  },
  
  landmarks: [
    {type: "temple", rarity: 0.5},
    {type: "palace", rarity: 0.3}
  ]
};

if (INFO) console.log("CivilizationNewciv data loaded");
```

2. **Add to Historical Periods**

```javascript
// config/historical-periods.js
const periods = {
  classical: {
    civilizations: [
      "greek", "roman", "persian", 
      "carthaginian", "celtic",
      "newciv" // Add here
    ]
  }
};
```

3. **Add Name Patterns**

```javascript
// data/historical-name-patterns.js
window.HistoricalNamePatterns.newciv = {
  cities: {
    prefixes: ["New", "Ancient"],
    suffixes: ["ville", "town"]
  },
  leaders: {
    male: ["Name1", "Name2"],
    female: ["Name3", "Name4"]
  }
};
```

4. **Add to Pantheons**

```javascript
// data/historical-pantheons.js
window.HistoricalPantheons.newciv = {
  name: "New Civilization Pantheon",
  deities: [
    {name: "Deity1", domain: "Sky", importance: 10},
    {name: "Deity2", domain: "War", importance: 8}
  ]
};
```

5. **Add Military Units**

```javascript
// data/ancient-military-units.js
// Add civilization-specific units or mark existing units
// as available to this civilization
```

6. **Update UI**

```javascript
// index.html - Add to civilization dropdown
<option value="newciv">New Civilization</option>
```

7. **Add Script Loading**

```javascript
// index.html - Add script tag
<script src="data/civilizations/newciv.js?v=1.0.0"></script>
```

8. **Create Preset (Optional)**

```javascript
// config/historical-presets.js
const newcivPreset = {
  id: "newciv",
  name: "New Civilization",
  description: "...",
  period: "classical",
  civilizations: ["newciv"],
  settings: {
    // ... configuration
  }
};
```

### Adding a New Feature Module

1. **Create Module File**

```javascript
// modules/new-feature.js
"use strict";

window.NewFeature = (function () {
  "use strict";

  let featureData = [];

  function initialize() {
    if (!HistoricalMode.isEnabled()) return;
    
    INFO && console.log("Initializing NewFeature");
    featureData = [];
  }

  function generate(options = {}) {
    if (!HistoricalMode.isEnabled()) return;
    
    const civs = HistoricalMode.getSelectedCivilizations();
    
    // Generation logic here
    civs.forEach(civId => {
      // Create features for each civilization
    });
    
    INFO && console.log(`Generated ${featureData.length} features`);
  }

  function getFeatures() {
    return featureData;
  }

  // Public API
  return {
    initialize,
    generate,
    getFeatures
  };
})();

if (INFO) console.log("NewFeature module loaded");
```

2. **Add to index.html**

```html
<script src="modules/new-feature.js?v=1.0.0"></script>
```

3. **Integrate in Generation Pipeline**

```javascript
// main.js - Add to appropriate place
if (HistoricalMode.isEnabled()) {
  NewFeature.initialize();
  NewFeature.generate();
}
```

4. **Add UI Controls (Optional)**

```javascript
// modules/ui/historical-controls.js
// Add panel and controls if needed
```

## Testing and Validation

### Manual Testing Checklist

1. **Basic Functionality**
   - [ ] Historical mode toggles on/off
   - [ ] Period selection works
   - [ ] Civilization selection works
   - [ ] Presets apply correctly

2. **Map Generation**
   - [ ] Historical map generates without errors
   - [ ] Names are civilization-specific
   - [ ] Political systems match civilizations
   - [ ] Landmarks appear appropriately

3. **Features**
   - [ ] Dynasties created for states
   - [ ] Trade routes generated
   - [ ] Landmarks placed correctly
   - [ ] Religious sites appear
   - [ ] Fortifications placed

4. **UI**
   - [ ] Historical controls visible when enabled
   - [ ] Info panels display correct data
   - [ ] Style presets apply correctly

5. **Performance**
   - [ ] Generation time < 2 seconds
   - [ ] No console errors
   - [ ] No memory leaks

### Automated Testing

```javascript
// Test historical mode enable/disable
function testHistoricalMode() {
  HistoricalMode.enable("bronzeAge");
  console.assert(HistoricalMode.isEnabled(), "Historical mode not enabled");
  console.assert(HistoricalMode.getCurrentPeriod() === "bronzeAge", "Period mismatch");
  
  HistoricalMode.disable();
  console.assert(!HistoricalMode.isEnabled(), "Historical mode not disabled");
}

// Test civilization loading
function testCivilizationData() {
  const egyptian = window.CivilizationEgyptian;
  console.assert(egyptian !== undefined, "Egyptian data not loaded");
  console.assert(egyptian.id === "egyptian", "Egyptian ID mismatch");
  console.assert(egyptian.period === "bronzeAge", "Egyptian period mismatch");
}

// Test name generation
function testNameGeneration() {
  const cityName = HistoricalNames.getCity("egyptian");
  console.assert(typeof cityName === "string", "City name not string");
  console.assert(cityName.length > 0, "City name empty");
}
```

### Performance Monitoring

```javascript
// Monitor generation time
if (TIME) console.time("Historical Map Generation");

// Your generation code

if (TIME) console.timeEnd("Historical Map Generation");

// Should be < 2 seconds for standard maps
```

## Code Conventions

### Naming

- **Modules**: PascalCase (e.g., `HistoricalMode`)
- **Functions**: camelCase (e.g., `generateHistoricalCultures`)
- **Variables**: camelCase (e.g., `selectedCivilizations`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `BRONZE_AGE_START`)
- **Files**: kebab-case (e.g., `historical-mode.js`)

### Module Pattern

```javascript
window.ModuleName = (function () {
  "use strict";

  // Private state
  let privateVar = null;

  // Private functions
  function privateFunction() {
    // Implementation
  }

  // Public API
  return {
    publicMethod: function() {
      // Implementation
    }
  };
})();
```

### Error Handling

```javascript
function someFunction(param) {
  if (!param) {
    ERROR && console.error("Parameter required");
    return null;
  }
  
  try {
    // Risky operation
  } catch (error) {
    ERROR && console.error("Operation failed:", error);
    return null;
  }
}
```

### Documentation

```javascript
/**
 * Generate historical trade routes
 * @param {Object} options - Generation options
 * @param {number} options.density - Route density (0-1)
 * @param {string[]} options.civilizations - Active civilizations
 * @returns {Array} Generated trade routes
 */
function generateTradeRoutes(options = {}) {
  // Implementation
}
```

### Versioning

Update version in `versioning.js`:

```javascript
const VERSION = "1.108.20";
```

Update file hashes in `index.html`:

```html
<script src="main.js?v=1.108.20"></script>
<script src="modules/new-module.js?v=1.108.20"></script>
```

## Best Practices

### Performance

1. **Lazy Loading**: Load civilization data only when needed
2. **Caching**: Cache expensive computations
3. **Batching**: Group similar operations
4. **Early Returns**: Exit early from functions when possible

### Compatibility

1. **Check Mode**: Always check if historical mode is enabled
2. **Fallbacks**: Provide defaults for missing data
3. **Null Checks**: Verify objects exist before access
4. **Graceful Degradation**: Continue working if features fail

### Maintainability

1. **Modular Code**: Keep modules focused and independent
2. **Clear APIs**: Well-defined public interfaces
3. **Documentation**: Comment complex logic
4. **Consistent Style**: Follow existing patterns

## Common Patterns

### Civilization Data Access

```javascript
function getCivilizationData(civId) {
  const windowKey = `Civilization${civId.charAt(0).toUpperCase() + civId.slice(1)}`;
  return window[windowKey] || null;
}
```

### Feature Generation Template

```javascript
function generateFeature() {
  if (!HistoricalMode.isEnabled()) return;
  
  const civs = HistoricalMode.getSelectedCivilizations();
  const period = HistoricalMode.getCurrentPeriod();
  
  civs.forEach(civId => {
    const civData = getCivilizationData(civId);
    if (!civData) return;
    
    // Generate features for this civilization
  });
}
```

### UI Panel Template

```javascript
function createInfoPanel() {
  const panel = document.getElementById("panelId");
  if (!panel) return;
  
  let html = "<h3>Panel Title</h3>";
  html += "<ul>";
  
  // Add content
  
  html += "</ul>";
  panel.innerHTML = html;
}
```

## Troubleshooting

### Module Not Loading

- Check script tag in index.html
- Verify file path is correct
- Check for JavaScript syntax errors
- Look for console errors

### Feature Not Generating

- Verify HistoricalMode.isEnabled() returns true
- Check civilization data is loaded
- Verify integration point is called
- Add logging to trace execution

### Names Not Historical

- Check culture.nameBase is correct
- Verify HistoricalNamePatterns has civilization data
- Ensure historical cultures are generated
- Check name base indices match

### Performance Issues

- Profile with browser DevTools
- Check for infinite loops
- Reduce feature density
- Optimize expensive calculations

## Resources

- **[Implementation Roadmap](./conversion/IMPLEMENTATION_ROADMAP.md)**: Phase-by-phase development plan
- **[Ancient Atlas Analysis](./conversion/ANCIENT_ATLAS_ANALYSIS.md)**: Technical analysis
- **[Civilization Reference](./civilization-reference.md)**: Complete civilization data
- **[User Guide](../how-to/historical-mode-guide.md)**: End-user documentation

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

---

*Last Updated: Phase 9 Implementation*
