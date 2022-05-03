import ChordSheetJS from "chordsheetjs";

export function formatSong(body: string): string {
  const parser = new ChordSheetJS.ChordProParser();
  // const formatter = new ChordSheetJS.TextFormatter();
  // const formatter = new ChordSheetJS.HtmlTableFormatter();
  const formatter = new ChordSheetJS.HtmlDivFormatter();

  body = convertToChordPro(body);
  const song = parser.parse(body);
  let disp = formatter.format(song);
  disp +=
    '<style type="text/css">' +
    ChordSheetJS.HtmlDivFormatter.cssString() +
    "</style>";
  return disp;
}

function convertToChordPro(text: string) {
  const KEY_ALIAS = [
    ["t", "title"],
    ["st", "subtitle"],
    ["c", "comment"],
    ["ci", "comment_italic"],
    ["cb", "comment_box"],
    ["soc", "start_of_chorus"],
    ["eoc", "end_of_chorus"],
    ["sov", "start_of_verse"],
    ["eov", "end_of_verse"],
    ["sob", "start_of_bridge"],
    ["eob", "end_of_bridge"],
    ["sot", "start_of_tab"],
    ["eot", "end_of_tab"],
    ["sog", "start_of_grid"],
    ["eog", "end_of_grid"],
    ["define", "chord"],
  ];
  KEY_ALIAS.map((entry) => {
    text = text.replace(
      new RegExp("{" + entry[0] + "}", "g"),
      "{" + entry[1] + "}"
    );
  });
  return text;
}
