/**
 * Example running functions on 3 exchanges (bitfinex, bitstamp, okcoin)
 */

//"use strict";

var btcstats = require("../lib/btc-stats")

btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);


btcstats.avg(function(error, resp) {
	if (!error) {
		console.log("\n avg: ");
		console.log(resp);
	}
});


btcstats.weightedAvg(function(error, resp){
	if (!error) {
		console.log("\n weightedAvg: ");
		console.log(resp);
	}
});


btcstats.min(function(error, resp){
	if (!error) {
		console.log("\n min: ");
		console.log(resp);
	}
});


btcstats.max(function(error, resp){
	if (!error) {
		console.log("\n max: ");
		console.log(resp);
	}
});


btcstats.minVolume(function(error, resp){
	if (!error) {
		console.log("\n minVolume: ");
		console.log(resp);
	}
});


btcstats.maxVolume(function(error, resp){
	if (!error) {
		console.log("\n maxVolume: ");
		console.log(resp);
	}
});


btcstats.minSpread(function(error, resp){
	if (!error) {
		console.log("\n minSpread: ");
		console.log(resp);
	}
});


btcstats.maxSpread(function(error, resp){
	if (!error) {
		console.log("\n maxSpread: ");
		console.log(resp);
	}
});


btcstats.exchangeMinSpread(function(error, resp){
	if (!error) {
		console.log("\n exchangeMinSpread: ");
		console.log(resp);
	}
});


btcstats.exchangeMaxSpread(function(error, resp){
	if (!error) {
		console.log("\n exchangeMaxSpread: ");
		console.log(resp);
	}
});


////TODO: think of function name to differentiate the 
////   -exchange with highest ask vs exchange with lowest bid
////   vs
////   -exchange within the list (all exchanges) with the highest ask vs lowest bid
//
////across all exchanges (example - the spread difference across all exchanges, return highest ask, lowest bid)
////btcstats.maxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}
////btcstats.minSpread		// {spread: xx, ask: xx (low) , bid: xx (high), askExchange: xx, bidExchange: xx}
//
////across single exchanges  (example the exchange with the max spread)
////btcstats.exchangeMaxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}
////btcstats.exchangeMinSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}
//
