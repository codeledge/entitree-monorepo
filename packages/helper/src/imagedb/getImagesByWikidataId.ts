import { IMAGE_SERVER_BASE_URL } from "./constants";
import { imageDbService } from "./imageDbService";
import { DPImage } from "./types";

export const getImagesByWikidataId = (numericId: string) => {
  return imageDbService
    .get<any, { images: DPImage[] }>(`/api/v1/image/info/wikidata/${numericId}`)
    .then(({ images }) => {
      return images.map((dpImg) => {
        // const dpImg = data.images[0];
        let descr = `${dpImg.uploadSite}\nImage Database`;
        if (dpImg.comment) {
          descr += `\n${dpImg.comment}`;
        }
        if (dpImg.recordedDate) {
          descr += `\nPhoto taken in ${dpImg.recordedDate.substr(0, 4)}`;
        }
        if (dpImg.sourceUrl) {
          descr += `\n\n${dpImg.sourceUrl}`;
        }

        return {
          url: dpImg.url.transparent_face,
          urlByType: dpImg.url,
          title: descr,
          imageDb: true,
          sourceUrl: IMAGE_SERVER_BASE_URL + "/#/images/" + dpImg.id + "/show",
        };
      });
    });
  // .catch(errorHandler);
};
