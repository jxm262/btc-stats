/**
 * Example running ticker calculations on 2 exchanges (bitfinex & bitstamp)
 */

"use strict";

var btcstats = require("../lib/btcstats");

btcstats.exchanges(['bitfinex', 'bitstamp', 'okcoin']);

btcstats.avg(function(error, resp){
	console.log("avg: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.weightedAvg(function(error, resp){
	console.log("weightedAvg: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.min(function(error, resp){
	console.log("min");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.max(function(error, resp){
	console.log("max: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.minVolume(function(error, resp){
	console.log("minVolume: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.maxVolume(function(error, resp){
	console.log("maxVolume: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.minSpread(function(error, resp){
	console.log("minSpread: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.maxSpread(function(error, resp){
	console.log("maxSpread: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.exchangeMinSpread(function(error, resp){
	console.log("maxSpread: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
		console.log(resp);
	}
});

btcstats.exchangeMaxSpread(function(error, resp){
	console.log("maxSpread: ");
	
	if(error){
		console.log("errror: " + error);
	} else {
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
//btcstats.exchangeMaxSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}
//btcstats.exchangeMinSpread		// {spread: xx, ask: xx (low) , bid: xx (high), exchange: xx}

