// src/maps/places.ts
import { Client, Language } from "@googlemaps/google-maps-services-js";
import { placeDetails } from "@googlemaps/google-maps-services-js/dist/places/details";
import { PlaceInputType } from "@googlemaps/google-maps-services-js/dist/common";
var getPlaceDetails = async (key, placeId) => {
  const params = {
    place_id: placeId,
    key
  };
  return (await placeDetails({ params })).data.result;
};
var client = new Client({});
var searchPlace = async (key, input) => {
  const request = {
    params: {
      input,
      inputtype: PlaceInputType.textQuery,
      language: Language.en,
      key
    }
  };
  const place = await client.findPlaceFromText(request);
  return place.data.candidates;
};
var getPlace = async (key, input) => {
  const candidates = await searchPlace(key, input);
  const place = getPlaceDetails(key, candidates[0].place_id);
  return place;
};

// src/maps/directions.ts
import { Client as Client2 } from "@googlemaps/google-maps-services-js";
var client2 = new Client2({});
var directionGMaps = async (key) => {
  const place = await client2.directions({
    params: {
      key,
      origin: "Ngurah Rai International Airport",
      destination: "Ubud Studio"
    }
  });
  console.log("data", place);
  return place.data;
};
export {
  directionGMaps,
  getPlace,
  getPlaceDetails,
  searchPlace
};
