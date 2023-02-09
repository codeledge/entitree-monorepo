// src/stock.ts
import axios from "axios";
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
  return axios.get(url);
};
export {
  SERVICES,
  getNepseTodaysPrice
};
