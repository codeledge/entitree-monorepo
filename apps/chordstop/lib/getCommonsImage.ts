export function getCommonsUrlByFile(filename: string, size: number) {
  if (filename.includes("FilePath/")) {
    filename = filename.split("FilePath/")[1];
  }
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${size}px`;
}
