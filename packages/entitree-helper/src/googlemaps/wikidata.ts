import {
  WDQ_GOOGLE_MAPS,
  WD_COORDINATE_LOCATION,
  WD_COUNTRY,
  WD_GOOGLE_MAPS_CUSTOMER_ID,
  WD_INSTANCE_OF,
  WD_NAME,
  WD_NUMBER_OF_REVIEWS_RATINGS,
  WD_OFFICIAL_WEBSITE,
  WD_PHONE_NUMBER,
  WD_POINT_IN_TIME,
  WD_REVIEW_SCORE,
  WD_REVIEW_SCORE_BY,
  WD_STREET_ADDRESS,
  COUNTRIES,
} from "../wikidata";
import { getPlace } from "./places";
import { PLACE_TYPE_MAPPING } from "./placeWikidataMapping";

export const getWikidataFromGoogle = async (input: string) => {
  const place = await getPlace(input);
  const result: any = {};

  const types = place.types;

  if (types?.[0]) result[WD_INSTANCE_OF] = PLACE_TYPE_MAPPING[types[0]];
  result[WD_NAME] = place.name;
  result[WD_STREET_ADDRESS] = place.formatted_address;

  result[WD_OFFICIAL_WEBSITE] = place.website;
  result[WD_GOOGLE_MAPS_CUSTOMER_ID] = place.place_id;
  result[WD_GOOGLE_MAPS_CUSTOMER_ID] = place.url?.split("=")[1];
  result[WD_REVIEW_SCORE] = {
    value: place.rating,
    qualifiers: {
      [WD_REVIEW_SCORE_BY]: WDQ_GOOGLE_MAPS,
      [WD_NUMBER_OF_REVIEWS_RATINGS]: place.user_ratings_total,
      [WD_POINT_IN_TIME]: new Date().toISOString(),
    },
  };
  if (place.international_phone_number)
    result[WD_PHONE_NUMBER] =
      "+" + place.international_phone_number?.replace(/\D/g, "");
  result[WD_COORDINATE_LOCATION] =
    place.geometry?.location.lat + "," + place.geometry?.location.lng;

  const country = place.address_components?.filter(
    (c) => c.types[0] === "country"
  )[0].short_name;

  const wikidataCountry = COUNTRIES.filter(
    (c) => c.code === country
  )[0].item.substring(32);

  console.log(country, place.opening_hours?.periods);

  result[WD_COUNTRY] = wikidataCountry;
  return result;
};
