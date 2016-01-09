var model = {
  previousCommands: [],
  commandPrefix: '$',
  currentOutput: null,
  commands:[
    '','open', 'open resume', 'show education','show xp', 'help'
  ],
  defaultMessage: {
    message: "to view the resume, enter a command in the terminal to the left"
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
      gpa: 3.97
    },
    experience: [
      {
        companyName: 'Blast Radius',
        position: 'Web Development Intern',
        date: 'Summer 2015',
        description: [
          'ok','morestuff'
        ]
      },
      {
        companyName: 'Blast Radius',
        position: 'Web Development Intern',
        description: [
          'ok','morestuff'
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
    model.previousCommands.push({
      text: command,
      type: 'command'
    });
    for (var i = 0; i < model.commands.length; i++) {
      var modelCommand = model.commands[i];
      if (command === modelCommand){
        flag = true;
      }
    };
    if (!flag) {
      model.previousCommands.push({
        text: 'command not found: ' + command,
        type: 'error'
      });
      model.previousCommands.push({
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
    var commands = {
      help: function(){
        var commands = model.commands;
        model.previousCommands.push({
          text: 'Available Commands:',
          type: 'response'
        });
        for (var i = 0; i < commands.length; i++) {
          var avalCommand = commands[i];
          model.previousCommands.push({
            text: avalCommand,
            type: 'response'
          })
        };
        consoleView.render();
      },
      open: function(){
        _this.updateOutput(model.data, function(){
          resumeContentView.render();
        });
      }
    }
    if(command !== '') commands[command]();
  },

  getPreviousCommands: function(){
    return model.previousCommands;
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

    var commandInput = document.getElementById('command-input');
    commandInput.focus();

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

      }

      this.prevElem.appendChild(elem);
    };

  }
}
controller.init();