import fs from "fs";
import path from "path";

function walk(dir) {
  const files = [];

  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (full.endsWith(".ts")) {
      files.push(full);
    }
  }

  return files;
}

const files = walk("./src");

for (const file of files) {
  let code = fs.readFileSync(file, "utf8");

  code = code.replace(
    /from\s+["'](\.{1,2}\/[^"']+)["']/g,
    (_, p) => {
      if (
        p.endsWith(".js") ||
        p.endsWith(".json") ||
        p.endsWith(".css")
      ) {
        return `from "${p}"`;
      }

      return `from "${p}.js"`;
    }
  );

  fs.writeFileSync(file, code);
}

console.log("✔ All imports updated");