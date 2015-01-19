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

function tickersResp(callback) {
	async.map(Object.keys(this._exchanges), function(item, cb){
		xchange[item].ticker(function(error, resp){
			resp.ticker = item;
			return cb(error, resp);
		});
	}, callback);
}

function midpoint(a) {
	return (parseFloat(a.ask) + parseFloat(a.bid)) / 2;
}

BtcStats.prototype.avg = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var res = resp.reduce(function(a, b){
		    	return {
		    		price: midpoint(a) + midpoint(b)   		
		    	}
		    });
		
		    res.price /= resp.length.toFixed(2);
		    callback(null, res);
		}
	});
}

BtcStats.prototype.weightedAvg = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var totalVol = resp.reduce(function(a, b){
				return parseFloat(a) + parseFloat(b.volume);
			}, 0);

			var res = resp.reduce(function(a, b){
				return {
					price: a.price + midpoint(b) * parseFloat(b.volume) / totalVol 	    		
				}
			}, {price: 0});
		
		    callback(null, res);
		}
	});	
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

BtcStats.prototype.max = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var max = resp.reduce(function(a, b){
				return (midpoint(a) > midpoint(b)) ? a : b;
			});
			callback(null, {price: midpoint(max), exchange: max.ticker});
		}
	});
}

BtcStats.prototype.minVolume = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var min = resp.reduce(function(a, b){
				return (a.volume < b.volume) ? a : b;
			});
			callback(null, {price: min.volume, exchange: min.ticker});
		}
	});
}

BtcStats.prototype.maxVolume = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var max = resp.reduce(function(a, b){
				return (a.volume > b.volume) ? a : b;
			});
			callback(null, {price: max.volume, exchange: max.ticker});
		}
	});
}

BtcStats.prototype.maxSpread = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var min = resp.reduce(function(a, b){
				return (a.ask < b.ask) ? a : b;
			});
			
			var max = resp.reduce(function(a, b){
				return (a.bid > b.bid) ? a : b;
			});
			
			var spread = {spread: (parseFloat(max.ask) - parseFloat(min.bid)).toFixed(2), 
						  ask: min.ask, 
						  bid: max.bid, 
						  minExchange: min.ticker, 
						  maxExchange: max.ticker};
			
			callback(null, spread);
		}
	});
}

module.exports = new BtcStats();