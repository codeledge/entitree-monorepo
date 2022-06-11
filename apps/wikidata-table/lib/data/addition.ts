import {
  WD_AGODA_HOTEL_ID,
  WD_AGODA_HOTEL_NUMERIC_ID,
  WD_APPLE_MAPS_ID,
  WD_BOOKING_COM_HOTEL_ID,
  WD_BOOKING_COM_NUMERIC_ID,
  WD_EXPEDIA_HOTEL_ID,
  WD_GOOGLE_MAPS_CUSTOMER_ID,
  WD_HOSTELWORLD_HOSTEL_ID,
  WD_HOTELS_COM_HOTEL_ID,
  WD_INSTAGRAM_USERNAME,
  WD_OYO_HOTEL_ID,
  WD_REDDOORZ_HOTEL_ID,
  WD_SKYSCANNER_HOTEL_ID,
  WD_TRAVELOKA_HOTEL_ID,
  WD_TRIPADVISOR_ID,
  WD_TRIP_COM_HOTEL_ID,
  WD_TWITTER_USERNAME,
} from "@entitree/helper";
import { Column } from "./types";

export const socialDefault: Column[] = [
  { property: WD_INSTAGRAM_USERNAME },
  {
    property: WD_TWITTER_USERNAME,
  },
];

export const socialBusiness: Column[] = [
  ...socialDefault,
  { property: WD_GOOGLE_MAPS_CUSTOMER_ID },
  { property: WD_APPLE_MAPS_ID },
];

export const socialHotel: Column[] = [
  ...socialBusiness,
  {
    property: WD_AGODA_HOTEL_ID,
  },
  { property: WD_AGODA_HOTEL_NUMERIC_ID },
  { property: WD_BOOKING_COM_HOTEL_ID },
  // {
  //   property: WD_BOOKING_COM_NUMERIC_ID,
  // },
  {
    property: WD_HOTELS_COM_HOTEL_ID,
  },
  {
    property: WD_TRIPADVISOR_ID,
  },
  {
    property: WD_SKYSCANNER_HOTEL_ID,
  },
  {
    property: WD_TRIP_COM_HOTEL_ID,
  },
  {
    property: WD_HOSTELWORLD_HOSTEL_ID,
  },
  {
    property: WD_OYO_HOTEL_ID,
  },
  {
    property: WD_REDDOORZ_HOTEL_ID,
  },
  {
    property: WD_TRAVELOKA_HOTEL_ID,
  },
  {
    property: WD_EXPEDIA_HOTEL_ID,
  },
].map((column) => {
  column.list = false;
  return column;
});
