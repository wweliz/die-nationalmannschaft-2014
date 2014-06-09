'use strict';

// MODEL CONSTRUCTOR ///////////////////////////////////////////////////////////////
var ImgModel = Backbone.Model.extend({
	idAttribute: '_id'
});

// COLLECTION CONSTRUCTOR //////////////////////////////////////////////////////////
var ImgCollection = Backbone.Collection.extend({
	model: ImgModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/die-mannschaft',
});

////// DETAIL VIEW CONSTRUCTOR /////////////////////////////////////////////////////
var DetailView = Backbone.View.extend({
	className: 'detail-view',

	detailTemplate: _.template($('.detail-view-template').text()),

	events: {
		'click .save-btn': 'updateModel',
		'click .new-img': 'createImage'
	},

	initialize: function(){
		this.listenTo(anImgCollection, 'add', function(image){
			new GalleryView({model: image});
		});

		this.listenTo(this.model, 'change', this.render);

		$('.detail-view').append(this.el);
		this.render();
	},

	render: function(){
		var renderedTemplate = this.detailTemplate(this.model.attributes);
		this.$el.html(renderedTemplate);
		return this;
	},

	updateModel: function(){
		this.model.set({
			name:		this.$el.find('.player-name-input').val(),
			url:		this.$el.find('.img-url-input').val()
		});

		anImgCollection.add(this.model);
		this.model.save();
	},

	createImage: function(){
		var anImageModel = new ImgModel();
		this.model = anImageModel;

		this.$el.find('input').val('');
		this.$el.find('img').attr('src',' http://placehold.it/350x400');
	}
});

////// GALLERY VIEW CONSTRUCTOR ////////////////////////////////////////////////////
var GalleryView = Backbone.View.extend({
	className : 'each-player-gallery',
	galleryTemplate: _.template($('.player-gallery').text()),

	events: {'click' : 'showDetailView'},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		$('.gallery-view').append(this.el);
		this.render();
	},

	render: function(){
		var renderedTemplate = this.galleryTemplate(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	showDetailView: function(){
		aDetailView.remove();
		aDetailView = new DetailView({model: this.model});
	}
});

////// CALLING THE BACKBONE CONSTRUCTORS ///////////////////////////////////////////

//Calling and displaying an image collection using the view models
	//creates a new collection instance
var anImgCollection = new ImgCollection();
//fetches the image collection instance from the server
anImgCollection.fetch().done(function(){
	//forEaches over the image collection instance
	anImgCollection.each(function(image){
		//creates a new gallery view using the image model
		new GalleryView({model: image});
	});

	//creates a new detail view using the first image from the image collection
  aDetailView = new DetailView({model: anImgCollection.first() });
});

//defines aDetailView so that it can be called by constructors and functions
var aDetailView;

// Giving functionality to the "New" button
	//when you click the button...
$('.new-img').click(function () {
	// var the text in the player name and image url input fields so they can be used in a chain
	var nameVal = $('.player-name-input').val();
	var imgVal = $('.img-input').val();
	//adds the input values to the collection instance
	var newestImage = anImgCollection.add({name: nameVal, url: imgVal});
	//saves that input value to the server
	newestImage.save();
	//clears the value of the player name and image url input fields
		$('.player-name-input').val('');
		$('.img-input').val('');
	//creates a new view instance with the above collection
	new DetailView({model: newestImage});
});

/////////////////////////////////////////////////