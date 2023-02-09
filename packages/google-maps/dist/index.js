"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  directionGMaps: () => directionGMaps,
  getPlace: () => getPlace,
  getPlaceDetails: () => getPlaceDetails,
  searchPlace: () => searchPlace
});
module.exports = __toCommonJS(src_exports);

// src/maps/places.ts
var import_google_maps_services_js = require("@googlemaps/google-maps-services-js");
var import_details = require("@googlemaps/google-maps-services-js/dist/places/details");
var import_common = require("@googlemaps/google-maps-services-js/dist/common");
var getPlaceDetails = async (key, placeId) => {
  const params = {
    place_id: placeId,
    key
  };
  return (await (0, import_details.placeDetails)({ params })).data.result;
};
var client = new import_google_maps_services_js.Client({});
var searchPlace = async (key, input) => {
  const request = {
    params: {
      input,
      inputtype: import_common.PlaceInputType.textQuery,
      language: import_google_maps_services_js.Language.en,
      // fields: ["formatted_address", "geometry"],
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
var import_google_maps_services_js2 = require("@googlemaps/google-maps-services-js");
var client2 = new import_google_maps_services_js2.Client({});
var directionGMaps = async (key) => {
  const place = await client2.directions({
    params: {
      key,
      origin: "Ngurah Rai International Airport",
      destination: "Ubud Palace"
    }
  });
  console.log("data", place);
  return place.data;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  directionGMaps,
  getPlace,
  getPlaceDetails,
  searchPlace
});
