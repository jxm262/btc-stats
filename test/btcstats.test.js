"use strict";

var btcstats = require("../lib/btcstats.js")
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
			Object.keys(btcstats._exchanges).should.eql(['bitfinex', 'bitstamp', 'okcoin', 'btce', 'btc38', 'bter', 'hitbtc', 'ccex', 'Xchange']);
		});
		
		it("exchanges should contain exchanges input by user if provided (subset of xchange listing)", function(){
			btcstats.exchanges(['bitfinex', 'bitstamp', 'okcoin']);
			Object.keys(btcstats._exchanges).should.eql(['bitfinex', 'bitstamp', 'okcoin']);
		});
	});
	
	describe("avg function", function(){
		
		it("should retrieve the average ticker price across exchanges", sinon.test(function(){
			var callback = sinon.spy();
			var response = [{"bid": 20, "ask": 30, "low": 1, "high": 1, "volume": 1, "timestamp": 1}
							,{"bid": 30, "ask": 40, "low": 1, "high": 1, "volume": 1, "timestamp": 1}];

			this.stub(async, "parallel").yields(null, response);
			
			btcstats.exchanges(['bitfinex', 'bitstamp']);
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
			
			this.stub(async, "parallel").yields(null, response);
			
			btcstats.exchanges(['bitfinex', 'bitstamp']);
			btcstats.weightedAvg(callback);
			
			//(25 * .2) + (35 * .3) + (45 * .5) = 38
			callback.should.have.been.calledWith(null, {"price": 38});
		}));
	});	
	
});
