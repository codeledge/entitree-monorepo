import { Client, Language } from "@googlemaps/google-maps-services-js";
import { placeDetails } from "@googlemaps/google-maps-services-js/dist/places/details";
import { FindPlaceFromTextRequest } from "@googlemaps/google-maps-services-js/dist/places/findplacefromtext";
import { PlaceInputType } from "@googlemaps/google-maps-services-js/dist/common";

export const getPlaceDetails = async (key: string, placeId: string) => {
  const params = {
    place_id: placeId,
    key,
  };

  return (await placeDetails({ params: params })).data.result;
};
const client = new Client({});

export const searchPlace = async (key: string, input: string) => {
  const request: FindPlaceFromTextRequest = {
    params: {
      input,
      inputtype: PlaceInputType.textQuery,
      language: Language.en,
      // fields: ["formatted_address", "geometry"],
      key,
    },
  };

  const place = await client.findPlaceFromText(request);

  return place.data.candidates;
};

export const getPlace = async (key: string, input: string) => {
  const candidates = await searchPlace(key, input);
  const place = getPlaceDetails(key, candidates[0].place_id!);
  return place;
};
