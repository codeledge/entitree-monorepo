import {
  WD_PODCAST_LOGO_URL,
  WD_WEB_FEED_URL,
  getWikidataSparql,
  WD_SPOTIFY_SHOW_ID,
  WD_APPLE_PODCASTS_PODCAST_ID,
} from "@entitree/helper";

export type PodcastInfo = {
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
  language?: {
    value: string;
    label: string;
  };
  languageCode?: {
    value: string;
    label: string;
  };
  spotifyId?: string;
  appleId?: string;
};

export async function getPodcastInfo(podcast: string): Promise<PodcastInfo> {
  let data = `SELECT DISTINCT
   ?item ?itemLabel ?language ?languageLabel ?languageCode 
   ?genre ?genreLabel ?producer ?producerLabel  ?presenter ?presenterLabel 
   ?itunesGenre ?itunesGenreId ?logo ?spotifyId ?appleId
WHERE 
{
  VALUES ?item {wd:${podcast}}
  OPTIONAL { ?item wdt:P407 ?language.
  ?language wdt:P218 ?languageCode . }
  OPTIONAL { ?item wdt:P136 ?genre. }  
  OPTIONAL { ?item wdt:P495 ?country. }  
  OPTIONAL { ?item wdt:P162 ?producer. }  
  OPTIONAL { ?item wdt:P371 ?presenter. }  
  #OPTIONAL { ?item wdt:P10150 ?itunesGenre. }  
  #OPTIONAL { ?itunesGenre wdt:P10151 ?itunesGenreId. }  
  OPTIONAL { ?item wdt:${WD_PODCAST_LOGO_URL} ?logo. }  
  OPTIONAL { ?item wdt:${WD_SPOTIFY_SHOW_ID} ?spotifyId. }  
  OPTIONAL { ?item wdt:${WD_APPLE_PODCASTS_PODCAST_ID} ?appleId. }  

  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;
  const [info] = await getWikidataSparql(data);
  return {
    id: info.item,
    genre: info.genre,
    // country: info.country,
    language: info.language,
    languageCode: info.languageCode,
    producer: info.producer,
    presenter: info.presenter,
    // itunesGenre: info.itunesGenre,
    // itunesGenreId: info.itunesGenreId,
    // logo: info.logo,
    spotifyId: info.spotifyId,
    appleId: info.appleId,
  };
}

export async function getPodcastFeed(podcast: string) {
  let data = `SELECT ?item ?itemLabel ?spotifyShowId ?itunesShowId ?language ?feed ?languageLabel ?languageCode ?genre ?genreLabel ?producer ?producerLabel  ?presenter ?presenterLabel ?itunesGenre ?itunesGenreId ?logo
WHERE 
{
  VALUES ?item {wd:${podcast}}
  OPTIONAL { ?item wdt:P407 ?language.
  ?language wdt:P218 ?languageCode . }
  OPTIONAL { ?item wdt:${WD_WEB_FEED_URL} ?feed. }  
  OPTIONAL { ?item wdt:P136 ?genre. }  
  OPTIONAL { ?item wdt:P5916 ?spotifyShowId. }  
  OPTIONAL { ?item wdt:P5842 ?itunesShowId. }    
  OPTIONAL { ?item wdt:P162 ?producer. }  
  OPTIONAL { ?item wdt:P371 ?presenter. }  
  OPTIONAL { ?item wdt:P10150 ?itunesGenre. }  
  OPTIONAL { ?itunesGenre wdt:P10151 ?itunesGenreId. }  
  OPTIONAL { ?item wdt:${WD_PODCAST_LOGO_URL} ?logo. }  

  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;
  const ids = await getWikidataSparql(data);
  return ids;
}
