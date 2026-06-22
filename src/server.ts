import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { catalog } from "./catalog";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const IMAGE_DIR = path.join(__dirname, "..", "images");
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const CONTENT_TYPES: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

// List the available images (id + display name only — no filenames leak out).
app.get("/api/images", (_req: Request, res: Response) => {
  const items = Object.entries(catalog).map(([id, entry]) => ({
    id,
    name: entry.name,
  }));
  res.json(items);
});

// Retrieve a single image file by its id.
app.get("/api/images/:id", (req: Request, res: Response) => {
  const entry = catalog[req.params.id];
  if (!entry) {
    return res.status(404).json({ error: "Unknown image id" });
  }

  const filePath = path.join(IMAGE_DIR, entry.file);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Image file is missing on disk" });
  }

  const ext = path.extname(entry.file).toLowerCase();
  res.type(CONTENT_TYPES[ext] || "application/octet-stream");
  res.sendFile(filePath);
});

// Serve the web app.
app.use(express.static(PUBLIC_DIR));

app.listen(PORT, () => {
  console.log(`Image gallery service listening on http://localhost:${PORT}`);
});
