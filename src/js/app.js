'use strict';

var controller = require('./modules/controller');

var app = {
	pageWidth: window.innerWidth,
	breakpoint: 768,
	init: function(){
		controller.init();
		this.handleResize();
		window.addEventListener('resize', this.handleResize.bind(this));
	},
	handleResize: function(){
		this.pageWidth = window.innerWidth;
		if (this.pageWidth <= this.breakpoint) {
			controller.setMobileView();
		}
	}
}

app.init();
