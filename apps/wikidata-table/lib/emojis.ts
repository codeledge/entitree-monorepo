import { WikidataPages } from "./data/page";
import { Page } from "./data/types";

export const PAGE_EMOJI = { Q8142: "💵", Q15712205: "🚌", Q46970: "✈" };

// const Pages = Object.keys(WikidataPages) as const;
// type PageType = typeof Pages[number];

export const PAGE_MUI_EMOJI: { [key: string]: string } = {
  // Q46970: "flight",
  // Q38723: "add_circle",
  aviation: "flight",
  airlines: "flight",
  airports: "flight_take_off",
  education: "school",
  technology: "computer",
  universities: "school",
  hotels: "hotel",
  museums: "museum",
  zoos: "pets",
  intercity_bus_companies: "directions_bus",
  credit_cards: "credit_card",
  tourist_attractions: "festival",
  currencies: "attach_money",
  languages: "language",
  finance: "calculate",
  podcast: "podcasts",
  cryptocurrencies: "currency_bitcoin",
  medicine: "medical_information",
  hospitals: "emergency",
  podcasts: "podcasts",
  podcast_episode: "podcasts",
  countries: "public",
  // airlines: "airplanemode_active",
  smartphones: "phone",
};
