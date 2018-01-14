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
    this.vdom = null
    this.elements = {
      promptContainer: document.getElementById('command-prompt-container'),
      listItemsContainer: document.getElementById('commands'),
      consoleContainer: document.getElementById('console-selector'),
      promptInput: document.getElementById('command-input')
    }

    this.bindEvents()
    this.render()
  },

  bindEvents () {
    this.elements.consoleContainer.addEventListener('click', () => {
      this.elements.promptInput.focus();
    })

    this.elements.promptContainer.addEventListener('submit', e => {
      e.preventDefault();
      controller.enterCommand(e.target.prompt.value);
      e.target.prompt.value = '';
    })
  },

  render () {
    const commands = controller.getPreviousCommands()

    if (controller.getEnteredCommands()) {
      this.elements.promptInput.value = controller.getEnteredCommands().text
    } else {
      this.elements.promptInput.value = ''
    }

    // Create virtual dom from jsx
    const vnodes = (
      <ul className="console__command-list">
        {commands.map(command => 
          <li className={`console__command-list-item console__command-list-item--${command.type}`}> 
            {(command.type === 'command') ? `$ ${command.text}` : command.text}
          </li>
        )}
      </ul>
    )

    // diff dom and render into container
    this.vdom = render(this.elements.listItemsContainer, vnodes, this.vdom)
  }
}

export default consoleView
