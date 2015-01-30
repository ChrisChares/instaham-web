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
		find({sort: 'createdAt DESC'}).
		then(function(hams) {
			res.json(hams);
		}).catch(badRequest);
	},

	upvote: function(req, res) {
		var id = req.param('id');
		Ham.findOne(id).
		then(function(ham) {
			ham.likes ++;
			ham.refreshScore();
			ham.save(function() {
				res.json(ham);
			});
		}).
		catch(res.badRequest);
	},

	downvote: function(req, res) {
		var id = req.param('id');
		Ham.findOne(id).
		then(function(ham) {
			ham.dislikes ++;
			ham.refreshScore();
			ham.save(function(updated) {
				res.json(ham);
			});
		}).
		catch(res.badRequest);
	}

};

