import actions from '../actions'
import events from '../utils/events'
import { h, render } from '../utils/vdom'

export default {
  render () {
    const handleSubmit = e => {
      e.preventDefault()
      actions.enterCommand(e.target.prompt.value)
      e.target.prompt.value = ''
    }

    const commandList = actions.getCommandList()

    return (
      <div className="console" id="commands">
        <ul className="console__command-list">
          {commandList.map(command =>
            <li className={`console__command-list-item console__command-list-item--${command.type}`}>
              {(command.type === 'command') ? `$ ${command.text}` : command.text}
            </li>
          )}
        </ul>
        <form onSubmit={handleSubmit}>
          <span>$&nbsp;</span>
          <input
            type="text"
            name="prompt"
            id="command-input"
            className="console__prompt"
            autocomplete="off"
            value={actions.getEnteredCommands().text}
          />
        </form>
      </div>
    )
  }
}
