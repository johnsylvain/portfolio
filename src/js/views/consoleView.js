import controller from '../controller';
import events from '../utils/events';

events.on('consoleViewInit', data => {
  consoleView.init();
});

events.on('consoleViewRender', data => {
  consoleView.render();
});

var consoleView = {
  init(){

    this.promptElem = document.getElementById('command-prompt');
    this.prevElem = document.getElementById('commands');
    this.fileNameElem = document.getElementById('file-name');

    this.consoleElem = document.getElementById('console');
    this.commandInput = document.getElementById('command-input');
    this.commandInput.focus();

    this.consoleElem.addEventListener('click', () => {
      this.commandInput.focus();
    })

    this.promptElem.addEventListener('submit', e => {
      e.preventDefault();
      let command = e.target.prompt.value;
      e.target.prompt.value = '';
      controller.enterCommand(command);
    })
    this.render();
  },

  render(){
    this.prevElem.innerHTML = '';
    let commands = controller.getPreviousCommands();

    this.fileNameElem.textContent = controller.getFileName();

    this.consoleElem.scrollTop = this.consoleElem.scrollHeight;

    if (controller.getEnteredCommands()) {
      this.commandInput.value = controller.getEnteredCommands().text;
    } else {
      this.commandInput.value = '';
    }

    commands.forEach((command, i) => {
      let elem = document.createElement('li');

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

      this.prevElem.appendChild(elem);

    })


  }
}

export default consoleView;
