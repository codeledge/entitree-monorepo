//@ts-nocheck
import axios from "axios";
import { simplifyYoutubeItem } from "./lib/simplifyYoutubeItem";

export async function getYoutubePlaylistVideos(
  playlistId: string,
  key: string
): Promise<any | undefined> {
  playlistId = "UU" + playlistId.substring(2);
  const items: any[] = [];
  const ids = [];

  let nextPageToken = "start";
  do {
    // Request again, with the next page token
    console.log("getting next page");
    const nextPageTokenQuery =
      nextPageToken == "start" ? "" : `&pageToken=${nextPageToken}`;
    //before contentDetails,snippet now contentDetails is enough
    const nextPageEndpoint = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${key}${nextPageTokenQuery}`;
    console.log(nextPageEndpoint);
    const nextPageJson = (await axios.get(nextPageEndpoint)).data;

    let pageData = nextPageJson.items;
    nextPageToken = nextPageJson.nextPageToken;
    for (const item of pageData) {
      // items.push(item.snippet);
      ids.push(item.contentDetails.videoId);
    }
    const part =
      "contentDetails,topicDetails,status,statistics,snippet,recordingDetails";
    const detailsEndpoint = `https://www.googleapis.com/youtube/v3/videos?part=${part}&id=${ids.join(
      ","
    )}&key=${key}`;
    const detailsData = (await axios.get(detailsEndpoint)).data;
    for (const item of detailsData.items) {
      items.push(simplifyYoutubeItem(item));
    }
  } while (nextPageToken);
  return {
    items,
  };
}
