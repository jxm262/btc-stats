"use strict";

var btcstats = require("../lib/btcstats.js")
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
			Object.keys(btcstats._exchanges).should.eql(["bitfinex", "bitstamp", "okcoin", "btce", "btc38", "bter", "hitbtc", "ccex", "Xchange"]);
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

			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.avg(callback);
			
			//midpoint(1st) = 25 , midpoint(2nd) = 35.  avg (25 + 35) / 2 = 30
			callback.should.have.been.calledWith(null, {"price": 30});
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
			callback.should.have.been.calledWith(null, {"price": 38});
		}));
	});	
	
	describe("min function", function(){
		
		it("should retrieve the min ticker price and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.min(callback);
			
			callback.should.have.been.calledWith(null, {price: 25, exchange: "bitfinex"});
		}));
	});
	
	describe("max function", function(){
		
		it("should retrieve the max ticker price and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.max(callback);
			
			callback.should.have.been.calledWith(null, {price: 35, exchange: "bitstamp"});
		}));
	});	
	
	describe("minVolume function", function(){
		
		it("should retrieve the minimum volume and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.minVolume(callback);
			
			callback.should.have.been.calledWith(null, {price: 20, exchange: "bitfinex"});
		}));
	});	
	
	describe("maxVolume function", function(){
		
		it("should retrieve the maximum volume and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.maxVolume(callback);
			
			callback.should.have.been.calledWith(null, {price: 30, exchange: "bitstamp"});
		}));
	});	
	
	describe("maxSpread function", function(){
		
		it("should retrieve the max spread, ask, bid, and associated exchanges", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.maxSpread(callback);
			
			callback.should.have.been.calledWith(null, {spread: (20).toFixed(2), bid: 20, ask: 40, bidExchange: "bitfinex", askExchange: "bitstamp"});
		}));
	});	
	
	describe("minSpread function", function(){
		
		it("should retrieve the min spread, ask, bid, and associated exchanges", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.minSpread(callback);
			
			callback.should.have.been.calledWith(null, {spread: (0).toFixed(2), bid: 30, ask: 30, bidExchange: "bitstamp", askExchange: "bitfinex"});
		}));
	});	
	
	describe("exchangeMaxSpread function", function(){
		
		it("should retrieve the max spread, ask, bid, and associated exchange", sinon.test(function(){
			var callback = sinon.spy();
			this.stub(xchange.bitfinex, "ticker").yields(null, {"bid": 25, "ask": 30, "low": 1, "high": 1, "volume": 20, "timestamp": 1, "ticker": "bitfinex"});
			this.stub(xchange.bitstamp, "ticker").yields(null, {"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 30, "timestamp": 1, "ticker": "bitstamp"});
			
			btcstats.exchanges(["bitfinex", "bitstamp"]);
			btcstats.exchangeMaxSpread(callback);
			
			callback.should.have.been.calledWith(null, {spread: (10).toFixed(2), bid: 30, ask: 40, exchange: "bitstamp"});
		}));
	});	
});
