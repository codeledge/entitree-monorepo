import { DateTime } from 'luxon';
import { Episode } from 'podparse';
import { z } from 'zod';

declare type SpotifyEpisodeObject = {
    audio_preview_url: string;
    description: string;
    duration_ms: number;
    explicit?: boolean;
    external_urls: string[];
    href: string;
    html_description: string;
    id: string;
    images: any;
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: [string];
    name: string;
    release_date: string;
    release_precision_date: string;
    restrictions: {};
    resume_point: {};
    show: {};
    type: string;
    uri: string;
};

declare function getSpotifyShowEpisodes(playlistId: string, access_token: string, afterDate?: DateTime): Promise<SpotifyEpisodeObject[]>;

declare const enum EpisodeType {
    Bonus = "bonus",
    Full = "full",
    Trailer = "trailer"
}
interface EpisodeExtended extends Omit<Episode, "episodeType"> {
    fyydId?: string;
    itunesId?: number;
    panoptikumId?: string;
    spotifyId?: string;
    wikidataId?: string;
    episodeType: EpisodeType;
}

declare function convertSpotifyToFeed(episodes: SpotifyEpisodeObject[]): EpisodeExtended[];

declare function getItunesShowEpisodes(itunesId: number): Promise<any[]>;

declare const ItunesEpisodeSchema: z.ZodObject<{
    previewUrl: z.ZodString;
    artworkUrl160: z.ZodString;
    episodeFileExtension: z.ZodString;
    episodeContentType: z.ZodString;
    episodeUrl: z.ZodString;
    artworkUrl600: z.ZodString;
    collectionViewUrl: z.ZodString;
    trackViewUrl: z.ZodString;
    trackTimeMillis: z.ZodNumber;
    contentAdvisoryRating: z.ZodString;
    artworkUrl60: z.ZodString;
    releaseDate: z.ZodString;
    trackId: z.ZodNumber;
    trackName: z.ZodString;
    shortDescription: z.ZodString;
    closedCaptioning: z.ZodString;
    collectionId: z.ZodNumber;
    collectionName: z.ZodString;
    feedUrl: z.ZodString;
    artistIds: z.ZodArray<z.ZodNumber, "many">;
    country: z.ZodString;
    kind: z.ZodString;
    wrapperType: z.ZodString;
    description: z.ZodString;
    genres: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
    }, {
        name: string;
        id: string;
    }>, "many">;
    episodeGuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    previewUrl: string;
    artworkUrl160: string;
    episodeFileExtension: string;
    episodeContentType: string;
    episodeUrl: string;
    artworkUrl600: string;
    collectionViewUrl: string;
    trackViewUrl: string;
    trackTimeMillis: number;
    contentAdvisoryRating: string;
    artworkUrl60: string;
    releaseDate: string;
    trackId: number;
    trackName: string;
    shortDescription: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    feedUrl: string;
    artistIds: number[];
    country: string;
    kind: string;
    wrapperType: string;
    genres: {
        name: string;
        id: string;
    }[];
    episodeGuid: string;
}, {
    description: string;
    previewUrl: string;
    artworkUrl160: string;
    episodeFileExtension: string;
    episodeContentType: string;
    episodeUrl: string;
    artworkUrl600: string;
    collectionViewUrl: string;
    trackViewUrl: string;
    trackTimeMillis: number;
    contentAdvisoryRating: string;
    artworkUrl60: string;
    releaseDate: string;
    trackId: number;
    trackName: string;
    shortDescription: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    feedUrl: string;
    artistIds: number[];
    country: string;
    kind: string;
    wrapperType: string;
    genres: {
        name: string;
        id: string;
    }[];
    episodeGuid: string;
}>;
declare type ItunesEpisodeObject = z.infer<typeof ItunesEpisodeSchema>;

declare function convertItunesToFeed(episodes: ItunesEpisodeObject[]): EpisodeExtended[];

declare type PodcastParse = {
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
    seasons?: any;
    download?: boolean;
    languageCode?: string;
};
declare const DESCRIPTIONS_DEFAULT: PodcastParse;

declare const POPULAR_PODCASTS: PodcastParse[];

declare function convertFeedEpisodeToWikidata(episode: EpisodeExtended, podcast?: PodcastParse): Promise<{
    type: string;
    labels: {
        en: string;
    };
    aliases: {
        en: string;
    };
    descriptions: {
        en: string;
    };
    claims: any;
    sitelinks: never[];
}>;

declare function extractGuests(text: string, regex: string, matchIndex: number): string[] | undefined;

declare function extractProductionCode(text: string, regex?: string): string | undefined;

declare function extractRecordingDate(text: string): {
    value: string;
    statedAs: string;
} | null | undefined;

declare function convertFeedToWikidata(episodes: EpisodeExtended[], podcast?: PodcastParse): Promise<{
    type: string;
    labels: {
        en: string;
    };
    aliases: {
        en: string;
    };
    descriptions: {
        en: string;
    };
    claims: any;
    sitelinks: never[];
}[]>;

declare function renameClaimIdtoLabel(episodes: any[]): Promise<any[]>;

declare type PodcastInfo = {
    id: {
        value: string;
        label: string;
    };
    genre?: {
        value: string;
        label: string;
    };
    producer?: {
        value: string;
        label: string;
    };
    presenter?: {
        value: string;
        label: string;
    };
    spotifyId?: string;
    appleId?: string;
};
declare function getPodcastInfo(podcast: string): Promise<PodcastInfo>;
declare function getPodcastFeed(podcast: string): Promise<any>;

export { DESCRIPTIONS_DEFAULT, ItunesEpisodeObject, ItunesEpisodeSchema, POPULAR_PODCASTS, PodcastInfo, PodcastParse, SpotifyEpisodeObject, convertFeedEpisodeToWikidata, convertFeedToWikidata, convertItunesToFeed, convertSpotifyToFeed, extractGuests, extractProductionCode, extractRecordingDate, getItunesShowEpisodes, getPodcastFeed, getPodcastInfo, getSpotifyShowEpisodes, renameClaimIdtoLabel };
