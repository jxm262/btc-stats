"use strict";

var btcstats = require("../lib/btc-stats.js")
	,xchange = require("xchange.js")
	,async = require("async")
	,assert = require("assert")
	,chai = require("chai")
	,sinon = require("sinon")
	,sinonChai = require("sinon-chai")
	,should = chai.should()
	,expect = chai.expect;

chai.use(sinonChai);

describe("btcstats.js", function(){
	
	describe("_exchange prop", function(){
		it("exchanges should contain all xchange listing by default", function(){
			Object.keys(btcstats._exchanges).should.eql(["bitfinex", "bitstamp", "okcoin", "btce", "bter", "hitbtc", "ccex"]);
		});
		
		it("exchanges should contain exchanges input by user if provided (subset of xchange listing)", function(){
			btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);
			Object.keys(btcstats._exchanges).should.eql(["bitfinex", "bitstamp", "okcoin"]);
		});
	});
	
	describe("avg function", function(){
		it("should retrieve the average ticker price across exchanges", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			this.stub(xchange.okcoin, "ticker").yields(null, {"bid": 10, "ask": 20, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "okcoin"});

			btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);
			btcstats.avg(callback);
			
			callback.should.have.been.calledWith(null, {"price": "25.00"});
		}));
	});	
	
	describe("weightedAvg function", function(){
		it("should retrieve the average ticker price weighted by volume", sinon.test(function(){
			var callback = sinon.spy();
			var response = 
				[{"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1}
				,{"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1}
				,{"bid": 40, "ask": 50, "low": 1, "high": 1, "volume": 50, "timestamp": 1}];
			
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			this.stub(xchange.okcoin, "ticker").yields(null, {"bid": 40, "ask": 50, "low": 1, "high": 1, "volume": 50, "timestamp": 1, "ticker": "okcoin"});
			
			btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);
			btcstats.weightedAvg(callback);
			
			//(25 * .2) + (35 * .3) + (45 * .5) = 38
			callback.should.have.been.calledWith(null, {"price": "38.00"});
		}));
	});	
	
	describe("min function", function(){
		
		it("should retrieve the min ticker price and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.min(callback);
			
			callback.should.have.been.calledWith(null, {price: "25.00", exchange: "bitfinex"});
		}));
	});
	
	describe("max function", function(){
		
		it("should retrieve the max ticker price and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.max(callback);
			
			callback.should.have.been.calledWith(null, {price: "35.00", exchange: "bitstamp"});
		}));
	});	
	
	describe("minVolume function", function(){
		
		it("should retrieve the minimum volume and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 200, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 300, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.minVolume(callback);
			
			callback.should.have.been.calledWith(null, {volume: "200.00", exchange: "bitfinex"});
		}));
	});	
	
	describe("maxVolume function", function(){
		
		it("should retrieve the maximum volume and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 200, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 300, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.maxVolume(callback);
			
			callback.should.have.been.calledWith(null, {volume: "300.00", exchange: "bitstamp"});
		}));
	});	
	
	describe("maxSpread function", function(){
		
		it("should retrieve the max spread, ask, bid, and associated exchanges", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.maxSpread(callback);
			
			callback.should.have.been.calledWith(null, {spread: "20.00", bid: 20, ask: 40, bidExchange: "bitfinex", askExchange: "bitstamp"});
		}));
	});	
	
	describe("minSpread function", function(){
		
		it("should retrieve the min spread, ask, bid, and associated exchanges", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			this.stub(xchange.okcoin, "ticker").yields(null, {"bid": 40, "ask": 50, "low": 1, "high": 1, "volume": 50, "timestamp": 1, "ticker": "okcoin"});
			
			btcstats.exchanges(["bitfinex", "bitstamp", "okcoin"]);
			btcstats.minSpread(callback);
			
			callback.should.have.been.calledWith(null, {spread: "-10.00", bid: 40, ask: 30, bidExchange: "okcoin", askExchange: "bitfinex"});
		}));
	});	
	
	describe("exchangeMaxSpread function", function(){
		
		it("should retrieve the max spread, ask, bid, and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 25, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.exchangeMaxSpread(callback);
			
			callback.should.have.been.calledWith(null, {spread: "10.00", bid: 30, ask: 40, exchange: "bitstamp"});
		}));
	});	
	
	describe("exchangeMinSpread function", function(){
		
		it("should retrieve the max spread, ask, bid, and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 25, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.exchangeMinSpread(callback);
			
			callback.should.have.been.calledWith(null, {spread: "5.00", bid: 25, ask: 30, exchange: "bitfinex"});
		}));
	});	
});
