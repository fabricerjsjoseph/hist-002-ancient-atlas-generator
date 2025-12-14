# Ancient Atlas Generator - Quick Implementation Roadmap

## Overview
Transform Fantasy Map Generator into Ancient Atlas Generator across 20 agent sessions (10 phases).

## Current State ✅
- **Codebase**: 15,968 lines, modular architecture
- **Generation Pipeline**: Heightmap → Biomes → Cultures → States → Names → Rendering (~1s)
- **43 Name Bases**: Including Roman, Greek, Arabic, Chinese, Egyptian patterns
- **Status**: ✅ **Phase 1, 2, 3 & 4 COMPLETE** - Historical Mode foundation, Cultural & Naming, Political Systems, and Historical Geography implemented

---

## Phase 1 & 2 Review (November 2024)

### ✅ Review Summary

Phase 1 and 2 have been **successfully implemented** with all planned features working correctly. The implementation provides a solid foundation for the Ancient Atlas Generator conversion.

### What Was Verified

#### Phase 1 - Historical Data Foundation
| Component | Status | Notes |
|-----------|--------|-------|
| Civilization Profiles (10) | ✅ Complete | Egyptian, Sumerian, Minoan, Hittite, Mycenaean, Greek, Roman, Persian, Carthaginian, Celtic |
| Historical Periods Config | ✅ Complete | Bronze Age (3300-1200 BCE), Classical Age (800 BCE - 500 CE) |
| Historical Mode Module | ✅ Complete | Toggle, period switching, civilization loading, constraints |
| UI Controls | ✅ Complete | Map Mode selector, Period dropdown, Civilization multi-select |
| Event Handlers | ✅ Complete | Proper integration in main.js |
| Script Loading | ✅ Complete | All files properly loaded in index.html |

#### Phase 2 - Cultural & Naming System
| Component | Status | Notes |
|-----------|--------|-------|
| Historical Name Patterns | ✅ Complete | City prefixes/suffixes, leader names, titles, dynasties for all 10 civilizations |
| Historical Names Module | ✅ Complete | 11 utility functions for name generation |
| Cultures Generator Integration | ✅ Complete | `generateHistoricalCultures()` function added |
| Civilization-Specific Cultures | ✅ Complete | Each civ has nameBase, shield, sort function, expansionism |

### Quality Assessment

**Strengths:**
1. **Well-Structured Data**: Civilization profiles are comprehensive with geography, military, religion, and cultural traits
2. **Consistent API**: HistoricalMode module provides clean interface for mode management
3. **UI Integration**: Historical mode controls appear/disappear based on mode selection
4. **Backward Compatibility**: Fantasy mode remains fully functional
5. **Authentic Data**: Historical names, titles, and pantheons are historically accurate

**Areas for Improvement (Minor):**
1. The `generateHistoricalCultures()` function could be enhanced to better utilize civilization data during map generation
2. Some civilization profiles use fallback name bases (e.g., Egyptian uses Levantine base 42 instead of a custom Egyptian base)
3. The historical cultures are currently only used when selecting "Antique" culture set - direct integration could be improved

### Recommendations for Future Phases

Based on the review, the implementation plan remains sound. Here are specific recommendations:

#### Phase 3 (Political Systems) - High Priority
- Focus on integrating civilization government types into state generation
- Implement city-state model for Greek/Sumerian civilizations
- Add empire/satrapy system for Persian civilization
- Consider adding vassal relationships early

#### Phase 4 (Historical Geography) - Adjusted Priority
- Consider moving trade routes to Phase 8 (Specialized Features) as they're complex
- Focus on landmarks (pyramids, ziggurats, temples) as they're simpler
- Use existing route generation system as foundation

#### Phase 5 (Religion & Society) - Use Existing Data
- Pantheon data already exists in civilization profiles - leverage this
- Focus on integrating pantheons into religion generator
- Add temple/religious site placement

#### Phase 6-10 - No Changes Recommended
- Original plan remains appropriate
- Consider parallel development of documentation (Phase 9) during other phases

---

## Implementation Progress

### ✅ Phase 1: Historical Data Foundation (COMPLETE)
**Completed in Session 1:**
- [x] Created directory structure (`data/civilizations/`, `config/`)
- [x] Created 10 civilization profiles:
  - Bronze Age: Egyptian, Sumerian, Minoan, Hittite, Mycenaean
  - Classical: Greek, Roman, Persian, Carthaginian, Celtic
- [x] Created historical periods configuration (`config/historical-periods.js`)
- [x] Created historical mode module (`modules/historical-mode.js`)
- [x] Added UI controls in `index.html` (Map Mode selector, Period selector, Civilization multi-select)
- [x] Added event handlers in `main.js`
- [x] Updated script loading in `index.html`

## Phase Overview (20 Sessions)

| Phase | Sessions | Goal | Key Deliverables | Status |
|-------|----------|------|------------------|--------|
| **1** | 1-2 | Historical Data Foundation | Civilization database, time period selector, historical mode toggle | ✅ COMPLETE |
| **2** | 3-4 | Cultural & Naming | Historical cultures, authentic naming (Greek polis, Roman cities, etc.) | ✅ COMPLETE |
| **3** | 5-6 | Political Systems | City-states, empires, dynasties, vassal relationships | ✅ COMPLETE |
| **4** | 7-8 | Historical Geography | Ancient biomes, trade routes, landmarks (pyramids, ziggurats) | ✅ COMPLETE |
| **5** | 9-10 | Religion & Society | Historical pantheons, temples, religious spread | ✅ COMPLETE |
| **6** | 11-12 | Military & Warfare | Ancient units (chariots, phalanx, legions), fortifications | ✅ COMPLETE |
| **7** | 13-14 | UI & Visualization | Historical mode UI, ancient cartography aesthetics | ✅ COMPLETE |
| **8** | 15-16 | Specialized Features | Events, dynamic borders, dynasties, archaeology | 🔲 Pending |
| **9** | 17-18 | Presets & Templates | Quick-start historical maps, documentation | 🔲 Pending |
| **10** | 19-20 | Testing & Polish | Accuracy review, optimization, community feedback | 🔲 Pending |

## Civilizations Implemented ✅

### Bronze Age (3300-1200 BCE)
- ✅ **Sumerian** - City-states, ziggurats, cuneiform (`data/civilizations/sumerian.js`)
- ✅ **Egyptian** - Pharaonic kingdoms, pyramids, Nile-dependent (`data/civilizations/egyptian.js`)
- ✅ **Minoan** - Maritime thalassocracy, palace complexes (`data/civilizations/minoan.js`)
- ✅ **Hittite** - Iron-using empire, chariot warfare (`data/civilizations/hittite.js`)
- ✅ **Mycenaean** - Fortified citadels, Linear B (`data/civilizations/mycenaean.js`)

### Classical Age (800 BCE - 500 CE)
- ✅ **Greek** - Independent poleis, hoplite warfare, democratic/oligarchic (`data/civilizations/greek.js`)
- ✅ **Roman** - Republican/Imperial, legions, provinces, roads (`data/civilizations/roman.js`)
- ✅ **Persian** - Satrapies, Immortals, vast empire (`data/civilizations/persian.js`)
- ✅ **Carthaginian** - Maritime republic, Punic colonies (`data/civilizations/carthaginian.js`)
- ✅ **Celtic** - Tribal confederations, oppida, warrior culture (`data/civilizations/celtic.js`)

## Key Files Modified (Phase 1)

| File | Purpose | Status |
|------|---------|--------|
| `main.js` | Entry point + historical mode handlers | ✅ Modified |
| `index.html` | UI controls for historical mode | ✅ Modified |

## Files Created (Phase 1)

### Data Files (All ✅ Created)
- ✅ `data/civilizations/sumerian.js`
- ✅ `data/civilizations/egyptian.js`
- ✅ `data/civilizations/minoan.js`
- ✅ `data/civilizations/hittite.js`
- ✅ `data/civilizations/mycenaean.js`
- ✅ `data/civilizations/greek.js`
- ✅ `data/civilizations/roman.js`
- ✅ `data/civilizations/persian.js`
- ✅ `data/civilizations/carthaginian.js`
- ✅ `data/civilizations/celtic.js`

### Config Files (All ✅ Created)
- ✅ `config/historical-periods.js` - Time period definitions

### Module Files (All ✅ Created)
- ✅ `modules/historical-mode.js` - Core historical mode logic

## Phase 2 Implementation Details (✅ COMPLETE)

### Files Created (Phase 2)
- ✅ `data/historical-name-patterns.js` - Historical name patterns for all civilizations
- ✅ `modules/historical-names.js` - Leader/dynasty naming utilities

### Files Modified (Phase 2)
- ✅ `modules/cultures-generator.js` - Added `generateHistoricalCultures()` function
- ✅ `index.html` - Added script loading for new files
- ✅ `versioning.js` - Updated to v1.108.13

### What Was Implemented

1. **Historical Name Patterns** (`data/historical-name-patterns.js`)
   - City naming patterns (prefixes, suffixes, geographic modifiers)
   - Leader name databases for all 10 civilizations
   - Title patterns (Pharaoh, Caesar, Archon, etc.)
   - Dynasty naming patterns

2. **Historical Names Module** (`modules/historical-names.js`)
   - `getLeader()` - Get leader name with title
   - `getLeaderName()` - Get leader name only
   - `getDynasty()` - Get dynasty name
   - `getCity()` - Generate civilization-specific city name
   - `getRomanFullName()` - Generate Roman tria nomina
   - `getTitle()` - Get ruler title
   - `getStateName()` - Generate state/province name
   - `getLeaderEpithet()` - Get epithets like "the Great"
   - `getFullRulerName()` - Complete ruler name with title and epithet

3. **Historical Cultures Generator** (in `modules/cultures-generator.js`)
   - Integrated with HistoricalMode to detect when historical mode is active
   - Generates cultures based on selected civilizations
   - Each civilization has specific:
     - Name base (linked to existing name generator)
     - Shield type
     - Sorting function (geographic preferences)
     - Expansionism rate

## Phase 3 Implementation Details (✅ COMPLETE)

### Files Created (Phase 3)
- ✅ `modules/political-systems.js` - Government type behaviors (city-state, empire, republic, etc.)
- ✅ `modules/dynasty-tracker.js` - Dynasty management and succession tracking

### Files Modified (Phase 3)
- ✅ `modules/burgs-and-states.js` - Integrated political systems
- ✅ `index.html` - Added script loading for new modules
- ✅ `main.js` - Added dynasty tracker initialization
- ✅ `versioning.js` - Updated to v1.108.14

### What Was Implemented

1. **Political Systems Module** (`modules/political-systems.js`)
   - Government type definitions: city-state, empire, republic, oligarchy, theocracy, kingdom, confederation, despotism
   - Each type has characteristics: max territory size, capital focus, expansion rate, province system, vassal/tribute tendencies
   - API for getting government types, applying political traits, and integrating with state generation

2. **Dynasty Tracker Module** (`modules/dynasty-tracker.js`)
   - Dynasty creation and tracking per state
   - Ruler succession with civilization-appropriate names and titles
   - Dynasty founding and ending events
   - Integration with historical name patterns

## Phase 4 Implementation Details (✅ COMPLETE)

### Files Created (Phase 4)
- ✅ `modules/trade-routes.js` - Historical trade network generator
- ✅ `modules/ancient-landmarks.js` - Civilization-specific landmark placement

### Files Modified (Phase 4)
- ✅ `config/heightmap-templates.js` - Added River Valley and Fertile Crescent templates
- ✅ `main.js` - Integrated trade routes and landmarks generation
- ✅ `index.html` - Added script loading for new modules
- ✅ `versioning.js` - Updated to v1.108.15

### What Was Implemented

1. **Trade Routes Module** (`modules/trade-routes.js`)
   - Sea trade routes connecting coastal cities (maritime civilizations)
   - Overland caravan routes for medium-distance trade
   - River trade routes for river-dependent civilizations
   - Trade importance calculation based on population, capitals, international trade
   - Integration with civilization traits (coastal preference, river dependency, trade values)

2. **Ancient Landmarks Module** (`modules/ancient-landmarks.js`)
   - 20+ landmark types: pyramids, ziggurats, temples, forums, aqueducts, etc.
   - Civilization-specific landmark placement based on civilization profiles
   - Terrain-aware placement (desert for pyramids, hills for acropolis, rivers for canals)
   - Rarity and proximity rules (near capitals, religious significance)
   - Integration with map marker system
   - Landmark naming using civilization and deity names

3. **Historical Geography Templates** (in `config/heightmap-templates.js`)
   - **River Valley**: Nile-style narrow fertile valley surrounded by desert/mountains
   - **Fertile Crescent**: Arc-shaped fertile region with rivers and surrounding highlands
   - Templates available for manual selection or historical mode presets

## Phase 5 Implementation Details (✅ COMPLETE)

### Files Created (Phase 5)
- ✅ `data/historical-pantheons.js` - Deity databases for all 10 civilizations
- ✅ `modules/religious-sites.js` - Temple and sacred site placement

### Files Modified (Phase 5)
- ✅ `modules/religions-generator.js` - Added historical pantheon integration
- ✅ `index.html` - Added script loading for Phase 5 files
- ✅ `main.js` - Integrated religious sites generation
- ✅ `versioning.js` - Updated to v1.108.16

### What Was Implemented

1. **Historical Pantheons** (`data/historical-pantheons.js`)
   - Comprehensive deity databases for all 10 civilizations
   - Deity domains, importance, and attributes
   - Religious site types per civilization

2. **Religious Sites Module** (`modules/religious-sites.js`)
   - Temple placement based on civilization and deity importance
   - Oracle locations for Greek civilization
   - Sacred sites and pilgrimage destinations
   - Integration with map marker system

## Phase 6 Implementation Details (✅ COMPLETE)

### Files Created (Phase 6)
- ✅ `data/ancient-military-units.js` - Historical military unit database
- ✅ `modules/fortifications.js` - Ancient defensive structures

### Files Modified (Phase 6)
- ✅ `modules/military-generator.js` - Added historical unit integration
- ✅ `index.html` - Added script loading for Phase 6 files
- ✅ `main.js` - Integrated fortifications generation
- ✅ `versioning.js` - Updated to v1.108.17

### What Was Implemented

1. **Ancient Military Units** (`data/ancient-military-units.js`)
   - **Bronze Age Units** (6 types):
     - Spearmen, archers, chariots, war galleys, palace guard, axe warriors
     - Civilization-specific filtering (e.g., chariots for Egyptian, Hittite)
     - Biome restrictions (chariots only in open terrain)
   - **Classical Age Units** (14 types):
     - Hoplites, legionnaires, bowmen, cavalry, immortals, war elephants
     - Celtic warriors, auxiliaries, triremes, quinqueremes, siege engines
     - Cataphracts, light cavalry, praetorians
     - Civilization-specific elite units (immortals for Persian, praetorians for Roman)
   - **API Functions**:
     - `getUnitsForPeriod(period)` - Get all units for a time period
     - `getUnitsForCivilization(civ, period)` - Get units for specific civilization
     - `getUnitsForCivilizations(civs, period)` - Get units for multiple civilizations
     - `getHistoricalUnitOptions(civs, period)` - Complete integration function

2. **Fortifications Module** (`modules/fortifications.js`)
   - **4 Fortification Types**:
     - City Walls: Population-based, civilization preference (Roman 90%, Minoan 50%)
     - Border Forts: Along state boundaries, prefer highlands
     - Naval Bases: At major ports, coastal civilization preference
     - Watch Towers: Surveillance points on highlands/coasts/roads
   - **10 Civilization Styles**:
     - Roman: Stone walls with towers, castrum forts, naval ports
     - Greek: Cyclopean walls, hilltop fortresses
     - Egyptian: Mudbrick walls, desert forts, river ports
     - Persian: Brick walls with gates, mountain fortresses
     - And 6 more civilization-specific styles
   - **Smart Placement Logic**:
     - Terrain-aware (highlands for forts, coasts for naval bases)
     - Population thresholds (500+ for city walls)
     - Civilization cultural traits (fortification preference)
     - Capital cities get bonus probability

3. **Military Generator Integration** (in `modules/military-generator.js`)
   - New function: `getHistoricalOrDefaultOptions()`
     - Checks if historical mode is enabled via `HistoricalMode.isEnabled()`
     - Gets current period and selected civilizations
     - Returns historical units when in historical mode
     - Falls back to fantasy units in fantasy mode
   - Maintains full backward compatibility
   - Fantasy mode completely unaffected

## Phase 7 Implementation Details (✅ COMPLETE)

### Files Created (Phase 7)
- ✅ `styles/historical-bronze.json` - Bronze Age visual aesthetic
- ✅ `styles/historical-classical.json` - Classical Age visual aesthetic
- ✅ `modules/ui/historical-controls.js` - Historical UI controls and info panels

### Files Modified (Phase 7)
- ✅ `modules/ui/style-presets.js` - Added historical-bronze and historical-classical presets
- ✅ `index.html` - Added historical info panels HTML and script loading
- ✅ `index.css` - Added historical UI styling
- ✅ `main.js` - Integrated historical controls initialization and mode switching
- ✅ `versioning.js` - Updated to v1.108.18

### What Was Implemented

1. **Historical Visual Styles** (`styles/historical-bronze.json` and `styles/historical-classical.json`)
   - **Bronze Age Aesthetic**:
     - Warm earth tones: sandy backgrounds (#d4c4a0), brown borders (#8b4513)
     - Papyrus-style fonts and textures
     - Muted water colors (#7ba5c8) to evoke ancient maps
     - Strong borders for city-states and small kingdoms
     - Antique texture overlay for aged appearance
   - **Classical Age Aesthetic**:
     - Lighter parchment background (#f5f0e8)
     - Roman red accents (#8b2500) for borders
     - Classical fonts (Trajan Pro, Cinzel)
     - Refined styling for larger empires
     - Clean, elegant cartographic style
   - Both styles registered in `modules/ui/style-presets.js`

2. **Historical UI Controls Module** (`modules/ui/historical-controls.js`)
   - **Civilization Info Panel**:
     - Shows selected civilizations with details
     - Displays government type, military composition, cultural traits
     - Dynamically updates when civilizations are selected
   - **Timeline Panel**:
     - Shows current historical period (Bronze Age / Classical Age)
     - Displays period date ranges
     - Lists key characteristics of the period
   - **Dynasty Info Panel**:
     - Shows all established dynasties by state
     - Displays current ruler, dynasty name, founding year
     - Integrates with DynastyTracker module
   - **Auto-style Application**:
     - Automatically applies appropriate historical style when period changes
     - Bronze Age → historical-bronze style
     - Classical Age → historical-classical style

3. **UI Integration** (in `index.html` and `index.css`)
   - Added historical controls button group (top-right, fixed position)
   - Three toggle buttons: Civilizations, Timeline, Dynasties
   - Info panels styled with ancient parchment aesthetic
   - Semi-transparent backgrounds with border styling
   - Panel positioning that doesn't interfere with map
   - Historical-themed fonts (Cinzel, Georgia) and colors

4. **Main Application Integration** (in `main.js`)
   - Enhanced `handleMapModeChange()`:
     - Shows/hides historical controls when mode switches
     - Auto-applies historical visual style on mode enable
   - Added `HistoricalControls.init()` to DOMContentLoaded
   - Controls visibility tied to historical mode state

### Testing Performed
- ✅ JSON validation for both style files
- ✅ JavaScript syntax check for historical-controls.js
- ✅ Server startup successful
- ✅ File integrity verified

## Files to Create (Future Phases)

### Data Files (Completed)
- ✅ `data/historical-pantheons.js`
- ✅ `data/ancient-military-units.js`

### Module Files (Pending)
- ✅ `modules/political-systems.js` - Government types
- ✅ `modules/dynasty-tracker.js` - Royal families
- ✅ `modules/trade-routes.js` - Historical trade networks
- ✅ `modules/ancient-landmarks.js` - Pyramids, ziggurats, etc.
- ✅ `modules/religious-sites.js` - Temples, oracles
- ✅ `modules/fortifications.js` - Ancient defensive structures
- 🔲 `modules/historical-events.js` - Wars, migrations, etc.
- 🔲 `modules/timeline-simulator.js` - Dynamic borders over time
- 🔲 `modules/archaeology.js` - Ruins and lost cities

## Key Files to Modify (Future Phases)

| File | Purpose | Changes | Status |
|------|---------|---------|--------|
| `modules/cultures-generator.js` | Culture generation | Historical culture sets, constraints | ✅ Modified |
| `modules/burgs-and-states.js` | Political entities | City-states, empires, dynasties | ✅ Modified |
| `config/heightmap-templates.js` | Terrain templates | Historical geography templates | ✅ Modified |
| `modules/names-generator.js` | Naming | Historical patterns (polis, municipia) | 🔲 Pending |
| `modules/religions-generator.js` | Religion | Historical pantheons | ✅ Modified |
| `modules/military-generator.js` | Military | Ancient unit types | ✅ Modified |

## New Files to Create (Future Phases)

### Config Files (Pending)
- 🔲 `config/historical-presets.js` - Quick-start maps
- ✅ `styles/historical-bronze.json` - Bronze Age aesthetic
- ✅ `styles/historical-classical.json` - Classical aesthetic

### UI Files (Completed)
- ✅ `modules/ui/historical-controls.js` - Historical mode UI (extended)

### Documentation (Pending)
- 🔲 `docs/HISTORICAL_MODE_GUIDE.md` - User guide
- 🔲 `docs/CIVILIZATION_REFERENCE.md` - Civilization details
- 🔲 `docs/DEVELOPER_GUIDE.md` - Technical documentation

## Phase 1 Implementation Details (✅ COMPLETE)

### What Was Implemented

1. **Directory Structure Created**
   ```
   data/civilizations/     # 10 civilization profile files
   config/                 # Historical periods configuration
   ```

2. **Civilization Profiles** - Each profile includes:
   - Name generation patterns (prefixes, suffixes)
   - Leader titles and historical names
   - Dynasty names
   - Geography preferences (river, coastal, etc.)
   - Government types
   - Military composition and unit types
   - Cultural traits (urbanization, expansion, etc.)
   - Religion (pantheon with deities and domains)
   - Landmark types
   - Historical constraints (time period, max state size)

3. **Historical Mode Module** (`modules/historical-mode.js`)
   - Toggle between fantasy/historical modes
   - Period-based civilization loading
   - Constraint application system
   - Recommended settings generator

4. **UI Controls** (in `index.html`)
   - Map Mode selector (Fantasy/Historical)
   - Time Period dropdown (Bronze Age / Classical Age)
   - Civilization multi-select with optgroups

5. **Event Handlers** (in `main.js`)
   - `handleMapModeChange()` - Toggle historical mode
   - `handleHistoricalPeriodChange()` - Switch periods
   - `updateCivilizationOptions()` - Filter civilizations by period
   - `handleCivilizationSelectionChange()` - Track selected civilizations

## Testing Checklist

### Phase 1 Testing (✅ Complete)
- [x] All JavaScript files load without errors
- [x] UI controls appear and function
- [x] Civilization data is accessible via `window.Civilization*` globals
- [x] HistoricalMode API works correctly
- [x] Fantasy mode still works (no regressions)

### Future Phase Testing
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

### Phase 1 (✅ Achieved)
1. ✅ Civilization database created with 10 profiles
2. ✅ Historical periods configuration defined
3. ✅ Historical mode module implemented
4. ✅ UI controls added for mode selection
5. ✅ No breaking changes to fantasy mode

### Overall Project
1. 🔲 Users can toggle between fantasy and historical modes
2. 🔲 Historical maps reflect accurate ancient world patterns
3. ✅ 5+ civilizations fully implemented per time period
4. 🔲 Generation time stays under 2 seconds
5. ✅ No breaking changes to fantasy mode
6. 🔲 Complete documentation for users and developers

## Resources

- **Main Analysis**: `ANCIENT_ATLAS_ANALYSIS.md` (18KB detailed technical guide)
- **Current Codebase**: Fantasy Map Generator v1.108.13
- **Generation Pipeline**: ~1 second for complex maps
- **Name Bases**: 43 existing (Roman=8, Greek=7, Levantine=42, Arabic=18, Chinese=11)

## Timeline Estimate

- **Total Sessions**: 20
- **Completed Sessions**: 4 (Phases 1-2)
- **Estimated Remaining Time**: 8 weeks (2 sessions/week) or 4 weeks (4 sessions/week)
- **Complexity**: Medium (leveraging existing systems)
- **Risk**: Low (phased, backwards-compatible approach)

---

## Next Steps → Phase 5: Religion & Society (Sessions 9-10)

### Objectives
Implement historical religious systems with civilization-specific pantheons and religious sites.

### Key Tasks

#### Session 9: Historical Pantheons
1. **Create `data/historical-pantheons.js`**
   - Comprehensive deity databases for all 10 civilizations
   - Deity domains, relationships, and importance
   - Religious site types (temples, oracles, shrines)

2. **Modify `modules/religions-generator.js`**
   - Add `generateHistoricalReligions()` function
   - Integrate civilization pantheons
   - Religious spread based on cultural/political influence

#### Session 10: Religious Sites & Society
1. **Create `modules/religious-sites.js`**
   - Temple placement based on civilization and deity importance
   - Oracle locations for Greek civilization
   - Sacred sites and pilgrimage destinations

2. **Enhance Society Simulation**
   - Religious festivals and holy days
   - Priest classes and religious hierarchy
   - Religious conflicts and conversions

### Files to Modify
- `modules/religions-generator.js` - Core religion generation

### Files to Create
- `data/historical-pantheons.js` - Deity databases
- `modules/religious-sites.js` - Sacred site placement

### Integration Points
- Use `CivilizationX.pantheon` for deity selection
- Use `CivilizationX.religiousImportance` for temple frequency
- Use `CivilizationX.religiousSites` for site types

### Testing Criteria
- [ ] Egyptian states worship Ra, Osiris, Isis
- [ ] Greek states have temples to Zeus, Athena, Apollo
- [ ] Roman states worship Jupiter, Mars, Venus
- [ ] Religious sites appear near appropriate cities
- [ ] Fantasy mode unaffected

*For detailed implementation patterns, see ANCIENT_ATLAS_ANALYSIS.md*
