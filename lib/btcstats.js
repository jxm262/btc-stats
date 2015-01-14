"use strict";

var xchange = require("xchange.js")
	,async = require("async");

function BtcStats(exchanges){
	this.exchanges(exchanges);
}

BtcStats.prototype.exchanges = function(excs) {
	this._exchanges = excs || Object.keys(xchange);
}

BtcStats.prototype.avg = function(callback) {
	var tickers = [];
	var exchanges = this._exchanges;
	
	for (var key in exchanges){
		tickers.push(xchange[exchanges[key]].ticker);
	}
	
	async.parallel(tickers,
	    function(err, results){
		
		    var res = results.reduce(function(a, b){
		    	return {
		    		bid: parseFloat(a.bid) + parseFloat(b.bid),
		    		ask: parseFloat(a.ask) + parseFloat(b.ask),
		    		low: parseFloat(a.low) + parseFloat(b.low),
		    		high: parseFloat(a.high) + parseFloat(b.high),
		    		volume: parseFloat(a.volume) + parseFloat(b.volume),
		    		timestamp: parseFloat(a.timestamp) + parseFloat(b.timestamp)
		    	}
		    });
		
		    for(var key in res){
		    	res[key] /= tickers.length;
		    }
		
		    callback(err, res);
	});
}

module.exports = new BtcStats();