import * as _googlemaps_google_maps_services_js from '@googlemaps/google-maps-services-js';

declare const getPlaceDetails: (key: string, placeId: string) => Promise<Partial<_googlemaps_google_maps_services_js.PlaceData>>;
declare const searchPlace: (key: string, input: string) => Promise<Partial<_googlemaps_google_maps_services_js.PlaceData>[]>;
declare const getPlace: (key: string, input: string) => Promise<Partial<_googlemaps_google_maps_services_js.PlaceData>>;

declare const directionGMaps: (key: string) => Promise<_googlemaps_google_maps_services_js.DirectionsResponseData>;

export { directionGMaps, getPlace, getPlaceDetails, searchPlace };
