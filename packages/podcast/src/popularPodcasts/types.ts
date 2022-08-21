export type PodcastParse = {
  id?: string;
  img?: string;
  title: string;
  description?: string;
  prefix?: string;
  remove?: string[];
  guestMatch?: string;
  guestMatchIndex?: number;
  episodeMatch?: string;
  presenter?: boolean;
  presenterId?: string;
  addClaims?: any;
  spotifyShowId?: string;
  itunesShowId?: number;
  seasons?: any; //{ number: string };
  download?: boolean;
  languageCode?: string;
};

export const DESCRIPTIONS_DEFAULT: PodcastParse = {
  presenter: false,
  guestMatchIndex: 2,
  languageCode: "en",
  title: "",
};
