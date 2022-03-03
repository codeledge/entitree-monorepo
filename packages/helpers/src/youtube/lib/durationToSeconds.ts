export function durationToSeconds(value: string): number {
  let math = value
    .replace("PT", "")
    .replace("H", "*60*60+")
    .replace("M", "*60+")
    .replace("S", "");
  if (math.slice(-1) == "+") {
    math = math.slice(0, -1);
  }
  return (0, eval)(math);
}
