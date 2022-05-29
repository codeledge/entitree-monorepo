// import * as crypto from "crypto";

// function md5(str: string) {
//   return crypto.createHash("md5").update(str).digest("hex");
// }
import { Md5 } from "ts-md5/dist/md5";

export const md5 = (str: string) => {
  return Md5.hashStr(str);
};
