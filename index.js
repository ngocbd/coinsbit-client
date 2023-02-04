const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const qs = require('qs');

class CoinsbitClient {
  constructor() {
    this.request = axios.create({
      baseURL: 'https://coinsbit.io',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  setKey(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

  }

  // Public API
  async getMarkets() {
    const response = await this.request.get('/api/v1/public/markets');
    return response.data;
  }
  async getTickers() {
    const response = await this.request.get('/api/v1/public/tickers');
    return response.data;
  }

  async getTicker() {
    const response = await this.request.get('/api/v1/public/ticker');
    return response.data;
  }

  async getBook() {
    const response = await this.request.get('/api/v1/public/book');
    return response.data;
  }
  async getHistory() {
    const response = await this.request.get('/api/v1/public/history');
    return response.data;
  }
  async getHistoryResult() {
    const response = await this.request.get('/api/v1/public/history/result');
    return response.data;
  }

  async getProducts() {
    const response = await this.request.get('/api/v1/public/products');
    return response.data;
  }

  async getSymbols() {
    const response = await this.request.get('/api/v1/public/symbols');
    return response.data;
  }
  async getDepthResult() {
    const response = await this.request.get('/api/v1/public/depth/result');
    return response.data;
  }
  async getKline() {
    const response = await this.request.get('/api/v1/public/kline');
    return response.data;
  }
  // get account balance from coinsbit /api/v1/account/balances

  // Private API
  postQuery (path, params = []) {

  var date = new Date();
  var nonce = date.getTime();
  var data = Object.assign({
    'request': path,
    'nonce': nonce
  }, params);

  data = JSON.stringify(data);
  const payload = Buffer.from(data).toString('base64');
  signature = crypto.createHmac('sha512', this.apiSecret).update(payload).digest('hex');


    let options = {
      method: "POST",
      uri: this.endPoint + path,
      headers: {
          'Content-type': 'application/json',
          'X-TXC-APIKEY': this.apiKey,
          'X-TXC-PAYLOAD': payload,
          'X-TXC-SIGNATURE': signature
      },
      body: data,
      json: false
    };
  }
  async getAccountBalance() {
    
    
    const response = await this.request.post('/api/v1/account/balances');

    return response.data;
  }

  // Market API
  // async getNew() {
  //   const response = await this.request.get('/api/v1/order/new');
  //   return response.data;
  // }

  // async getCancel() {
  //   const response = await this.request.get('/api/v1/order/cancel');
  //   return response.data;
  // }

  // async getOrder() { 
  //   const response = await this.request.get('/api/v1/orders');
  //   return response.data;
  // }

  version() {
    return "1.0.0";
  }
}

exports = module.exports = () => { return new CoinsbitClient() };
exports.version = () => { return "1.0.0" };