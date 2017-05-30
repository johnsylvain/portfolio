var router = require('./utils/router');
var events = require('./utils/events');

var controller = require('./controller');
var resumeContentView = require('./views/resumeContentView');
var consoleView = require('./views/consoleView');
var view = require('./views/mainView');

var app = {
	pageWidth: window.innerWidth,
	breakpoint: 768,
	interactiveMode: false,

	init: function(){
		var _this = this;
		controller.init();
		router.init();

		window.addEventListener('keyup', this.handleKeypress.bind(this));

		Array.from(document.getElementsByClassName('toggle-btn')).forEach(function(btn) {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				router.exec({route: e.target.href});
			});
		});

		window.addEventListener('resize', function(event) {
			if(window.innerWidth <= _this.breakpoint) {
				router.exec({route: '#/'});
			}
		});

		events.on('switchModes', function(data) {
			_this.switchModes(data.flag);
		})

	},
	handleKeypress: function(e) {
		var availableKeys = controller.getKeyCommands();
		var keyPress = availableKeys.filter(function(key) {
			if(key.shortcut){
				return key.code === e.which && e[key.shortcut];
			} else if (!key.shourcut){
				return key.code === e.which;
			}
		})[0]

		if(keyPress) { controller.executeKeypress(keyPress.action); }
	},

	switchModes: function(flag) {
		var btn = document.getElementById('toggle-interactive');

		var targets = [
			document.getElementById('page-wrap'),
			document.getElementById('landing-wrapper'),
			document.getElementById('resume-wrapper'),
			document.getElementById('console-wrapper'),
			document.getElementById('container'),
			document.getElementById('toggle-interactive')
		];

		if (flag){
			targets.forEach(function(t) {
				t.classList.remove('interactiveMode');
				t.classList.add('nonInteractiveMode');
			});
			this.interactiveMode = false;
			btn.setAttribute('href', '#/resume');
			return;
		}
		if (!this.interactiveMode) {
			targets.forEach(function(t) {
				t.classList.add('interactiveMode');
				t.classList.remove('nonInteractiveMode');
			})
			btn.setAttribute('href', '#/');
		} else {
			targets.forEach(function(t) {
				t.classList.remove('interactiveMode');
				t.classList.add('nonInteractiveMode');
			})
			btn.setAttribute('href', '#/resume');

		}
		this.interactiveMode = !this.interactiveMode;
	}
};

app.init();
