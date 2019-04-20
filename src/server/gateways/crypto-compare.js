import axios from "axios";

export class CryptoCompare {
  fetchChartData() {
    const url =
      "https://min-api.cryptocompare.com/data/histoday?fsym=IOTX&tsym=USD&limit=7";
    return axios.get(url);
  }
}
