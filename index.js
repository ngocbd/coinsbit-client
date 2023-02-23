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
  // get tickers
  async getTickers() {
    const response = await this.request.get('/api/v1/public/tickers');
    return response.data;
  }

  // Get specificTicker - lastPrice
  async getTicker(request = {}){
    const respone = await this.postQuery('/api/v1/public/ticker', request);
    return respone;
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

  // get specific balance
  async getSpecificBalance(request = {}){
    // input: currency
    const respone = await this.postQuery('/api/v1/account/balance', request);
    return respone;
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
  async createNewOrder(request = {}) {
    //const {market, side , amount, price } = request;
    const response = await this.postQuery('/api/v1/order/new', request);
    return response;
  }
 // cancel Order
  async cancelOrder(request = {}){
    //const {market, orderId } = request;
    const response = await this.postQuery('/api/v1/order/cancel', request);
    return response;
  }
  // get ative orders
  async getOrders(request = {}){
    // const {market, offset, limit} = request
    const response = await this.postQuery('/api/v1/orders', request);
    return response;
  }

  version() {
    return "1.0.5";
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
exports.version = () => { return "1.0.5" };