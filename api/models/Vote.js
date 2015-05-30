/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    score: {
      type: 'integer',
      defaultsTo: 0
    },
  	ham: {
  		model: 'ham',
      required: true
  	},
  	player: {
  		model: 'player',
      required: true
  	}
  },
};

