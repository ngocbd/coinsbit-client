const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const qs = require('qs');

class CoinsbitClient {
  constructor() {
    this.request = axios.create({
      baseURL: 'https://api.coinsbit.io',
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
  var signature = crypto.createHmac('sha512', this.apiSecret).update(payload).digest('hex');


    
   return this.request.post(path, data, { headers: { 'Content-type': 'application/json', 'X-TXC-APIKEY': this.apiKey, 'X-TXC-PAYLOAD': payload, 'X-TXC-SIGNATURE': signature } }) 
   
  }
  async getAccountBalance() {
    
    
    const response = await this.postQuery('/api/v1/account/balances');

    return response;
  }
  // get Accont Balance of each coin ID
  async getAccountBalanceEach(assetId){
    const response = await this.postQuery('/api/v1/account/balance', assetId);
    return response;
  }
  // get Order 
  async getOrder(request = {}){
    //const {orderId, offset = 0, limit = 50 } = request;
    const response = await this.postQuery('/api/v1/account/order', request);
    return response;

  }

  //get account trades
 
  async getTrades(request = {}){
    //const {orderId, offset = 0, limit = 50 } = request;
    const response = await this.postQuery('/api/v1/account/trades', request);
    return response;

  }

  //
  // get order history
  async getOrderHistory(request = {}){
    //const {offset = 0, limit = 50 } = request;
    const response = await this.postQuery('/api/v1/account/order_history', request);
    return response;

  }

  // get order history list 
  async getOrderHistoryList(request = {}){
    //const {offset = 0, limit = 50 } = request;
    const response = await this.postQuery('/api/v1/account/order_history_list', request);
    return response;

  }
  // Market API
  /**
   * @dev creat new Order from market using API
   * @param {*} market - coin pairs eg. FRL_USDT
   * @param {*} side  -  buy or sell action
   * @param {*} amount - expected Amount of coin to buy or sell 
   * @param {*} price - expected price for selling or buying
   * @returns 
   */
  async createNewOrder(request = {}) {
    //const {market, side , amount, price } = request;
    const response = await this.postQuery('/api/v1/order/new', request);
    return response;
  }
  /**
   * @dev: Be able to cancel the order
   * @param {*} market - coin pairs eg. FRL_USDT
   * @param {*} orderId - order id 
   */
  async cancelOrder(market, orderId){
    const request = {
      market : market,
      orderId:  orderId
    }
    const response = await this.postQuery('/api/v1/order/cancel', request);
    return response;
  }

  async cancelOrder(request = {}){
    const response = await this.postQuery('/api/v1/order/cancel', request);
    return response;
  }


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

  // check assest found if not found
  async isAssestFound(apiPath, assetId){
    const response = await this.postQuery(apiPath);
    let request = response.data.result;
    if (request.hasOwnProperty(assetId)) {
      return true;
    } else {
      return false;
    }
  }
}

exports = module.exports = () => { return new CoinsbitClient() };
exports.version = () => { return "1.0.0" };