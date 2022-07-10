import { z } from "zod";
import { getDataFromNIK } from "@entitree/helper";
import { createRouter } from "../createRouter";

export const documentRouter = createRouter().query("parseNIK", {
  meta: {
    openapi: {
      enabled: true,
      method: "GET",
      path: "/parseNIK",
      tag: "indonesia",
      summary: "Get data from NIK",
    },
  },
  input: z.object({
    nik: z.string().length(16),
  }),
  output: z
    .object({
      nik: z.string().length(16),
      district: z.object({
        item: z.string(),
        itemEnglish: z.string().nullable(),
        itemLabel: z.string(),
        code: z.string().length(8),
        kabupatenLabel: z.string(),
      }),
      birthDate: z.string().regex(/\d{4}-\d{2}-\d{2}/),
      gender: z.string().nullable(),
      suffix: z.string(),
    })
    .nullable(),
  resolve: ({ input: { nik } }) => {
    const output = getDataFromNIK(nik);
    console.log(output);
    return output;
  },
});
