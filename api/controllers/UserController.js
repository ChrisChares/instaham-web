/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	login: function(req, res) {
		var uuid = req.param('uuid');

		User.find({'uuid': uuid}).
		then(function(users) {
			if ( users.length === 0 ) {
				sails.log.info('Creating new user ' + uuid);
				return User.create({uuid: uuid});
			} else {
				sails.log.info(users);
				return users[0];
			}
		}).
		then(function(user) {
			sails.log.info('Logged in user ' + user.uuid);
			req.session.user = user;
			res.json(user);
		}).catch(res.serverError);
	},
};

