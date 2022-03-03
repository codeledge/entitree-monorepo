import { ImageOverflowType, ImageType } from "./types";

export const IMAGE_SERVER_BASE_URL = "https://images.entitree.com";
// export const IMAGE_SERVER_BASE_URL = "http://localhost:3010";

export const IMAGE_SERVER_TYPES: ImageType[] = [
  { code: "transparent_face" },
  { code: "transparent_head" },
  { code: "face" },
];

export const IMAGE_SERVER_OVERFLOW: ImageOverflowType[] = [
  { code: "no", label: "no" },
  { code: "yes", label: "yes" },
  { code: "both_sides", label: "cut sides" },
  { code: "left_side", label: "cut left side" },
  {
    code: "left_shoulder",
    label: "cut left shoulder",
  },
];
