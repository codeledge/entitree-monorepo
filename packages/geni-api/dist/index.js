"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  geniImmediateFamily: () => geniImmediateFamily,
  geniSearch: () => geniSearch,
  getGeniProfiles: () => getGeniProfiles,
  serviceSuccessInterceptor: () => serviceSuccessInterceptor
});
module.exports = __toCommonJS(src_exports);

// src/GeniService.ts
var import_axios = __toESM(require("axios"));
var geniService = import_axios.default.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  geniImmediateFamily,
  geniSearch,
  getGeniProfiles,
  serviceSuccessInterceptor
});
