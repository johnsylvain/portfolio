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