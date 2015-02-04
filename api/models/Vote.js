/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	like: 'integer',
  	dislike: 'integer',
  	score: 'integer',
  	ham: {
  		model: 'ham'
  	},
  	user: {
  		model: 'user'
  	}
  },

  beforeCreate: function(values, cb) {
  	values.score = values.like - values.dislike;
  	cb();
  },

  beforeUpdate: function(values, cb) {
  	values.score = values.like - values.dislike;
  	cb();
  }
};

