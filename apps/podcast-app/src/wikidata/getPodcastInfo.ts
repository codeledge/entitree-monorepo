import {
  WD_PODCAST_LOGO_URL,
  WD_WEB_FEED_URL,
  getWikidataSparql,
} from "@entitree/helper";

export async function getPodcastInfo(podcast: string) {
  let data = `SELECT ?item ?itemLabel ?language ?languageLabel ?languageCode ?genre ?genreLabel ?producer ?producerLabel  ?presenter ?presenterLabel ?itunesGenre ?itunesGenreId ?logo
WHERE 
{
  VALUES ?item {wd:${podcast}}
  OPTIONAL { ?item wdt:P407 ?language.
  ?language wdt:P218 ?languageCode . }
  OPTIONAL { ?item wdt:P136 ?genre. }  
  OPTIONAL { ?item wdt:P495 ?country. }  
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
