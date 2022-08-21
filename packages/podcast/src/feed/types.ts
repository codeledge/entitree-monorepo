import { Episode } from "podparse";

export const enum EpisodeType {
  Bonus = "bonus",
  Full = "full",
  Trailer = "trailer",
}

export interface EpisodeExtended extends Omit<Episode, "episodeType"> {
  fyydId?: string;
  itunesId?: number;
  panoptikumId?: string;
  spotifyId?: string;
  wikidataId?: string;

  episodeType: EpisodeType;
}
