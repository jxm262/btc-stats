"use strict";

var btcstats = require("../lib/btcstats.js")
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
	
});
