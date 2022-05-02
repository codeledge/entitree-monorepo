export const isValidNIK = (nik: string): boolean => {
  if (nik.length !== 16) {
    return false;
  }
  // let valid = /^\d{6}((3|7)[0-1]|[012456][1-9})(0[1-9]|1[0-2])\d{2}\d{4}$/.test(
  //   nik
  // );
  // let valid =
  //   /^((1[1-9])|(21)|([37][1-6])|(5[1-4])|(6[1-5])|([8-9][1-2]))[0-9]{2}[0-9]{2}(([0-6][0-9])|(7[0-1]))((0[1-9])|(1[0-2]))([0-9]{2})[0-9]{4}$/.test(
  //     nik
  //   );
  return true;
};

type NIK_TYPE = {
  gender: "male" | "female";
  birthDate: string;
  district: DISTRICTS;
};
type DISTRICTS = {
  item: string;
  itemEnglish: string;
  itemLabel: string;
  code: string;
  kabupatenLabel: string;
};

import districts from "./all_districts.json";
export const getDataFromNIK = (nik: string): NIK_TYPE | null => {
  if (!isValidNIK(nik)) {
    return null;
  }
  let districtCode =
    nik.slice(0, 2) + "." + nik.slice(2, 4) + "." + nik.slice(4, 6);
  let district = districts.find((entry) => entry.code === districtCode)!;
  let birthdateString = nik.slice(6, 12);
  // let year = "19"+birthdateString.slice(4, 6);
  let birthDate = birthdateString.replace(/(\d{2})(\d{2})(\d{2})/, "$3-$2-$1");
  // let birthdate = "19"+birthdateString.slice(4, 6) + "/" + birthdateString.slice(2);
  return {
    district,
    birthDate,
    gender: parseInt(nik.slice(6, 7)) < 5 ? "male" : "female",
  };
};
