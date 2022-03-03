export type DPImage = {
  id?: string;
  uploadSite?: string;
  comment?: string;
  recordedDate?: string;
  sourceUrl?: string;
  url?: any;
};

export type ImageType = {
  code: string;
  label?: string;
};

export type ImageOverflowType = {
  code: string;
  label?: string;
  image_cut?: string;
};
