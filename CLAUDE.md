# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (hot reload)
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint over src/**/*.{js,jsx}
```

There is no test suite or test runner configured in this project.

Note: `npm run lint` currently reports pre-existing `react/prop-types` errors (components take props without PropTypes declarations). These are not regressions from your changes — don't try to fix the whole backlog unless asked.

## Architecture

This is a single-page React 18 + Vite app that browses characters from the public [Rick and Morty API](https://rickandmortyapi.com/) (`https://rickandmortyapi.com/api/...`), with no router — everything renders from `src/App.jsx`.

**State lives in `App.jsx` and flows down as props** — there is no context/Redux. `App` owns:
- `query` (search text) and `selectedId` (currently viewed character), via `useState`.
- `characters`, from `useCharacters(query)` — fetches `/character?name=<query>` on every query change, aborting the in-flight request (`AbortController`) when `query` changes again, and surfacing fetch errors via `react-hot-toast`.
- `favourates` (sic — matches the codebase spelling), from `useFavourites("Favourites", [])` — a generic localStorage-backed state hook (`src/hooks/useFavourites.jsx`) that can be reused for any persisted value by passing a different storage key.

Component tree: `App` renders `Navbar` (search box, favourites modal + count badge, theme toggle) and a `Main` wrapper containing `CharacterList` (search results) and `CharacterDetail` (fetches full detail + episodes for `selectedId` directly from the API in its own `useEffect`, independent of the `useCharacters` list fetch). `CharacterList` and `Navbar`'s favourites modal both render rows with the shared `Character` component (an `<li>` whose main area is a `<button>` that calls `onSelect`); extra action buttons are passed as `children` and sit beside it (e.g. the "trash" button in favourites). `CharacterDetail` caches fetched characters in a module-level `Map`, aborts stale requests, and below 900px renders as a full-screen sheet (`.detail.is-open`) closed via `onClose`. `Modal` is a native `<dialog>`.

**Theming**: `src/hooks/useTheme.jsx` stores `"dark"` | `"light"` in `localStorage` and sets `data-theme` on `document.documentElement`. The `--slate-*` variables hold a space-violet ink scale (the names are historical). Yellow `--accent` is the single action colour; `--portal-*` greens are reserved for the portal visual. The light palette in `src/index.css` is a *mirror* of the dark `--slate-*` scale (e.g. light `--slate-900` = dark `--slate-50`, light `--slate-500` = dark `--slate-400`, etc.) rather than a hand-picked set of colors — this preserves every existing component's contrast relationships (backgrounds use the 900/800/700 steps, text uses 100/200/300/400) without touching component CSS. When adding new UI, prefer the existing `--slate-*` variables over hardcoded colors so it stays theme-aware for free.

**Styling** is plain global CSS (no CSS modules/styled-components): `src/index.css` holds the CSS custom properties, resets, and reusable classes (`.btn`, `.badge`, `.text-field`, `.modal`, `.backdrop`); `src/App.css` holds component/layout-specific rules. Class names are hand-written and matched by string in JSX `className`, so renaming a class requires updating both files.

`data/data.js` contains static mock character data; it is not imported anywhere in `src/` — it's leftover fixture data, not live app state.
