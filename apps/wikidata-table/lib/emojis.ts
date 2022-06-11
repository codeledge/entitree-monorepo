import { WikidataPages } from "./data/page";
import { Page } from "./data/types";

export const PAGE_EMOJI = { Q8142: "💵", Q15712205: "🚌", Q46970: "✈" };

// const Pages = Object.keys(WikidataPages) as const;
// type PageType = typeof Pages[number];

export const PAGE_MUI_EMOJI: { [key: string]: string } = {
  // Q46970: "flight",
  // Q38723: "add_circle",
  airlines: "flight",
  airports: "flight_take_off",
  education: "school",
  universities: "school",

  // airlines: "airplanemode_active",
  smartphones: "phone",
};
