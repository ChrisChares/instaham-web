/**
* Ham.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	imageURL: {
  		type: 'string'
  	},

    votes: {
      collection: 'vote',
      via: 'ham'
    },

    poster: {
      model: 'user'
    },



  	refreshScore: function() {
  		this.score = this.likes - this.dislikes;
  	}
  },
};

