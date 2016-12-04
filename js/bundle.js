(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = {
	pageWidth: window.innerWidth,
	breakpoint: 768,
	init: function(){
		controller.init();
		this.handleResize();
		window.addEventListener('resize', this.handleResize.bind(this));
		window.addEventListener('keyup', this.handleKeypress.bind(this));
	},
	handleResize: function(){
		this.pageWidth = window.innerWidth;
		if (this.pageWidth <= this.breakpoint) {
			controller.setMobileView();
		}
	},
	handleKeypress: function(e) {
		var availableKeys = model.keyCommands;
		var keyPress = availableKeys.filter(function(key) {
			if(key.shortcut === 'ctrl'){
				return key.code === e.which && e.ctrlKey;
			} else if (!key.shourcut){
				return key.code === e.which;
			}
		})[0]

		if(keyPress) { controller.handleCommands(keyPress.action); }
	}
}

var model = {
	keyCommands: [
		{ code: 38, shortcut: null, action: 'UP' },
		{ code: 40, shortcut: null, action: 'DOWN' },
		{ code: 75, shortcut: 'ctrl', action: 'CLEAR' }
	],
	previousCommands: [
		{
			text: 'type \'help\' to view commands',
			type: 'response'
		}
	],
	enteredCommands: {
		data: [],
		currentCommand: '',
		pointer: 0,
	},
	commandPrefix: '$',
	currentOutput: null,
	mobileView: false,
	commands: [
		{
			text: '',
			params:  null
		},
		{
			text: 'help',
			params: null
		},
		{
			text: 'email',
			params: ['<subject>']
		},
		{
			text: 'open',
			params: ['resume', 'pdf']
		},
		{
			text: 'show',
			params: ['education', 'skills', 'xp']
		},
		{
			text: 'social',
			params: ['github', 'linkedin']
		},
		{
			text: 'clear',
			params: null
		},
		{
			text: 'rm',
			params: ['-rf']
		}
	],
	defaultMessage: {
		message: [
			"to view the resume, enter 'open resume' in the terminal to the left",
			"type 'help' to view other commands"
		]
	},
	data: {
		name: "John Sylvain",
		position: "Full Stack Developer",
		contact:{
			email: "jsylvain007@gmail.com",
			phone: 3136180632,
			social: {
				github: 'http://github.com/johnsylvain',
				linkedin: 'http://linkedin.com/in/johnsylvain'
			}
		},
		education: {
			name: 'Purdue University',
			gradutionDate: 'May 2017',
			gpa: 3.98,
			study: {
				major: 'Computer Graphics Technology',
				minor: 'Computer Information Technology'
			}
		},
		experience: [
			{
				title: 'USAA',
				position: 'Software Development Intern',
				date: 'Summer 2016',
				description: [
					'Developed an AngularJS application to manage business rules for all employees',
					'Analyzed data and created visualizations for the Enterprise Systems Division.'
				]
			},
			{
				title: 'Blast Radius',
				position: 'Web Development Intern',
				date: 'Summer 2015',
				description: [
					'Developed websites and dynamic emails for a number of blue chip clients.',
					'Aided in the relaunch of the global Blast Radius website'
				]
			},
			{
				title: 'Freelance Web Development and Design',
				date: 'August 2014 - Present',
				description: [
					'Developed websites and graphics while building relationships with clients.',
					'Clients include: university organizations, professors, and career fairs.'
				]
			},
			{
				title: 'Eagle Scout',
				date: 'June 2013',
				description: [
					'Oversaw the development and conducted a community service project.',
					'Resulted in more than 150 hours of service.'
				]
			}
		],
		skills: {
			languages: [
				{
					name: 'HTML/CSS',
					related: [
						'SASS', 'pug'
					]
				},
				{
					name: 'JavaScript',
					related: [
						'AngularJS','Vue.js', 'React.js','Node.js', 'Express.js'
					]
				},
				{
					name: 'PHP',
					related: [
						'SQL', 'Slim', 'Flight'
					]
				},
				{
					name: 'C#',
					related: [
						'.NET',
					]
				}
			],
			technical: [
				'git','gulp','object oriented programming', 'linux', 'webpack', 'SSH'
			]

		}
	},

}

var controller = {
	init: function(){
		model.currentOutput = model.defaultMessage;

		resumeContentView.init();
		consoleView.init();

	},

	setMobileView: function(){
		if (!model.mobileView) {
			this.executeCommand('open resume');
			consoleView.render();
		} else {
			this.updateOutput(model.defaultMessage, resumeContentView.render)
		}
	},

	getResumeData: function(){
		return model.data;
	},

	getDefaultData: function(){
		return model.defaultMessage;
	},

	getCurrentOutput: function(){
		return model.currentOutput;
	},

	updateOutput: function(newOutput, callback){
		model.currentOutput = newOutput;
		callback();
	},

	handleCommands: function(key) {
		if (key === 'UP' || key === 'DOWN') {
			if(key === 'UP' && 
				model.enteredCommands.pointer < model.enteredCommands.data.length) {
				model.enteredCommands.pointer += 1;
			}
			if(key === 'DOWN' && model.enteredCommands.pointer > 0) {
				model.enteredCommands.pointer -= 1;
			}

			var pos = model.enteredCommands.data.length - model.enteredCommands.pointer;
			model.enteredCommands.currentCommand = model.enteredCommands.data[pos];

		}

		if(key === 'CLEAR') {
			this.executeCommand('clear');
		}
		

		consoleView.render();
	},

	getEnteredCommands: function(){
		return model.enteredCommands.currentCommand;
	},

	enterCommand: function(command){
		var flag = false;
		var args = command.split(' ');
		model.previousCommands.push({
			text: command,
			type: 'command'
		});

		model.enteredCommands.data.push({
			text: command,
			type: 'command'
		});
		model.enteredCommands.pointer = 0;

		for (var i = 0; i < model.commands.length; i++) {
			var modelCommand = model.commands[i];
			if (args[0] === modelCommand.text){
				flag = true;
			}
		};
		if (!flag) {
			model.previousCommands.push({
				text: 'command not found: ' + args[0],
				type: 'error'
			},
			{
				text: 'to view available commands type: help',
				type: 'response'
			});
		} else {
			this.executeCommand(command);
		}
		consoleView.render();
	},

	executeCommand: function(command){
		var _this = this;
		var comArgs = command.split(' ');

		var commands = {
			clear: function(){
				if (comArgs.length !== 1){
					model.previousCommands.push({
						text: "'clear' does not need any arguments",
						type: 'error'
					});
					return;
				}

				model.previousCommands = [];
				resumeContentView.render();
			},
			help: function(){
				var commands = model.commands;
				model.previousCommands.push({
					text:'-----',
					type:'response'
				},{
					text: 'Available Commands:',
					type: 'response'
				},{
					text:'-----',
					type:'response'
				});
				for (var i = 0; i < commands.length; i++) {
					if (commands[i].text !== 'rm') {
						var avalCommand = commands[i];
						model.previousCommands.push({
							text: avalCommand.text,
							type: 'response'
						});
						if (avalCommand.params !== null) {
							model.previousCommands.push({
								text: '-accepts: ' + avalCommand.params,
								type: 'response'
							});
						};
					}
				};
				consoleView.render();
			},
			open: function(){
				var openResume = function(){
					_this.updateOutput({resume: model.data}, function(){
						resumeContentView.render();
					});
				};

				var pdf = function() {
					window.open("http://johnsylvain.me/resume.pdf");
				}
				if (comArgs.length === 1) {
					model.previousCommands.push({
						text: "type 'open [" + model.commands[3].params + "]'",
						type: 'warning'
					})
				} else {
					return {
						resume: openResume,
						pdf: pdf
					}
				}
			},
			show: function(){
				var showEducation =  function(){
					_this.updateOutput({education: model.data.education}, function(){
						resumeContentView.render();
					});
				};
				var showXp = function(){
					_this.updateOutput({experience: model.data.experience}, function(){
						resumeContentView.render();
					});
				};
				var showSkills = function(){
					_this.updateOutput({skills: model.data.skills}, function(){
						resumeContentView.render();
					});
				}
				if (comArgs.length === 1) {
					model.previousCommands.push({
						text: "type 'show [" + model.commands[4].params + "]'",
						type: 'warning'
					})
				} else {
					return {
						education: showEducation,
						skills: showSkills,
						xp: showXp
					}
				}
			},
			email: function(){
				var subject = '';
				for (var i = 1; i < comArgs.length; i++) {
					subject += (' ' + comArgs[i])
				};
				var link = 'mailto:jsylvain007@gmail.com?subject=' + subject;
				window.open(link);
			},
			social: function(){

				var github = function(){
					window.open('http://github.com/johnsylvain');
				}
				var linkedin = function(){
					window.open('http://linkedin.com/in/johnsylvain');
				}
				if (comArgs.length === 1) {
					model.previousCommands.push({
						text: "type 'social [" + model.commands[5].params + "]'",
						type: 'warning'
					})
				} else {
					return{
						github: github,
						linkedin: linkedin
					}
				}
			},
			rm: function() {
				var rf = function() {
					console.log('removing all files...');
				}

				if (comArgs.length === 1) {
					model.previousCommands.push({
						text: "error",
						type: 'error'
					});
				} else {
					return {
						'-rf': rf
					}
					
				}
			}
		}

		model.enteredCommands.pointer = 0;
		model.enteredCommands.currentCommand = '';
		consoleView.render();

		if (comArgs.length === 1) {
			commands[comArgs[0]]();
		} else if(comArgs[0] === 'email'){
			commands[comArgs[0]]();
		} else if (comArgs.length > 1){
			var subCommand = commands[comArgs[0]]();
			if(subCommand[comArgs[1]]) {
				subCommand[comArgs[1]]()
			} else {
				model.previousCommands.push({
					text: comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'',
					type: 'error'
				})
			}
		}

	},

	getPreviousCommands: function(){
		return model.previousCommands;
	},

	getFileName: function(){
		var current = model.currentOutput;
		var fileName = Object.keys(current)[0];
		return fileName;
	}

}

var resumeContentView = {
	init: function(){
		this.resumeContainerElem = document.getElementById('resume-code');
		this.render();
	},

	render: function(){
		var data = controller.getCurrentOutput();
		var json = filters.textToJSON(JSON.stringify(data,null,'    '));
		this.resumeContainerElem.innerHTML = json;
	}
}

var consoleView = {
	init: function(){
		var _this = this;

		this.promptElem = document.getElementById('command-prompt');
		this.prevElem = document.getElementById('commands');
		this.fileNameElem = document.getElementById('file-name');

		var consoleElem = document.getElementById('console');
		this.commandInput = document.getElementById('command-input');
		this.commandInput.focus();

		consoleElem.addEventListener('click', function(){
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
		this.prevElem.innerHTML = '';
		var commands = controller.getPreviousCommands();

		this.fileNameElem.textContent = controller.getFileName();

		if (controller.getEnteredCommands()) {
			this.commandInput.value = controller.getEnteredCommands().text;
		} else {
			this.commandInput.value = '';
		}

		for (var i = 0; i < commands.length; i++) {
			var command = commands[i];
			var elem = document.createElement('li');

			if (command.type === 'command') {
				elem.textContent = '$ ' + command.text;
			} else if(command.type === 'error'){
				elem.textContent = command.text;
				elem.className = 'commandError';
			} else if(command.type === 'response'){
				elem.textContent = command.text;
				elem.className = 'commandResponse';
			} else if(command.type === 'warning'){
				elem.textContent = command.text;
				elem.className = 'commandWarning';
			}

			this.prevElem.appendChild(elem);
		};

	}
}

var filters = {
	textToJSON: function(json){
		if (typeof json != 'string') {
			json = JSON.stringify(json, null, 2);
		}
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		var reg = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
		return json.replace(reg, 
			function (match) {
				var cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			});
	}
}

app.init();

},{}]},{},[1])