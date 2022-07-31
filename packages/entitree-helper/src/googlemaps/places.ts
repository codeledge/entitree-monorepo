import { Client, Language } from "@googlemaps/google-maps-services-js";
import { placeDetails } from "@googlemaps/google-maps-services-js/dist/places/details";
import { FindPlaceFromTextRequest } from "@googlemaps/google-maps-services-js/dist/places/findplacefromtext";
import { PlaceInputType } from "@googlemaps/google-maps-services-js/dist/common";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;
export const getPlaceDetails = async (placeId: string) => {
  const params = {
    place_id: placeId,
    key: GOOGLE_API_KEY,
  };

  return (await placeDetails({ params: params })).data.result;
};
const client = new Client({});

export const searchPlace = async (input: string) => {
  const request: FindPlaceFromTextRequest = {
    params: {
      input,
      inputtype: PlaceInputType.textQuery,
      language: Language.en,
      // fields: ["formatted_address", "geometry"],
      key: GOOGLE_API_KEY,
    },
  };

  const place = await client.findPlaceFromText(request);

  return place.data.candidates;
};

export const getPlace = async (input: string) => {
  const candidates = await searchPlace(input);
  const place = getPlaceDetails(candidates[0].place_id!);
  return place;
};
