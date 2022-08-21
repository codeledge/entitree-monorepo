export function extractGuests(text: string, regex: string, matchIndex: number) {
  try {
    let match = text.match(new RegExp(regex, ""));
    let guests = match?.[matchIndex]
      .trim()
      .split(/,| and | \& | as well as | \+ |;/)
      .map((guest) => {
        return guest.trim();
      });
    return guests;
  } catch (e) {
    return [];
  }
}
