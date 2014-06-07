//---------------------------------------------------------------------------
// REST Interface
// Provides the interface towards the RDF repository
//---------------------------------------------------------------------------
(function() {
	'use strict';
	//-------------
	// Dependencies
	//-------------
	var restify = require('restify');
	var restapi = require('./restapi');

	//-----------------------------------
	// Internal functions
	//-----------------------------------

	function sendRestResponse(req, res, next, err, response, wrapperName) {
		if (! err) {
			res.send(response);
			return next();
		}
		else {
			console.log(err);
			console.log(response);
			return next(err);
		}
	}

	//------------
	// Constructor
	//------------	
	var create = function(config) {
		//------------------------------
		// Initialize the REST interface
		//------------------------------
		var server = restify.createServer();
		server.use(restify.queryParser());
		server.use(restify.bodyParser({ mapParams: false }));

		//------------------------------
		// Initialize the Dydra client
		//------------------------------
		var client = restify.createJsonClient({
		  url: restapi.DYDRA_REST_API_URL,
		  version: '*'
		});
		var client0 = restify.createJsonClient({
		  url: restapi.DYDRA_REST_API_URL,
		  version: '*',
		  headers: {'content-length': 0}
		});
		
		//------------------------
		// Repository Interface
		//------------------------

		// Get repositories
		server.get(restapi.REPOSITORIES, function(req, res, next){
			console.log('GET ' + req.path());
			client.get('/'+restapi.DYDRA_ACCOUNT_ID+'/repositories', function(err, jreq, jres, obj) {
				sendRestResponse(req, res, next, err, obj);
			});
		});

		// Create repository
		server.post(restapi.REPOSITORIES, function(req, res, next){
			console.log('POST ' + req.path());
			console.log(restapi.DYDRA_REST_API_URL+'/'+restapi.DYDRA_ACCOUNT_ID+'/repositories');
			console.log(req.body);
			client.post('/'+restapi.DYDRA_ACCOUNT_ID+'/repositories', req.body, function(err, jreq, jres, obj) {
				sendRestResponse(req, res, next, err, obj);
			});
		});

		// Delete repository
		server.del(restapi.REPOSITORIES+'/:id', function(req, res, next){
			console.log('DELETE ' + req.path());
			client0.del('/'+restapi.DYDRA_ACCOUNT_ID+'/'+req.params.id, function(err, jreq, jres, obj) {
				sendRestResponse(req, res, next, err, obj);
			});
		});

		// Get repository metadata
		server.get(restapi.REPOSITORIES+'/:id', function(req, res, next){
			console.log('GET ' + req.path());
			client.get('/'+restapi.DYDRA_ACCOUNT_ID+'/'+req.params.id+'/meta', function(err, jreq, jres, obj) {
				sendRestResponse(req, res, next, err, obj);
			});
		});

		// Update repository metadata
		server.put(restapi.REPOSITORIES+'/:id', function(req, res, next){
			console.log('PUT ' + req.path());
			client.put('/'+restapi.DYDRA_ACCOUNT_ID+'/'+req.params.id, req.body, function(err, jreq, jres, obj) {
				sendRestResponse(req, res, next, err, obj);
			});
		});


		//-------------------------
		// Start the REST interface
		//-------------------------
		server.listen(config.port, function() {
		  console.log('im-rdfrepo listening at %s', server.url);
		});

		//------------------------------------
		// Return the newly created 'instance'
		//------------------------------------
		return {};
	};

	//---------------
	// Module exports
	//---------------
    module.exports.create = function(config) {
        return create(config);
    };
}());