// src/stock.ts
import axios from "axios";
import https from "https";
var SERVICES = {
  NPSE: {
    todaysPrice: "https://newweb.nepalstock.com/api/nots/market/export/todays-price/$1"
  },
  IDX: {
    companies: "https://www.idx.co.id/umbraco/Surface/ListedCompany/GetCompanyProfiles?start=0&length=3&search[value]=&search[regex]=false"
  }
};
var getNepseTodaysPrice = (date) => {
  let url = SERVICES.NPSE.todaysPrice.replace("$1", date);
  console.log(url);
  return axios.get(url, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
};
export {
  SERVICES,
  getNepseTodaysPrice
};
