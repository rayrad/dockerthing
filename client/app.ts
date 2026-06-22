interface ImageSummary {
  id: string;
  name: string;
}

async function loadCatalog(): Promise<void> {
  const list = document.getElementById("image-list") as HTMLUListElement;
  const status = document.getElementById("status") as HTMLParagraphElement;

  try {
    const res = await fetch("/api/images");
    if (!res.ok) {
      throw new Error(`Failed to load catalog (HTTP ${res.status})`);
    }
    const images: ImageSummary[] = await res.json();

    list.innerHTML = "";
    images.forEach((img) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "image-link";
      button.textContent = img.name;
      button.addEventListener("click", () => showImage(img.id, img.name));
      li.appendChild(button);
      list.appendChild(li);
    });
  } catch (err) {
    status.textContent = err instanceof Error ? err.message : String(err);
  }
}

function showImage(id: string, name: string): void {
  const viewer = document.getElementById("viewer") as HTMLImageElement;
  const caption = document.getElementById("caption") as HTMLParagraphElement;

  // The id is all the web app needs — the service maps it to the actual file.
  viewer.src = `/api/images/${encodeURIComponent(id)}`;
  viewer.alt = name;
  viewer.style.display = "block";
  caption.textContent = name;
}

loadCatalog();
