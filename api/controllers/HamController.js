/**
 * HamController
 *
 * @description :: Server-side logic for managing hams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	topHam: function(req, res) {
		
		Ham.
		find().
		limit(50).
		then(function(hams) {
			res.json(hams);
		});
	},

	freshHam: function(req, res) {
		
		Ham.
		find().
		limit(50).
		then(function(hams) {
			res.json(hams);
		});
	},

	createHam: function(req, res) {

		Ham.
		create().
		then(function(ham) {
			res.json(ham);
		});

	}


};

