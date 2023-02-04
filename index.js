const axios = require('axios');
class CoinsbitClient {
  constructor() {
    this.request = axios.create({
      baseURL: 'https://coinsbit.io',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  async getMarkets() {
    const response = await this.request.get('/api/v1/public/markets');
    return response.data;
  }
  async getTicker() {
    const response = await this.request.get('/api/v1/public/tickers');
    return response.data;
  }

  version() {
    return "1.0.0";
  }
}

exports = module.exports = () => { return new CoinsbitClient() };
exports.version = () => { return "1.0.0" };