# BCBHShow Lite Client 🌟

## Overview

- front end is a responsive React 18 app
  - Typescript
  - Redux state management for persistent stores
  - Zustand state management for in-app state
  - optional, recommended PWA
  - `Privy` handles auth as well as free Farcaster signers
  - Ant Design v4 principles (i.e. `less` CSS, choice to deal with it later)
  - stripped and rebuilt from a MIT-licensed template
    - developed by a Polish web design firm
    - had not been upgraded to current versions of React, Ant, etc.
- back end is a collection of independent, stateless CF Pages Functions
  - each one calls `fetch` to various providers
    - `Warpcast` APIs
    - `Neynar` APIs wrapped by `Pinata`
    - `far.quest` APIs
    - `Hubble` APIs via `Airstack` (designed to be swapped)
    - `Decent Bookmarks` and `FCAN` by `@artlu`
    - `bot-or-not` by `@sayangel`
  - bindings to `Upstash Redis` via https REST API for caching
  - the DX is unfamiliar to devs familiar with `Next.js`. study `src/api/mocks`
- `React Query` caches many of the backend calls in the front end
- mocked data available for optionally-offline front-end development
- Hono microservice for unfurling URLs
  - in a different MIT-licensed repo [here](https://github.com/artlu99/unfurl))
  - runs `cheerio` underneath
  - heavily inspired by Pinata Steve

### Installation

run

```sh
yarn
```

### development (front-end only)

uncomment the imports of mocked data in `src/api/mocks/mockornot.ts` and run

```sh
yarn start
```

### deployment

set the `base` in `vite.config.js` to the URL of the deployed site (including '`https://`').

ensure `ENV` variables are set. study `.env.example`.

`husky` runs pre-commit hooks to lint and build. A successful build triggers deployment via `GitHub Actions`.
