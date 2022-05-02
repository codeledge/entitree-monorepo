import { downloadVideos } from "./downloadMp3";
import { getYoutubePlaylistVideoIds } from "@entitree/helper";

export async function runChannelByPlaylist(playlist: string) {
  const videos = await getYoutubePlaylistVideoIds(playlist, "key???"); // { ids: ["vRKULRro548"] };
  downloadVideos(videos.ids);
  return videos.ids;
}
