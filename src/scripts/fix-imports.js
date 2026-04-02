import fs from "fs";
import path from "path";

function fixDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      fixDir(full);
      continue;
    }

    if (!file.endsWith(".js")) continue;

    let content = fs.readFileSync(full, "utf8");

    content = content.replace(
      /from\s+["'](\.\.?\/[^"']+)["']/g,
      (match, p1) => {
        if (p1.endsWith(".js")) return match;
        return match.replace(p1, `${p1}.js`);
      }
    );

    fs.writeFileSync(full, content);
  }
}

// fix imports
fixDir("./dist");

// fix prisma path
const prismaFile = path.join("dist", "lib", "prisma.js");
if (fs.existsSync(prismaFile)) {
  let content = fs.readFileSync(prismaFile, "utf8");
  content = content.replace('../generated/client', '../generated/client.js');
  fs.writeFileSync(prismaFile, content);
}

console.log("Fix imports done ✅");