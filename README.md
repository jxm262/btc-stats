btc-stats  [![Build Status](https://travis-ci.org/jxm262/btc-stats.svg?branch=master)](https://travis-ci.org/jxm262/btc-stats)  
=========
Bitcoin price api to calculate statistics on spot prices across exchanges.  Uses the [xchange.js](https://github.com/jxm262/xchange.js) module to retrieve current ticker prices.
   
Note!!  This is highly in the Alpha stage.  
  
This project currently supports the following exchanges  
+ bitfinex
+ bitstamp
+ okcoin
+ btce
+ bter
+ hitbtc
+ ccex
  
Note: these are all using btc-usd  
  
## Download

The source is available for download from npm or here on github (master branch)

    npm install btc-stats
    
If preferred, you can specify a range of exchanges by calling the .exchanges() function.  Otherwise, the functions will run across all the exchanges mentioned above.  
#### Example  
```js  
btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);
```


#### Quick Examples  
```js  
var btcstats = require("../lib/btcstats")

//if this line isn't specified, it runs the avg function across all exchanges, not just these 3
btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);

//Example print the average price across 3 exchanges (bitfinex, bitstamp, okcoin)
btcstats.avg(function(error, resp) {
	if (!error) {
		console.log(resp);
	}
});  
```
  
## Documentation

* [`avg`](#avg)
* [`weightedAvg`](#weightedAvg)
* [`min`](#min)
* [`max`](#max)
* [`minVolume`](#minVolume)
* [`maxVolume`](#maxVolume)
* [`minSpread`](#minSpread)
* [`maxSpread`](#maxSpread)
* [`exchangeMinSpread`](#exchangeMinSpread)
* [`exchangeMaxSpread`](#exchangeMaxSpread)
  
All Functions accept a callback argument

* `callback(err, results)` - Called when the process completes, or an error occurs. 

<a name="avg" />
### avg(callback)

Calculates average midpoint price across exchanges.  Midpoint is defined as mid-price between bid vs ask.  

```js
btcstats.avg(function(error, resp) {
    //response format { price: xxx }
});
```

---------------------------------------
  
<a name="weightedAvg" />
### weightedAvg(callback)

Calculates average midpoint price across exchanges, weighted by volume.

```js
btcstats.weightedAvg(function(error, resp) {
    //response format { price: xxx }
});
```

---------------------------------------
  
<a name="min" />
### min(callback)

Calculates the exchange with the minimum price.  

```js
btcstats.min(function(error, resp) {
    //response format { price: xxx , exchange: xxx}
});
```

---------------------------------------
  
<a name="max" />
### max(callback)

Calculates the exchange with the maximum price.  

```js
btcstats.max(function(error, resp) {
    //response format { price: xxx , exchange: xxx }
});
```

---------------------------------------
  
<a name="minVolume" />
### minVolume(callback)

Calculates the exchange with the minimum volume.

```js
btcstats.minVolume(function(error, resp) {
    //response format { volume: xxx , exchange: xxx }
});
```

---------------------------------------
  
<a name="maxVolume" />
### maxVolume(callback)

Calculates the exchange with the maximum volume.

```js
btcstats.maxVolume(function(error, resp) {
    //response format { volume: xxx , exchange: xxx }
});
```

---------------------------------------
  
<a name="minSpread" />
### minSpread(callback)

Calculates minimum spread between all exchanges.  Defined as the exchange with the lowest asking price vs the exchange with the highest bidding price.  This result may often be a negative number if 1 exchange has a higher bid vs an exchange with a lower ask (potential arbitrage maybe ?  :)

```js
btcstats.minSpread(function(error, resp) {
    //response format { spread: xxx, bid: xxx, ask: xxx, bidExchange: xxx, askExchange: xxx } 
});
```

---------------------------------------
  
<a name="maxSpread" />
### maxSpread(callback)

Calculates maximum spread between all exchanges.  Defined as the exchange with the highest asking price vs the exchange with the lowest bidding price.  

```js
btcstats.maxSpread(function(error, resp) {
    //response format { spread: xxx, bid: xxx, ask: xxx, bidExchange: xxx, askExchange: xxx } 
});
```
  
---------------------------------------
  
<a name="exchangeMinSpread" />
### exchangeMinSpread(callback)

Calculates the exchange (within the list of exchanges) , with the minimum spread.  Defined as the exchange with the highest asking price vs the lowest bidding price.  

```js
btcstats.exchangeMinSpread(function(error, resp) {
    //response format { spread: xxx, bid: xxx, ask: xxx, bidExchange: xxx, askExchange: xxx } 
});
```

---------------------------------------  
       
<a name="exchangeMaxSpread" />
### exchangeMinSpread(callback)

Calculates the exchange (within the list of exchanges) , with the minimum spread.  Defined as the exchange with the highest asking price vs the lowest bidding price.  

```js
btcstats.exchangeMinSpread(function(error, resp) {
    //response format { spread: xxx, bid: xxx, ask: xxx, bidExchange: xxx, askExchange: xxx } 
});
```

---------------------------------------  

     
Working on btc-stats
====================

To help work on btc-stats, you'll need to 
- have Node installed.  
- Then clone the repo  
- install dependencies  

```
git clone https://github.com/jxm262/btc-stats.git
cd btc-stats
npm install
```
  

## To run tests (using mocha chai)

```
npm test
```  
  
  
About the Project
=================
This project utilizes my earlier project - [xchange.js](https://github.com/jxm262/xchange.js).  Please please feel free to join in and help contribute.  I'm also very open to suggestions or code reviews :)  


