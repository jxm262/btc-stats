/**
 * Example running ticker calculations on 2 exchanges (bitfinex & bitstamp)
 */

"use strict";

var btcstats = require("../lib/btcstats");

btcstats.exchanges(['bitfinex', 'bitstamp']);

btcstats.maxSpread(function(error, resp){
//	if(error){
//		console.log("errror: ");
//		console.log(error);
//	}
	if(!error){
		console.log(resp);
	}
});

//btcstats.avg				// {price: xx}
//btcstats.weightedAvg		// {price: xx}  //according to volume
//btcstats.min				// {price: xx, exchange: xx}
//btcstats.max				// {price: xx, same as xchange}
//btcstats.minVolume		// {volume: xx, same as xchange}
//btcstats.maxVolume		// {volume: xx, same as xchange}

//TODO: think of function name to differentiate the 
//   -exchange with highest ask vs exchange with lowest bid
//   vs
//   -exchange with the highest ask vs lowest bid

//across all exchanges (example - the spread difference across all exchanges, return highest ask, lowest bid)
//btcstats.maxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}
//btcstats.minSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}

//across single exchanges  (example the exchange with the max spread)
//btcstats.maxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}
//btcstats.minSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}

