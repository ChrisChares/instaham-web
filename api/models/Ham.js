/**
* Ham.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    latitude: {
      type: 'float'
    },

    longitude: {
      type: 'float'
    },

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
  	},
    location: function() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    },
    toJSON: function() {
      var obj = this.toObject();
      obj.location = this.location();
      return obj;
    }

  },

  generate: function(ham, cb) {
    var _ = require('lodash');
    
    Ham.findOne(ham).
    populate('votes')
    then(function(ham) {
      return _.reduce(ham.votes, function(sum, next) {
        sum.likes + next.likes;
        sum.dislikes + next.dislikes;
        sum.score = sum.likes - sum.dislikes;
      }, {likes: 0, dislikes: 0, score: 0});

    }).then(function(updatedHam) {
      cb(updatedHam);
    });
  }
};

