# AGENTS.md — Time Management App

## Project Overview

A Vite + React 19 JSX application scaffolded from the official `create-vite` React template. Currently in early development with starter boilerplate and one empty component (`Auth.jsx`).

## Essential Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint on all project files |

**No test framework is installed.** There are no test commands.

## Project Structure

```
time-management/
├── index.html              # SPA entry point, mounts #root
├── vite.config.js          # Vite config (React plugin only)
├── eslint.config.js        # Flat ESLint config (ESLint 10+)
├── package.json            # type: "module", scripts above
├── public/
│   ├── favicon.svg
│   └── icons.svg           # SVG sprite for UI icons
└── src/
    ├── main.jsx            # React entry, renders <App /> in StrictMode
    ├── App.jsx             # Root component (Vite starter template)
    ├── App.css             # Component-level styles
    ├── index.css           # Global styles, CSS variables, theme
    ├── assets/
    │   ├── hero.png        # Decorative hero image
    │   ├── react.svg
    │   └── vite.svg
    └── components/
        └── Auth.jsx        # Placeholder — file exists but is empty
```

## Architecture & Patterns

### Component Model
- **Functional components only** with `export default`.
- Uses `useState` for local state.
- No routing library installed yet; no client-side router.
- **No TypeScript** — plain `.jsx` files.

### Styling
- **Plain CSS** with CSS custom properties (variables in `:root`).
- **Nesting** via native CSS nesting (no preprocessor).
- **Theme** via `@media (prefers-color-scheme: dark)` — toggles CSS variable values automatically.
- Breakpoint at **1024px** for responsive adjustments.
- No CSS modules, no Tailwind, no styled-components.

### SVG Icons
- Icons are served from `public/icons.svg` as an SVG sprite.
- Usage: `<use href="/icons.svg#icon-id"></use>` with inline SVGs.
- Icons are purely decorative (`role="presentation"`, `aria-hidden="true"`).

## Code Conventions

- **Imports**: React imports first, then assets (`import logo from './assets/...'`), then CSS.
- **Exports**: `export default` at the bottom of component files.
- **No PropTypes** — not used anywhere (no TypeScript either).
- **JSX**: Uses `<>` fragment shorthand. Functional components, no class components.
- **File naming**: PascalCase for components (`Auth.jsx`), camelCase for assets.

## Gotchas

- **Auth.jsx is empty** — it exists but has zero content. Any import of it will fail at runtime. This is likely a placeholder for future implementation.
- **ESLint 10+ with flat config** — `eslint.config.js` uses the new flat config format (`defineConfig`, `globalIgnores`). Not compatible with legacy `.eslintrc` files.
- **React 19** — newer hooks and APIs may differ from React 18 docs. `StrictMode` is enabled.
- **No tests** — don't search for a test runner or test files; none exist.
- **No state management** — no Redux, Zustand, or Context. Only `useState` in App.jsx.
- **`type: "module"`** in package.json — all `.js` files use ES module syntax (`import`/`export`).

## When Adding Code

1. Place new components in `src/components/`.
2. Add component-specific CSS in a co-located file (e.g., `Foo.css`), imported in the component.
3. Global styles go in `src/index.css`.
4. If adding a router, install `react-router-dom`. If adding state management, keep it simple (Context + useReducer unless there's a clear need for more).
5. SVG assets → `src/assets/`. Icon sprites → `public/icons.svg`. Static files → `public/`.
6. No TypeScript — write plain JSX unless explicitly converting the project.
