import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(root, "index.html");
const ignoredFolders = new Set([".git", ".github", "scripts"]);

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function generateIndex() {
  const entries = await readdir(root, { withFileTypes: true });
  const pages = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || ignoredFolders.has(entry.name) || entry.name.startsWith(".")) {
      continue;
    }

    try {
      await readFile(join(root, entry.name, "index.html"), "utf8");
      pages.push({
        folder: entry.name,
      });
    } catch {
      // index.html이 없는 폴더는 메뉴에서 제외합니다.
    }
  }

  pages.sort((a, b) => a.folder.localeCompare(b.folder, "ko"));

  const cards = pages.map((page, index) => `      <a class="card" href="./${encodeURIComponent(page.folder)}/index.html">
        <span class="number">${String(index + 1).padStart(2, "0")}</span>
        <span class="arrow" aria-hidden="true">↗</span>
        <h2>${escapeHtml(page.folder)}</h2>
        <p>${escapeHtml(page.folder)}/index.html</p>
      </a>`).join("\n\n");

  const startMarker = "      <!-- AUTO-GENERATED-CARDS:START -->";
  const endMarker = "      <!-- AUTO-GENERATED-CARDS:END -->";
  const indexHtml = await readFile(indexPath, "utf8");
  const start = indexHtml.indexOf(startMarker);
  const end = indexHtml.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    throw new Error("index.html에서 자동 생성 영역 표시를 찾지 못했습니다.");
  }

  const output = [
    indexHtml.slice(0, start),
    startMarker,
    "\n",
    cards,
    "\n",
    indexHtml.slice(end),
  ].join("");

  await writeFile(indexPath, output);
  return pages.length;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const count = await generateIndex();
  console.log(`${count}개 화면을 index.html 메뉴에 반영했습니다.`);
}
