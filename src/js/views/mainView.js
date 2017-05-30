var controller = require('../controller');
var events = require('../utils/events');

events.on('viewInit', function(data) {
  view.init();
})

var view = {
	init: function() {
		this.dateElem = document.getElementById('date');
    this.dateElem.innerHTML = controller.getDate();

	}
}

module.exports = view;
