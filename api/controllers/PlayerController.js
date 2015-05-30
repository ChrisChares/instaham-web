/**
 * UserController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	login: function(req, res) {
		var uuid = req.param('uuid');

		User.find({'uuid': uuid}).
		then(function(players) {
			if ( players.length === 0 ) {
				sails.log.info('Creating new player ' + uuid);
				return User.create({uuid: uuid});
			} else {
				sails.log.info(players);
				return players[0];
			}
		}).
		then(function(player) {
			sails.log.info('Logged in player ' + player.id);
			req.session.player = player.id;
			res.json(player);
		}).catch(res.serverError);
	},
};

