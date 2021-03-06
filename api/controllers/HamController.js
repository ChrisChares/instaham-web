/**
 * HamController
 *
 * @description :: Server-side logic for managing hams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


function addValuesToHams(hams, player) {
	var calculated = _.map(hams, function(ham) {
		
		ham.score = scoreForHam(ham);
		ham.myVote = addMyVoteToHam(ham, player);
		delete(ham.votes);
		return ham;
	});
	return calculated;
};

function scoreForHam(ham) {
	return _.reduce(ham.votes, function(sum, next) {
		  sum += next;
		  return sum;
	}, 0);
};

function addMyVoteToHam(ham, player) {

	var myVote = _.find(ham.votes, function(vote) {
		return vote.player === player;
	});

	return myVote;
};




module.exports = {
	
	topHam: function(req, res) {
		var _ = require('lodash');

		Ham.
		find().
		populate('votes').
		limit(50).
		then(function(hams) {
			var updatedHams = addValuesToHams(hams, req.session.player);
			updatedHams = _.sortBy(updatedHams, function(ham) {
				return -ham.score;
			});
			res.json(updatedHams);		
		});
	},

	freshHam: function(req, res) {
		
		Ham.
		find({sort: 'createdAt DESC'}).
		populate('votes').
		limit(50).
		then(function(hams) {
			res.json(addValuesToHams(hams, req.session.player));		
		});
	},

	upvote: function(req, res) {

		if ( ! req.session.player ) {
			return res.badRequest('Login first');
		}
		var id = req.param('id');
		Ham.findOne(id).
		then(function(ham) {

			if ( ! ham ) {
				return badRequest('Ham not found');
			}
			sails.log.info(ham);

			Vote.find({
				'player':req.session.player,
				'ham': ham.id
			}).then(function(votes) {
				if ( votes.length === 0 ) {
					sails.log.info('creating new feedback');
					return Vote.create({
						'player':req.session.player,
						'ham': ham.id,
						'score': 1
					}).then(function(vote) {
						return res.json(vote);
					});
				} else {
					sails.log.info('updating existing feedback');
					return Vote.update({
						'player':req.session.player,
						'ham': ham.id,
						
					}, {'score': 1}).
					then(function(votes) {
						return res.json(votes[0]);
					});
				}
			});
		}).
		catch(function(error) {
			res.badRequest(error);
		});
	},

	closest: function(req, res) {
		var count = req.param('count');
		var lat = req.param('latitude');
		var lon = req.param('longitude');

		Ham.
		find({sort: 'createdAt DESC'}).
		populate('votes').
		limit(50).
		then(function(hams) {
			res.json(addValuesToHams(hams, req.session.player));		
		});
	},


	downvote: function(req, res) {
				if ( ! req.session.player ) {
			return res.badRequest('Login first');
		}
		var id = req.param('id');
		Ham.findOne(id).
		then(function(ham) {

			if ( ! ham ) {
				return badRequest('Ham not found');
			}
			sails.log.info(ham);

			Vote.find({
				'player':req.session.player,
				'ham': ham.id
			}).then(function(votes) {
				if ( votes.length === 0 ) {
					sails.log.info('creating new feedback');
					return Vote.create({
						'player':req.session.player,
						'ham': ham.id,
						'score': -1
					}).then(function(vote) {
						return res.json(vote);
					});
				} else {
					sails.log.info('updating existing feedback');
					return Vote.update({
						'player':req.session.player,
						'ham': ham.id,
						
					}, {'score': -1}).
					then(function(votes) {
						return res.json(votes[0]);
					});
				}
			});
		}).
		catch(function(error) {
			res.badRequest(error);
		});
	}

};

