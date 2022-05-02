import {
  WD_APPLE_PODCASTS_PODCAST_EPISODE_ID,
  WD_DURATION,
  WD_HAS_QUALITY,
  WD_MAIN_SUBJECT,
  WD_PODCAST_EPISODE,
  WD_PODCAST_LOGO_URL,
  WD_PRODUCTION_CODE,
  WD_PUBLICATION_DATE,
  WD_RECORDED_AT_STUDIO_OR_VENUE,
  WD_RECORDING_DATE,
  WD_SEASON,
  WD_SPOTIFY_SHOW_EPISODE_ID,
  WD_TALK_SHOW_GUEST,
  WD_TITLE,
  WD_YOUTUBE_VIDEO_ID,
  getWikidataSparql,
} from "@entitree/helper";

//@ts-ignore
import wdk from "wikidata-sdk";

export async function getEpisodesById(podcast: string, limit: number) {
  const ORDER_BY = "DESC";
  let query = `#podcast
SELECT ?item ?itemLabel ?title ?url ?publicationDate ?duration ?hasQuality ?seasonNumber ?episodeNumber 
?recordedAtLabel ?recordingDate ?productionCode ?image ?youtube
(GROUP_CONCAT(DISTINCT ?guestLabel;separator=", ") AS ?guests) 
(GROUP_CONCAT(DISTINCT ?mainSubjectLabel;separator=", ") AS ?topics) 
(GROUP_CONCAT(DISTINCT ?article;separator="|") AS ?wikipedia) 
WHERE 
{
  ?item wdt:P31 wd:${WD_PODCAST_EPISODE}.
  ?item wdt:P179 wd:${podcast}.
  OPTIONAL { ?item wdt:${WD_TITLE} ?title .}
  #?item wdt:P953 ?url .
  OPTIONAL { ?item p:P953 ?urlStatement .
  ?urlStatement ps:P953 ?url .
  ?urlStatement pq:P2701 wd:Q42591 .} #only mp3
  OPTIONAL { ?item wdt:${WD_PUBLICATION_DATE} ?publicationDate . }
  OPTIONAL { ?item wdt:${WD_DURATION} ?duration . }
  OPTIONAL { ?item wdt:${WD_HAS_QUALITY} ?hasQuality . }
  OPTIONAL { ?item wdt:${WD_RECORDED_AT_STUDIO_OR_VENUE} ?recordedAt . }
  OPTIONAL { ?item wdt:${WD_RECORDING_DATE} ?recordingDate . }
  OPTIONAL { ?item wdt:${WD_PRODUCTION_CODE} ?productionCode . }
  OPTIONAL { ?item wdt:${WD_MAIN_SUBJECT} ?mainSubject . }
  OPTIONAL { ?item wdt:${WD_YOUTUBE_VIDEO_ID} ?youtube . }
  OPTIONAL { ?item wdt:${WD_PODCAST_LOGO_URL} ?image . }
  OPTIONAL { ?item p:${WD_SEASON} ?seasonStatement . 
             ?seasonStatement ps:P4908 ?season.
             ?seasonStatement pq:P1545 ?episodeNumber.
             ?season p:P179 ?seriesStatement . 
             ?seriesStatement pq:P1545 ?seasonNumber.
            }
  OPTIONAL { ?item wdt:${WD_TALK_SHOW_GUEST} ?guest.  
    OPTIONAL {    
      ?article schema:about ?guest .
      ?article schema:isPartOf <https://en.wikipedia.org/>.
    } 
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". ?item rdfs:label ?itemLabel . ?guest rdfs:label ?guestLabel . ?recordedAt rdfs:label ?recordedAtLabel .?mainSubject rdfs:label ?mainSubjectLabel .}
}
GROUP BY ?item ?itemLabel ?title ?url ?publicationDate ?duration ?hasQuality ?seasonNumber ?episodeNumber ?recordedAtLabel ?recordingDate ?productionCode ?image ?youtube
ORDER BY ${ORDER_BY}(?publicationDate)
`;
  // { ?urlStatement pq:P2701 wd:Q42591 . } UNION { FILTER regex(STR(?url), ".mp3$", "i") }
  if (limit > 0) {
    query += `\nLIMIT ${limit}`;
  }
  try {
    const data = await getWikidataSparql(query);
    // fs.("ids.json", JSON.stringify(ids));
    return {
      query,
      data,
      link: wdk.sparqlQuery(query),
    };
  } catch (er) {
    throw new Error("couldn't get episodes");
  }
}

export async function latestEpisode(podcast: string, limit: number = 1) {
  const ORDER_BY = "DESC";
  let query = `#podcast
SELECT ?item ?itemLabel ?publicationDate ?title ?spotifyId ?itunesId ?url
WHERE 
{
  ?item wdt:P31 wd:Q61855877.
  ?item wdt:P179 wd:${podcast}.
  OPTIONAL { ?item wdt:P577 ?publicationDate . }
  OPTIONAL { ?item wdt:P1476 ?title .}
  OPTIONAL { ?item wdt:${WD_SPOTIFY_SHOW_EPISODE_ID} ?spotifyId . }
  OPTIONAL { ?item wdt:${WD_APPLE_PODCASTS_PODCAST_EPISODE_ID} ?itunesId . }
  OPTIONAL { ?item wdt:P953 ?url . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". ?item rdfs:label ?itemLabel . ?guest rdfs:label ?guestLabel . ?recordedAt rdfs:label ?recordedAtLabel .?mainSubject rdfs:label ?mainSubjectLabel .}
}
ORDER BY ${ORDER_BY}(?publicationDate)
`;
  if (limit > 0) {
    query += `\nLIMIT ${limit}`;
  }

  try {
    const data = await getWikidataSparql(query);
    return {
      query,
      data,
      link: wdk.sparqlQuery(query),
    };
  } catch (er) {
    throw new Error("couldn't get episodes");
  }
}
