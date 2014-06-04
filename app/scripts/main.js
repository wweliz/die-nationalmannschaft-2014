"use strict";

var aModel = Backbone.Model.extend({
	idAttribute: '_id',
});

var aCollection = Backbone.Collection.extend({
	model: Mod,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/whitneytodoapp',
});

var aView = Backbone.View.extend({
  aTemplate: _.template($('.script-class-name').text()),

  events: {
    //
  },

	initialize: function(){
		//
  },

	render: function(){
		//
  },

  //other functions
});