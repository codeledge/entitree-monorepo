export function extractProductionCode(
  text: string,
  regex: string = "#(\\d{1,4}) "
) {
  try {
    let match = text.match(new RegExp(regex, ""));
    return match?.[1];
  } catch (e) {}
}
