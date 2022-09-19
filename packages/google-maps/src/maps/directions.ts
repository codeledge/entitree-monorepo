import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const directionGMaps = async (key: string) => {
  const place = await client.directions({
    params: {
      key,
      origin: "Ngurah Rai International Airport",
      destination: "Ubud Palace",
    },
  });
  console.log("data", place);
  return place.data;
};

// export const getPlace = async (input: string) => {
//   const candidates = await searchPlace(input);
//   const place = getPlaceDetails(candidates[0].place_id!);
//   return place;
// };
// searchPlace("test");
