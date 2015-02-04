/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	like: {
      type: 'integer',
      defaultsTo: 0
    },
    dislike: {
      type: 'integer',
      defaultsTo: 0
    },
    score: {
      type: 'integer',
      defaultsTo: 0
    },
  	ham: {
  		model: 'ham',
      required: true
  	},
  	user: {
  		model: 'user',
      required: true
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

