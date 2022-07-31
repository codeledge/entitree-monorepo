import { getPlace } from ".";
import { getWikidataFromGoogle } from "./wikidata";

test("get place", async () => {
  const input = "Ubud Studio";
  const place = await getPlace(input);
  console.log(place);
  expect(place.formatted_phone_number).toBe("0898-3534-866");
});

test("return wikidata", async () => {
  const input = "Ubud Studio";
  const place = await getWikidataFromGoogle(input);
  console.log(place, place.address_components);
  expect(place.formatted_phone_number).toBe("0898-3534-866");
});
