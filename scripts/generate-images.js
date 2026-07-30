import fs from "fs";
import path from "path";

const imagesRoot = path.join(process.cwd(), "public", "images");

const result = {};

function scan(folder, relative = "") {
  const items = fs.readdirSync(folder, { withFileTypes: true });

  const files = [];
  const folders = [];

  for (const item of items) {
    if (item.isDirectory()) {
      folders.push(item);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
      files.push(item.name);
    }
  }

  if (files.length) {
    result[relative.replace(/\\/g, "/")] = files.sort();
  }

  folders.forEach((dir) => {
    scan(
      path.join(folder, dir.name),
      relative ? `${relative}/${dir.name}` : dir.name
    );
  });
}

scan(imagesRoot);

fs.writeFileSync(
  path.join(imagesRoot, "images.json"),
  JSON.stringify(result, null, 2)
);

console.log("✅ images.json generated");