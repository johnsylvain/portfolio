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
      // for (var i = 0; i < model.commands.length; i++) {
      //   var comTest = model.commands[i];

      // };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsLmpzIiwiZmlsdGVycy5qcyIsImNvbnRyb2xsZXIuanMiLCJ2aWV3cy5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbW9kZWwgPSB7XG4gIHByZXZpb3VzQ29tbWFuZHM6IFtcbiAgICB7XG4gICAgICB0ZXh0OiAndHlwZSBcXCdoZWxwXFwnIHRvIHZpZXcgY29tbWFuZHMnLFxuICAgICAgdHlwZTogJ3Jlc3BvbnNlJ1xuICAgIH1cbiAgXSxcbiAgY29tbWFuZFByZWZpeDogJyQnLFxuICBjdXJyZW50T3V0cHV0OiBudWxsLFxuICBjb21tYW5kczogW1xuICAgIHtcbiAgICAgIHRleHQ6ICcnLFxuICAgICAgcGFyYW1zOiAgbnVsbFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ2hlbHAnLFxuICAgICAgcGFyYW1zOiBudWxsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnZW1haWwnLFxuICAgICAgcGFyYW1zOiBbJzxzdWJqZWN0PiddXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnb3BlbicsXG4gICAgICBwYXJhbXM6IFsncmVzdW1lJ11cbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdzaG93JyxcbiAgICAgIHBhcmFtczogWydlZHVjYXRpb24nLCAnc2tpbGxzJywgJ3hwJ11cbiAgICB9XG4gIF0sXG4gIGRlZmF1bHRNZXNzYWdlOiB7XG4gICAgbWVzc2FnZTogW1xuICAgICAgXCJ0byB2aWV3IHRoZSByZXN1bWUsIGVudGVyICdvcGVuIHJlc3VtZScgaW4gdGhlIHRlcm1pbmFsIHRvIHRoZSBsZWZ0XCIsXG4gICAgICBcInR5cGUgJ2hlbHAnIHRvIHZpZXcgb3RoZXIgY29tbWFuZHNcIlxuICAgIF1cbiAgfSxcbiAgZGF0YToge1xuICAgIG5hbWU6IFwiSm9obiBTeWx2YWluXCIsXG4gICAgcG9zaXRpb246IFwiV2ViIGRldmVsb3BlciBhbmQgZGVzaWduZXJcIixcbiAgICBjb250YWN0OntcbiAgICAgIGVtYWlsOiBcIm1lQGpvaG5zeWx2YS5pblwiLFxuICAgICAgcGhvbmU6IDMxMzYxODA2MzIsXG4gICAgICBzb2NpYWw6IHtcbiAgICAgICAgZ2l0aHViOiAnaHR0cDovL2dpdGh1Yi5jb20vam9obnN5bHZhaW4nLFxuICAgICAgICBsaW5rZWRpbjogJ2h0dHA6Ly9saW5rZWRpbi5jb20vaW4vam9obnN5bHZhaW4nXG4gICAgICB9XG4gICAgfSxcbiAgICBlZHVjYXRpb246IHtcbiAgICAgIG5hbWU6ICdQdXJkdWUgVW5pdmVyc2l0eScsXG4gICAgICBncmFkdXRpb25EYXRlOiAnTWF5IDIwMTcnLFxuICAgICAgZ3BhOiAzLjk3LFxuICAgICAgYXJlYToge1xuICAgICAgICBtYWpvcjogJ0NvbXB1dGVyIEdyYXBoaWNzIFRlY2hub2xvZ3knLFxuICAgICAgICBtaW5vcjogJ0NvbXB1dGVyIEluZm9ybWF0aW9uIFRlY2hub2xvZ3knXG4gICAgICB9XG4gICAgfSxcbiAgICBleHBlcmllbmNlOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnQmxhc3QgUmFkaXVzJyxcbiAgICAgICAgcG9zaXRpb246ICdXZWIgRGV2ZWxvcG1lbnQgSW50ZXJuJyxcbiAgICAgICAgZGF0ZTogJ1N1bW1lciAyMDE1JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAnRGV2ZWxvcGVkIGludGVyYWN0aXZlIHdlYnNpdGUgZXhwZXJpZW5jZXMgZm9yIGEgdmFyaWV0eSBvZiBjbGllbnRzLicsXG4gICAgICAgICAgJ0NvbGxhYm9yYXRlZCB3aXRoIHByb2Zlc3Npb25hbHMgaW4gd2ViIGRldmVsb3BtZW50IGFuZCBkZXNpZ24uJ1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0ZyZWVsYW5jZSBHcmFwaGljIERlc2lnbicsXG4gICAgICAgIGRhdGU6ICdBdWd1c3QgMjAxNCAtIFByZXNlbnQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICdDb25zdWx0ZWQgd2l0aCBjbGllbnRzIHRvIHByb2R1Y2UgZGVzaWducyBhbmQgbWFya2V0aW5nIG1hdGVyaWFscycsXG4gICAgICAgICAgJ0NsaWVudHMgaW5jbHVkZTogT3JnYW5pemFpb25zLCBTdHVkZW50IEdvdmVybm1lbnQgQ2FtcGFpZ25zLCBhbmQgQ2FyZWVyIEZhaXJzJ1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0VhZ2xlIFNjb3V0JyxcbiAgICAgICAgZGF0ZTogJ0p1bmUgMjAxMycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgJ092ZXJzYXcgdGhlIGRldmVsb3BtZW50IGFuZCBjb25kdWN0ZWQgYSBjb21tdW5pdHkgc2VydmljZSBwcm9qZWN0LicsXG4gICAgICAgICAgJ1Jlc3VsdGVkIGluIG1vcmUgdGhhbiAxNTAgaG91cnMgb2Ygc2VydmljZS4nXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdLFxuICAgIHNraWxsczoge1xuICAgICAgbGFuZ3VhZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnSFRNTC9DU1MnLFxuICAgICAgICAgIHJlbGF0ZWQ6IFtcbiAgICAgICAgICAgICdTQVNTJywgJ2phZGUnXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0phdmFTY3JpcHQnLFxuICAgICAgICAgIHJlbGF0ZWQ6IFtcbiAgICAgICAgICAgICdBbmd1bGFySlMnLCdWdWUuanMnLCAnTm9kZS5qcycsICdFeHByZXNzLmpzJywgJ2pRdWVyeSdcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnUEhQJyxcbiAgICAgICAgICByZWxhdGVkOiBbXG4gICAgICAgICAgICAnU1FMJywgJ1NsaW0nLCAnRmxpZ2h0J1xuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHRlY2huaWNhbDogW1xuICAgICAgICAnZ2l0JywnZ3VscCcsXG4gICAgICBdXG5cbiAgICB9XG4gIH0sXG5cbn0iLCJ2YXIgZmlsdGVycyA9IHtcbiAgdGV4dFRvSlNPTjogZnVuY3Rpb24oanNvbil7XG4gICAgaWYgKHR5cGVvZiBqc29uICE9ICdzdHJpbmcnKSB7XG4gICAgICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCAyKTtcbiAgICB9XG4gICAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICAgIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgXG4gICAgICBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgIHZhciBjbHMgPSAnbnVtYmVyJztcbiAgICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICAgIGNscyA9ICdrZXknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNscyA9ICdzdHJpbmcnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgICB9IGVsc2UgaWYgKC9udWxsLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAnbnVsbCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNscyArICdcIj4nICsgbWF0Y2ggKyAnPC9zcGFuPic7XG4gICAgfSk7XG4gIH1cbn0iLCJ2YXIgY29udHJvbGxlciA9IHtcbiAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICBtb2RlbC5jdXJyZW50T3V0cHV0ID0gbW9kZWwuZGVmYXVsdE1lc3NhZ2U7XG4gICAgcmVzdW1lQ29udGVudFZpZXcuaW5pdCgpO1xuICAgIGNvbnNvbGVWaWV3LmluaXQoKTtcblxuICB9LFxuXG4gIGdldFJlc3VtZURhdGE6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIG1vZGVsLmRhdGE7XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdERhdGE6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIG1vZGVsLmRlZmF1bHRNZXNzYWdlO1xuICB9LFxuXG4gIGdldEN1cnJlbnRPdXRwdXQ6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIG1vZGVsLmN1cnJlbnRPdXRwdXQ7XG4gIH0sXG5cbiAgdXBkYXRlT3V0cHV0OiBmdW5jdGlvbihuZXdPdXRwdXQsIGNhbGxiYWNrKXtcbiAgICBtb2RlbC5jdXJyZW50T3V0cHV0ID0gbmV3T3V0cHV0O1xuICAgIGNhbGxiYWNrKCk7XG4gIH0sXG5cbiAgZW50ZXJDb21tYW5kOiBmdW5jdGlvbihjb21tYW5kKXtcbiAgICB2YXIgZmxhZyA9IGZhbHNlO1xuICAgIHZhciBhcmdzID0gY29tbWFuZC5zcGxpdCgnICcpO1xuICAgIG1vZGVsLnByZXZpb3VzQ29tbWFuZHMucHVzaCh7XG4gICAgICB0ZXh0OiBjb21tYW5kLFxuICAgICAgdHlwZTogJ2NvbW1hbmQnXG4gICAgfSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RlbC5jb21tYW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG1vZGVsQ29tbWFuZCA9IG1vZGVsLmNvbW1hbmRzW2ldO1xuICAgICAgaWYgKGFyZ3NbMF0gPT09IG1vZGVsQ29tbWFuZC50ZXh0KXtcbiAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWZsYWcpIHtcbiAgICAgIG1vZGVsLnByZXZpb3VzQ29tbWFuZHMucHVzaCh7XG4gICAgICAgIHRleHQ6ICdjb21tYW5kIG5vdCBmb3VuZDogJyArIGFyZ3NbMF0sXG4gICAgICAgIHR5cGU6ICdlcnJvcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICd0byB2aWV3IGF2YWlsYWJsZSBjb21tYW5kcyB0eXBlOiBoZWxwJyxcbiAgICAgICAgdHlwZTogJ3Jlc3BvbnNlJ1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZCk7XG4gICAgfVxuICAgIGNvbnNvbGVWaWV3LnJlbmRlcigpO1xuICB9LFxuXG4gIGV4ZWN1dGVDb21tYW5kOiBmdW5jdGlvbihjb21tYW5kKXtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBjb21BcmdzID0gY29tbWFuZC5zcGxpdCgnICcpO1xuXG4gICAgdmFyIGNvbW1hbmRzID0ge1xuICAgICAgaGVscDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGNvbW1hbmRzID0gbW9kZWwuY29tbWFuZHM7XG4gICAgICAgIG1vZGVsLnByZXZpb3VzQ29tbWFuZHMucHVzaCh7XG4gICAgICAgICAgdGV4dDonLS0tLS0nLFxuICAgICAgICAgIHR5cGU6J3Jlc3BvbnNlJ1xuICAgICAgICB9LHtcbiAgICAgICAgICB0ZXh0OiAnQXZhaWxhYmxlIENvbW1hbmRzOicsXG4gICAgICAgICAgdHlwZTogJ3Jlc3BvbnNlJ1xuICAgICAgICB9LHtcbiAgICAgICAgICB0ZXh0OictLS0tLScsXG4gICAgICAgICAgdHlwZToncmVzcG9uc2UnXG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGF2YWxDb21tYW5kID0gY29tbWFuZHNbaV07XG4gICAgICAgICAgbW9kZWwucHJldmlvdXNDb21tYW5kcy5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IGF2YWxDb21tYW5kLnRleHQsXG4gICAgICAgICAgICB0eXBlOiAncmVzcG9uc2UnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGF2YWxDb21tYW5kLnBhcmFtcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbW9kZWwucHJldmlvdXNDb21tYW5kcy5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogJy1hY2NlcHRzOiAnICsgYXZhbENvbW1hbmQucGFyYW1zLFxuICAgICAgICAgICAgICB0eXBlOiAncmVzcG9uc2UnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlVmlldy5yZW5kZXIoKTtcbiAgICAgIH0sXG4gICAgICBvcGVuOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgb3BlblJlc3VtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgX3RoaXMudXBkYXRlT3V0cHV0KHtyZXN1bWU6IG1vZGVsLmRhdGF9LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmVzdW1lQ29udGVudFZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb21BcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG1vZGVsLnByZXZpb3VzQ29tbWFuZHMucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiBcInR5cGUgJ29wZW4gcmVzdW1lJ1wiLFxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdW1lOiBvcGVuUmVzdW1lXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHNob3dFZHVjYXRpb24gPSAgZnVuY3Rpb24oKXtcbiAgICAgICAgICBfdGhpcy51cGRhdGVPdXRwdXQoe2VkdWNhdGlvbjogbW9kZWwuZGF0YS5lZHVjYXRpb259LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmVzdW1lQ29udGVudFZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzaG93WHAgPSBmdW5jdGlvbigpe1xuICAgICAgICAgIF90aGlzLnVwZGF0ZU91dHB1dCh7ZXhwZXJpZW5jZTogbW9kZWwuZGF0YS5leHBlcmllbmNlfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJlc3VtZUNvbnRlbnRWaWV3LnJlbmRlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hvd1NraWxscyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgX3RoaXMudXBkYXRlT3V0cHV0KHtza2lsbHM6IG1vZGVsLmRhdGEuc2tpbGxzfSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJlc3VtZUNvbnRlbnRWaWV3LnJlbmRlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21BcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG1vZGVsLnByZXZpb3VzQ29tbWFuZHMucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiBcInR5cGUgJ3Nob3cgW1wiICsgbW9kZWwuY29tbWFuZHNbNF0ucGFyYW1zICsgXCJdJ1wiLFxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWR1Y2F0aW9uOiBzaG93RWR1Y2F0aW9uLFxuICAgICAgICAgICAgc2tpbGxzOiBzaG93U2tpbGxzLFxuICAgICAgICAgICAgeHA6IHNob3dYcFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVtYWlsOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc3ViamVjdCA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGNvbUFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBzdWJqZWN0ICs9ICgnICcgKyBjb21BcmdzW2ldKVxuICAgICAgICB9O1xuICAgICAgICB2YXIgbGluayA9ICdtYWlsdG86bWVAam9obnN5bHZhLmluP3N1YmplY3Q9JyArIHN1YmplY3Q7XG4gICAgICAgIHdpbmRvdy5vcGVuKGxpbmspO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb21BcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29tbWFuZHNbY29tQXJnc1swXV0oKTtcbiAgICB9IGVsc2UgaWYoY29tQXJnc1swXSA9PT0gJ2VtYWlsJyl7XG4gICAgICBjb21tYW5kc1tjb21BcmdzWzBdXSgpO1xuICAgIH0gZWxzZSBpZiAoY29tQXJncy5sZW5ndGggPiAxKXtcbiAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZWwuY29tbWFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vICAgdmFyIGNvbVRlc3QgPSBtb2RlbC5jb21tYW5kc1tpXTtcblxuICAgICAgLy8gfTtcbiAgICAgIHZhciBzdWJDb21tYW5kID0gY29tbWFuZHNbY29tQXJnc1swXV0oKTtcbiAgICAgIGlmKHN1YkNvbW1hbmRbY29tQXJnc1sxXV0pIHtcbiAgICAgICAgc3ViQ29tbWFuZFtjb21BcmdzWzFdXSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RlbC5wcmV2aW91c0NvbW1hbmRzLnB1c2goe1xuICAgICAgICAgIHRleHQ6IGNvbUFyZ3NbMV0gKyAnIGlzIG5vdCBhIHByb3BlciBwYXJhbWV0ZXIgb2YgXFwnJyArIGNvbUFyZ3NbMF0gKyAnXFwnJyxcbiAgICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgZ2V0UHJldmlvdXNDb21tYW5kczogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gbW9kZWwucHJldmlvdXNDb21tYW5kcztcbiAgfSxcblxuICBnZXRGaWxlTmFtZTogZnVuY3Rpb24oKXtcbiAgICB2YXIgY3VycmVudCA9IG1vZGVsLmN1cnJlbnRPdXRwdXQ7XG4gICAgdmFyIGZpbGVOYW1lID0gT2JqZWN0LmtleXMoY3VycmVudClbMF07XG4gICAgcmV0dXJuIGZpbGVOYW1lO1xuICB9XG5cbn0iLCJ2YXIgcmVzdW1lQ29udGVudFZpZXcgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5yZXN1bWVDb250YWluZXJFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VtZS1jb2RlJyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGRhdGEgPSBjb250cm9sbGVyLmdldEN1cnJlbnRPdXRwdXQoKTtcbiAgICB2YXIganNvbiA9IGZpbHRlcnMudGV4dFRvSlNPTihKU09OLnN0cmluZ2lmeShkYXRhLG51bGwsJyAgJykpO1xuICAgIHRoaXMucmVzdW1lQ29udGFpbmVyRWxlbS5pbm5lckhUTUwgPSBqc29uO1xuICB9XG59XG5cbnZhciBjb25zb2xlVmlldyA9IHtcbiAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICB0aGlzLnByb21wdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWFuZC1wcm9tcHQnKTtcbiAgICB0aGlzLnByZXZFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1hbmRzJyk7XG4gICAgdGhpcy5maWxlTmFtZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZS1uYW1lJyk7XG5cbiAgICB2YXIgY29uc29sZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uc29sZScpO1xuICAgIHZhciBjb21tYW5kSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWFuZC1pbnB1dCcpO1xuICAgIGNvbW1hbmRJbnB1dC5mb2N1cygpO1xuXG4gICAgY29uc29sZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgY29tbWFuZElucHV0LmZvY3VzKCk7XG4gICAgfSlcblxuICAgIHRoaXMucHJvbXB0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBjb21tYW5kID0gZS50YXJnZXQucHJvbXB0LnZhbHVlO1xuICAgICAgZS50YXJnZXQucHJvbXB0LnZhbHVlID0gJyc7XG4gICAgICBjb250cm9sbGVyLmVudGVyQ29tbWFuZChjb21tYW5kKTtcbiAgICB9KVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgIHRoaXMucHJldkVsZW0uaW5uZXJIVE1MID0gJyc7XG4gICAgdmFyIGNvbW1hbmRzID0gY29udHJvbGxlci5nZXRQcmV2aW91c0NvbW1hbmRzKCk7XG5cbiAgICB0aGlzLmZpbGVOYW1lRWxlbS50ZXh0Q29udGVudCA9IGNvbnRyb2xsZXIuZ2V0RmlsZU5hbWUoKTtcblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNvbW1hbmQgPSBjb21tYW5kc1tpXTtcbiAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgICAgaWYgKGNvbW1hbmQudHlwZSA9PT0gJ2NvbW1hbmQnKSB7XG4gICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSAnJCAnICsgY29tbWFuZC50ZXh0O1xuICAgICAgfSBlbHNlIGlmKGNvbW1hbmQudHlwZSA9PT0gJ2Vycm9yJyl7XG4gICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBjb21tYW5kLnRleHQ7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gJ2NvbW1hbmRFcnJvcic7XG4gICAgICB9IGVsc2UgaWYoY29tbWFuZC50eXBlID09PSAncmVzcG9uc2UnKXtcbiAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGNvbW1hbmQudGV4dDtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSAnY29tbWFuZFJlc3BvbnNlJztcbiAgICAgIH0gZWxzZSBpZihjb21tYW5kLnR5cGUgPT09ICd3YXJuaW5nJyl7XG4gICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBjb21tYW5kLnRleHQ7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gJ2NvbW1hbmRXYXJuaW5nJztcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmV2RWxlbS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICB9O1xuXG4gIH1cbn0iLCJjb250cm9sbGVyLmluaXQoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
