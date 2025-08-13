import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, "../src/assets/icons");
const files = fs.readdirSync(iconsDir);

const exportLines = files
  .filter((file) => !file.startsWith("."))
  .map((file) => {
    const name = path
      .basename(file, path.extname(file))
      .replace(/[^a-zA-Z0-9]/g, "_");
    return `export const ${name} = require("./${file}");`;
  })
  .join("\n");

fs.writeFileSync(path.join(iconsDir, "index.ts"), exportLines);
console.log("✅ icons index.ts generated!");