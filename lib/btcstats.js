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

function midpoint(a) {
	return (parseFloat(a.ask) + parseFloat(a.bid)) / 2;
}

BtcStats.prototype.avg = function(callback) {
	var _tickers = tickers.call(this);
	
	async.parallel(_tickers, function(err, results){
		
		    var res = results.reduce(function(a, b){
		    	return {
		    		price: midpoint(a) + midpoint(b)   		
		    	}
		    });
		
		    res.price /= _tickers.length.toFixed(2);
		    
		    if(err){
		    	callback(err);
		    } else{
		    	callback(null, res);
		    }
	});
}

BtcStats.prototype.weightedAvg = function(callback) {
	var _tickers = tickers.call(this);
	
	async.parallel(_tickers, function(err, results){

		var totalVol = results.reduce(function(a, b){
			return parseFloat(a) + parseFloat(b.volume);
		}, 0);
		
		var res = results.reduce(function(a, b){
			return {
				price: a.price + midpoint(b) * parseFloat(b.volume) / totalVol 	    		
			}
		}, {price: 0});
		
		if(err){
			callback(err);
		} else{
			callback(null, res);
		}
	});
}

function tickersResp(callback) {
	async.map(Object.keys(this._exchanges), function(item, cb){
		xchange[item].ticker(function(error, resp){
			resp.ticker = item;
			return cb(error, resp);
		});
	}, callback);
}

BtcStats.prototype.min = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var min = resp.reduce(function(a, b){
				return (midpoint(a) < midpoint(b)) ? a : b;
			});
			callback(null, {price: midpoint(min), exchange: min.ticker});
		}
	});
}

module.exports = new BtcStats();