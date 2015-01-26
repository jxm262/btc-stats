"use strict";

var xchange = require("xchange.js")
	,async = require("async")
	,config = require("../config.js");

function BtcStats(exchanges){
	this.exchanges(exchanges);
}

BtcStats.prototype.exchanges = function(excs) {
	excs = excs || config.defaultExchanges;
	
	this._exchanges = excs.reduce(function(exchange, name, idx){
		exchange[name] = xchange[name].ticker;
		return exchange;
	}, {});
};

function tickersResp(callback) {
	async.map(Object.keys(this._exchanges), function(item, cb){
		xchange[item].ticker(function(error, resp){
			resp.ticker = item;
			return cb(error, resp);
		});
	}, callback);
}

function midpoint(a) {
	return (a.ask + a.bid) / 2;
}

BtcStats.prototype.avg = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var res = resp.reduce(function(a, b){
		    	return {
		    		price: a.price + midpoint(b)   		
		    	};
		    }, {price: 0});
			
		    res.price = (res.price / resp.length).toFixed(2);
		    callback(null, res);
		}
	});
};

BtcStats.prototype.weightedAvg = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var totalVol = resp.reduce(function(a, b){
				return a + ((b.volume) ? b.volume : 0);
			}, 0);

			var res = resp.reduce(function(a, b){
				return {
					price: a.price + midpoint(b) * ((b.volume) ? b.volume : 0) / totalVol 	    		
				};
			}, {price: 0});
		
			res.price = (res.price).toFixed(2);
		    callback(null, res);
		}
	});	
};

BtcStats.prototype.min = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var min = resp.reduce(function(a, b){
				return (midpoint(a) < midpoint(b)) ? a : b;
			});
			
			callback(null, {price: midpoint(min).toFixed(2), exchange: min.ticker});
		}
	});
};

BtcStats.prototype.max = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var max = resp.reduce(function(a, b){
				return (midpoint(a) > midpoint(b)) ? a : b;
			});
			
			callback(null, {price: midpoint(max).toFixed(2), exchange: max.ticker});
		}
	});
};

BtcStats.prototype.minVolume = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var min = resp.reduce(function(a, b){
				return (a.volume < b.volume) ? a : b;
			});
			
			callback(null, {volume: (min.volume).toFixed(2), exchange: min.ticker});
		}
	});
};

BtcStats.prototype.maxVolume = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var max = resp.reduce(function(a, b){
				return (a.volume > b.volume) ? a : b;
			});
			
			callback(null, {volume: (max.volume).toFixed(2), exchange: max.ticker});
		}
	});
};

BtcStats.prototype.maxSpread = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var min = resp.reduce(function(a, b){
				return (a.bid < b.bid) ? a : b;
			});
			
			var max = resp.reduce(function(a, b){
				return (a.ask > b.ask) ? a : b;
			});
			
			var spread = {spread: (max.ask - min.bid).toFixed(2), 
						  bid: min.bid, 
						  ask: max.ask, 
						  bidExchange: min.ticker, 
						  askExchange: max.ticker};
			
			callback(null, spread);
		}
	});
};

BtcStats.prototype.minSpread = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var max = resp.reduce(function(a, b){
				return (a.bid > b.bid) ? a : b;
			});
			
			var min = resp.reduce(function(a, b){
				return (a.ask < b.ask) ? a : b;
			});
			
			var spread = {spread: (min.ask - max.bid).toFixed(2), 
					bid: max.bid, 
					ask: min.ask, 
					bidExchange: max.ticker, 
					askExchange: min.ticker};
			
			callback(null, spread);
		}
	});
};

BtcStats.prototype.exchangeMaxSpread = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var max = resp.reduce(function(a, b){
				return ((a.ask - a.bid) > (b.ask - b.bid)) ? a : b;
			});
			
			var spread = {spread: (max.ask - max.bid).toFixed(2), 
					bid: max.bid, 
					ask: max.ask, 
					exchange: max.ticker};
			
			callback(null, spread);
		}
	});
};

BtcStats.prototype.exchangeMinSpread = function(callback) {
	tickersResp.call(this, function(err, resp){
		if(err){
			callback(err);
		} else {
			var min = resp.reduce(function(a, b){
				return ((a.ask - a.bid) < (b.ask - b.bid)) ? a : b;
			});
			
			var spread = {spread: (min.ask - min.bid).toFixed(2), 
					bid: min.bid, 
					ask: min.ask, 
					exchange: min.ticker};
			
			callback(null, spread);
		}
	});
};

module.exports = new BtcStats();