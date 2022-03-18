import { IMAGE_SERVER_BASE_URL } from "./constants";

export const getCreateMissingImagesLink = (extra = {}) => {
  const params = new URLSearchParams({
    source: JSON.stringify(extra),
  });

  return IMAGE_SERVER_BASE_URL + "/#/images/create?" + params.toString();
};
