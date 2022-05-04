export function getCommonsUrlByFile(filename: string, size: number) {
  console.log(filename);

  if (filename.includes("FilePath/")) {
    filename = filename.split("FilePath/")[1];
  }
  console.log(filename);
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${size}px`;
}
