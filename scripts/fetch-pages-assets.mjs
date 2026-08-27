import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceOrigin =
  process.env.PORTFOLIO_ASSET_ORIGIN ??
  "https://zhangtiansu-portfolio.blond-shell-5896.chatgpt.site";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.env.PORTFOLIO_PROJECT_ROOT
  ? path.resolve(process.env.PORTFOLIO_PROJECT_ROOT)
  : path.resolve(scriptDirectory, "..");
const manifestPath = path.join(scriptDirectory, "pages-assets.txt");
const files = (await readFile(manifestPath, "utf8"))
  .split("\n")
  .map((file) => file.trim())
  .filter(Boolean);

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).size > 0;
  } catch {
    return false;
  }
}

async function download(relativePath) {
  const destination = path.join(projectRoot, "public", relativePath);
  if (await fileExists(destination)) return;

  const origin = sourceOrigin.endsWith("/") ? sourceOrigin : `${sourceOrigin}/`;
  const source = new URL(relativePath, origin);
  const response = await fetch(source, {
    headers: {
      "user-agent": "Mozilla/5.0 GitHub-Actions Portfolio-Deploy",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${source}: HTTP ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) throw new Error(`Downloaded empty file: ${source}`);

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
  process.stdout.write(`Downloaded ${relativePath}\n`);
}

let cursor = 0;
const workers = Array.from({ length: 6 }, async () => {
  while (cursor < files.length) {
    const index = cursor;
    cursor += 1;
    await download(files[index]);
  }
});

await Promise.all(workers);
process.stdout.write(`Assets ready: ${files.length}\n`);
