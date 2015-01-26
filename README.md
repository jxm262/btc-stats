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
  


Quick Examples
==============
```js  
var btcstats = require("../lib/btcstats")

btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);

//Example print the average price across 3 exchanges (bitfinex, bitstamp, okcoin)
btcstats.avg(function(error, resp) {
	if (!error) {
		console.log(resp);
	}
});  

//Example print the minimum spread (returns the exchange with the min vs the exchange with the max bid)
btcstats.minSpread(function(error, resp) {
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
  
  
<a name="avg" />
### avg(callback)

Calculates average midpoint price across exchanges.  Midpoint is defined as mid-price between bid vs ask.  


__Arguments__

* `callback(err, results)` - A callback which is called when averaging process completes, or an error occurs. 

__Examples__

```js
btcstats.avg(function(error, resp) {
    //response format { price: xxx }
});
```

---------------------------------------
  
<a name="weightedAvg" />
### weightedAvg(callback)

Calculates average midpoint price across exchanges, weighted by volume.


__Arguments__

* `callback(err, results)` - A callback which is called when averaging process completes, or an error occurs. 

__Examples__

```js
btcstats.weightedAvg(function(error, resp) {
    //response format { price: xxx }
});
```

---------------------------------------
  
<a name="min" />
### min(callback)

Calculates the exchange with the minimum price.  


__Arguments__

* `callback(err, results)` - A callback which is called when the process completes, or an error occurs. Reponds with the min price and corresponding exchange name.

__Examples__

```js
btcstats.min(function(error, resp) {
    //response format { price: xxx , exchange: xxx}
});
```

---------------------------------------
  
    <a name="max" />
### max(callback)

Calculates the exchange with the maximum price.  


__Arguments__

* `callback(err, results)` - A callback which is called when the process completes, or an error occurs. Reponds with the max price and corresponding exchange name. 

__Examples__

```js
btcstats.max(function(error, resp) {
    //response format { price: xxx , exchange: xxx }
});
```

---------------------------------------
  
<a name="minVolume" />
### minVolume(callback)

Calculates the exchange with the minimum volume.


__Arguments__

* `callback(err, results)` - A callback which is called when the process completes, or an error occurs. 

__Examples__

```js
btcstats.minVolume(function(error, resp) {
    //response format { volume: xxx , exchange: xxx }
});
```

---------------------------------------
  
    <a name="maxVolume" />
### maxVolume(callback)

Calculates the exchange with the maximum volume.


__Arguments__

* `callback(err, results)` - A callback which is called when the process completes, or an error occurs. 

__Examples__

```js
btcstats.maxVolume(function(error, resp) {
    //response format { volume: xxx , exchange: xxx }
});
```

---------------------------------------
  
<a name="minSpread" />
### minSpread(callback)

Calculates minimum spread between all exchanges.  Defined as the exchange with the lowest asking price vs the exchange with the highest bidding price.  This result may often be a negative number if 1 exchange has a higher bid vs an exchange with a lower ask (potential arbitrage maybe ?  :)


__Arguments__

* `callback(err, results)` - A callback which is called the process completes, or an error occurs. 

__Examples__

```js
btcstats.minSpread(function(error, resp) {
    //response format { spread: xxx, bid: xxx, ask: xxx, bidExchange: xxx, askExchange: xxx } 
});
```

---------------------------------------
  
<a name="maxSpread" />
### maxSpread(callback)

Calculates maximum spread between all exchanges.  Defined as the exchange with the highest asking price vs the exchange with the lowest bidding price.  


__Arguments__

* `callback(err, results)` - A callback which is called when the process completes, or an error occurs. 

__Examples__

```js
btcstats.maxSpread(function(error, resp) {
    //response format { spread: xxx, bid: xxx, ask: xxx, bidExchange: xxx, askExchange: xxx } 
});
```
  
---------------------------------------
  
<a name="exchangeMinSpread" />
### exchangeMinSpread(callback)

Calculates the exchange (within the list of exchanges) , with the minimum spread.  Defined as the exchange with the highest asking price vs the lowest bidding price.  


__Arguments__

* `callback(err, results)` - A callback which is called when the process completes, or an error occurs. 

__Examples__

```js
btcstats.exchangeMinSpread(function(error, resp) {
    //response format { spread: xxx, bid: xxx, ask: xxx, bidExchange: xxx, askExchange: xxx } 
});
```

---------------------------------------  
       
<a name="exchangeMaxSpread" />
### exchangeMinSpread(callback)

Calculates the exchange (within the list of exchanges) , with the minimum spread.  Defined as the exchange with the highest asking price vs the lowest bidding price.  


__Arguments__

* `callback(err, results)` - A callback which is called when the process completes, or an error occurs. 

__Examples__

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


