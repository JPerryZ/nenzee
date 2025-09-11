# Copilot Coding Agent Instructions for Willow-Pine-Events

## Project Overview
This is a static website for Willow & Pine Events, a boutique event planning company. The codebase consists of HTML, CSS, and JavaScript files. There is no build system, backend, or package management in use.

## File Structure
- `index.html`: Main entry point. Contains all page markup and links to CSS/JS.
- `styles.css`: Contains all site styling. Uses simple class and element selectors.
- `script.js`: Handles any interactive behavior. No frameworks or modules.
- `README.md`: Brief project description.

## Key Patterns & Conventions
- All assets are in the project root. No subdirectories.
- CSS classes (e.g., `.box`) are used for styling specific elements. Inline styles are avoided.
- JavaScript is loaded via `<script src="script.js"></script>` at the end of the body.
- No external dependencies or libraries are referenced.
- HTML is written in a single file; no templating or componentization.

## Developer Workflow
- Edit files directly in the root directory.
- Preview changes by opening `index.html` in a browser. No local server required unless using advanced features.
- No build, test, or deployment scripts are present.
- No Node.js, npm, or package.json in use. Ignore Node-related warnings unless adding new tooling.

## Integration Points
- All code is client-side. No API calls, server communication, or database integration.
- If adding new assets (images, fonts), place them in the root and reference with relative paths.

## Examples
- To add a new styled element, create a CSS class in `styles.css` and reference it in `index.html`.
- For new interactivity, add event listeners in `script.js` and connect them to elements via IDs or classes.

## Special Notes
- The project is intentionally simple for easy editing and quick prototyping.
- If introducing new tools (e.g., build systems, frameworks), document the changes in `README.md` and update this file.

---

For questions about project structure or conventions, review `README.md` or ask for clarification.
