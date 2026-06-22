// The single source of truth mapping a public image id to its display name
// and the file backing it. The web app never sees the filename — it only
// learns the id + name from GET /api/images and requests bytes by id.
export interface CatalogEntry {
  name: string;
  file: string;
}

export const catalog: Record<string, CatalogEntry> = {
  "img-sunset": { name: "Sunset", file: "sunset.svg" },
  "img-mountain": { name: "Mountain", file: "mountain.svg" },
  "img-ocean": { name: "Ocean", file: "ocean.svg" },
  "img-forest": { name: "Forest", file: "forest.svg" },
};
