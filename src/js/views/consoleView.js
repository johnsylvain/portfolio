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

    this.consoleElem = document.getElementById('console-selector');
    this.commandInput = document.getElementById('command-input');

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
      elem.classList.add('console__command-list-item')
      console.log(elem)

      if (command.type === 'command') {
        elem.textContent = '$ ' + command.text;
      } else if(command.type === 'error'){
        elem.textContent = command.text;
        elem.classList.add('console__command-list-item--error');
      } else if(command.type === 'response'){
        elem.textContent = command.text;
        elem.classList.add('console__command-list-item--response');
      } else if(command.type === 'response-bold'){
        elem.textContent = command.text;
        elem.classList.add('console__command-list-item--bold');
      } else if(command.type === 'warning'){
        elem.textContent = command.text;
        elem.classList.add('console__command-list-item--warning');
      }

      this.prevElem.appendChild(elem);

    })


  }
}

export default consoleView;
