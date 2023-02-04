const chai = require('chai')
const expect = chai.expect
const coinsbitClient = require('../index.js')()

describe("CoinsbitClient Tests", () => {

	//test a function for a specific case
	it("should return client version", () => {
		expect(coinsbitClient.version()).equals("1.0.0");
	})
	it("should return markets", async () => {
		const markets = await coinsbitClient.getMarkets();
		console.log(markets);
		expect(markets).to.be.an('object');
	})
	it('should return ticker', async () => {
		const ticker = await coinsbitClient.getTicker();
		
		expect(ticker).to.be.an('object');
	})
})