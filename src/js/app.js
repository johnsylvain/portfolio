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
			text: 'clear',
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
			text: 'rm',
			params: ['-rf'],
			ignored: true
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

	getCommand: function(text){
		return model.commands.filter(function(c) {
			return c.text === text;
		})
	},

	enterCommand: function(command){
		var flag = false;
		var args = command.split(' ');
		if (args[0] !== '') {
			model.previousCommands.push({
				text: command,
				type: 'command'
			});

			model.enteredCommands.data.push({
				text: command,
				type: 'command'
			});
			model.enteredCommands.pointer = 0;
			
		}

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

						var response = '';
						if (avalCommand.params !== null) {
							response = avalCommand.text + ' [' + avalCommand.params + ']';
						} else {
							response = avalCommand.text;
						}


						model.previousCommands.push({
							text: response,
							type: 'response'
						});
						
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
						text: "type 'open [" + controller.getCommand('open')[0].params + "]'",
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
						text: "type 'show [" + controller.getCommand('show')[0].params + "]'",
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

				var openLink = function(site){
					return function(){
						window.open(model.data.contact.social[site])
					}
				}

				if (comArgs.length === 1) {
					model.previousCommands.push({
						text: "type 'social [" + controller.getCommand('social')[0].params + "]'",
						type: 'warning'
					})
				} else {
					return{
						github: openLink('github'),
						linkedin: openLink('linkedin')
					}
				}
			},
			rm: function() {
				var rf = function() {
					var targets = [
						document.getElementById('wrapper'),
						document.getElementsByClassName('trash'),
					];



					document.getElementById('command-input').disabled = true;
					targets.forEach(function(el, i) {
						if(Array.from(el)[0]){
							Array.from(el).forEach(function(e) {
								helpers.addClass(e, 'crash');
							})
						} else {
							helpers.addClass(el, 'crash');
						}
					})
					window.setTimeout(function(){
						document.getElementById('command-input').disabled = false;

						targets.forEach(function(el, i) {
							if(Array.from(el)[0]){
								Array.from(el).forEach(function(e) {
									helpers.removeClass(e, 'crash');
								})
							} else {
								helpers.removeClass(el, 'crash');
							}
						})

					}, 4000)
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

var helpers = {
	hasClass:function(ele, cls) {
		return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	},

	addClass:function(ele, cls) {
		if (!this.hasClass(ele, cls)) ele.className += " " + cls;
	},

	removeClass:function(ele, cls) {
		if (this.hasClass(ele, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg, ' ');
		}
	}
	
}

app.init();
