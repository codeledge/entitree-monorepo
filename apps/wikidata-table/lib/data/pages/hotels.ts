import { Page } from "../types";
import {
  WD_AGODA_HOTEL_NUMERIC_ID,
  WD_APPLE_PODCASTS_PODCAST_ID,
  WD_BOOKING_COM_HOTEL_ID,
  WD_CHECK_IN_TIME,
  WD_CHECK_OUT_TIME,
  WD_COUNTRY,
  WD_HOTEL_RATING,
  WD_INCEPTION,
  WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY,
  WD_NUMBER_OF_ROOMS,
  WD_PHONE_NUMBER,
  WD_POSTAL_CODE,
} from "@entitree/helper";
import { socialHotel } from "../addition";

export const hotels: Page = {
  represents: "Q27686",
  category: "traveling",
  header: [
    { property: WD_COUNTRY },
    { property: WD_INCEPTION },
    { property: WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY },
    { property: WD_POSTAL_CODE },
    { property: WD_PHONE_NUMBER },
    { property: WD_CHECK_IN_TIME },
    { property: WD_CHECK_OUT_TIME },
    { property: WD_HOTEL_RATING },
    { property: WD_NUMBER_OF_ROOMS },
    ...socialHotel,
  ],
};
