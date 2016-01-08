var JSONModel = {
  data: {
    name: "John Sylvain",
    position: "Web developer and designer",
    contact:{
      email: "me@johnsylva.in",
      phone: "(313) 618.0632"
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
    ]
  },

}

var controller = {
  init: function(){
    resumeContentView.init();
  },
  getResumeData: function(){
    return JSONModel.data;
  }
}

var resumeContentView = {
  init: function(){
    this.resumeContainerElem = document.getElementById('resume-code');
    this.render();
  },

  render: function(){
    function JSONHighlight(json) {
      if (typeof json != 'string') {
       json = JSON.stringify(json, undefined, 2);
     }
     json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
     return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
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
    var data = controller.getResumeData();
    var json = JSONHighlight(JSON.stringify(data,null,'  '));
    this.resumeContainerElem.innerHTML = json;
  }
}
controller.init();

var consoleModel = {
  previousCommands: [],
  commandPrefix: '$',
  commands:[
    '', 'get', 'help'
  ]
}

var consoleController = {
  init: function(){
    consoleView.init();
  },

  enterCommand: function(command){
    var flag = false;
    consoleModel.previousCommands.push({
      text: command,
      type: 'command'
    });
    for (var i = 0; i < consoleModel.commands.length; i++) {
      var modelCommand = consoleModel.commands[i];
      if (command === modelCommand){
        flag = true;
      }
    };
    if (!flag) {
      consoleModel.previousCommands.push({
        text: 'command not found: ' + command,
        type: 'error'
      });
    } else {
      this.executeCommand(command);
    }
    consoleView.render();
  },

  executeCommand: function(command){
    var commands = {
      help: function(){
        var commands = consoleModel.commands;
        consoleModel.previousCommands.push({
          text: 'Available Commands:',
          type: 'response'
        });
        for (var i = 0; i < commands.length; i++) {
          var avalCommand = commands[i];
          consoleModel.previousCommands.push({
            text: avalCommand,
            type: 'response'
          })
        };
        consoleView.render();
      }
    }
    if(command !== '') commands[command]();
  },

  getPreviousCommands: function(){
    return consoleModel.previousCommands;
  }
}

var consoleView = {
  init: function(){
    this.promptElem = document.getElementById('command-prompt');
    this.prevElem = document.getElementById('commands');
    this.promptElem.addEventListener('submit', function(e){
      e.preventDefault();
      console.log(e.target.prompt.value);
      var command = e.target.prompt.value;
      e.target.prompt.value = '';
      consoleController.enterCommand(command);
    })
    this.render();
  },

  render: function(){
    this.prevElem.innerHTML = '';
    var commands = consoleController.getPreviousCommands();

    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      console.log(command);
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
consoleController.init();
