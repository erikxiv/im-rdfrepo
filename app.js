'use strict';
//-------------
// Dependencies
//-------------
var restinterface = require('./restinterface.js');

//-----------------------------------
// Initialize and start server process
//-----------------------------------
restinterface.create({
	port: process.env.port || 4405
});
