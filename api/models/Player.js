/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	//created via [NSUUID uuid]
    id: {
      type: 'integer',
      autoIncrement: 'true',
      unique: 'true',
      primaryKey: 'true',
    },
  	uuid: {
  		type: 'string',
  		unique: true
  	},

  	votes: {
  		collection: 'vote',
  		via: 'player'
  	},

  	hams: {
  		collection: 'ham',
  		via: 'poster'
  	}
  },

  populatedPlayer: function(player, cb) {

    // User.query()
  }

};

