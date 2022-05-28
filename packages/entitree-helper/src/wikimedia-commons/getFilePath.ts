const crypto = require("crypto");

function md5(str: string) {
  return crypto.createHash("md5").update(str).digest("hex");
}

export function getCommonsUrlByFile(file: string, width?: number): string {
  if (file.includes("FilePath/")) {
    file = file.split("FilePath/")[1];
  }
  file = file.replace(/^File:/, "").replace(/\s+/g, "_");
  const encoded = encodeURIComponent(file);
  const base = "https://upload.wikimedia.org/wikipedia/commons";
  const hash = md5(file);
  const ns = `${hash[0]}/${hash[0]}${hash[1]}`;
  if (width) {
    // thumbnail
    const suffix = file.match(/tiff?$/i)
      ? ".jpg"
      : file.match(/svg$/i)
      ? ".png"
      : "";
    return `${base}/thumb/${ns}/${encoded}/${width}px-${encoded}${suffix}`;
  } else {
    // original
    return `${base}/${ns}/${encoded}`;
  }
}
