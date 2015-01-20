/**
 * Example running functions on 3 exchanges (bitfinex, bitstamp, okcoin)
 */

"use strict";

var btcstats = require("../lib/btcstats");

btcstats.exchanges(['bitfinex', 'bitstamp', 'okcoin']);

function print(error, resp){
	if(error){
		console.log("error: " + error);
	} else{
		console.log(resp);
	}
}


btcstats.avg(function(error, resp){
	console.log("avg: ");
	print(error, resp);
});


btcstats.weightedAvg(function(error, resp){
	console.log("weightedAvg: ");
	print(error, resp);
});


btcstats.min(function(error, resp){
	console.log("min");
	print(error, resp);
});


btcstats.max(function(error, resp){
	console.log("max: ");
	print(error, resp);
});


btcstats.minVolume(function(error, resp){
	console.log("minVolume: ");
	print(error, resp);
});


btcstats.maxVolume(function(error, resp){
	console.log("maxVolume: ");
	print(error, resp);
});


btcstats.minSpread(function(error, resp){
	console.log("minSpread: ");
	print(error, resp);
});


btcstats.maxSpread(function(error, resp){
	console.log("maxSpread: ");
	print(error, resp);
});


btcstats.exchangeMinSpread(function(error, resp){
	console.log("exchangeMinSpread: ");
	print(error, resp);
});


btcstats.exchangeMaxSpread(function(error, resp){
	console.log("exchangeMaxSpread");
	print(error, resp);
});


//TODO: think of function name to differentiate the 
//   -exchange with highest ask vs exchange with lowest bid
//   vs
//   -exchange with the highest ask vs lowest bid

//across all exchanges (example - the spread difference across all exchanges, return highest ask, lowest bid)
//btcstats.maxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}
//btcstats.minSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}

//across single exchanges  (example the exchange with the max spread)
//btcstats.exchangeMaxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}
//btcstats.exchangeMinSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}

