import {
  GeniImmediateFamily,
  GeniImmediateFamilyResults,
  GeniProfile,
  GeniProfileResults,
} from "./GeniTypes";

import axios from "axios";

const geniService = axios.create({
  baseURL: "https://www.geni.com/api",
});

const timeout = 10 * 1000; // 10 seconds timeout

export function serviceSuccessInterceptor(res: any) {
  return res.data;
}

geniService.interceptors.response.use(serviceSuccessInterceptor);

/**
 *
 * @param guids A comma separated list of profile guids
 * @param access_token
 * @returns
 */
export const getGeniProfiles = async (guids: string, access_token?: string) => {
  const response = await geniService.get<any, GeniProfileResults | GeniProfile>(
    "/profile",
    {
      params: {
        guids,
        access_token,
      },
      timeout,
    }
  );
  if ("results" in response) return response.results;

  // for a single guid the response is just the profile
  return [response];
};

/**
 *
 * @param names a search string
 * @param access_token the access token
 * @returns A list of GeniProfiles
 */
export const geniSearch = async (names: string, access_token?: string) => {
  const { results } = await geniService.get<any, GeniProfileResults>(
    "/profile/search",
    {
      params: {
        names,
        access_token,
      },
      timeout,
    }
  );
  return results;
};

export const geniImmediateFamily = async (
  guids: string,
  access_token?: string
) => {
  const response = await geniService.get<
    any,
    GeniImmediateFamily | GeniImmediateFamilyResults
  >("/profile/immediate-family", {
    params: {
      guids,
      access_token,
      fields: "guid,id,gender",
    },
    timeout,
  });

  if ("results" in response) return response.results;

  return [response];
};
