const EMOTION_EMOJI = {
  joyLikelihood: "😃",
  angerLikelihood: "😠",
  surpriseLikelihood: "😲",
  sorrowLikelihood: "😞",
  // underExposedLikelihood: "VERY_UNLIKELY",
  // blurredLikelihood: "VERY_UNLIKELY",
  // headwearLikelihood: "VERY_UNLIKELY",
};
export function getEmojiByLikelihood(face: string): string {
  let result = "";
  for (const [key, value] of Object.entries(EMOTION_EMOJI)) {
    if (face[key] == "VERY_LIKELY") {
      result += value;
    }
  }
  return result;
}
