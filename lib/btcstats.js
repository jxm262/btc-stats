"use strict";

var xchange = require("xchange.js")
	,async = require("async");

function BtcStats(exchanges){
	this.exchanges(exchanges);
}

BtcStats.prototype.exchanges = function(excs) {
	excs = excs || Object.keys(xchange);

	this._exchanges = excs.reduce(function(exchange, name, idx){
		exchange[name] = xchange[name].ticker;
		return exchange;
	}, {});
}

function tickers() {
	var _tickers = [];
	var exchanges = this._exchanges;
	
	for (var exchange in this._exchanges){
		_tickers.push(this._exchanges[exchange]);
	}
	
	return _tickers;
}

BtcStats.prototype.avg = function(callback) {
	var _tickers = tickers.call(this);
	
	async.parallel(_tickers,
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
		    	res[key] /= _tickers.length;
		    }
		    
		    if(err){
		    	callback(err);
		    } else{
		    	callback(null, res);
		    }
	});
}

module.exports = new BtcStats();