/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	//created via [NSUUID uuid]
  	uuid: {
  		type: 'string',
  		primaryKey: true,
  		unique: true
  	},

  	votes: {
  		collection: 'vote',
  		via: 'user'
  	},

  	hams: {
  		collection: 'ham',
  		via: 'poster'
  	}
  },

  populatedUser: function(user, cb) {

    // User.query()
  }

};

