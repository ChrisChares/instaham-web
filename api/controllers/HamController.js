/**
 * HamController
 *
 * @description :: Server-side logic for managing hams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


function addValuesToHams(hams, user) {
	var calculated = _.map(hams, function(ham) {
		
		_.assign(ham, addVotesToHam(ham));
		ham.myVote = addMyVoteToHam(ham, user);
		delete(ham.votes);
		return ham;
	});
	return calculated;
};

function addVotesToHam(ham) {
	var values = _.reduce(ham.votes, function(sum, next) {
		  sum.likes += next.like;
		  sum.dislikes += next.dislike;
		  sum.score = sum.likes - sum.dislikes;
		  return sum;
	}, {likes: 0, dislikes: 0, score: 0});
	return values;
};

function addMyVoteToHam(ham, user) {

	sails.log.info('my vote is ' + user);
	var myVote = _.find(ham.votes, function(vote) {
		return vote.user === user;
	});
	sails.log.info('myvote is' + myVote);

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
			res.json(addValuesToHams(hams, req.session.user));		
		});
	},

	freshHam: function(req, res) {
		
		Ham.
		find({sort: 'createdAt DESC'}).
		populate('votes').
		limit(50).
		then(function(hams) {

			res.json(addValuesToHams(hams, req.session.user));		
		});
	},

	upvote: function(req, res) {

		if ( ! req.session.user ) {
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
				'user':req.session.user,
				'ham': ham.id
			}).then(function(votes) {
				if ( votes.length === 0 ) {
					sails.log.info('creating new feedback');
					return Vote.create({
						'user':req.session.user,
						'ham': ham.id,
						'like': 1
					}).then(function(vote) {
						return res.json(vote);
					});
				} else {
					sails.log.info('updating existing feedback');
					return Vote.update({
						'user':req.session.user,
						'ham': ham.id,
						
					}, {'like': 1, 'dislike': 0}).
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

	downvote: function(req, res) {
				if ( ! req.session.user ) {
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
				'user':req.session.user,
				'ham': ham.id
			}).then(function(votes) {
				if ( votes.length === 0 ) {
					sails.log.info('creating new feedback');
					return Vote.create({
						'user':req.session.user,
						'ham': ham.id,
						'dislike': 1
					}).then(function(vote) {
						return res.json(vote);
					});
				} else {
					sails.log.info('updating existing feedback');
					return Vote.update({
						'user':req.session.user,
						'ham': ham.id,
						
					}, {'like': 0, 'dislike': 1}).
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

