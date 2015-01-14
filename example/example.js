/**
 * Example running ticker calculations on 2 exchanges (bitfinex & bitstamp)
 */

"use strict";

var btcstats = require("../lib/btcstats");

btcstats.exchanges(['bitfinex', 'bitstamp']);

btcstats.avg(function(error, resp){
	if(!error){
		console.log(resp);
	}
});