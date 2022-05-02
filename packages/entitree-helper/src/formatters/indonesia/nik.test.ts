import { getDataFromNIK, isValidNIK } from "./nik";

test("nik valid", () => {
  let nik = "1050241708910001";
  let nik2 = "5103062911940001";

  let kutaNIK = getDataFromNIK(nik2);

  expect(isValidNIK(nik)).toBe(true);
  expect(kutaNIK?.district.itemLabel).toBe("Kuta Utara");
});
