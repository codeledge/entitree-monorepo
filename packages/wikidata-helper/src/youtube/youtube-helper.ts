export function simplifyItem(item: any): any {
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
    item.contentDetails.durationSeconds = toSeconds(
      item.contentDetails.duration
    );
  }
  return item;
}
export function toSeconds(value: string): number {
  let math = value
    .replace("PT", "")
    .replace("H", "*60*60+")
    .replace("M", "*60+")
    .replace("S", "");
  if (math.slice(-1) == "+") {
    math = math.slice(0, -1);
  }
  return (0, eval)(math);
}
