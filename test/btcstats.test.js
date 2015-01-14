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
			btcstats._exchanges.should.eql(['bitfinex', 'bitstamp', 'okcoin', 'btce', 'btc38', 'bter', 'hitbtc', 'ccex', 'Xchange']);
		});
		
		it("exchanges should contain exchanges input by user if provided (subset of xchange listing)", function(){
			btcstats.exchanges(['bitfinex', 'bitstamp', 'okcoin']);
			btcstats._exchanges.should.eql(['bitfinex', 'bitstamp', 'okcoin']);
		});
	});
	
	describe("avg function", function(){
		
		it("should retrieve the average ticker price across exchanges", sinon.test(function(){
			var callback = sinon.spy();
			var response = [{"bid": 20, "ask": 25, "low": 30, "high": 35, "volume": 40, "timestamp": 50}
							,{"bid": 30, "ask": 35, "low": 40, "high": 45, "volume": 50, "timestamp": 60}];

			this.stub(async, "parallel").yields(null, response);
			
			btcstats.exchanges(['bitfinex', 'bitstamp']);
			btcstats.avg(callback);
			
			callback.should.have.been.calledWith(null, {"bid": 25, "ask": 30, "low": 35, "high": 40, "volume": 45, "timestamp": 55});
		}));
	});	
	
});
