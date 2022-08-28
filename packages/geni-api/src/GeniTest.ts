import { geniSearch } from "./GeniService";

async function testSearch() {
  const search = await geniSearch("Queen Elizabeth");
  console.log(search);
}
testSearch();
