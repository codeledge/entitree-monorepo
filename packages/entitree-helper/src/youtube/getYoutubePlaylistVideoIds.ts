import axios from "axios";

export async function getYoutubePlaylistVideoIds(
  playlistId: string,
  key: string
): Promise<any | undefined> {
  playlistId = "UU" + playlistId.substring(2);
  const items: any[] = [];
  const ids = [];

  let nextPageToken = "start";
  do {
    const nextPageTokenQuery =
      nextPageToken == "start" ? "" : `&pageToken=${nextPageToken}`;
    //before contentDetails,snippet now contentDetails is enough
    const nextPageEndpoint = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${key}${nextPageTokenQuery}`;
    console.log(nextPageEndpoint);
    const nextPageJson = (await axios.get(nextPageEndpoint)).data;

    let pageData = nextPageJson.items;
    nextPageToken = nextPageJson.nextPageToken;
    for (const item of pageData) {
      ids.push(item.contentDetails.videoId);
    }
  } while (nextPageToken);
  return {
    ids,
  };
}
