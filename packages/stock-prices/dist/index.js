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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  SERVICES: () => SERVICES,
  getNepseTodaysPrice: () => getNepseTodaysPrice
});
module.exports = __toCommonJS(src_exports);

// src/stock.ts
var import_axios = __toESM(require("axios"));
var SERVICES = {
  NPSE: {
    todaysPrice: "https://newweb.nepalstock.com/api/nots/market/export/todays-price/$1"
    // todaysprice: "https://nepse-data-api.herokuapp.com/data/todaysprice",
    //http://www.nepalstock.com/todaysprice?_limit=5
    //https://github.com/koju/nepse-data/blob/0d5086851f865b88caef35ccb8a91dd93898c06c/src/main/resources/application.properties
  },
  IDX: {
    companies: "https://www.idx.co.id/umbraco/Surface/ListedCompany/GetCompanyProfiles?start=0&length=3&search[value]=&search[regex]=false"
  }
};
var getNepseTodaysPrice = (date) => {
  let url = SERVICES.NPSE.todaysPrice.replace("$1", date);
  console.log(url);
  return import_axios.default.get(url);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SERVICES,
  getNepseTodaysPrice
});
