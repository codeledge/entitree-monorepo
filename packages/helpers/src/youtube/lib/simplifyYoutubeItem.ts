import { durationToSeconds } from "./durationToSeconds";

export function simplifyYoutubeItem(item: any): any {
  if (item.snippet?.tags) {
    item.snippet.tags = item.snippet.tags.join(",");
  }
  if (item.topicDetails?.topicCategories) {
    item.topicDetails.topicCategories =
      item.topicDetails.topicCategories.join(",");
  }
  delete item.snippet.thumbnails;
  if (item.contentDetails?.regionRestriction?.blocked) {
    item.contentDetails.regionRestriction.blocked =
      item.contentDetails.regionRestriction.blocked.join(",");
  }
  if (item.contentDetails?.duration) {
    item.contentDetails.durationSeconds = durationToSeconds(
      item.contentDetails.duration
    );
  }
  return item;
}
