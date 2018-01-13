import controller from '../controller'
import events from '../utils/events'
import { h, render } from '../utils/dom'

events.on('consoleViewInit', data => {
  consoleView.init()
})

events.on('consoleViewRender', data => {
  consoleView.render()
})

const consoleView = { 
  init () {
    this.promptContainer = document.getElementById('command-prompt-container');
    this.listItemsContainer = document.getElementById('commands');
    this.consoleElement = document.getElementById('console-selector');
    this.promptInputElement = document.getElementById('command-input');

    this.consoleElement.addEventListener('click', () => {
      this.promptInputElement.focus();
    })

    this.promptContainer.addEventListener('submit', e => {
      e.preventDefault();
      controller.enterCommand(e.target.prompt.value);
      e.target.prompt.value = '';
    })

    this.render()
  },

  render () {
    this.listItemsContainer.innerHTML = ''
    const commands = controller.getPreviousCommands()

    this.consoleElement.scrollTop = this.consoleElement.scrollHeight

    if (controller.getEnteredCommands()) {
      this.promptInputElement.value = controller.getEnteredCommands().text
    } else {
      this.promptInputElement.value = ''
    }

    const vnodes = h('ul', { className: 'console__command-list' }, 
      ...commands.map(command => 
        h('li', { className: `console__command-list-item console__command-list-item--${command.type}` }, 
          (command.type === 'command') ? `$ ${command.text}` : command.text
        )
      )
    )

    this.listItemsContainer.appendChild(render(vnodes))
  }
}

export default consoleView
