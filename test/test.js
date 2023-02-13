const chai = require('chai')
const expect = chai.expect
const coinsbitClient = require('../index.js')()

describe("CoinsbitClient Tests", () => {

	//test a function for a specific case


	// Public API

	it("should return client version", () => {
		expect(coinsbitClient.version()).equals("1.0.0");
	})
	it("should return markets", async () => {
		const markets = await coinsbitClient.getMarkets();
		// console.log(markets);
		expect(markets).to.be.an('object');
	})
	it('should return tickers', async () => {
		const tickers = await coinsbitClient.getTickers();
		expect(tickers).to.be.an('object');
	})
	it('should return ticker', async () => {
		const ticker = await coinsbitClient.getTicker();
		expect(ticker).to.be.an('object');
	})
	it('should return books', async () => {
		const book = await coinsbitClient.getBook();
		expect(book).to.be.an('object');
	})
	it('should return history', async () => {
		const history = await coinsbitClient.getHistory();
		expect(history).to.be.an('object');
	});
	it('should return historyResult', async () => {
		const historyResult = await coinsbitClient.getHistoryResult();
		expect(historyResult).to.be.an('object');
	});
	it('should return products', async () => {
		const products = await coinsbitClient.getProducts();
		expect(products).to.be.an('object');
	})
	it('should return symbols', async () => {
		const symbols = await coinsbitClient.getSymbols();
		expect(symbols).to.be.an('object');
	});
	it('should return depthResults', async () => {
		const depthResults = await coinsbitClient.getDepthResult();
		expect(depthResults).to.be.an('object');
	});
	it('should return kline', async () => {
		const kline = await coinsbitClient.getKline();
		expect(kline).to.be.an('object');
	});

	// Market API

	// it('should return new', async () => {
	// 	const orderNew = await coinsbitClient.getNew();
	// 	expect(orderNew).to.be.an('object');
	// });

	// it('should return cancel', async () => {
	// 	const orderCancel = await coinsbitClient.getCancel();
	// 	expect(orderCancel).to.be.an('object');
	// });

	// it('should return orders', async () => {
	// 	const orders = await coinsbitClient.getOrders();
	// 	console.log(orders);
	// 	expect(orders).to.be.an('object');
	// });
	

	// AccountAPI

	 it('should return balances', async () => {
		//coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		coinsbitClient.setKey('E5A17C0F9E36E10A4FF640E86C3FADFB','454F9BB49518EE2BF094BF0F946F12D9');
		
		const balances = await coinsbitClient.getAccountBalance();
		console.log(JSON.stringify(balances.data));
		
	 });
	 // Test Account Balance - - api/v1/account/balances
	 it("Should return balance V2", async() => {
		// set API key
		coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		//coinsbitClient.setKey('E5A17C0F9E36E10A4FF640E86C3FADFB','454F9BB49518EE2BF094BF0F946F12D9');
		const balances = await coinsbitClient.getAccountBalance();
		//console.log(JSON.stringify(balance.data));
		// get result of coins
		let balance_each = balances.data.result;
		//console.log(balance_each);
		// check USDT balance of this account including: available and freeze
		//console.log(await coinsbitClient.isAssestFound("USDT"));
		let assestId = "USDT";
		let apiPath = '/api/v1/account/balances';
		if(await coinsbitClient.isAssestFound(apiPath, assestId)){
			expect(balance_each[assestId].available).to.not.equal(0);
		 	expect(balance_each[assestId].freeze).to.not.equal(0);
		}else{
			console.log("Assest not found!");
		}
	 });
	 // Test Account Balance - - api/v1/account/balance 
	 // Data not found
	 it("Should return account balance of coin", async() => {
		// set API key
		//coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		coinsbitClient.setKey('E5A17C0F9E36E10A4FF640E86C3FADFB','454F9BB49518EE2BF094BF0F946F12D9');
		let assestId = "ETH";
		const balances = await coinsbitClient.getAccountBalanceEach(assestId);
		//console.log(balances.data);
		

	 });
	 // Test Orfer - /api/v1/account/order
	 it("Order Book", async() => {
		// set API key
		coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		const order = await coinsbitClient.getOrder(1234);
		expect(order).to.be.an('object');
		//console.log(order.data);
		//console.log(JSON.stringify(order.data))
	 });
	 // Test trade - /api/v1/account/trades
	 it("Trades API", async() =>{
		// set API key
		coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		const trade = await coinsbitClient.getTrades(1234);
		expect(trade).to.be.an('object');
		//console.log(JSON.stringify(trade.data));
	 });
	// Test Order History - /api/v1/account/order_history
	it("Order History", async() =>{
		// set API key
		coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		const orderHistory = await coinsbitClient.getOrderHistory();
		expect(orderHistory).to.be.an('object');
		//console.log(JSON.stringify(orderHistory.data));
		let pairID = "FRL_USDT";
		let orderHistoryId = orderHistory.data.result;
		//console.log(orderHistoryId[pairID]);
	});
	// Test Order History List - /api/v1/account/order_history_list
	it("Order History List", async() =>{
		// set API key
		coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		const orderHistoryList = await coinsbitClient.getOrderHistoryList();
		expect(orderHistoryList).to.be.an('object');
		//console.log(JSON.stringify(orderHistoryList.data));
		//let pairID = "FRL_USDT";
		//let orderHistoryListId = orderHistoryList.data.result;
		//console.log(orderHistoryListId);
	});

})