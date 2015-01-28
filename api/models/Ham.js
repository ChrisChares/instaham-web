/**
* Ham.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	likes: {
  		type: 'integer',
  		defaultsTo: 0
  	},
  	dislikes: {
  		type: 'integer',
  		defaultsTo: 0
  	},
  	imageURL: {
  		type: 'string'
  	},

  	score: function() {
  		return likes - dislikes;
  	}
  }
};

