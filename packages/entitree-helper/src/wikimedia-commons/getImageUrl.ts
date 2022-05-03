export default function getCommonsUrlByFile(filename: string, size: number) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${size}px`;
}
