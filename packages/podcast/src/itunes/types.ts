import { z } from "zod";

export const ItunesEpisodeSchema = z.object({
  previewUrl: z.string(),
  artworkUrl160: z.string(),
  episodeFileExtension: z.string(),
  episodeContentType: z.string(),
  episodeUrl: z.string(),
  artworkUrl600: z.string(),
  collectionViewUrl: z.string(),
  trackViewUrl: z.string(),
  trackTimeMillis: z.number(),
  contentAdvisoryRating: z.string(),
  artworkUrl60: z.string(),
  releaseDate: z.string(),
  trackId: z.number(),
  trackName: z.string(),
  shortDescription: z.string(),
  closedCaptioning: z.string(),
  collectionId: z.number(),
  collectionName: z.string(),
  feedUrl: z.string(),
  artistIds: z.array(z.number()),
  country: z.string(),
  kind: z.string(),
  wrapperType: z.string(),
  description: z.string(),
  genres: z.array(z.object({ name: z.string(), id: z.string() })),
  episodeGuid: z.string(),
});

export type ItunesEpisodeObject = z.infer<typeof ItunesEpisodeSchema>;
