import controller from '../controller';
import events from '../utils/events';
import { element } from '../utils/dom';

events.on('consoleViewInit', data => {
  consoleView.init();
});

events.on('consoleViewRender', data => {
  consoleView.render();
});

var consoleView = { 
  init () {
    this.classMap = {
      'command': '',
      'error': 'console__command-list-item--error',
      'response': 'console__command-list-item--response',
      'response-bold': 'console__command-list-item--bold',
      'warning': 'console__command-list-item--warning'
    }

    this.promptElem = document.getElementById('command-prompt');
    this.listElem = document.getElementById('commands');

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

  render () {
    this.listElem.innerHTML = '';
    let commands = controller.getPreviousCommands();

    this.consoleElem.scrollTop = this.consoleElem.scrollHeight;

    if (controller.getEnteredCommands()) {
      this.commandInput.value = controller.getEnteredCommands().text;
    } else {
      this.commandInput.value = '';
    }

    commands.forEach((command, i) => {
      const li = element('li', {
        className: `console__command-list-item ${this.classMap[command.type]}`
      }, (command.type === 'command') ? `$ ${command.text}` : command.text)

      this.listElem.appendChild(li);
    })


  }
}

export default consoleView;
