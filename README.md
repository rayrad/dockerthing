# Image Gallery Service

A small Node + TypeScript service that serves images by id, plus a web app that
lists named images and renders the chosen one on the page.

## How it works

- **Service** (`src/server.ts`): an Express app exposing two endpoints.
  - `GET /api/images` — returns the catalog as `[{ id, name }]`.
  - `GET /api/images/:id` — returns the image file bytes for that id.
- **Catalog** (`src/catalog.ts`): the single source of truth mapping each public
  id to a display name and the file backing it. Filenames never leave the server.
- **Web app** (`client/app.ts` → `public/app.js`, `public/index.html`): fetches
  the catalog, renders four clickable names, and on click sets an `<img>` `src`
  to `/api/images/:id` so the service streams the image back.

## Project layout

```
.
├── src/            # TypeScript service (compiled to dist/)
│   ├── server.ts
│   └── catalog.ts
├── client/         # TypeScript for the browser (compiled to public/app.js)
│   └── app.ts
├── public/         # Static web app served by Express
│   └── index.html
├── images/         # Image files served by id
├── tsconfig.json         # server build config
└── tsconfig.client.json  # client build config
```

## Getting started

```bash
npm install
npm run build   # compiles server -> dist/ and client -> public/app.js
npm start       # serves on http://localhost:3000
```

Then open http://localhost:3000 and click a name.

Set a custom port with `PORT=8080 npm start`.

## Adding an image

1. Drop the file in `images/`.
2. Add an entry to `catalog` in `src/catalog.ts` (id → name + filename).
3. Rebuild. The web app picks it up automatically from `GET /api/images`.
