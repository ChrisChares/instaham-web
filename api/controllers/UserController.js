/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	login: function(req, res) {
		var uuid = req.param('uuid');

		User.find({uuid: uuid}).
		then(function(users) {
			if ( users.length === 0 ) {
				return User.create({uuid: uuid});
			} else {
				return users[0];
			}
		}).
		then(function(user) {
			sails.log.info('Logged in user ' + user);
			req.session.user = user;
			res.json(user);
		}).catch(res.serverError);
	},
};

