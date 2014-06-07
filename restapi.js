'use strict';

(function() {

	//---------------
	// Internals
	//---------------
	var version = 'v1';
	var DYDRA_API_KEY = '8YRg8aFMcd6oPC6VKQEt';
	var DYDRA_ACCOUNT_ID = 'erikxiv';

	//---------------
	// Module exports
	//---------------
    module.exports = {
		REPOSITORIES: '/rest/' + version + '/repositories',
		STATEMENTS: '/rest/' + version + '/statements',
		NAMESPACES: '/rest/' + version + '/namespaces',
		DYDRA_ACCOUNT_ID: DYDRA_ACCOUNT_ID,
		DYDRA_API_KEY: DYDRA_API_KEY,
		DYDRA_REST_API_URL: 'http://'+DYDRA_API_KEY+'@dydra.com'
		// DYDRA_REST_API_URL: 'http://'+DYDRA_API_KEY+'@localhost:4505'
	};
}());