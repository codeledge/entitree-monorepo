import districts from "./all_districts.json";

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
  nik: string;
  gender: "male" | "female";
  birthDate: string;
  district: DISTRICTS;
  suffix: string;
};
type DISTRICTS = {
  item: string;
  itemEnglish: string;
  itemLabel: string;
  code: string;
  kabupatenLabel: string;
};

export const getDataFromNIK = (nik: string): NIK_TYPE | null => {
  if (!isValidNIK(nik)) {
    return null;
  }
  let districtCode =
    nik.slice(0, 2) + "." + nik.slice(2, 4) + "." + nik.slice(4, 6);
  let district = districts.filter((entry) => entry.code === districtCode)[0];
  if (!district) {
    return null;
  }

  let birthDay = parseInt(nik.slice(6, 8));
  const gender = birthDay < 40 ? "male" : "female";
  const birthYear = parseInt(nik.slice(10, 12));
  const birthDate: string =
    (birthYear < Number(new Date().getFullYear().toString().slice(-2))
      ? "20"
      : "19") +
    (birthYear < 10 ? "0" : "") +
    birthYear +
    "-" +
    nik.slice(8, 10) +
    "-" +
    (birthDay % 40);

  return {
    nik,
    district,
    birthDate,
    gender,
    suffix: nik.slice(12, 16),
  };
};
