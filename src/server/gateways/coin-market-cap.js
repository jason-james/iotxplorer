import axios from "axios";

export class CoinMarketCap {
  fetchCoinPrice() {
    // there are usd, btc and eth prices
    const url = "https://api.coinmarketcap.com/v1/ticker/iotex/?convert=ETH";
    return axios.get(url);
  }

  fetchMarketData() {
    // usd prices
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=IOTX";
    return axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": "24870ad1-be93-44c3-8a8c-18bf07e72fb0"
      }
    });
  }
}
