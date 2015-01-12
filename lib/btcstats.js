"use strict";

var xchange = require("xchange.js");

function BtcStats(exchanges){
	this.exchanges(exchanges);
}

BtcStats.prototype.exchanges = function(excs) {
	this._exchanges = excs || Object.keys(xchange);
}

//BtcStats.prototype.avg = function() {
//
//}

module.exports = new BtcStats();