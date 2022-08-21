import {
  WD_COUNTRY_OF_ORIGIN,
  WD_RECORDED_AT_STUDIO_OR_VENUE,
} from "@entitree/helper";
import { PodcastParse } from "./types";

export const POPULAR_PODCASTS: PodcastParse[] = [
  {
    id: "Q66141312",
    prefix: "The Ben Shapiro Show - ",
    img: "https://podcast.nothispute.com/images/ben_shapiro3000.jpg",
    title: "The Ben Shapiro Show",
    episodeMatch: "Show Ep. (\\d{1,4})$",
    guestMatch: "(.*) | The Ben Shapiro Show Sunday Special",
    presenter: true,
    description: `Daily political podcast and live radio show produced by The Daily Wire and hosted by Ben Shapiro
    
    Full descr:
    Tired of the lies? Tired of the spin? Are you ready to hear the hard-hitting truth in comprehensive, conservative, principled fashion? The Ben Shapiro Show brings you all the news you need to know in the most fast moving daily program in America. Ben brutally breaks down the culture and never gives an inch! Monday thru Friday.`,
  },
  {
    id: "Q30323986",
    guestMatch: "- (.*)",
    remove: ["The Joe Rogan Experience ", "JRE "],
    prefix: "JRE ",
    presenter: true,
    episodeMatch: "#(\\d{3,4}) ",
    addClaims: {
      [WD_RECORDED_AT_STUDIO_OR_VENUE]: "Q109352672",
      [WD_COUNTRY_OF_ORIGIN]: "Q30",
    },
    img: "https://podcast.nothispute.com/images/jre1500.jpg",
    title: "The Joe Rogan Experience",
  },
  {
    id: "Q109238858",
    prefix: "The Jordan B. Peterson Podcast - ",
    remove: [
      "| The Jordan B. Peterson Podcast",
      "| The Jordan Peterson Podcast",
    ],
    presenter: true,
    img: "https://podcast.nothispute.com/images/jordan_peterson.jpg",
    title: "The Jordan B. Peterson Podcast",
    guestMatch: `\\|(.[^\\|]*)`,
    guestMatchIndex: 1,
    // seasons: { 4: "Q109265421" },
    description: `Join intellectual phenomenon Dr. Jordan Peterson and his daughter Mikhaila for enlightening discourse that will change the way you think. This podcast breaks down the dichotomy of life through interviews and lectures that explain how individuals and culture are shaped by values, music, religion, and beyond. It will give you a new perspective and a modern understanding of your creativity, competence, and personality.`,
  },
  {
    id: "Q109650493",
    prefix: "The Michael Shermer Show - ",
    title: "The Michael Shermer Show",
    episodeMatch: "#(\\d{3,4}) ",
    presenter: true,
    guestMatchIndex: 1,
    // guestMatch: `\\d{2,4}. (([A-Z][\\p{L}.]{1,20} ){1,4})`,
    guestMatch: `\\d{2,4}\\. (.*?) (about|on|-|—)`,
  },
  {
    id: "Q56542667",
    prefix: "Stay Tuned with Preet - ",
    title: "Stay Tuned with Preet",
    presenter: true,
    guestMatch: `\(with (.*)\)`,
  },
  {
    id: "Q109248984",
    title: "Lex Fridman Podcast",
    episodeMatch: "#(\\d{3,4}) ",
    prefix: "Lex Fridman Podcast ",
    guestMatch: `\\d (–|\\-) (.*):`,
    guestMatchIndex: 2,
  },
  {
    id: "Q109943764",
    prefix: "The Tim Dillon Show ",
    title: "The Tim Dillon Show",
    presenter: true,
    episodeMatch: "^(\\d{2,4}) ",
    guestMatch: `\((with|ft\\.) (.*)\)`, //TODO 283 - Joe Rogan
  },
  {
    id: "Q109892507",
    prefix: "The Megyn Kelly Show ",
    title: "The Megyn Kelly Show",
    episodeMatch: "Ep. (\\d{1,4})$",
    presenter: true,
    guestMatch: `(with|ft\\.) (.*) \\|`,
  },
  {
    id: "Q110493748",
    prefix: "Here's The Thing with Alec Baldwin - ",
    title: "Here's The Thing with Alec Baldwin",
    presenter: true,
  },
  {
    id: "Q2856080",
    title: "Radiolab",
  },
  {
    id: "Q61855877",
    title: "Pod Save America",
    guestMatch: `(\\(with (.*)\\))`,
  },
  {
    id: "Q48807376",
    title: "Under The Skin with Russell Brand",
    prefix: "Under The Skin with Russell Brand - ",
    episodeMatch: "#(\\d{3,4}) ",
    guestMatch: `(\\(with (.*)\\))`,
  },
  {
    id: "Q110783309",
    title: "Deddy Corbuzier Podcast",
    download: true,
    languageCode: "id",
    description: `Podcast ini merupakan konten di Channel Youtube "Deddy Corbuzier" yang membahas tentang kondisi terkini di Indonesia, berita terbaru, kisah inspiratif, dan sisi lain para narasumber yang belum banyak diketahui masyarakat.`,
    img: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/3292581/3292581-1582607586354-90856d151bba7.jpg",
  },
  {
    id: "Q109750235",
    title: "The Tim Ferriss Show",
    prefix: "The Tim Ferriss Show ",
  },
  {
    id: "Q95626082",
    title: "The Vergecast",
    prefix: "",
  },
  {
    id: "Q110247066",
    title: "Talking Indonesia",
  },
];
