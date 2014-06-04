'use strict';

var ImgModel = Backbone.Model.extend({
	idAttribute: '_id',
});

var ImgCollection = Backbone.Collection.extend({
	model: ImgModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/die-nationalmannschaft',
});

var ImgView = Backbone.View.extend({
  viewTemplate: _.template($('.players').text()),

  events: {
    //
  },

  initialize: function(){
    $('.main-container').prepend(this.el);
    this.render();
  },

	render: function(){
		var renderedTemplate = this.viewTemplate(this.model.attributes);
    this.$el.html(renderedTemplate);
  }
});


var AppView = Backbone.View.extend({
	initialize: function(){

		this.listenTo(anImgCollection, 'add', function(image){
			new ImgView({model: image})
		});

	}
})

var anImgCollection = new ImgCollection();

var cool = new AppView();

//fetches anImgCollection instance from the server; when done...
anImgCollection.fetch()