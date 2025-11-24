# Documentation Quick Reference

## 🎯 Quick Decision Guide

**I want to...**

- ✏️ **Teach someone from scratch** → [Tutorials](./tutorials/)
- 🔧 **Help solve a specific problem** → [How-To Guides](./how-to/)
- 📖 **Document technical details** → [Reference](./reference/)
- 💡 **Explain concepts or decisions** → [Explanation](./explanation/)

## 📂 Directory Structure

```
docs/
├── README.md                          # Start here
├── CONTRIBUTING.md                    # How to add documentation
├── QUICK_REFERENCE.md                 # This file
│
├── tutorials/                         # 📚 Learning by doing
│   ├── README.md
│   └── [tutorial files...]
│
├── how-to/                           # 🔧 Task-oriented guides
│   ├── README.md
│   └── [how-to files...]
│
├── reference/                        # 📖 Technical specifications
│   ├── README.md
│   └── conversion/                   # 🔄 Implementation plans
│       ├── README.md
│       ├── IMPLEMENTATION_ROADMAP.md
│       └── ANCIENT_ATLAS_ANALYSIS.md
│
└── explanation/                      # 💡 Conceptual understanding
    ├── README.md
    └── project-overview.md
```

## 🤖 For AI Agents Working on Implementation

**Start here:**
1. Read [`reference/conversion/README.md`](./reference/conversion/README.md)
2. Identify your phase/session from [`reference/conversion/IMPLEMENTATION_ROADMAP.md`](./reference/conversion/IMPLEMENTATION_ROADMAP.md)
3. Reference technical details in [`reference/conversion/ANCIENT_ATLAS_ANALYSIS.md`](./reference/conversion/ANCIENT_ATLAS_ANALYSIS.md)

**Quick workflow:**
```
1. Check phase/session → IMPLEMENTATION_ROADMAP.md
2. Get code examples → IMPLEMENTATION_ROADMAP.md Quick Start
3. Understand details → ANCIENT_ATLAS_ANALYSIS.md
4. Implement features → Follow the plan
5. Test thoroughly → Testing checklist
```

## 👥 For Human Contributors

**Adding new documentation?**
1. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md)
2. Choose the right section (tutorials/how-to/reference/explanation)
3. Follow the format for that section
4. Update the section's README.md
5. Submit a pull request

## 📍 Key Files

| File | Purpose |
|------|---------|
| [`docs/README.md`](./README.md) | Main documentation hub |
| [`docs/CONTRIBUTING.md`](./CONTRIBUTING.md) | How to contribute docs |
| [`reference/conversion/README.md`](./reference/conversion/README.md) | Implementation guide for agents |
| [`reference/conversion/IMPLEMENTATION_ROADMAP.md`](./reference/conversion/IMPLEMENTATION_ROADMAP.md) | Session-by-session plan |
| [`reference/conversion/ANCIENT_ATLAS_ANALYSIS.md`](./reference/conversion/ANCIENT_ATLAS_ANALYSIS.md) | Technical deep-dive |
| [`explanation/project-overview.md`](./explanation/project-overview.md) | Project background |

## 🔗 External Resources

- **Diataxis Framework:** https://diataxis.fr/
- **Original Project:** https://azgaar.github.io/Fantasy-Map-Generator
- **Project Wiki:** https://github.com/Azgaar/Fantasy-Map-Generator/wiki

## 💬 Need Help?

- Check existing docs first
- Ask in Discord/Reddit communities
- Open a GitHub issue
- Read the original project wiki

---

**Remember:** The goal is to make information **easy to find** and **appropriate to user needs**.
