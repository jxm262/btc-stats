/**
 * Example running ticker calculations on 2 exchanges (bitfinex & bitstamp)
 */

"use strict";

var btcstats = require("../lib/btcstats");

btcstats.exchanges(['bitfinex', 'bitstamp']);

btcstats.avg(function(error, resp){
	if(error){
		console.log("errror: ");
		console.log(error);
	}
	if(!error){
		console.log(resp);
	}
});

//btcstats.avg				// {price: xx}
//btcstats.weightedAvg		// {price: xx}  //according to volume
//btcstats.median			// {price: xx, exchange: xx}
//btcstats.min				// {price: xx, exchange: xx}
//btcstats.max				// {price: xx, same as xchange}
//btcstats.minVolume		// {price: xx, same as xchange}
//btcstats.maxVolume		// {price: xx, same as xchange}
//btcstats.maxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}
//btcstats.minSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}



