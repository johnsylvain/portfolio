var controller = require('../controller');
var events = require('../utils/events');

events.on('consoleViewInit', function(data) {
  consoleView.init();
});

events.on('consoleViewRender', function(data) {
  consoleView.render();
});

var consoleView = {
	init: function(){
		var _this = this;

		this.promptElem = document.getElementById('command-prompt');
		this.prevElem = document.getElementById('commands');
		this.fileNameElem = document.getElementById('file-name');

		this.consoleElem = document.getElementById('console');
		this.commandInput = document.getElementById('command-input');
		this.commandInput.focus();

		this.consoleElem.addEventListener('click', function(){
			_this.commandInput.focus();
		})

		this.promptElem.addEventListener('submit', function(e){
			e.preventDefault();
			var command = e.target.prompt.value;
			e.target.prompt.value = '';
			controller.enterCommand(command);
		})
		this.render();
	},

	render: function(){
		var _this = this;

		this.prevElem.innerHTML = '';
		var commands = controller.getPreviousCommands();

		this.fileNameElem.textContent = controller.getFileName();

		this.consoleElem.scrollTop = this.consoleElem.scrollHeight;

		if (controller.getEnteredCommands()) {
			this.commandInput.value = controller.getEnteredCommands().text;
		} else {
			this.commandInput.value = '';
		}

		commands.forEach(function(command, i) {
			var elem = document.createElement('li');

			if (command.type === 'command') {
				elem.textContent = '$ ' + command.text;
			} else if(command.type === 'error'){
				elem.textContent = command.text;
				elem.className = 'commandError';
			} else if(command.type === 'response'){
				elem.textContent = command.text;
				elem.className = 'commandResponse';
			} else if(command.type === 'response-bold'){
				elem.textContent = command.text;
				elem.className = 'commandResponseBold';
			} else if(command.type === 'warning'){
				elem.textContent = command.text;
				elem.className = 'commandWarning';
			}

			_this.prevElem.appendChild(elem);

		})


	}
}

module.exports = consoleView;
