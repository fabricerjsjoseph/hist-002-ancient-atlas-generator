# Ancient Atlas Generator

A transformation of Azgaar's _Fantasy Map Generator_ into a tool for creating historically-accurate maps of ancient civilizations from the Bronze Age through Classical Antiquity.

**Original Project:** [Fantasy Map Generator](https://azgaar.github.io/Fantasy-Map-Generator)

## Documentation

This project uses the [Diataxis framework](https://diataxis.fr/) for documentation organization:

📖 **[Complete Documentation](./docs/)** - Start here for all documentation

### Quick Links

- 📚 [Tutorials](./docs/tutorials/) - Learn by doing
- 🔧 [How-To Guides](./docs/how-to/) - Accomplish specific tasks
- 📖 [Reference](./docs/reference/) - Technical specifications
  - 🔄 [Conversion Plans](./docs/reference/conversion/) - Implementation roadmap for developers
- 💡 [Explanation](./docs/explanation/) - Understand the concepts

### For Developers

If you're implementing the Ancient Atlas conversion:
- Start with the **[Implementation Roadmap](./docs/reference/conversion/IMPLEMENTATION_ROADMAP.md)** for session-specific tasks
- Reference the **[Ancient Atlas Analysis](./docs/reference/conversion/ANCIENT_ATLAS_ANALYSIS.md)** for detailed technical guidance
- See **[Conversion README](./docs/reference/conversion/README.md)** for implementation workflow

## About This Project

This repository is transforming the Fantasy Map Generator into an Ancient Atlas Generator capable of creating maps of real ancient civilizations including:

**Bronze Age (3300-1200 BCE):** Sumerian, Egyptian, Minoan, Hittite, Mycenaean

**Classical Age (800 BCE - 500 CE):** Greek, Roman, Persian, Carthaginian, Celtic

The transformation maintains full backward compatibility with the original fantasy generation while adding historical accuracy, authentic naming, period-appropriate political systems, and ancient cartography aesthetics.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/fabricerjsjoseph/hist-002-ancient-atlas-generator.git

# Navigate to the directory
cd hist-002-ancient-atlas-generator

# Start a local HTTP server
python3 -m http.server 8000

# Open in your browser
# Navigate to http://localhost:8000
```

## Original Project Links

- **Original Application:** [azgaar.github.io/Fantasy-Map-Generator](https://azgaar.github.io/Fantasy-Map-Generator)
- **Project Wiki:** [Fantasy Map Generator Wiki](https://github.com/Azgaar/Fantasy-Map-Generator/wiki)
- **Original Blog:** [Fantasy Maps for fun and glory](https://azgaar.wordpress.com)

## Community

Join our [Discord server](https://discordapp.com/invite/X7E84HU) and [Reddit community](https://www.reddit.com/r/FantasyMapGenerator) to share your creations, discuss the Generator, suggest ideas and get the most recent updates.

For bug reports, please use [GitHub issues](https://github.com/Azgaar/Fantasy-Map-Generator/issues) or _#fmg-bugs_ channel on Discord.

## Contributing

Pull requests are highly welcomed! The project uses the [Diataxis documentation framework](./docs/) to organize information for different user needs.

For implementation work on the Ancient Atlas conversion, see the [conversion reference documentation](./docs/reference/conversion/).

## License

Same as original Fantasy Map Generator (MIT License).

## Credits & Inspiration

**Original Application:** Azgaar's Fantasy Map Generator
- Support the original project on [Patreon](https://www.patreon.com/azgaar)
- Contact original creator: [azgaar.fmg@yandex.com](mailto:azgaar.fmg@yandex.com)

**Ancient Atlas Transformation:** Ancient Atlas Generator Project (November 2024)

**Inspiration:**

- Martin O'Leary's [_Generating fantasy maps_](https://mewo2.com/notes/terrain)

- Amit Patel's [_Polygonal Map Generation for Games_](http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation)

- Scott Turner's [_Here Dragons Abound_](https://heredragonsabound.blogspot.com)
