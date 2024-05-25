import axios from "axios";
import { ICoinBrief, ICoinDetail } from "../interface";

// get data from api

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export const getAllCoinList = async (
  currency: string,
  perPage: string,
  page: number
) => {
  const result: ICoinBrief[] = [];
  const data = (
    await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2
    `)
  )?.data;
  if (data) {
    for (let i = 0; i < Number(perPage); i++) {
      result.push({
        id: data[i].id,
        name: data[i].name,
        symbol: data[i].symbol,
        currentPrice: data[i].current_price,
        totalVolume: data[i].total_volume,
        priceChange: {
          "1h": data[i].price_change_percentage_1h_in_currency,
          "24h": data[i].price_change_percentage_24h_in_currency,
          "7d": data[i].price_change_percentage_7d_in_currency,
        },
        marketCap: data[i].market_cap,
      });
    }
  }
  return result;
};

export const getBookmarkCoinList = async (
  currency: string,
  bookmarks: string[]
) => {
  const ids = bookmarks.join("%2C");
  const result: ICoinBrief[] = [];
  const data = (
    await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2
    `)
  )?.data;
  if (data) {
    for (let i = 0; i < bookmarks.length; i++) {
      result.push({
        id: data[i].id,
        name: data[i].name,
        symbol: data[i].symbol,
        currentPrice: data[i].current_price,
        totalVolume: data[i].total_volume,
        priceChange: {
          "1h": data[i].price_change_percentage_1h_in_currency,
          "24h": data[i].price_change_percentage_24h_in_currency,
          "7d": data[i].price_change_percentage_7d_in_currency,
        },
        marketCap: data[i].market_cap,
      });
    }
  }
  return result;
};

export const getCoinDetails = async (id: string) => {
  const data = (
    await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=true&market_data=true
      `)
  )?.data;
  const result: ICoinDetail = {
    name: data?.name,
    symbol: data?.symbol,
    description: {
      en: data?.description?.en,
      ko: data?.description?.ko,
    },
    localization: {
      en: data?.localization?.en,
      ko: data?.localization?.ko,
    },
    rank: data?.market_cap_rank,
    homepage: data?.links?.homepage[0],
    imageUrl: data?.image?.thumb,
    currentPrice: {
      krw: data?.market_data?.current_price?.krw,
      usd: data?.market_data?.current_price?.usd,
    },
    priceChangePercent: {
      krw: data?.market_data?.price_change_percentage_24h_in_currency?.krw,
      usd: data?.market_data?.price_change_percentage_24h_in_currency?.usd,
    },
    marketCap: {
      krw: data?.market_data?.market_cap?.krw,
      usd: data?.market_data?.market_cap?.usd,
    },
    volume: {
      krw: data?.market_data?.total_volume?.krw,
      usd: data?.market_data?.total_volume?.usd,
    },
  };
  console.log(result);
  return result;
};

// formatting

export const numberWithCommas = (x: number | string) => {
  const xString = x.toString();
  const stringList = xString.split(".");
  return stringList[1]
    ? stringList[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "." +
        stringList[1]
    : stringList[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
