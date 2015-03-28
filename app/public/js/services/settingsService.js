'use strict';

// NPM Required
var Datastore 	= require('nedb'); // DOCS : https://github.com/louischatriot/
var path 		= require('path');
var db 			= new Datastore({ filename: path.join(require('nw.gui').App.dataPath, 'settings.db'), 'autoload': true });

daw.service('settingsService', function($q){

	var that = this;

	/*
	 * init StoreDB
	 */
	that.init = function() {

		db.count({}, function(err, count) {

			// If settings is null, we create it with default Value
			if(count == 0) {
				db.insert({
					'autoplay'	: false,
					'player'	: null,
					'language'	: 'fr'
				});
			}

		});

	};

	/*
	 * Get Value from Database
	 *
	 * Usage : get('player').then(function(){})
	 */
	that.get = function(key) {

		var deferred = $q.defer();

		db.find({}, function(err, result) {
			deferred.resolve(result[0][key]);
		});

		return deferred.promise;
		
	};

	/*
	 * Set Value in Database
	 */
	that.set = function(key, value) {
		// TODO Do stuff
	};

});