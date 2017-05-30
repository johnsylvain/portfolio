var controller = require('../controller');
var events = require('../utils/events');
var filters = require('../utils/filters');


events.on('resumeContentViewInit', function(data) {
	resumeContentView.init();
})
events.on('resumeContentViewRender', function(data) {
	resumeContentView.render();
})

var resumeContentView = {
	init: function(){
		this.resumeContainerElem = document.getElementById('resume-code');
		this.render();
	},

	render: function(){
		var data = controller.getCurrentOutput();
		var json = filters.textToJSON(JSON.stringify(data,null,'   '));
		json = filters.findUrls(json);
		this.resumeContainerElem.innerHTML = json;
	}
}

module.exports = resumeContentView;
