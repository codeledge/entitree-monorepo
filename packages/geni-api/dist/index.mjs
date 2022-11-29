// src/GeniService.ts
import axios from "axios";
var geniService = axios.create({
  baseURL: "https://www.geni.com/api"
});
var timeout = 10 * 1e3;
function serviceSuccessInterceptor(res) {
  return res.data;
}
geniService.interceptors.response.use(serviceSuccessInterceptor);
var getGeniProfiles = async (guids, access_token) => {
  const response = await geniService.get(
    "/profile",
    {
      params: {
        guids,
        access_token
      },
      timeout
    }
  );
  if ("results" in response)
    return response.results;
  return [response];
};
var geniSearch = async (names, access_token) => {
  const { results } = await geniService.get(
    "/profile/search",
    {
      params: {
        names,
        access_token
      },
      timeout
    }
  );
  return results;
};
var geniImmediateFamily = async (guids, access_token) => {
  const response = await geniService.get("/profile/immediate-family", {
    params: {
      guids,
      access_token,
      fields: "guid,id,gender"
    },
    timeout
  });
  if ("results" in response)
    return response.results;
  return [response];
};
export {
  geniImmediateFamily,
  geniSearch,
  getGeniProfiles,
  serviceSuccessInterceptor
};
