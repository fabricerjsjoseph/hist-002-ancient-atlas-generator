# Contributing to Ancient Atlas Generator Documentation

Thank you for your interest in improving the Ancient Atlas Generator documentation!

## Documentation Structure

We use the [Diataxis framework](https://diataxis.fr/) to organize our documentation. This ensures that users can quickly find the information they need based on their current context.

## Where to Add Documentation

Before contributing, determine which type of documentation you're creating:

### 📚 Tutorials (`docs/tutorials/`)
**When to add here:** You're creating a learning-oriented guide that teaches by example

**Characteristics:**
- Takes the reader through a complete learning experience
- Helps beginners get started
- Provides a safe environment to explore
- Focuses on learning, not accomplishing a specific task

**Example:** "Your First Ancient Map - A Step-by-Step Tutorial"

### 🔧 How-To Guides (`docs/how-to/`)
**When to add here:** You're solving a specific problem or accomplishing a particular task

**Characteristics:**
- Goal-oriented (achieves a specific outcome)
- Assumes basic knowledge
- Provides practical steps
- Focuses on results

**Example:** "How to Generate a Mediterranean Bronze Age Map"

### 📖 Reference (`docs/reference/`)
**When to add here:** You're documenting technical details, specifications, or implementation plans

**Characteristics:**
- Information-oriented
- Describes how things work
- Factual and accurate
- Structured by topic/module/feature

**Example:** "Configuration File Format", "API Documentation", "Implementation Plans"

**Special:** Implementation plans for the conversion are in `docs/reference/conversion/`

### 💡 Explanation (`docs/explanation/`)
**When to add here:** You're providing context, background, or clarifying concepts

**Characteristics:**
- Understanding-oriented
- Discusses the "why"
- Explores alternatives and trade-offs
- Provides context and background

**Example:** "Why We Use the Diataxis Framework", "Historical Accuracy vs. Playability"

## How to Contribute

### 1. Choose the Right Location

Use the decision tree above to determine where your documentation belongs.

### 2. Follow the Format

Each section has its own format and style:

**Tutorials:**
- Start with what the reader will learn
- Provide step-by-step instructions
- Include expected outputs
- End with "what next" suggestions

**How-To Guides:**
- Start with the goal/problem
- List any prerequisites
- Provide numbered steps
- Show the expected result

**Reference:**
- Use consistent formatting
- Be factual and concise
- Include code examples
- Keep it up-to-date with the codebase

**Explanation:**
- Provide context first
- Discuss alternatives
- Explain trade-offs
- Link to related topics

### 3. Create Your Documentation

Create a new markdown file in the appropriate directory:

```bash
# For a tutorial
touch docs/tutorials/your-tutorial-name.md

# For a how-to guide
touch docs/how-to/your-guide-name.md

# For reference material
touch docs/reference/your-reference-name.md

# For an explanation
touch docs/explanation/your-explanation-name.md
```

### 4. Update the Index

Add a link to your new documentation in the appropriate `README.md`:

```markdown
## Available Tutorials

- [Your Tutorial Name](./your-tutorial-name.md) - Brief description
```

### 5. Update Main Docs README

If your contribution is significant, consider adding a reference to it in `docs/README.md`.

### 6. Test Your Links

Make sure all internal links work:

```bash
# Check that file paths are correct
ls docs/tutorials/your-tutorial-name.md

# Verify relative links work
# Open in browser or markdown preview
```

### 7. Submit a Pull Request

Create a descriptive pull request explaining:
- What documentation you added
- Why it's needed
- Where it fits in the Diataxis framework

## Style Guidelines

### Writing Style

- **Be clear and concise** - Avoid unnecessary jargon
- **Use active voice** - "Click the button" not "The button should be clicked"
- **Be consistent** - Use the same terms throughout
- **Be inclusive** - Write for a global audience

### Formatting

- Use markdown headers properly (`#`, `##`, `###`)
- Use code blocks with language specification: ` ```javascript `
- Use bullet points for lists
- Use numbered lists for sequential steps
- Include images/screenshots when helpful

### Code Examples

- Keep code examples minimal and focused
- Include comments explaining complex parts
- Test that code examples actually work
- Use syntax highlighting

## Questions?

If you're unsure where documentation belongs or need help:
1. Check the [Diataxis website](https://diataxis.fr/) for more guidance
2. Look at existing examples in each section
3. Open an issue asking for clarification
4. Ask in the Discord community

## Thank You!

Good documentation is crucial for the success of this project. Your contributions help make the Ancient Atlas Generator accessible to everyone.
