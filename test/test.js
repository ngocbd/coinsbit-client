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
})