# Coinsbit-Client 

## Table of Contents

1. [Coinsbit-Client Description](#chapter-001)
2. [API Documentation](#chapter-002)
3. [Getting Started](#chapter-003)
4. [Functions](#chapter-004)
5. [Running the Tests](#chapter-005)
6. [Toolchain](#chapter-006)
7. [Contributing](#chapter-007)
8. [License](#chapter-008)

## 1. Coinsbit-Client Description <a id="chapter-001"></a>
The Coinsbit-client API Library provides a convenient way for developers to access the Coinsbit exchange platform 
and build applications that interact with it. 
This project includes tests for the Coinsbit-client and the tests are used to ensure that the functions are working correctly!

## 2. API Documentation <a id="chapter-002"></a>

The API documentation is available at [API DOCUMENTATION](https://www.notion.so/coinsbitwsapi/API-COINSBIT-WS-API-COINSBIT-cf1044cff30646d49a0bab0e28f27a87). The documentation includes a list of all of the available endpoints, as well as detailed information on how to use the API.

## 3. Getting Started <a id="chapter-003"></a>

To get started with the Coinsbit-client API libary, follow these steps:

- Before using the Coinsbit-client Library, you will need to register for an API key on the Coinsbit platform.
- Sign up Coinsbit to get an API Key and an API Secret key at [API KEY SIGNUP](https://api.coinsbit.io)
- Read the API documentation to learn about the available endpoints and how to use the API.
- Use the Coinsbit-client library to access the necessary functions for your applications.

## 4. Functions  <a id="chapter-004"></a>

The Coinsbit-client Library provides a number of functions for interacting with the Coinsbit exchange platform. Some of the most commonly used functions include:

- **getMarkets**: Retrieve market data for a specific symbol
- **getSymbols** is used to retrieve information about the available trading symbols on the exchange (ex. ETH_BTC).
- **getAccountBalance**: retrieves information about the specific assest balance of an account on the exchange platform.
- **getOrderHistoryList**: retrieve a list of historical orders from the exchange platform.
- **createNewOrder**: Create a new order on the exchange
- **getOrders** is used to manage and retrieve information about orders on the exchange.
- **cancelOrder**: Cancel an existing order (using coin pairs and order ID)
For a full list of available functions, please refer to the [official Coinsbit-client](https://github.com/ngocbd/coinsbit-client/blob/master/index.js).

## 5. Running the Tests <a id="chapter-005"></a>

To run the tests, follow these steps:

- Clone the repository: git clone [REPOSITORY URL](https://github.com/ngocbd/coinsbit-client)
- Navigate to the project directory: cd **coinsbit-client-master**
- Install the required dependencies: npm install or yarn install
- Run the tests: npm run test or yarn test

## 6. Examples <a id="chapter-006"></a>
Here are some examples of how to use the Coinsbit-client Library in your applications:

```js
// Function: create a new order 
 async createNewOrder(request = {}) {
    //const {market, side , amount, price } = request;
    const response = await this.postQuery('/api/v1/order/new', request);
    return response;
}

```

```js
    // set API key
    coinsbitClient.setKey('Your API Key','Your API Secret Key');
    const request = {
        market : "FRL_USDT",
        side : "buy",
        amount : 0.1,
        price : 0.6
    }
    const newOrder = await coinsbitClient.createNewOrder(request);
    console.log(newOrder);
		
```

## 7. Contributing <a id="chapter-007"></a>

If you want to contribute to the Coinsbit-client Library, we welcome your pull requests! Before submitting a pull request, please make sure that:

- Your changes are well-documented
- Your changes are tested and pass all existing tests
- Your changes do not break any existing functionality
Thank you for your help in making the Coinsbit-client API Library better!




