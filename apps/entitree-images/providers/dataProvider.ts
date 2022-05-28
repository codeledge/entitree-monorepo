import { DataProvider } from "react-admin";
import { UploadImage } from "../models/Image";
import simpleRestProvider from "ra-data-simple-rest";

export const restDataProvider = simpleRestProvider("/api");

export const dataProvider: DataProvider = {
  ...restDataProvider,
  create: (resource, params) => {
    console.log(resource, params);
    if (resource !== "images" || !params.data.image) {
      // fallback to the default implementation
      return restDataProvider.create(resource, params);
    }

    return convertFileToBase64(params.data.image).then((base64) => {
      return restDataProvider.create(resource, {
        ...params,
        data: {
          ...params.data,
          image: {
            base64,
            size: params.data.image.rawFile.size,
            type: params.data.image.rawFile.type,
            title: params.data.image.title,
          } as UploadImage,
        },
      });
    });
  },
  // todo: update as well!
  // update: (resource, params) => {
  //   if (resource !== "images" || !params.data.image) {
  //     // fallback to the default implementation
  //     return restDataProvider.update(resource, params);
  //   }

  //   return convertFileToBase64(params.data.image).then((base64Picture) => {
  //     return restDataProvider.update(resource, {
  //       ...params,
  //       data: {
  //         ...params.data,
  //         image: {
  //           base64,
  //           size: params.data.image.rawFile.size,
  //           type: params.data.image.rawFile.type,
  //           title: params.data.image.title,
  //         } as UploadImage,
  //       },
  //     });
  //   });
  // },
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });
