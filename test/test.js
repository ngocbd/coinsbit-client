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
		
		//const balances = await coinsbitClient.getAccountBalance();
		//console.log(JSON.stringify(balances.data));
		
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
	//////////////////////////////////////////////////////
	/// Test Order - /api/v1/account/order
	describe("Order Book", async() =>{
		// Test with 1 parameter
		it("Order Book - 1 parameter: Order ID", async() => {
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			const request = {
				orderId: 1234, // only one parameter
			  };
			const order = await coinsbitClient.getOrder(request);
			expect(order).to.be.an('object');
			//console.log(order.data);
			//console.log(JSON.stringify(order.data))
		 });
		 //Test with 3 parameters
		 it("Order Book - 3 parameters", async() => {
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			const request = {
				orderId: 1234, // order id
				offset: 10, // optinal - changed 0 to 10
				limit: 100  // optinal - changed 50 to 10
			  };
			const order = await coinsbitClient.getOrder(request);
			expect(order).to.be.an('object');
			//console.log(order.data);
			//console.log(JSON.stringify(order.data))
		 });
	});

	 // Test trade - /api/v1/account/trades
	 describe("Trades API ", async() =>{
		 // Test with only 1 parameter
		 it("Trades API - 1 parameter only - orderId", async() =>{
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			const request = {
				orderId: 1234, // only one parameter
			  };
			const trade = await coinsbitClient.getTrades(request);
			expect(trade).to.be.an('object');
			// console.log("OK");
			// console.log(JSON.stringify(trade.data));
		 });
		 // Test with 3 parameters
		it("Trades API - 3 parameters", async() =>{
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			const request = {
				orderId: 1234,
				offset: 10, // optinal - changed 0 to 10
				limit: 100  // optinal - changed 50 to 10
			  };
			const trade = await coinsbitClient.getTrades(request);
			expect(trade).to.be.an('object');
			// console.log("OK");
			// console.log(JSON.stringify(trade.data));
		 });
	 });
	

	 ////////////////////////////
	// Test Order History - /api/v1/account/order_history
	// it("Order History", async() =>{
	// 	// set API key
	// 	coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
	// 	const orderHistory = await coinsbitClient.getOrderHistory();
	// 	expect(orderHistory).to.be.an('object');
	// 	//console.log(JSON.stringify(orderHistory.data));
	// 	let pairID = "FRL_USDT";
	// 	let orderHistoryId = orderHistory.data.result;
	// 	console.log(orderHistoryId[pairID]);
	// 	console.log(orderHistory.data);
	// });
	////////////////////////////////////////
	// Test Order History - /api/v1/account/order_history
	describe("Order History", async() =>{
		// Test without paramter
		it("Order History - without paramter", async() =>{
		   // set API key
		   coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		   const request = {
			   
			 };
			 const orderHistory = await coinsbitClient.getOrderHistory(request);
			 expect(orderHistory).to.be.an('object');
			 //console.log(JSON.stringify(orderHistory.data));
			 let pairID = "FRL_USDT";
			 let orderHistoryId = orderHistory.data.result;
			 //console.log(orderHistoryId[pairID]);
			 //console.log(orderHistory.data);
		});
		// Test with 2 parameters
	   it("Trades API - 2 parameters", async() =>{
		   // set API key
		   coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		   const request = {
			   offset: 10, // optinal - changed 0 to 10
			   limit: 100  // optinal - changed 50 to 10
			 };
			 
			 const orderHistory = await coinsbitClient.getOrderHistory(request);
			 expect(orderHistory).to.be.an('object');
			 //console.log(JSON.stringify(orderHistory.data));
			 let pairID = "FRL_USDT";
			 let orderHistoryId = orderHistory.data.result;
			 //console.log(orderHistoryId[pairID]);
			 //console.log(orderHistory.data);
		});
	});


	// Test Order History List - /api/v1/account/order_history_list
	describe("Order History List", async() =>{
		// Test without paramter
		it("Order History List - without paramter", async() =>{
		   // set API key
		   coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		   const request = {
			   
			 };
			const orderHistoryList = await coinsbitClient.getOrderHistoryList(request);
			expect(orderHistoryList).to.be.an('object');
	
			// let pairID = "FRL_USDT";
			// let orderHistoryListId = orderHistoryList.data.result;
			//console.log(orderHistoryListId);
		});
		// Test with 2 parameters
	   it("Order History List - 2 parameters", async() =>{
		   // set API key
		   coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
		   const request = {
			   offset: 10, // optinal - changed 0 to 10
			   limit: 100  // optinal - changed 50 to 10
			 };
			 
			const orderHistoryList = await coinsbitClient.getOrderHistoryList(request);
			expect(orderHistoryList).to.be.an('object');
	
			// let pairID = "FRL_USDT";
			// let orderHistoryListId = orderHistoryList.data.result;
			//console.log(orderHistoryListId);
		});
	});


	/**
	 *  Market API - Testing!!!!!!!!!!!!!!!!!!
	 */
	// Make new order from market API
	describe("Create New Order from Market API", async() =>{
		// Sell action
		it("Create new order - Sell action", async() => {
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			// set parameters 
			const request = {
				market : "FRL_USDT",
				side : "sell",
				amount : 0.1,
				price : 0.1
			}
			// let market = "FRL_USDT";
			// let side = "sell";
			// let amount = 0.1;
			// let price = 0.1;
			const newOrder = await coinsbitClient.createNewOrder(request);
			expect(newOrder).to.be.an('object');
			//console.log(newOrder.data.result);
		});
		//Buy action
		it("Create new order - Buy action", async() => {
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			// set parameters 
			const request = {
				market : "FRL_USDT",
				side : "buy",
				amount : 0.1,
				price : 0.2
			}
			const newOrder = await coinsbitClient.createNewOrder(request);
			expect(newOrder).to.be.an('object');
			// get return message from the buy order if the order faild
			console.log(newOrder.data);
			console.log(newOrder.data.result);
			console.log(newOrder.data.result.market);
			console.log(newOrder.data.result.orderId);

			// Cancel the order 
			const cancelRequest = {
				market: newOrder.data.result.market,
				orderId: newOrder.data.result.orderId
			}
			const cancel = await coinsbitClient.cancelOrder(cancelRequest);
			expect(cancel).to.be.an('object');
			console.log(cancel.data);

		});
	});
	// Cancel Order testing
	describe("Cancel the order", async() =>{
		// Cancel the order
		it("Cancel the order - 2 parameters", async() =>{
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			// set parameter 
			const request = {
				market: "FRL_USDT",
				orderId: 14147194369
			}
			const cancel = await coinsbitClient.cancelOrder(request);
			expect(cancel).to.be.an('object');
			//console.log(cancel.data);
		});
	});

	// Get orders
	describe("Get orders from market", async() => {
		// get orders
		it("Get orders - from market", async() => {
			// set API key
			coinsbitClient.setKey('0653CB611B5C12B1F4E7C832A8E579A1','C06035108971437ECF2B0C90B629FA2A');
			// set parameter 
			const request = {
				market: "FRL_USDT",
				offset: 10,
				limit: 100
			}
			const getOrder = await coinsbitClient.getOrders(request);
			expect(getOrder).to.be.an('object');
			//console.log(getOrder.data);
		});
	});

	
	
	

})