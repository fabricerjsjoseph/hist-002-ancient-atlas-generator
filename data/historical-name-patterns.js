"use strict";
// Historical Name Patterns for Ancient Civilizations
// Provides specialized naming patterns for cities, leaders, and dynasties

window.HistoricalNamePatterns = {
  // Greek polis naming patterns
  greek: {
    cityPatterns: {
      // Greek city name endings
      suffixes: [
        "polis", "ia", "os", "on", "ai", "ae", "eia", "ene", 
        "oura", "issa", "anthe", "inte", "aea", "ene"
      ],
      // Common Greek city prefixes
      prefixes: [
        "Neo", "Mega", "Mikro", "Paleo", "Hiero", "Kalo", 
        "Leuko", "Melano", "Chryso", "Argyro"
      ],
      // Geographic modifiers
      geographic: [
        "Epi", "Hypo", "Para", "Peri", "Meta", "Pro", "Amphi"
      ]
    },
    // Leader name patterns
    leaderNames: {
      male: [
        "Pericles", "Themistocles", "Leonidas", "Alexander", "Philip", 
        "Solon", "Cleisthenes", "Alcibiades", "Demosthenes", "Epaminondas",
        "Lysander", "Agesilaus", "Miltiades", "Cimon", "Nicias",
        "Pyrrhus", "Ptolemy", "Seleucus", "Antigonus", "Cassander"
      ],
      female: [
        "Aspasia", "Artemisia", "Gorgo", "Cynisca", "Arete", 
        "Diotima", "Telesilla", "Hydna", "Phye", "Olympias"
      ]
    },
    // Title patterns
    titles: ["Archon", "Strategos", "Basileus", "Tyrant", "Hegemon"],
    // Dynasty name patterns
    dynasties: ["Antigonid", "Ptolemaic", "Seleucid", "Attalid", "Agiad", "Eurypontid"]
  },

  // Roman naming patterns  
  roman: {
    cityPatterns: {
      // Roman city name endings
      suffixes: [
        "um", "a", "ae", "ium", "ia", "ona", "ensis",
        "dunum", "briga", "magus", "acum"
      ],
      // Common Roman prefixes
      prefixes: [
        "Nova", "Augusta", "Colonia", "Castra", "Forum",
        "Aquae", "Ad", "Trans", "Cis", "Sub"
      ],
      // City type markers
      types: ["Municipium", "Colonia", "Civitas", "Oppidum", "Vicus"]
    },
    // Leader name patterns (praenomen + nomen + cognomen)
    leaderNames: {
      praenomen: [
        "Gaius", "Lucius", "Marcus", "Publius", "Quintus",
        "Titus", "Gnaeus", "Aulus", "Decimus", "Sextus"
      ],
      nomen: [
        "Julius", "Cornelius", "Claudius", "Fabius", "Valerius",
        "Aemilius", "Antonius", "Octavius", "Tullius", "Licinius"
      ],
      cognomen: [
        "Magnus", "Maximus", "Felix", "Pius", "Augustus",
        "Caesar", "Africanus", "Germanicus", "Britannicus", "Macedonicus"
      ]
    },
    // Titles
    titles: ["Rex", "Consul", "Praetor", "Dictator", "Imperator", "Augustus", "Caesar"],
    // Dynasty patterns
    dynasties: ["Julio-Claudian", "Flavian", "Antonine", "Severan", "Constantinian"]
  },

  // Egyptian naming patterns
  egyptian: {
    cityPatterns: {
      // Egyptian city components
      prefixes: [
        "Per", "Men", "Wast", "Ineb", "Iunu", "Khem",
        "Neb", "Het", "Djed", "Sau"
      ],
      suffixes: [
        "opolis", "nofer", "hotep", "nefer", "ankh",
        "waset", "amun", "ptah", "ra"
      ],
      // Nome (district) based names
      nomes: [
        "Ta-Seti", "Wetjes-Hor", "Nekhen", "Waset", "Harawia",
        "Iqer", "Bat", "Abtjw", "Min", "Wadjet"
      ]
    },
    // Pharaonic names
    leaderNames: {
      male: [
        "Ramesses", "Thutmose", "Amenhotep", "Akhenaten", "Seti",
        "Khufu", "Khafre", "Menkaure", "Sneferu", "Djoser",
        "Horemheb", "Ahmose", "Psamtik", "Necho", "Merenptah"
      ],
      female: [
        "Nefertiti", "Cleopatra", "Hatshepsut", "Nefertari", "Tiye",
        "Ankhesenamun", "Arsinoe", "Berenice", "Nitocris"
      ]
    },
    // Royal titles
    titles: ["Pharaoh", "Per-aa", "Nesu-Bity", "Son of Ra", "Lord of the Two Lands"],
    // Dynasty naming
    dynasties: ["Ptolemaic", "Hyksos", "Nubian", "Libyan", "Persian"]
  },

  // Sumerian/Mesopotamian naming patterns
  sumerian: {
    cityPatterns: {
      // Sumerian city elements
      roots: [
        "Ur", "Eridu", "Nippur", "Lagash", "Uruk",
        "Kish", "Akkad", "Babylon", "Assur", "Nineveh"
      ],
      suffixes: [
        "ki", "gir", "su", "sar", "nin", "gal"
      ],
      prefixes: [
        "E", "Uru", "Eri", "Kar", "Dur", "Bab"
      ]
    },
    // Leader names
    leaderNames: {
      male: [
        "Gilgamesh", "Sargon", "Hammurabi", "Nebuchadnezzar", "Ashurbanipal",
        "Gudea", "Ur-Nammu", "Shulgi", "Naram-Sin", "Rim-Sin",
        "Tiglath-Pileser", "Sennacherib", "Esarhaddon", "Nabopolassar"
      ],
      female: [
        "Enheduanna", "Kubaba", "Sammuramat", "Shammuramat", "Puabi"
      ]
    },
    // Titles
    titles: ["Lugal", "Ensi", "En", "Shar", "Shar-Kali-Sharri"],
    // Dynasty patterns
    dynasties: ["Akkadian", "Ur III", "Old Babylonian", "Kassite", "Neo-Assyrian", "Chaldean"]
  },

  // Persian naming patterns
  persian: {
    cityPatterns: {
      suffixes: [
        "polis", "abad", "an", "stan", "shahr", "kert"
      ],
      prefixes: [
        "Per", "Eka", "Susa", "Pasa", "Hama", "Arta"
      ]
    },
    leaderNames: {
      male: [
        "Cyrus", "Darius", "Xerxes", "Artaxerxes", "Cambyses",
        "Bardiya", "Hystaspes", "Arsaces", "Mithridates", "Phraates",
        "Shapur", "Ardashir", "Hormizd", "Yazdegerd", "Khosrow"
      ],
      female: [
        "Atossa", "Amestris", "Parysatis", "Stateira", "Roxana",
        "Artemisia", "Mandane", "Pantea"
      ]
    },
    titles: ["Shahanshah", "Shah", "Satrap", "Spahbod", "Marzban"],
    dynasties: ["Achaemenid", "Arsacid", "Sasanian"]
  },

  // Celtic naming patterns
  celtic: {
    cityPatterns: {
      suffixes: [
        "dunum", "briga", "magus", "acon", "lanum",
        "ritum", "ava", "ona", "antia"
      ],
      prefixes: [
        "Novio", "Medio", "Vindo", "Eburo", "Lugu",
        "Briganto", "Catu", "Viro", "Segonto"
      ]
    },
    leaderNames: {
      male: [
        "Vercingetorix", "Brennus", "Ambiorix", "Dumnorix", "Orgetorix",
        "Cassivellaunus", "Caratacus", "Boudicca", "Prasutagus", "Calgacus",
        "Cunobelinus", "Togodumnus", "Adminius", "Cogidubnus"
      ],
      female: [
        "Boudicca", "Cartimandua", "Veleda", "Epona", "Brigantia"
      ]
    },
    titles: ["Rix", "Vergobretus", "Druides", "Bard", "Ovate"],
    dynasties: ["Arverni", "Aedui", "Belgae", "Iceni", "Brigantes"]
  },

  // Minoan naming patterns
  minoan: {
    cityPatterns: {
      suffixes: [
        "os", "sos", "thos", "assos", "inthos"
      ],
      prefixes: [
        "Kno", "Phai", "Mali", "Zak", "Gour"
      ]
    },
    leaderNames: {
      male: [
        "Minos", "Rhadamanthys", "Sarpedon", "Idomeneus", "Deucalion"
      ],
      female: [
        "Ariadne", "Pasiphae", "Phaedra", "Europa", "Britomartis"
      ]
    },
    titles: ["Minos", "Wanax", "Lawagetas"],
    dynasties: ["Minoan", "Knossian"]
  },

  // Hittite naming patterns
  hittite: {
    cityPatterns: {
      suffixes: [
        "tuwa", "ssa", "zzi", "nda", "anti"
      ],
      prefixes: [
        "Hat", "Tar", "Kar", "Pur", "Wil"
      ]
    },
    leaderNames: {
      male: [
        "Suppiluliuma", "Mursili", "Hattusili", "Tudhaliya", "Arnuwanda",
        "Telipinu", "Labarna", "Zidanta", "Muwatalli"
      ],
      female: [
        "Puduhepa", "Tawananna", "Gassulawiya", "Asmunikal"
      ]
    },
    titles: ["Labarna", "Tabarna", "Great King", "My Sun"],
    dynasties: ["Old Kingdom", "Middle Kingdom", "New Kingdom"]
  },

  // Mycenaean naming patterns
  mycenaean: {
    cityPatterns: {
      suffixes: [
        "nai", "ne", "ai", "os", "on"
      ],
      prefixes: [
        "My", "Ti", "Py", "Or", "Ar"
      ]
    },
    leaderNames: {
      male: [
        "Agamemnon", "Menelaus", "Nestor", "Odysseus", "Achilles",
        "Ajax", "Diomedes", "Patroclus", "Theseus", "Perseus"
      ],
      female: [
        "Helen", "Clytemnestra", "Iphigenia", "Electra", "Andromache"
      ]
    },
    titles: ["Wanax", "Lawagetas", "Basileus"],
    dynasties: ["Atreides", "Pelopidae", "Labdacids"]
  },

  // Carthaginian naming patterns
  carthaginian: {
    cityPatterns: {
      suffixes: [
        "kart", "baal", "melqart", "shalem", "adon"
      ],
      prefixes: [
        "Qart", "Utica", "Had", "Byr", "Lept"
      ]
    },
    leaderNames: {
      male: [
        "Hannibal", "Hamilcar", "Hasdrubal", "Mago", "Hanno",
        "Adherbal", "Hiempsal", "Bomilcar", "Gisgo", "Himilco"
      ],
      female: [
        "Dido", "Sophonisba", "Salammbo", "Elissa", "Jezebel"
      ]
    },
    titles: ["Suffete", "Rab", "Shophet", "Admiral"],
    dynasties: ["Barcid", "Magonid", "Hannonic"]
  }
};

// Helper functions for name generation
window.HistoricalNamePatterns.utils = {
  // Generate a city name using civilization patterns
  generateCityName: function(civilizationId) {
    const patterns = window.HistoricalNamePatterns[civilizationId];
    if (!patterns || !patterns.cityPatterns) return null;

    const cityPatterns = patterns.cityPatterns;
    const prefix = cityPatterns.prefixes ? 
      cityPatterns.prefixes[Math.floor(Math.random() * cityPatterns.prefixes.length)] : "";
    const suffix = cityPatterns.suffixes ? 
      cityPatterns.suffixes[Math.floor(Math.random() * cityPatterns.suffixes.length)] : "";

    return prefix + suffix;
  },

  // Get random leader name
  getRandomLeaderName: function(civilizationId, gender = "male") {
    const patterns = window.HistoricalNamePatterns[civilizationId];
    if (!patterns || !patterns.leaderNames) return null;

    const names = patterns.leaderNames[gender] || patterns.leaderNames.male;
    return names[Math.floor(Math.random() * names.length)];
  },

  // Get random title
  getRandomTitle: function(civilizationId) {
    const patterns = window.HistoricalNamePatterns[civilizationId];
    if (!patterns || !patterns.titles) return null;

    return patterns.titles[Math.floor(Math.random() * patterns.titles.length)];
  },

  // Get random dynasty name
  getRandomDynasty: function(civilizationId) {
    const patterns = window.HistoricalNamePatterns[civilizationId];
    if (!patterns || !patterns.dynasties) return null;

    return patterns.dynasties[Math.floor(Math.random() * patterns.dynasties.length)];
  },

  // Generate Roman tria nomina (three-part name)
  generateRomanName: function() {
    const patterns = window.HistoricalNamePatterns.roman.leaderNames;
    const praenomen = patterns.praenomen[Math.floor(Math.random() * patterns.praenomen.length)];
    const nomen = patterns.nomen[Math.floor(Math.random() * patterns.nomen.length)];
    const cognomen = patterns.cognomen[Math.floor(Math.random() * patterns.cognomen.length)];

    return `${praenomen} ${nomen} ${cognomen}`;
  }
};
