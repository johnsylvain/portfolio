var model = {
  previousCommands: [
    {
      text: 'type \'help\' to view commands',
      type: 'response'
    }
  ],
  commandPrefix: '$',
  currentOutput: null,
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
      params: ['resume']
    },
    {
      text: 'show',
      params: ['education', 'skills', 'xp']
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
    position: "Web developer and designer",
    contact:{
      email: "me@johnsylva.in",
      phone: 3136180632,
      social: {
        github: 'http://github.com/johnsylvain',
        linkedin: 'http://linkedin.com/in/johnsylvain'
      }
    },
    education: {
      name: 'Purdue University',
      gradutionDate: 'May 2017',
      gpa: 3.97,
      area: {
        major: 'Computer Graphics Technology',
        minor: 'Computer Information Technology'
      }
    },
    experience: [
      {
        title: 'Blast Radius',
        position: 'Web Development Intern',
        date: 'Summer 2015',
        description: [
          'Developed interactive website experiences for a variety of clients.',
          'Collaborated with professionals in web development and design.'
        ]
      },
      {
        title: 'Freelance Graphic Design',
        date: 'August 2014 - Present',
        description: [
          'Consulted with clients to produce designs and marketing materials',
          'Clients include: Organizaions, Student Government Campaigns, and Career Fairs'
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
            'SASS', 'jade'
          ]
        },
        {
          name: 'JavaScript',
          related: [
            'AngularJS','Vue.js', 'Node.js', 'Express.js', 'jQuery'
          ]
        },
        {
          name: 'PHP',
          related: [
            'SQL', 'Slim', 'Flight'
          ]
        }
      ],
      technical: [
        'git','gulp',
      ]

    }
  },

}

var filters = {
  textToJSON: function(json){
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, 
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

var controller = {
  init: function(){
    model.currentOutput = model.defaultMessage;
    resumeContentView.init();
    consoleView.init();

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

  enterCommand: function(command){
    var flag = false;
    var args = command.split(' ');
    model.previousCommands.push({
      text: command,
      type: 'command'
    });
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
        };
        consoleView.render();
      },
      open: function(){
        var openResume = function(){
          _this.updateOutput({resume: model.data}, function(){
            resumeContentView.render();
          });
        };
        if (comArgs.length === 1) {
          model.previousCommands.push({
            text: "type 'open resume'",
            type: 'warning'
          })
        } else {
          return {
            resume: openResume
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
        var link = 'mailto:me@johnsylva.in?subject=' + subject;
        window.open(link);
      }
    }

    if (comArgs.length === 1) {
      commands[comArgs[0]]();
    } else if(comArgs[0] === 'email'){
      commands[comArgs[0]]();
    } else if (comArgs.length > 1){
      var subCommand = commands[comArgs[0]]();
      subCommand[comArgs[1]]();
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
    var json = filters.textToJSON(JSON.stringify(data,null,'  '));
    this.resumeContainerElem.innerHTML = json;
  }
}

var consoleView = {
  init: function(){
    this.promptElem = document.getElementById('command-prompt');
    this.prevElem = document.getElementById('commands');
    this.fileNameElem = document.getElementById('file-name');

    var consoleElem = document.getElementById('console');
    var commandInput = document.getElementById('command-input');
    commandInput.focus();

    consoleElem.addEventListener('click', function(){
      commandInput.focus();
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
controller.init();